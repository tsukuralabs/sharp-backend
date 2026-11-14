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
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  console.log("url", url);

  const method = req.method;
  console.log("method", method);

  // req.setHeader('Content-Type', 'text/html');

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");

    res.end(
      `
            <form action="/message" method="POST">

            <label>Name: </label>
            <input type='text' name='username'></input>

            <button type="submit">Add</button>

            </form>
            `,
    );
  } else {
    if (req.url == "/message") {
      res.setHeader("Content-Type", "text/html");

      // so when request is made data travels in streams.
      // therefore, req is iteself is an stream

      let dataChunks = [];

      req.on("data", (chunks) => {
        console.log("chunks:  ", chunks);
        dataChunks.push(chunks);
      });

      req.on("end", () => {
        let formData = Buffer.concat(dataChunks).toString();
        console.log(formData.toString());

        const formValues = formData.split("=");
        const username = formValues[1];

        // write a file
        // 1st parameter -> filename
        // 3rd parameter --> callback function for error.
        fs.writeFile("formValues.txt", username, (err) => {
          if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end("File writing failed");
            return;
          }

          // 302 -> redirected
          res.statusCode = 302;

          // 1st parameter is type  --. like location
          // 2nd -> actual location(where u want to redirected the user).
          res.setHeader("Location", "/");

          res.end();
        });
      });
    } else {
      if (req.url == "/read") {
        // How to read from a file
        // callback contains 2 parameters --> err & data
        fs.readFile("formValues.txt", (err, data) => {
          // it gives us an buffer so convert it into an string

          const formData = data.toString();
          console.log("data", formData);

          // How to print data on web page
          res.end(
            `
                        <h1>${data.toString()}</h1>
                        `,
          );
        });
      }
    }
  }
});

let port = 3000;
server.listen(port, () => {
  console.log("Server is listening at", port);
});
```

---

## Buffers & Streams

### Implementation of Buffers

```js
let arr = [1, 2, 3, 4, 5];

let bufferVal = Buffer.from(arr);

const requestHandler = (req, res) => {
  const url = req.url;
  console.log("url", url);

  const method = req.method;
  console.log("method", method);

  // req.setHeader('Content-Type', 'text/html');

  if (req.url === "/") {
    fs.readFile("formValues.txt", (err, data) => {
      let username = "";

      if (!err) {
        username = data.toString();
      }

      res.setHeader("Content-Type", "text/html");

      res.end(
        `
            <h1>${username}</h1>
            <form action="/message" method="POST">

            <label>Name: </label>
            <input type='text' name='username'></input>

            <button type="submit">Add</button>

            </form>
        `,
      );
    });
  } else {
    if (req.url == "/message") {
      res.setHeader("Content-Type", "text/html");

      // so when request is made data travels in streams.
      // therefore, req is iteself is an stream

      let dataChunks = [];

      req.on("data", (chunks) => {
        console.log("chunks:  ", chunks);
        dataChunks.push(chunks);
      });

      req.on("end", () => {
        let formData = Buffer.concat(dataChunks).toString();
        console.log(formData.toString());

        const formValues = formData.split("=");
        const username = formValues[1];

        // write a file
        // 1st parameter -> filename
        // 3rd parameter --> callback function for error.
        fs.writeFile("formValues.txt", username, (err) => {
          if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end("File writing failed");
            return;
          }

          // 302 -> redirected
          res.statusCode = 302;

          // 1st parameter is type  --. like location
          // 2nd -> actual location(where u want to redirected the user).
          res.setHeader("Location", "/");

          res.end();
        });
      });
    }

    // else {
    //     if (req.url == '/read') {
    //         // How to read from a file
    //         // callback contains 2 parameters --> err & data
    //         fs.readFile('formValues.txt', (err, data) => {
    //             // it gives us an buffer so convert it into an string

    //             const formData = data.toString();
    //             console.log('data', formData);

    //             // How to print data on web page
    //             res.end(
    //                 `
    //                 <h1>${data.toString()}</h1>
    //                 `
    //             );
    //         })
    //     }
    // }
  }
};
```

---

## Handling Routes

```js
const http = require("http");

const routes = require("./routes");

routes.testFunction();
const server = http.createServer(routes.handler);

let port = 3000;
server.listen(port, () => {
  console.log("Server is listening at", port);
});

