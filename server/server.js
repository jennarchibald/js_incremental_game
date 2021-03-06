const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.listen(port, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
