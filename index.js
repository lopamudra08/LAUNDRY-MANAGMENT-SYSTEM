const mysqlConnection = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const encoder = bodyparser.urlencoded();
const app = express();

app.use(express.static('public'));
app.use("/css", express.static("css"));
app.use("/images", express.static("images"));
app.use("/javascript", express.static("javascript"));


//database connection
const connection = mysqlConnection.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "lms",
});

//database connection testing
connection.connect(function (error) {
  if (error) {
    console.error("error connection" + error.stack);
    return;
  } else {
    console.log("database connected");
  }
});

app.get("/request",function(req,res){
  res.sendFile(__dirname + "/main/RequestForm.html");
})

//Login Module
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/main/LoginPage.html");
});

app.get("/dashboard", function (req, res) {
  res.sendFile(__dirname + "/main/dashboard.html");
});

//Register Module
app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/main/RegistrationPage.html");
});

//success massage
app.get("/success", function (req, res) {
  res.sendFile(__dirname + "/main/SuccessPage.html");
});

// Start the server
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// Handle the POST request to the root URL ("/")
app.post("/", encoder, function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  connection.query(
    "SELECT * FROM loginusers WHERE email = ? AND password = ? ",
    [email, password],
    function (error, results, fields) {
      console.log(results);
      if (results.length > 0) {
        res.redirect("/dashboard");
      } else {
        res.redirect("/");
      }
      res.end();
    }
  );

});

app.post("/register", encoder, function (req, res) {
  var full_name = req.body.full_name;
  var email = req.body.email;
  var password = req.body.password;
  var username = req.body.username;
  var phone = req.body.phone;
  connection.query(
    "insert  into loginusers (full_name,email,password,username,phone) values (?,?,?,?,?)",
    [full_name, email, password, username, phone],
    function (error, results, fields) {
      console.log(results);
      if (results.affectedRows > 0) {
        res.redirect('/success');
      } else {
        res.redirect("/register");
      }
      res.end();
    }
  );
});

app.post('/success', encoder, function (req, res) {
  res.redirect('/');
});
