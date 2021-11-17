const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()

//we use static method for our server to use static files using the public folder
app.use(express.static("public"))


//we use bodyParser to get user input details from a user form
app.use(bodyParser.urlencoded({extended: true}))



//creating a get route to get request from our server
app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/signup.html")
})


//creating a post route to get response to our server
app.post("/",(req, res) =>{
    const firstName = req.body.fName
    const lastName =req.body.lName
    const email = req.body.email
    

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
    }
    const jsonData = JSON.stringify(data)

    const url = "https://us20.api.mailchimp.com/3.0/lists/30c7e5a8c3"
    const options = {
        method: "POST",
        auth: "merlin:86805f65221a4b132070c10401463184-us20"
    }
    const request = https.request(url,options,(response) =>{

        //checking if there is an error in our code and send the result to a success
        //or failure page
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData);
    request.end();

})





//post route for the button to redirect to our home page to try again
app.post("/failure", (req,res) =>{
    res.redirect("/")
})










app.listen(process.env.PORT || 3000,() =>{
    console.log("server is running on port 3000")
})


//API KEY
//86805f65221a4b132070c10401463184-us20

//AUDIENCE ID
//30c7e5a8c3