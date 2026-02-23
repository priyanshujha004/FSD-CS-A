import http from 'http';
import os from 'os';

const port = 5001;

const users = [{id:1,name:"John",email:"John.gmail.com"},
    {id:2,name:"Jane",email:"Jane.gmail.com"},
    {id:3,name:"Doe",email:"Doe.gmail.com"}
]; // Sample User Data

const server = http.createServer((req,res)=>{
    const url = req.url; 

    if(url=="/" && req.method=="GET"){ // Simple Home Page Route
        res.end("<h1> Home Page </h1>");
    }

    else if(url=="/users" && req.method=="GET"){ // Route to Get All Users
        res.end(JSON.stringify(users));
    }

    else if(url.startsWith("/users/") && req.method=="GET"){ // Route to Get User by ID
        const id = parseInt(url.split("/")[2]);
        const user = users.find(u => u.id === id); // Not use Filter Function because it returns an empty array when no condition matches. 
        // Find Function returns undefined when no condition matches, which is easier to Handle in this Case.
        if(!user) {
            res.statusCode = 400;
            console.log(`User with id ${id} not found`);
            return res.end(`User with id ${id} not found`);
        }
        res.end("<h1> User Details </h1>" + JSON.stringify(user));
    }

    else if(url=="/createuser" && req.method=="POST"){ // Route to Create a New User
        let body = "";
        req.on("data",(chunk)=>{
            body += chunk;
        })
        req.on("end",()=>{
            const {name,email} = JSON.parse(body);
            const newUser = {
                id: users.length + 1,
                name,
                email
            }
            users.push(newUser);
            console.log(`User Created Successfully: ${JSON.stringify(newUser)}`);
            res.end(`User Created Successfully: ${JSON.stringify(newUser)}`);
        })
    }

    else if(url.startsWith("/users/") && req.method=="PUT"){ // Route to Update User by ID
        res.end("<h1> Update User Page </h1>"); 
    }

    else if(url.startsWith("/users/") && req.method=="DELETE"){ // Route to Delete User by ID
        const id = parseInt(url.split("/")[2]);
        const userIndex = users.findIndex(u => u.id === id);
        if(userIndex === -1) {
            res.statusCode = 400;
            console.log(`User with id ${id} not found`);
            return res.end(`User with id ${id} not found`);
        }
        users.splice(userIndex,1);
        console.log(`User with id ${id} Deleted Successfully`);
        res.end(`User with id ${id} Deleted Successfully`);
    }
 
    else { // Route for Handling Undefined Routes
        res.statusCode = 404;
        res.end("Page Not Found");
    }
})

server.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
})