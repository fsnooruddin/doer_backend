# -*- coding: utf-8 -*-
"""
Yelp Fusion API code sample.

This program demonstrates the capability of the Yelp Fusion API
by using the Search API to query for businesses by a search term and location,
and the Business API to query additional information about the top result
from the search query.

Please refer to https://docs.developer.yelp.com/docs/get-started for the API
documentation.

This program requires the Python requests library, which you can install via:
`pip install -r requirements.txt`.

Sample usage of the program:
`python sample.py --term="bars" --location="San Francisco, CA"`
"""
from __future__ import print_function

import argparse
import json
import pprint
import requests
import sys
import urllib
import random

# This client code can run on Python 2.x or 3.x.  Your imports can be
# simpler if you only need one of those.
try:
    # For Python 3.0 and later
    from urllib.error import HTTPError
    from urllib.parse import quote
    from urllib.parse import urlencode
except ImportError:
    # Fall back to Python 2's urllib2 and urllib
    from urllib2 import HTTPError
    from urllib import quote
    from urllib import urlencode


# Yelp Fusion no longer uses OAuth as of December 7, 2017.
# You no longer need to provide Client ID to fetch Data
# It now uses private keys to authenticate requests (API Key)
# You can find it on
# https://www.yelp.com/developers/v3/manage_app
API_KEY='1WSeBcAmkVxFSePaCPklmtM8-3k5DWXmLfg0oWrh5wkmJAzBiitM0ACEJqZeTfCHFPXdsyKsTs2dgfCw9Rja5xBDmneQRHrAP0Eg4qL5kYFXqIqahQHsHVALwuxoZXYx'
 

# API constants, you shouldn't have to change these.
API_HOST = 'https://api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'
BUSINESS_PATH = '/v3/businesses/'  # Business ID will come after slash.


# Defaults for our simple example.
DEFAULT_TERM = 'dinner'
DEFAULT_LOCATION = 'San Francisco, CA'
REVIEW_COUNT = 'review_count'
SEARCH_LIMIT = '3'


def request(host, path, api_key, url_params=None):
    """Given your API_KEY, send a GET request to the API.

    Args:
        host (str): The domain host of the API.
        path (str): The path of the API after the domain.
        API_KEY (str): Your API Key.
        url_params (dict): An optional set of query parameters in the request.

    Returns:
        dict: The JSON response from the request.

    Raises:
        HTTPError: An error occurs from the HTTP request.
    """
    url_params = url_params or {}
    url = '{0}{1}'.format(host, quote(path.encode('utf8')))
    headers = {
        'Authorization': 'Bearer %s' % api_key,
    }

    #print(u'Querying {0} ...'.format(url))

    response = requests.request('GET', url, headers=headers, params=url_params)

    return response.json()


def search(api_key, term, location, searchlimit):
    """Query the Search API by a search term and location.

    Args:
        term (str): The search term passed to the API.
        location (str): The search location passed to the API.

    Returns:
        dict: The JSON response from the request.
    """

    url_params = {
        'term': term.replace(' ', '+'),
        'location': location.replace(' ', '+'),
        'limit':  searchlimit.replace(' ', '+'),
        'sortby': REVIEW_COUNT
    }
    print ("url_params=")
    print(url_params)
    return request(API_HOST, SEARCH_PATH, api_key, url_params=url_params)


def get_business(api_key, business_id):
    """Query the Business API by a business ID.

    Args:
        business_id (str): The ID of the business to query.

    Returns:
        dict: The JSON response from the request.
    """
    business_path = BUSINESS_PATH + business_id

    return request(API_HOST, business_path, api_key)


def query_api(term, location, searchlimit):
    """Queries the API by the input values from the user.

    Args:
        term (str): The search term to query.
        location (str): The location of the business to query.
    """
    response = search(API_KEY, term, location, searchlimit)

    businesses = response.get('businesses')

    if not businesses:
        print(u'No businesses for {0} in {1} found.'.format(term, location))
        return


    output_prefix = term.replace(" ", "") + "-" + location.replace(" ", "") + "-" + searchlimit
    print(output_prefix)

    # Open the JSON file
    with open("california_zip_codes.json", "r") as f:
        # Load JSON data from the file
        zip_code_data = json.load(f)
    f.close()

    # Open the file in write mode
    file = open(output_prefix + ".html", "w")
    tfile = open(output_prefix + ".json", "w")
    rfile = open(output_prefix + "-raw.json", "w")
    write_html_prelog(file)
#    tfile.write('const yelp_business_data = { "doers": [ ')
    tfile.write('{ "doers": [ ')
    print(u'{0} businesses found, querying business info ' \
              'for details ...'.format(
                  len(businesses)))

    first = True
    for business in businesses:

        business_id = business['id']

        response = get_business(API_KEY, business_id)

        rfile.write(str(response))
        print(u'Result for business "{0}" found:'.format(business_id))
        print("\n")
        print("Keys:", list(response.keys()))
        print("\n")
        print("response: ", response)
        print("\n")
        rfile.write(json.dumps(response))
        rfile.write(",\n")

#       json_obj = json.loads(response)

        print(response['name'] , ',' , response['phone'] , ',' ,response['display_phone'] , ',' ,
              response['hours'] , ',' ,
              response['coordinates'] , ',' ,
              response['location'] , ',' ,
              response['location']['city'] , ',' ,
              response['location']['state'] , ',' ,
              response['review_count'] , ',', response['categories'], '\n')
        if first == True:
            first = False
        else:
            tfile.write(",\n")

        write_html_business(file, tfile, response, zip_code_data)



    write_html_prolog(file)
    file.close()

    tfile.write("]}\n")
 # tfile.write("module.exports={yelp_business_data}")
    tfile.close()
    rfile.close()


