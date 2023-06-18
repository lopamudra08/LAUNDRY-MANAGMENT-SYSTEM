const mysqlConnection = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const encoder = bodyparser.urlencoded();
const app = express()

app.use("/css", express.static("css"));


//database connection 
const connection = mysqlConnection.createConnection(
    {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "lms"

    }
)
//database connection testing
connection.connect(function (error) {
    if (error) {
        console.error("error connection" + error.stack);
        return;
    } else {
        console.log("database connected");
    }

})

//Login Module
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/main/LoginPage.html")
})

// Handle the POST request to the root URL ("/")
app.post("/", encoder, function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query("SELECT * FROM loginusers WHERE email = ? AND password = ? ", [email, password], function (error, results, fields) {
        console.log(results);
        if (results.length > 0) {
            res.redirect("/dashboard"); // Use res.redirect instead of req.redirect
            
            
          } else {
            res.redirect("/");
        }
        res.end();
    });
});

app.get("/dashboard", function(req,res){
    res.sendFile(__dirname + "/main/dashboard.html")
})



// Start the server
app.listen(1000, function () {
    console.log("Server is running on port 1000");
});

//Register Module
app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/main/RegistrationPage.html")
});

app.post("/register", encoder, function (req, res) {

    var full_name = req.body.full_name;
    var email = req.body.email;
    var password = req.body.password;
    var cnfpassword = req.body.cnfpassword;
    var phone = req.body.phone;

    connection.query("insert  into loginusers (full_name,email,password,cnfpassword,phone) values (full_name = ?, email = ?, password = ?, cnfpassword = ?, phone = ?)", [full_name, email, password, cnfpassword, phone], function (error, results, fields) {
        console.log(results);
        if (results.length > 0) {
            res.redirect("/register"); // Use res.redirect instead of req.redirect
        } else {
            res.redirect("/");
        }
        res.end();

    })
})