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

print(os.getcwd())

def set_chrome_driver():
    chrome_options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    return driver
class Device:

    def __init__(self, name, code, price, brand, colors, storage, pic_paths):
        self.name = name
        self.code = code
        self.price = price
        self.brand = brand
        self.colors = colors
        self.storage = storage
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
for device in device_list : 
    try:
        # get default info from a tag

        a = WebDriverWait(device, 9999).until(
            EC.presence_of_all_elements_located((By.TAG_NAME, "a"))
        )
        a = a[0]

        info = a.get_attribute("data-ec-product")
        info = json.loads(info)

        pic_paths = []
    
        # get color info
        colors = device.find_element(By.TAG_NAME, "ul")
        colors = colors.find_elements(By.TAG_NAME, "li")
        color_list = []
        for color in colors:
            c = "{};{}".format(color.get_attribute("title"), color.get_attribute("style"))
            color_list.append(c)

        # go to detail page and scrape info
        driver.execute_script("arguments[0].click();", a)

        # storage = driver.find_element(By.CSS_SELECTOR, ".font-m.info-tit").get_attribute("innerHTML")
        storage = WebDriverWait(driver, 9999).until(
            EC.presence_of_element_located((By.CSS_SELECTOR,".font-m.info-tit"))
        )
        storage = storage.get_attribute("innerHTML")

        pic_list = WebDriverWait(driver, 9999).until(
            EC.presence_of_element_located((By.CSS_SELECTOR,".util-navigation-type"))
        )
        pic_list = pic_list.find_elements(By.CSS_SELECTOR, ".lazyLoad")
   
        for pic in pic_list:
            pic_paths.append(pic.get_attribute("src"))
        driver.back()
        sleep(10)

        tmp = Device(
            info["ecom_prd_name"],
            info["ecom_prd_id"],
            info["ecom_prd_price"],
            info["ecom_prd_brand"],
            ",".join(color_list),
            storage,
            ",".join(pic_paths)
        )
        device_obj_list.append(tmp)
        print("object saved")
    except Exception as e:
        print(e)
        driver.get("https://www.lguplus.com/mobile/5g-phone?URC_TRM_MANF_CD=all")

sql =  "INSERT INTO DEVICE(code, name, color, storage, stock, price, pic_path) VALUES\n"
for device in device_obj_list:
    v = "('{}','{}','{}','{}',{},{},'{}'),\n".format(
        device.code,
        device.name,
        device.colors,
        device.storage,
        100,
        device.price,
        device.pic_paths
    )
    sql += v

print(sql)

f = open("main_page_data.sql", "w")
f.write(sql)
f.close()