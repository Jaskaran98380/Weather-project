const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");    //to gather the data of input in the form.
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    //const url="https://api.openweathermap.org/data/2.5/weather?q=London&appid=a1312c5bab09551f2030bf97b06cfe6b&units=metric";
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    const city = req.body.cityname;
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a1312c5bab09551f2030bf97b06cfe6b&units=metric";

    https.get(url,function(response){
        // console.log(response.statusCode);
        response.on("data",function(data){
            // console.log(data);             //this will give data in hexadecimal form.
            const weather=JSON.parse(data);   //will turn json to string of hexadecimal,binary or text and then to javascript object.
            console.log(weather);
            const temp=weather.main.temp;     //look from javascript object in the hyper!
            const description=weather.weather[0].description;
            // console.log(description);
            // console.log(temp);
            const icon=weather.weather[0].icon;   //in open weather app they have images according to some icon like 10d ,5d etc.
            const imageURL="https://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            res.write("<p>The weather forecast in " + city +" is " + description);
            res.write("<h1>The Temperature in " + city + " is " +  temp + " degree celsius</h1>");
            res.write("<img src=" + imageURL +  ">");
    
    
           
            // const object={
            //     name:"jaskaran",
            //     favouriteFood:"chicken"
            // }
            // const opposite=JSON.stringify(object);
            // console.log(opposite);
        
            //the above 6 lines is to show just the opposite that how can we convert javascript object to string!
        })
    })
    // res.send("Server is up and running");   //commenting this because we cannot have 2 or more than 2 res.send in one get method
})

app.listen(3000,function(){
    console.log("server is running on port 3000");
})



