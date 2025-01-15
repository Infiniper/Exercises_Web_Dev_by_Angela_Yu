import express from 'express';
const app = express();
var port= 3000;

app.get("/", (req,res)=>{
    res.send("Hello");
})
app.get("/contact", (req,res)=>{
    res.send("You can contact me on my G-mail ID: infiniper@gmail.com");
})
app.get("/about", (req,res)=>{
    res.send("Hi! I am Vishwajeet Singh. How are you?");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})