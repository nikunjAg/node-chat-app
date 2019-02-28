const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;

// This resolves the path directly passed into its join method
const publicPath = path.join(__dirname, '../public');
var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});