const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  console.log("url", url);

  const method = req.method;
  console.log("method", method);

  // req.setHeader('Content-Type', 'text/html');

  if (req.url === "/") {
    fs.readFile("formValues.txt", (err, data) => {
      let username = "";

      if (!err) {
        username = data.toString();
      }

      res.setHeader("Content-Type", "text/html");

      res.end(
        `
            <h1>${username}</h1>
            <form action="/message" method="POST">

            <label>Name: </label>
            <input type='text' name='username'></input>

            <button type="submit">Add</button>

            </form>
        `,
      );
    });
  } else {
    if (req.url == "/message") {
      res.setHeader("Content-Type", "text/html");

      // so when request is made data travels in streams.
      // therefore, req is iteself is an stream

      let dataChunks = [];

      req.on("data", (chunks) => {
        console.log("chunks:  ", chunks);
        dataChunks.push(chunks);
      });

      req.on("end", () => {
        let formData = Buffer.concat(dataChunks).toString();
        console.log(formData.toString());

        const formValues = formData.split("=");
        const username = formValues[1];

        // write a file
        // 1st parameter -> filename
        // 3rd parameter --> callback function for error.
        fs.writeFile("formValues.txt", username, (err) => {
          if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end("File writing failed");
            return;
          }

          // 302 -> redirected
          res.statusCode = 302;

          // 1st parameter is type  --. like location
          // 2nd -> actual location(where u want to redirected the user).
          res.setHeader("Location", "/");

          res.end();
        });
      });
    }

    // else {
    //     if (req.url == '/read') {
    //         // How to read from a file
    //         // callback contains 2 parameters --> err & data
    //         fs.readFile('formValues.txt', (err, data) => {
    //             // it gives us an buffer so convert it into an string

    //             const formData = data.toString();
    //             console.log('data', formData);

    //             // How to print data on web page
    //             res.end(
    //                 `
    //                 <h1>${data.toString()}</h1>
    //                 `
    //             );
    //         })
    //     }
    // }
  }
};

const secondFunction = () => {
  console.log("This is second function");
};

module.exports = {
  requestHandler,
  // secondFunction
  // other form of exporting an function
  testFunction: secondFunction,
};

// other ways of exporting
// module.exports.handler = requestHandler;
// module.exports.otherFunction = secondFunction;

exports.handler = requestHandler;
exports.testFunction = secondFunction;
```

---

## How to handle CPU-Intensive Tasks Without Blocking the main thread

### Offload Heavy Computation to Worker Threads
- Best for CPU-intensive tasks like prime number checking, image processing, or encryption

- Worker Threads allow Node.js to run **CPU-heavy tasks in parallel** on **separate threads without blocking the event loop**.

#### Implementing worker threads

1. index.js 
- This file sets up an **Express-based API** and **uses a pool of worker threads** to **handle CPU-bound tasks** like checking if a number is prime.

```js
const express = require('express');
const { Worker } = require('worker_threads');
const os = require('os');
const app = express();

// Number of worker threads to spawn based on available CPU cores
const numThreads = os.cpus().length;
const workerPool = [];

// A queue to manage pending requests
const requestQueue = [];

// Create worker threads
for (let i = 0; i < numThreads; i++) {
  const worker = new Worker('./worker.js');
  worker.isIdle = true;
  workerPool.push(worker);

  // Handle messages from worker (result of prime checking)
  worker.on('message', (result) => {
    console.log(`Worker Result: ${result}`);
    worker.isIdle = true;

    // Process the next request in the queue
    if (requestQueue.length > 0) {
      const nextRequest = requestQueue.shift();
      worker.isIdle = false;
      worker.postMessage(nextRequest);
    }
  });

  // Handle errors from worker
  worker.on('error', (error) => {
    console.error(`Worker error: ${error}`);
  });

  // Handle worker exit
  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });
}

// Middleware to parse JSON requests
app.use(express.json());

// API route to check if a number is prime
app.post('/is-prime', (req, res) => {
  const { number } = req.body;
  
  if (typeof number !== 'number') {
    return res.status(400).json({ error: 'Please provide a valid number' });
  }

  // Find an idle worker or queue the request if all are busy
  const idleWorker = workerPool.find((worker) => worker.isIdle);

  if (idleWorker) {
    idleWorker.isIdle = false;
    idleWorker.postMessage(number);
    res.status(202).json({ message: 'Processing prime check request' });
  } else {
    requestQueue.push(number); // Add request to the queue if no worker is available
    res.status(202).json({ message: 'Queued for processing' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

2. worker.js (Worker Thread)
This script **contains the logic for checking if a number is prime**. It **runs in a separate thread** and **performs the computation without blocking the main event loop**.

```js
const { parentPort } = require('worker_threads');

// Function to check if a number is prime
function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
// Listen for messages from the main thread
parentPort.on('message', (number) => {
  const result = isPrime(number);
  parentPort.postMessage(`Number ${number} is ${result ? 'Prime' : 'Not Prime'}`);
})
```

#### Why it Works:
1. Worker threads run in parallel, keeping the main event loop free
2. Each request is handled in its own thread
3. Significant performance boost


### - Use Clustering to Distribute Load
- **Best for scaling your Node.js app across multiple CPU cores**

- By **default**, **Node.js runs on a single CPU core**, meaning **it can’t utilize modern multi-core processors**. **Clustering allows your app to spawn multiple processes, distributing the load**.

#### Implementing Clustering

1. Modify your server.js file:
```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Prime Checking API');
  }).listen(8000);
}
```

### Why it Works:
1. Each worker runs on a separate CPU core
2. Multiple requests are processed simultaneously
3. Improved scalability without significant code changes