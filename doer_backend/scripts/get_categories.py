import requests

url = "https://api.yelp.com/v3/categories"

headers = {
    "accept": "application/json",
    "Authorization": "Bearer 1WSeBcAmkVxFSePaCPklmtM8-3k5DWXmLfg0oWrh5wkmJAzBiitM0ACEJqZeTfCHFPXdsyKsTs2dgfCw9Rja5xBDmneQRHrAP0Eg4qL5kYFXqIqahQHsHVALwuxoZXYx"
}

response = requests.get(url, headers=headers)

print(response.text)

