const express = require("express");
// const cors = require("cors");
const path = require("path");
// const bodyParser = require('body-parser');

// import .env variables
// require("dotenv-safe").load({
//   path: path.join(__dirname, "./.env"),
//   sample: path.join(__dirname, "./.env.example")
// });


const app = express();
let port = process.env.PROD_PORT || 3001;

// app.use(bodyParser.urlencoded({ extended: true }));


// app.use(bodyParser.json());

// app.use(cors());

app.use(express.static(path.join(__dirname, "build")));


app.listen(port, () => {
    console.log("Server is running on port", port);
});
