var http = require("http");

http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   "use strict";
   const cassandra = require('cassandra-driver');
   
   const client = new cassandra.Client({ contactPoints: ['127.0.0.1']});
   client.connect()
     .then(function () {
       console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
     })
     .then(function () {
      return client.execute('SELECT * FROM mahasiswa.subscribers');
     })
     .then(function (result) {
      const row = result.rows[0];
      console.log('Obtained row: ', row);
      console.log('suting down ');
      // Send the response body as "Hello World"
      response.end('Hello World\n'+JSON.stringify(row));
      return client.shutdown();
     })
     .catch(function (err) {
       console.error('There was an error when connecting', err);
       return client.shutdown();
     });
     
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');