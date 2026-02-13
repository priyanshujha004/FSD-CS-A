import http from 'http'; // Importing The HTTP Module to Create a Server
import os from 'os'; // Importing OS Module to Get System Information 
const port = 4001; // Setting Port Number to 4001
let body = ""; // Variable to Store the Received Data
let data = [];
const server = http.createServer((req,res)=>{
    const url = req.url; // Getting URL from Request Object

    if(url=="/" && req.method=="GET"){
        res.end("<h1> Home Page </h1>");
    }
    else if(url=="/about" && req.method=="GET"){
        res.end("<h1> About Page </h1>");
    }
    else if(url=="/contact" && req.method=="GET"){
        res.end("<h1> Contact Page </h1>");
    }
    else if(url=="/system" && req.method=="GET"){
        const sysData={
            platform: os.platform(),
            arch: os.arch(),
            cp: os.cpus().length,
            mem: (os.totalmem()/1024**3).toFixed(2) + "GB", // Converting Memory from Bytes to Gigabytes
            free: (os.freemem()/1024**3).toFixed(2) + "GB", // Converting Memory from Bytes to Gigabytes
        }
        res.setHeader("Content-Type","application/json"); // Setting Content Type to JSON
        res.end(JSON.stringify(sysData));
    }
    else if(url=="/senddata" && req.method=="POST"){ 
        // Does Not Run because Browser Only reads GET Requests. Use Postman to Test This Route.
        req.on("data",(chunk)=>{
            body = body + chunk;
        })
        req.on("end",()=>{
            res.statusCode = 201;
            console.log(body); // Logging The Received Data to the Console
            data.push(body); // Storing the Received Data in an Array
            res.end(JSON.stringify(data)); // Ending the Request to Send it Back to the Client
        })
    }
    else if(url=="/viewdata" && req.method=="GET"){
        res.end(JSON.stringify(data));
    }
    else if(url=="/getdata" && req.method=="GET"){
        res.end("<h1> Get Data </h1>");
    }

    else{
        res.statusCode = 404; // Setting Status Code To 404
        res.end("Page Not Found");
    }
    res.end(); // Ending the Response to Send it Back to the Client
})
server.listen(port,()=>{
    console.log(`Server is Running on Port ${port}`);
})
