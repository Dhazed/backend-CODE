const axios = require('axios')

for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    axios.get ('http://localhost:3000/')
.then (response => {
  console.log( response.data.message, response.data.pid); })
.catch (err => {
  console.log('errore non andato' + err ) })   
}, 2000*i);
}

