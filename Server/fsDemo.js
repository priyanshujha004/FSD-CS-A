// Understaing File System (fs) Module in Node.js
// Synchronous Methods 

// import fs from "fs";

// const data=fs.readFileSync("newdata.txt","binary"); // Reading Data from data.txt File Synchronously
// console.log("Written Data : ", data); // Logging the Read Data to the Console

// const newData = "This is New Data"; // New Data to be Written to the File
// fs.writeFileSync("data.txt", newData);
// console.log("Overwriten Data : ", data); // Logging the Write Operation to the Console

// fs.appendFileSync("data.txt",newData); // Appending New Data to the File Synchronously
// console.log("Appended Data : ", data); // Logging the Append Operation to the Console 

// fs.renameSync("data.txt","newdata.txt"); // Renaming the File Synchronously
// fs.unlinkSync("newdata.txt"); // Deleting the File Synchronously

// Asynchronous Methods 

// 1. Works with Callbacks
// fs.readFile("data.txt","UTF-8",(err,data)=>{
//     if(data){
//         console.log("Read Data : ",data); // Logging the Read Data to the Console
//     }
//     else{
//         console.log("Error : ", err.message);
//     }
// });

// 2. Works with Promises (fs.promises API)
import fs from "fs/promises";
async function loadUser(){
    try{
        const data = await fs.readFile("users.json","UTF-8"); // Reading Data from user.json File Asynchronously
        console.log("User Data : ", data); // Logging the Read Data to the Console
    }
    catch(err){
        console.error("Error : ", err.message);
    }
}
function saveUser(user){
    try{
        fs.writeFile("users.json",user)
    }
    catch{
        console.error("Error : ", err.message);
    }
}
loadUser();
saveUser("Ramit Naik");
loadUser();


// 3. Works with Async/Await (fs.promises API)


