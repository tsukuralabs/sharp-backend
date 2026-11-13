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
                })

            });

        }
    }
});

let port = 3000;
server.listen(port, () => {
    console.log('Server is listening at', port);
});

