from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import json

text=""

driver = webdriver.Chrome('C:/Users/Admin/uplus/data/chromedriver_win32/chromedriver.exe')
url = 'https://www.lguplus.com/plan/mplan/5g-all'
driver.get(url)

print(driver.title)
print(driver.current_url)

sleep(3)

driver.find_element(By.XPATH,"//*[text()='전체보기 (23)']").click()

sleep(3)
# plan=driver.find_element('id','__BVID__426').text
categorylist = driver.find_elements(By.TAG_NAME,"table")
text+="INSERT INTO test.plan(name, data, sharing, voice_call, message, price) VALUES\n"

for c in categorylist:
    planlist=c.find_elements(By.TAG_NAME,"tr")

    for plan in planlist[1:]:
        # print(plan.get_attribute("innerHTML"))
        name = plan.find_element(By.TAG_NAME,"button")
        planname = name.get_attribute("innerHTML").strip()
        if '태블릿' in planname :
            continue
        spanlist = plan.find_elements(By.TAG_NAME,"span")
        text+="('"+planname+"',"
        for span in spanlist:
            current_text = str(span.get_attribute("innerHTML"))
            if 'span' not in current_text and '최신' not in current_text and '<!----> <!----> <!---->' not in current_text:
                # print(current_text)
                if '-' == current_text:
                    text+="'사용가능'"+","
                elif '월' in current_text:
                    text+=current_text[2:-5]+current_text[-4:-1]
                else:
                    text+="'"+current_text.strip()+"',"
        # print("------------------------------")
        # text=text[:-1]
        text+="),\n"

text = text[:-2]+";"
print(text)
f = open("C:/Users/Admin/uplus/data/plan_sql.txt",'w')
f.write(text)
f.close
