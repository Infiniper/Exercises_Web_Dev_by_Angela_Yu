import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
var port =3000;
// const weekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d=new Date();
let dayIndex = d.getDay();

app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    console.log("dayIndex: ", dayIndex);
    res.render("index.ejs",
        {
            dayIndex:dayIndex
        }
    );
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})