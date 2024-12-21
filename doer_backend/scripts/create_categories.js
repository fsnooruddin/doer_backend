const request = require('superagent');

var uri = 'http://localhost:3721/api/doer/getCategory?id=4';
request.get(uri)
  .then((response) => {
    console.log(response.text);
  })
  .catch((error) => {
    console.error(error);
  });

