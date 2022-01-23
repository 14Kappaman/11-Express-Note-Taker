const express = require("express");
const { sendFile, json } = require("express/lib/response");
const path = require("path");
const fs = require("fs");
const { resolve } = require("path");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/notes",(req,res)=>{
    res.sendFile("./public/notes.html",{
        root: path.resolve(__dirname,".")
    })
})


app.post("/api/notes",(req,res)=>{
    let data = fs.readFileSync(path.resolve(__dirname,"db/db.json")).toString()
    let saveNotes = JSON.parse(data)
    saveNotes.push(req.body)
    let datatoSave = JSON.stringify(saveNotes)
    fs.writeFileSync(path.resolve(__dirname,"db/db.json"),datatoSave)

   console.log("saved notes")
})


app.delete("/api/notes",(req,res)=>{
    let data = fs.readFileSync(path.resolve(__dirname,"db/db.json")).toString()
    let saveNotes = JSON.parse(data)
    saveNotes.push(req.body)
    let datatoSave = JSON.stringify(saveNotes)
    fs.writeFileSync(path.resolve(__dirname,"db/db.json"),datatoSave)

   console.log("saved notes")
})

app.get("/api/notes",(req,res)=>{
   res.sendFile(path.resolve(__dirname,"db/db.json"))
})
//app.get("*",(req,res)=>{
    
//})

app.use(express.static("public"));
app.listen(port, OnListening);
function OnListening(){
    console.log ("application is running")
}
