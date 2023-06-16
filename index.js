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
    res.sendFile(__dirname + "/LoginPage.html")
})

// Handle the POST request to the root URL ("/")
app.post("/", encoder, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var cnfpassword = req.body.cnfpassword;
    connection.query("SELECT * FROM loginusers WHERE user_name = ? AND password = ? AND cnfpassword = ? ", [username, password, cnfpassword], function (error, results, fields) {
        console.log(results);
        if (results.length > 0) {
            res.redirect("/dashboard"); // Use res.redirect instead of req.redirect
            // Set up the /dashboard route
            app.get("/dashboard", function (req, res) {
                res.sendFile(__dirname + "/dashboard.html");
            });

        } else {
            res.redirect("/");
        }
        res.end();
    });
});

// Start the server
app.listen(1 000, function () {
    console.log("Server is running on port 3000");
});

//Register Module
app.get("/Register", function (req, res) {
    res.sendFile(_dirname + "/RegistrationPage.html")
});

app.post("/", encoder, function (req, res) {
    var password = req.body.password;
    var email = req.body.email;
    var cnfpassword = req.body.cnfpassword;
    var full_name = req.body.full_name;
    var phone = req.body.phone;
    connection.query("insert into loginusers (email , password , full_name , cnfpassword, phone ) values (email=? , full_name= ? , cnfpassword =? , phone=? , password= ?  ) ", [email, password, cnfpassword, full_name, phone], function (error, results, fields) {
        if (results.length > 0) {
            res.redirect("/register"); // Use res.redirect instead of req.redirect
        } else {
            res.redirect("/");
        }
        res.end();

    })
})