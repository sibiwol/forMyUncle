import requests

url = "http://openapi.seoul.go.kr:8088/684d77555a797539353654426b5366/json/bigKcyPlatPlcInfo/1/5/"
res = requests.get(url)
data = res.json(1)
