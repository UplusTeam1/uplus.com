from random import random
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import os
import re

print(os.getcwd())


def set_chrome_driver():
    chrome_options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=Service(
        ChromeDriverManager().install()), options=chrome_options)
    return driver


class Device:

    def __init__(self, name, code, price, brand, storage, detail, weekly_sale):
        self.name = name
        self.code = code
        self.price = price
        self.brand = brand
        self.storage = storage
        self.detail = detail
        self.weekly_sale = weekly_sale


class DeviceDetail:

    def __init__(self, code, color_name, rgb, stock, pic_paths):
        self.code = code
        self.color_name = color_name
        self.rgb = rgb
        self.stock = stock
        self.pic_paths = pic_paths


driver = set_chrome_driver()
driver.get("https://www.lguplus.com/mobile/5g-phone?URC_TRM_MANF_CD=all")

print(driver.title)

print(driver.current_url)


# device_list = driver.find_elements(By.CLASS_NAME, "product-li")

device_list = WebDriverWait(driver, 9999).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, "product-li"))
)

print(len(device_list))

device_obj_list = []
# go to detail page and do something... get back when process is done
count = 0
for device in device_list:
    try:
        # get default info from a tag

        a = WebDriverWait(device, 9999).until(
            EC.presence_of_all_elements_located((By.TAG_NAME, "a"))
        )
        a = a[0]

        info = a.get_attribute("data-ec-product")
        info = json.loads(info)

        # go to detail page and scrape info
        driver.execute_script("arguments[0].click();", a)

        # storage = driver.find_element(By.CSS_SELECTOR, ".font-m.info-tit").get_attribute("innerHTML")
        storage = WebDriverWait(driver, 9999).until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, ".font-m.info-tit"))
        )
        storage = storage.get_attribute("innerHTML")

        color_buttons = WebDriverWait(driver, 9999).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "btn-color"))
        )

        tmp_device_detail = -1
        tmp_device_detail_list = []
        color_infos = []
        for color_button in color_buttons:
            # color_button.click()
            driver.execute_script("arguments[0].click();", color_button)
            span = color_button.find_element(By.TAG_NAME, "span")
            rgb = span.get_attribute("style")
            em = span.find_element(By.TAG_NAME, "em")
            color_name = em.get_attribute("innerHTML")
            print(color_name, rgb[12:-1])
            color_infos.append((color_name, rgb[12:-1]))
            sleep(2)
            # pic_paths = []
            
            # for pic in pic_list:
            #     pic = pic.find_elements(By.CSS_SELECTOR, ".lazyLoad")
            #     for p in pic:
            #         pic_paths.append(p.get_attributes("src"))
            # pic_list = pic_list.find_elements(By.CSS_SELECTOR, ".lazyLoad")
            # for pic in pic_list:
            #     pic_paths.append(pic.get_attribute("src"))
            # tmp_device_detail = DeviceDetail(
            #     info["ecom_prd_id"],
            #     color_name,
            #     rgb,
            #     100,
            #     pic_paths
            # )
            # tmp_device_detail_list.append(tmp_device_detail)
        pic_list = WebDriverWait(driver, 9999).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".util-navigation-type"))
        )
        pic_paths = []
        for pic_info in pic_list:
            tmp = []
            pic_info = pic_info.find_elements(By.CSS_SELECTOR, ".lazyLoad")
            for pic in pic_info:
                tmp.append(pic.get_attribute("src"))
            pic_paths.append(tmp)
        for i in range(0, len(color_infos)) :
            tmp_device_detail =DeviceDetail(
                info["ecom_prd_id"],
                color_infos[i][0],
                color_infos[i][1],
                100,
                pic_paths[i]
            )
            print(color_infos[i][0], color_infos[i][1])
            print(pic_paths[i])
            tmp_device_detail_list.append(tmp_device_detail)
        driver.back()
        sleep(10)

        tmp_device = Device(
            info["ecom_prd_name"],
            info["ecom_prd_id"],
            info["ecom_prd_price"],
            info["ecom_prd_brand"],
            storage,
            tmp_device_detail_list,
            int(random() * 1000)
        )
        device_obj_list.append(tmp_device)
        print(count)
        count += 1
    except Exception as e:
        print(e)
        driver.get("https://www.lguplus.com/mobile/5g-phone?URC_TRM_MANF_CD=all")

sql_device = "INSERT INTO device(code, name, storage, price, weekly_sale, brand) VALUES\n"
sql_device_detail = "INSERT INTO device_detail(device_code, color, rgb, stock, pic_paths) VALUES\n"
for device in device_obj_list:
    device_value = "('{}','{}',{},{},{},'{}'),\n".format(
        device.code,
        device.name,
        re.sub(r'[^0-9]', '', device.storage),
        device.price,
        device.weekly_sale,
        device.brand
    )
    sql_device += device_value
    for detail in device.detail:
        device_detail_value = "('{}', '{}', '{}', {}, '{}'),\n".format(
            device.code,
            detail.color_name,
            detail.rgb,
            detail.stock,
            ",".join(detail.pic_paths)
        )
        sql_device_detail += device_detail_value

sql_device = sql_device[:-2] + ";"
sql_device_detail = sql_device_detail[:-2] + ";"

print(sql_device)
print(sql_device_detail)
f = open("main_page_data.sql", "w")
f.write(sql_device + "\n" + sql_device_detail)
f.close()
