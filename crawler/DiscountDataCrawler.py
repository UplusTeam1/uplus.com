from selenium import webdriver
from selenium.webdriver.common.by import By
import time

options = webdriver.ChromeOptions()
options.add_argument("headless")

chromeDriver = 'C:\WorkSpace\chromedriver_win32\chromedriver.exe'
driver = webdriver.Chrome(chromeDriver, options=options)

driver.get("https://www.lguplus.com/mobile/financing-model")

data_result = []
button_xpath_list = []
plan_set = set()

view_more_plan_button = driver.find_element('xpath', '/html/body/div[1]/div/div/div[4]/div[1]/div/div[2]/div/div/div[2]/div[1]/dl[1]/dd[2]/button')
view_more_plan_button.click()

plan_list = driver.find_elements(By.CLASS_NAME, 'half-box')
plan_index_list = []
for plan_name in plan_list:
    plan_name_children = plan_name.find_elements(By.TAG_NAME, "li")
    plan_index_list.append(len(plan_name_children))

plan_index_list = plan_index_list[1:]
print(plan_index_list)

for index in range(1, plan_index_list[0] + 1):
    button_xpath_list.append('/html/body/div[5]/div[1]/div/div/div/div/div[1]/div/ul/li[' + str(index) + ']/span')
for index in range(1, plan_index_list[1] + 1):
    button_xpath_list.append('/html/body/div[5]/div[1]/div/div/div/div/div[2]/div/ul/li[' + str(index) + ']/span')
for index in range(1, plan_index_list[2] + 1):
    button_xpath_list.append('/html/body/div[5]/div[1]/div/div/div/div/div[3]/div/ul/li[' + str(index) + ']/span')

text=""

def get_data(text):
    plan = driver.find_element(By.CLASS_NAME, 'select-discount').text
    if '(' in plan and ')' in plan:
        idx = plan.index(')') + 2
        plan = plan[idx:]
    if plan in plan_set:
        return text
    plan_set.add(plan)
    print(plan)

    while True:
        next_button = '/html/body/div[1]/div/div/div[4]/div[1]/div/div[2]/div/div/div[2]/div[3]/div[4]/ul/li[8]/button'
        is_next_page = '/html/body/div[1]/div/div/div[4]/div[1]/div/div[2]/div/div/div[2]/div[3]/div[4]/ul/li[8]'
        time.sleep(1)
        element = driver.find_element('id', '__BVID__306').text
        discounts = element.split('\n')[1:]

        count_limit = len(discounts) // 7
        for count in range(count_limit):
            data = [plan]
            offset = int(count * 7)

            data.append(discounts[offset + 0])
            data.append(discounts[offset + 1])

            target = discounts[offset + 2].split()
            result = target[4]
            result = result[:-1]
            result = result.replace(',', '')
            data.append(result)
            data_result.append(data)
            row = "INSERT INTO discount (plan_name, device_code, device_discount) VALUES "
            row += "(" + "\'" + plan +  "\'" + ", " + "\'" + discounts[offset + 1] +  "\'" + ", " + result + "); \n"
            text += row
        
        is_next_page = driver.find_element('xpath', is_next_page).get_attribute('class')
        
        if is_next_page == 'page-item':
            next_button = driver.find_element('xpath', next_button)
            next_button.click()
        else:
            return text


for item in button_xpath_list:
    driver.get("https://www.lguplus.com/mobile/financing-model")
    time.sleep(5)
    view_more_plan_button = driver.find_element('xpath', '/html/body/div[1]/div/div/div[4]/div[1]/div/div[2]/div/div/div[2]/div[1]/dl[1]/dd[2]/button')
    view_more_plan_button.click()

    choosePlanButton = driver.find_element("xpath", item)
    choosePlanButton.click()

    selectPlanButton = driver.find_element('xpath', '/html/body/div[5]/div[1]/div/div/footer/div/button')
    selectPlanButton.click()

    text = get_data(text)
    print(len(data_result))

f = open('C:/WorkSpace/discountData.txt','w')
f.write(text)
f.close
