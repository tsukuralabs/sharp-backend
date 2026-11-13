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


### Read & Write Into File System

```js
const http = require('http');

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
            <form>

            <label>Name: </label>
            <input type='text' name='username'></input>

            <button>Add</button>

            </form>
            `
        )
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