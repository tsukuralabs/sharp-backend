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
    testFunction: secondFunction

};

// other ways of exporting
// module.exports.handler = requestHandler;
// module.exports.otherFunction = secondFunction;

exports.handler = requestHandler;
exports.testFunction = secondFunction;
