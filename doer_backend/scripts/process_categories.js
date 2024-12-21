const fs = require('fs');

var cat_data = require ('./yelp_categories.json');
console.log(cat_data.categories.length);


var out_data = [];
var logger = fs.createWriteStream('categories.test.data.js', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

logger.write('const yelp_categories_test_data = { "categories": ')

for (let i = 0; i < cat_data.categories.length; i++) {

  var entry = cat_data.categories[i];

  //if(entry.parent_aliases.length == 0) {
   // console.log("top level category = " + entry.title);
  //  entry.parent_id = null;
  delete entry.country_whitelist;
  delete entry.country_blacklist;
    out_data.push(entry);
    //var vname = var_name + (j);
   // logger.write("const ");
   // logger.write(vname);
   // logger.write(" = ");
   // logger.write(JSON.stringify(entry));
   // logger.write(",\n");

 // }
}
logger.write(JSON.stringify(out_data));
logger.write("};");
logger.write("\n");
logger.write("module.exports = {yelp_categories_test_data}");
logger.write("\n");
logger.end();

/*
console.log("\n \n");
for (let i = 0; i < cat_data.categories.length; i++) {
   var entry = cat_data.categories[i];
    if(entry.parent_aliases.length == 1) {
      console.log("second level category = " + entry.title);
    }
}
console.log(out_data);


// Convert the JavaScript object to a JSON string
const jsonData = JSON.stringify(out_data);

// Write the JSON string to a file
fs.writeFile('data.json', jsonData, (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log('Data written to file successfully.');
  }
});
*/