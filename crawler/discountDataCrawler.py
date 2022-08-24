from selenium import webdriver
from selenium.webdriver.common.by import By
import time

options = webdriver.ChromeOptions()
options.add_argument("headless")

chromeDriver = 'C:\WorkSpace\chromedriver_win32\chromedriver.exe'
driver = webdriver.Chrome(chromeDriver, options=options)

driver.get("https://www.lguplus.com/mobile/financing-model")

dataResult = []
buttonXpathList = []
plan_set = set()

viewMorePlanButton = driver.find_element('xpath', '/html/body/div[1]/div/div/div[4]/div[1]/div/div[2]/div/div/div[2]/div[1]/dl[1]/dd[2]/button')
viewMorePlanButton.click()

planList = driver.find_elements(By.CLASS_NAME, 'half-box')
planIndexList = []
for planName in planList:
    planNameChild = planName.find_elements(By.TAG_NAME, "li")
    planIndexList.append(len(planNameChild))
planIndexList = planIndexList[1:]
print(planIndexList)

for index in range(1, planIndexList[0] + 1):
    buttonXpathList.append('/html/body/div[5]/div[1]/div/div/div/div/div[1]/div/ul/li[' + str(index) + ']/span')
for index in range(1, planIndexList[1] + 1):
    buttonXpathList.append('/html/body/div[5]/div[1]/div/div/div/div/div[2]/div/ul/li[' + str(index) + ']/span')
for index in range(1, planIndexList[2] + 1):
    buttonXpathList.append('/html/body/div[5]/div[1]/div/div/div/div/div[3]/div/ul/li[' + str(index) + ']/span')

text="INSERT INTO discount (plan_name, code, device_discount) VALUES \n"

def get_data(text):
    Plan = driver.find_element(By.CLASS_NAME, 'select-discount').text
    if '(' in Plan and ')' in Plan:
        idx = Plan.index(')') + 2
        Plan = Plan[idx:]
    if Plan in plan_set:
        return text
    plan_set.add(Plan)
    print(Plan)

    while True:
        nextButton = '/html/body/div[1]/div/div/div[4]/div[1]/div/div[2]/div/div/div[2]/div[3]/div[4]/ul/li[8]/button'
        isNextPage = '/html/body/div[1]/div/div/div[4]/div[1]/div/div[2]/div/div/div[2]/div[3]/div[4]/ul/li[8]'
        time.sleep(1)
        element = driver.find_element('id', '__BVID__302').text
        discounts = element.split('\n')[1:]

        countLimit = len(discounts) // 7
        text += '\n'
        for count in range(countLimit):
            data = [Plan]
            offset = int(count * 7)

            data.append(discounts[offset + 0])
            data.append(discounts[offset + 1])

            target = discounts[offset + 2].split()
            result = target[4]
            data.append(result)
            dataResult.append(data)
            row = "(" + Plan + ", " + discounts[offset + 1] + ", " + result + "), \n"
            text += row
        
        isNextPage = driver.find_element('xpath', isNextPage).get_attribute('class')
        
        if isNextPage == 'page-item':
            nextButton = driver.find_element('xpath', nextButton)
            nextButton.click()
        else:
            return text


for item in buttonXpathList:
    driver.get("https://www.lguplus.com/mobile/financing-model")
    time.sleep(5)
    viewMorePlanButton = driver.find_element('xpath', '/html/body/div[1]/div/div/div[4]/div[1]/div/div[2]/div/div/div[2]/div[1]/dl[1]/dd[2]/button')
    viewMorePlanButton.click()

    choosePlanButton = driver.find_element("xpath", item)
    choosePlanButton.click()

    selectPlanButton = driver.find_element('xpath', '/html/body/div[5]/div[1]/div/div/footer/div/button')
    selectPlanButton.click()

    text = get_data(text)
    print(len(dataResult))

text = text[:-3]
text += ';'
f = open('C:/WorkSpace/discountData.txt','w')
f.write(text)
f.close