def write_html_prelog(fh):

    # Write HTML content
    fh.write("<html>\n")
    fh.write("<head>\n")
    fh.write("<title>Yelp Output</title>\n")
    fh.write("<style>\n")
    fh.write("table {\n")
    fh.write("table-layout: fixed;\n")
    fh.write("width: 100%;\n")
    fh.write("text-align: center;\n")
    fh.write("}\n")
    fh.write("</style>\n")
    fh.write("</head>\n")
    fh.write("<table>\n")
    labels = "  <tr>\n"
    labels += "    <th>Business Name</th>\n"
    labels += "    <th>Phone</th>\n"
    labels += "    <th>Review Count</th>\n"
    labels += "    <th>Business Categories</th>\n"
    labels += "  </tr>\n"
    fh.write(labels)

def getOpeningSchedule(zip_code_data):
    txt = "Sun,Mon,Tue,Wed,Thu,Fri,Sat" 
    days = txt.split(",")
    i = random.randint(0, len(zip_code_data))
    print("index = ")
    print(i)
    tout = "{\"slots\": ["

    for x in range(2):
        i = random.randrange(7)
        day = days[i]

        open_time = random.randrange(7, 12)
        close_time = random.randrange(12, 24)

        out = ""
        out = "{ \"slot\": {\"day\": " + "\"" + day + "\"" + "," + "\"time\": " + "\"" + str(open_time) + "-" + str(close_time) + "\"" + "}"
        out = out + ", \"rate\": " + str(random.randrange(50,100)) + ","
        out = out + "\"location\": " + "{ \"coordinates\": " + "{ \"latitude\": 22.222 " + "," + "\"longitude\":  333.333" + "}"
        out = out + ", \"radius\": " + str(random.randrange(10,50)) + "}}"

        if( x == 0 ):
            tout = tout + out
        else:
            tout = tout + ", " + out + "]"
            tout = tout + ", " + "\"instant_book\": {\"on\": false"
            tout = tout + ", " + "\"hourly_rate\": " + str(random.randrange(50,100)) + "}}"
            print(tout)

    return tout
            
def write_html_business(fh, tfh, response, zip_code_data):

    fh.write("<tr>\n")
    fh.write('<td>{0}</td> <td>{1}</td> <td>{2}</td>, <td>{3}</td>\n'.format(response['name'] , response['phone'] ,
            response['review_count'] , response['categories']))
    fh.write("</tr>\n")

    tfh.write("{")
    stitle = response['name'].replace('"','')
    stitle = stitle.replace('\'','')
    print(response['name'] + "    " + stitle)
    tfh.write('"name": "{0}"'.format(stitle))
    tfh.write(",")

    location = '{'
    location = location + 'city: {0}'.format(response['location']['city'])
    location = location + ','
    location = location + 'state: {0}'.format(response['location']['state'])
    location = location + ','
    location = location + 'zip_code: {0}'.format(response['location']['zip_code'])
    location = location + ','
    location = location + 'address: {0}'.format(response['location']['display_address'])
    location = location + ','
    location = location + 'coordinates: {0}'.format(response['coordinates'])
    location = location + '}'
    print(location)


    rating = '{'
    rating = rating + '"rating": {0}'.format(response['rating'])
    rating = rating + ','
    rating = rating + '"raw": {'
    rating = rating + '"total": {0}'.format(response['rating']*100)
    rating = rating + ','
    rating = rating + '"count": {0}'.format(100)
    rating = rating + '}'
    rating = rating + '}'
    print(rating)

    cats = response['categories'];
    first = 0
    ocats = ""
    for cat in cats:

        if(first > 0): 
            ocats = ocats + " , "
        else:
            first = 5
        stitle = cat["title"].replace('"','')
        stitle = stitle.replace('\'','')
        ocats = ocats + stitle
        print (cat["title"] + "   " + stitle)
    tfh.write('"services": "{0}"'.format(response['categories']))
    tfh.write(",")
    tfh.write('"review_count": "{0}"'.format(response['review_count']))
    tfh.write(",")
    tfh.write('"phone_number": "{0}"'.format(response['display_phone']))
    tfh.write(",")
    tfh.write('"rating": {0}'.format(rating))
    tfh.write(",")
    tfh.write('"availability": {0}'.format(getOpeningSchedule(zip_code_data)))
    tfh.write(",")
    tfh.write('"min_charges": "{0}"'.format(random.randrange(50,100)))
    tfh.write(",")
    tfh.write('"location": "{0}"'.format(location))
    tfh.write(",")
    tfh.write('"img_url": "{0}"'.format(response['image_url']))
    tfh.write("}")
    
def write_html_prolog(fh):

    fh.write("</table>")
    fh.write("</body>")
    fh.write("</html>")

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('-q', '--term', dest='term', default=DEFAULT_TERM,
                        type=str, help='Search term (default: %(default)s)')
    parser.add_argument('-l', '--location', dest='location',
                        default=DEFAULT_LOCATION, type=str,
                        help='Search location (default: %(default)s)')
    parser.add_argument('-s', '--searchlimit', dest='searchlimit',
                       default=SEARCH_LIMIT, type=str,
                       help='Search limit (default: %(default)s)')

    input_values = parser.parse_args()

    try:
        query_api(input_values.term, input_values.location, input_values.searchlimit)
    except HTTPError as error:
        sys.exit(
            'Encountered HTTP error {0} on {1}:\n {2}\nAbort program.'.format(
                error.code,
                error.url,
                error.read(),
            )
        )


if __name__ == '__main__':
    main()

