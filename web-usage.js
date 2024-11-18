const express = require('express');
const path = require('path');
const {Config, Client} = require('deviceatlas-cloud-nodejs')

const licenceKey = '9f5600503dd7c0358da2f27783960a44';
const app = express();
const config = new Config(licenceKey);
const client = new Client(config);

function displayResults(res, results) {
    res.send(`
<html><head>
  <link rel="stylesheet" href="/static/style.css" />
  <script type="text/javascript" src="https://cs.deviceatlas-cdn.com/dacs.js" async></script>
</head>
<body>
<pre>${results}</pre>
</body>
</html>
`);
}

app.use('/static', express.static(path.join(__dirname, 'static')));
app.get('/', async (req, res) => {
    client.getPropertiesFromRequest(req).then((properties) => {
        displayResults(res, JSON.stringify(properties, null, 2));
    })  .catch((error) => {
        displayResults(res, JSON.stringify(error, null, 2));
    });
});

app.listen(3000);
console.log('Application started on port 3000.');