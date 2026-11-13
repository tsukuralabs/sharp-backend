### Create an Server

```js
const http = require("http");
const server = http.createServer((req, res) => {
  console.log("server is created");

  // check header
  
  //   req.headers();

  // req.setHeader("Content-Type", "text/html"); // --> what type of data we are sending back.

  if (req.url === "/") {
    res.statusCode = 200;
    res.end("<h1>Hello World</h1>");
  } else {
    if (req.url === "/home") {
      res.statusCode = 200;
      res.end("<h1>Welcome home</h1>");
    } else if (req.url === "/about") {
      res.statusCode = 200;
      res.end("<h1>Welcome to About Us</h1>");
    } else if (req.url === "/node") {
      res.statusCode = 200;
      res.end("<h1>Welcome to my Node Js project</h1>");
    } else {
      res.statusCode = 404;
      res.end("<h1>Page not found</h1>");
    }
  }
});

let port = 3000;
server.listen(port, () => {
  console.log("server is running at", port);
});
```

---


### Read & Write Into File System (Code Implementation)

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    console.log('url', url);

    const method = req.method;
    console.log('method', method);

    // req.setHeader('Content-Type', 'text/html');

    if (req.url === '/') {
        
        res.setHeader('Content-Type', 'text/html');

        res.end(
            `
            <form action="/message" method="POST">

            <label>Name: </label>
            <input type='text' name='username'></input>

            <button type="submit">Add</button>

            </form>
            `
        )
    } else {
        if (req.url == '/message') {
            res.setHeader('Content-Type', 'text/html');

            // so when request is made data travels in streams.
            // therefore, req is iteself is an stream

            let dataChunks = [];

            req.on('data', (chunks) => {
                console.log('chunks:  ', chunks);
                dataChunks.push(chunks);
            })

            req.on('end', () => {
                let formData = Buffer.concat(dataChunks).toString();
                console.log(formData.toString());

                const formValues = formData.split("=");
                const username = formValues[1];

                // write a file
                // 1st parameter -> filename
                // 3rd parameter --> callback function for error.
                fs.writeFile('formValues.txt', username, (err) => {

                    if (err) {
                        console.log(err);
                        res.statusCode = 500;
                        res.end('File writing failed');
                        return;
                    }

                    // 302 -> redirected
                    res.statusCode = 302;

                    // 1st parameter is type  --. like location
                    // 2nd -> actual location(where u want to redirected the user).
                    res.setHeader('Location', '/');

                    res.end();
                });
            });
        } 
        
        else {
            if (req.url == '/read') {
                // How to read from a file
                // callback contains 2 parameters --> err & data
                fs.readFile('formValues.txt', (err, data) => {
                    // it gives us an buffer so convert it into an string

                    const formData = data.toString();
                    console.log('data', formData);

                    // How to print data on web page
                    res.end(
                        `
                        <h1>${data.toString()}</h1>
                        `
                    );
                })
            }
        }

    }
});

let port = 3000;
server.listen(port, () => {
    console.log('Server is listening at', port);
});



```

---

## Buffers & Streams

### Implementation of Buffers

```js

let arr = [1, 2, 3, 4, 5];

let bufferVal = Buffer.from(arr);

```