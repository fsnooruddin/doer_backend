"use strict";
const axios = require("axios");
const child_categories_data = require("./categories.test.data.js");
//const child_categories_data = require("./categories.small.test.data.js");
const top_level_categories_data = require("./categories.top-level.test.data.js");

async function rget(url) {
const DOER_AUTH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2VySWQiOjEsInR5cGUiOiJkb2VyIiwidXNlcm5hbWUiOiJCaWxseUhpbGwiLCJpYXQiOjE3NDI1MDQ4NTB9.TNzPkd-W55NfXQXAkrt9QzzPPgKjaZesmRHx9mbrZl0";

   const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': DOER_AUTH_TOKEN
      }
   };

	try {
		const response = await axios.get(url, config);
		return response.data;
	} catch (error) {
		console.error("GET from : " + url + " error is: " + error);
		return null;
	}
}

async function rpost(url, dataString) {
   const DOER_AUTH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2VySWQiOjEsInR5cGUiOiJkb2VyIiwidXNlcm5hbWUiOiJCaWxseUhpbGwiLCJpYXQiOjE3NDI1MDQ4NTB9.TNzPkd-W55NfXQXAkrt9QzzPPgKjaZesmRHx9mbrZl0";

   const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': DOER_AUTH_TOKEN
      }
   };

	try {
		const response = await axios.post(url, dataString, config);
		return response.data;
	} catch (error) {
		console.error("POST to : " + url + " error is: " + error);
		return null;
	}
}


// Find a single Doer by services
async function getParentId(parents) {
  var uri = "http://127.0.0.1:8080/api/doer/category/getByName?name=";
  for (let i = 0; i < parents.length; i++) {
    uri = uri + parents[i];
    try {
      console.log("calling for parent id = " + uri);
      const response_data = await rget(uri);

      console.log("calling for parent id response = " + JSON.stringify(response_data));
      if (response_data != null ) {
        console.log("return parent id = " + response_data.category_id);
        return response_data.category_id;
      } else
      {
        console.log("get parent id returning empty");
      }
    } catch (error) {
      console.log("Can't get parent id..." + parents[i] + " error + " + error);
      return -1;
    }
  }
  return -1;
}

// Find a single Doer by services
async function createCategory(entry) {
  var uri = "http://127.0.0.1:8080/api/doer/category/create";

  try {
    console.log("create category entry = " + JSON.stringify(entry));
    const response_data = await rpost(uri, entry);

    //    console.log("response.body     " + response_data.body);
    //    console.log("createCategory response = " + JSON.stringify(response_data.body) + "    " );
    return true;
  } catch (error) {
    console.log("Couldn't create entry..." + JSON.stringify(entry));
    console.error(error);
    return false;
  }
}

function flatten_parent_aliases(parent_aliases) {
  var ret_str = "";
  var first = true;
  for (let i = 0; i < parent_aliases.length; i++) {
    if (first == false) {
      ret_str = ret_str + ",";
    }
    ret_str = ret_str + parent_aliases[i];
    if (first == true) {
      first = false;
    }
  }
 // console.log("flatten parent aliases returning " + ret_str);
  return ret_str;
}

async function main() {
  // console.log(categories_data.yelp_categories_test_data.categories);

  create_category_enteries(top_level_categories_data);

  create_category_enteries(child_categories_data);
}

async function create_category_enteries(categories_data) {
  for (
    let i = 0;
    i < categories_data.yelp_categories_test_data.categories.length;
    i++
  ) {
    var entry = categories_data.yelp_categories_test_data.categories[i];
    entry.name = entry.title;
    entry.parent_id = null;
    var parent_id = await getParentId(entry.parent_aliases);
    //parent_id.resolve();
    var new_aliases = flatten_parent_aliases(entry.parent_aliases);
    entry.parent_aliases = new_aliases;
    if (parent_id == -1) {
      console.log("Couldn't get parent id ..." + JSON.stringify(entry));
      createCategory(entry);
    } else {
      entry.parent_id = parent_id;
      console.log(
        "Got parent id = " + parent_id + "    " + entry.parent_aliases,
      );
      console.log("create category call entry = " + JSON.stringify(entry));
      createCategory(entry);
    }
  }
}

main();
