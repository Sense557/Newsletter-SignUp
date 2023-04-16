

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res)
{
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/87c07db11f";

    const options = {
        method: "POST",
        auth: "shakti:4ad2785b2576ac2d1c62e908e5de9540-us133"
    }

    const request = https.request(url, options, function(response)
    {

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();


});


app.post("/failure", function(req, res)
{
    res.redirect("/");
});



app.listen(process.env.PORT || 3000, function()
{
    console.log("server started at port 3000");
});



//API Key
//4ad2785b2576ac2d1c62e908e5de9540-us13

//List id
//87c07db11f