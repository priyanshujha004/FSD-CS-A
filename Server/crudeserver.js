import http from 'http';
import os from 'os';

const port = 5001;

const users = [
    {
        id:1,
        name:"John",
        email:"John.gmail.com"
    },
    {   id:2,
        name:"Jane",
        email:"Jane.gmail.com"
    },
    {   id:3,
        name:"Doe",
        email:"Doe.gmail.com"
    }
]; // Sample User Data

const server = http.createServer((req,res)=>{
    const url = req.url; 

    if(url=="/" && req.method=="GET"){ // Simple Home Page Route
        res.statusCode = 200;
        res.end("<h1> Home Page </h1>");
    }

    else if(url=="/users" && req.method=="GET"){ // Route to Get All Users
        res.statusCode = 200;
        res.end(JSON.stringify(users));
    }

    else if(url.startsWith("/users/") && req.method=="GET"){ // Route to Get User by ID
        const id = parseInt(url.split("/")[2]);
        const user = users.find(u => u.id === id); // Not use Filter Function because it returns an empty array when no condition matches. 
        // Find Function returns undefined when no condition matches, which is easier to Handle in this Case.
        if(!user) {
            res.statusCode = 400;
            console.log(`User ID ${id} Not Found`);
            return res.end(`User ID ${id} Not Found`);
        }
        res.end("<h1> User Details </h1>" + JSON.stringify(user));
    }

    else if(url=="/createuser" && req.method=="POST"){ // Route to Create a New User
        let body = "";
        req.on("data",(chunk)=>{
            body += chunk;
        })
        req.on("end",()=>{
            const data = JSON.parse(body);
            if(data.name==null || data.email==null){
                res.statusCode = 400;
                console.log("Invalid Data");
                return res.end("Invalid Data");
            }
            const userIndex = users.findIndex(u => u.email === data.email);
            if(userIndex!=-1){
                res.statusCode = 400;
                console.log("User With This Email Already Exists");
                return res.end("User With This Email Already Exists");
            }
            const newUser = {
                id: users.length + 1,
                // id: Date.now(), // Using Timestamp as Unique ID for Simplicity
                name: data.name,
                email: data.email
            }
            users.push(newUser);
            res.statusCode = 201;
            console.log(`User Created Successfully : ${JSON.stringify(newUser)}`);
            res.end("User Created Successfully : " + (newUser.id));
        })

    } 
    else if(url.startsWith("/users/") && req.method=="PATCH"){ // Route to Update User by ID
        const id = parseInt(url.split("/")[2]);
        const userIndex = users.findIndex(
            u=> u.id===id
        )
        let body="";
        req.on("data",(chunk)=>{
            body += chunk;
        })
        req.on("end",()=>{
            const data = JSON.parse(body);
            if(userIndex === -1) {
                res.statusCode = 400;
                console.log(`User ID ${id} Not Found`);
                return res.end(`User ID ${id} Not Found`);
            }
            users[userIndex] = {...users[userIndex],...data}; // Using Spread Operator to Update Only the Provided Fields
            res.statusCode = 200;
            console.log(`User ID ${id} Updated Successfully`);
            res.end(`User ID ${id} Updated Successfully`);
        })
        res.end("<h1> Update User Page </h1>"); 
    }

    else if(url.startsWith("/users/") && req.method=="DELETE"){ // Route to Delete User by ID
        
        // Add Functionality to Check if User Exists or Not Before Deleting. If User Does Not Exist, Send Appropriate Response to Client.
        const id = parseInt(url.split("/")[2]);
        const userIndex = users.findIndex(u => u.id === id);
        res.setHeader("Content-Type","application/json");
        if(userIndex === -1) {
            res.statusCode = 400;
            console.log(`User ID ${id} not found`);
            return res.end(`User ID ${id} not found`);
        }
        users.splice(userIndex,1); // Using Splice Method to Remove the User from the Array Based on the Found Index
        res.statusCode = 200;
        console.log(`User ID ${id} Deleted Successfully`);
        res.end(`User ID ${id} Deleted Successfully`);
    }
 
    else { // Route for Handling Undefined Routes
        res.statusCode = 404;
        res.end("Page Not Found");
    }
})

server.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
})