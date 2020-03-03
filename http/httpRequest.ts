import axios from 'axios'

axios
  .post("http://localhost:9090/api/v1/echo", {
    name: 'l9i9u'
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });