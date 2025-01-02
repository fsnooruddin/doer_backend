"use strict";
const request = require('superagent');
const child_categories_data = require('./categories.test.data.js');
const top_level_categories_data = require('./categories.top-level.test.data.js');

// Find a single Doer by services
async function getParentId(parents) {
var uri = 'http://localhost:8080/api/doer/getCategoryByName?name=';
    for(let i=0;i<parents.length;i++) {
    uri = uri + parents[i];
    try {
     console.log("calling for parent id = " + uri);
     const response_data = await request.get(uri);
       if(response_data.body.length > 0) {
       console.log("return parent id = " + response_data.body[0].category_id);
        return response_data.body[0].category_id;
       } else {
        return -1;
       }
      } catch(error) {
        console.log("Can't get parent id..." + parents[i]);
        console.error(error);
        return -1;
      }
    }
    return -1;
}

// Find a single Doer by services
async function createCategory(entry) {
var uri = 'http://localhost:8080/api/doer/createCategory';

    try {
    console.log("create category entry = " + JSON.stringify(entry));
    const response_data = await request.post(uri).send(entry);

   //    console.log("response.body     " + response_data.body);
   //    console.log("createCategory response = " + JSON.stringify(response_data.body) + "    " );
       return true;
      }
      catch(error)  {
        console.log("Couldn't create entry..." + JSON.stringify(entry));
        console.error(error);
        return false;
      }

}

function flatten_parent_aliases(parent_aliases) {
    var ret_str = "";
    var first = true;
    for(let i=0;i<parent_aliases.length;i++) {
            if(first == false) {
                        ret_str = ret_str + ",";
            }
            ret_str = ret_str + parent_aliases[i];
            if(first == true) {
                first = false;
            }
    }
    console.log("flatten parent aliases returning " + ret_str);
    return ret_str;
}

async function main() {
// console.log(categories_data.yelp_categories_test_data.categories);

    create_category_enteries(top_level_categories_data);

    create_category_enteries(child_categories_data);
}

async function create_category_enteries(categories_data) {

    for(let i=0;i<categories_data.yelp_categories_test_data.categories.length;i++) {

        var entry = categories_data.yelp_categories_test_data.categories[i];
        entry.name = entry.title;
        entry.parent_id = null;
        var parent_id = await getParentId(entry.parent_aliases);
        //parent_id.resolve();
         var new_aliases = flatten_parent_aliases(entry.parent_aliases);
            entry.parent_aliases = new_aliases;
        if(parent_id == -1) {
           console.log("Couldn't get parent id ..." + JSON.stringify(entry));
           createCategory(entry);
        } else {
            entry.parent_id = parent_id;
            console.log("Got parent id = " + parent_id + "    " + entry.parent_aliases);
            console.log("create category call entry = " + JSON.stringify(entry));
            createCategory(entry);
        }
    }

}

main();



