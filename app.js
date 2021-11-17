const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

//the get request makes request to our server
app.get("/",(req,res)=>{

   res.sendFile(__dirname + "/index.html")
    
})

//making a post route for our app
app.post("/", (req, res) =>{

     //creating variables to change some parameters in the endpoint(URL)
 const query = req.body.cityName
 const apiKey = "7c28284fde573608fb945e8b71af1fc6"
 const Unit = "metric"

 // making request to an external api server
 const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ Unit;

 //get request for https
 https.get(url,(response)=>{
     console.log(response)


     //fetching our data from the response and change it into a java script object api using the https.get method
     response.on("data",(data)=>{
         const weatherData =JSON.parse(data)
         const temp = weatherData.main.temp
         const weatherDescription = weatherData.weather[0].description
         const icon =weatherData.weather[0].icon
         const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
         res.write("<p>The weather is currently " + weatherDescription + "</p>")
         res.write("<h1>The temperature in "+ query +" is:" + temp + " degrees Celcius.</h1>")
         res.write("<img src=" + imageURL + ">")
         res.send()
     })
 })

    
})











// our app listen to this port 3000
app.listen(3000,()=>{

    console.log("server is running on port 3000")
})