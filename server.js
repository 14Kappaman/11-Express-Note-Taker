const express = require("express");
const { sendFile, json } = require("express/lib/response");
const path = require("path");
const morgan = require ("morgan");
const fs = require("fs");;
const { resolve } = require("path");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(morgan('tiny'))

app.get("/notes",(req,res)=>{
    res.sendFile("./public/notes.html",{
        root: path.resolve(__dirname,".")
    })
})


app.post("/api/notes",(req,res)=>{
    let data = fs.readFileSync(path.resolve(__dirname,"db/db.json")).toString()
    let saveNotes = JSON.parse(data)
    let notetoSave = {
        id: saveNotes.length, 
        title: req.body.title, 
        text: req.body.text
    }
    saveNotes.push(notetoSave)
    let datatoSave = JSON.stringify(saveNotes)
    console.log(datatoSave)
    fs.writeFileSync(path.resolve(__dirname,"db/db.json"),datatoSave)
    res.sendStatus(200)

   console.log("saved notes")
})


app.delete("/api/notes/:id",(req,res)=>{
    let data = fs.readFileSync(path.resolve(__dirname,"db/db.json")).toString()
    let saveNotes = JSON.parse(data)
        saveNotes = saveNotes.filter(note => {
            console.log(note.id)
            console.log(req.params)
        return note.id != parseInt(req.params.id);
    })
    console.log(req.body)
    let datatoSave = JSON.stringify(saveNotes)
    fs.writeFileSync(path.resolve(__dirname,"db/db.json"),datatoSave)
res.sendStatus(200)
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
