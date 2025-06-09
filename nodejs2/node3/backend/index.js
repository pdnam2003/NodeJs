const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const port = 3001;


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post("/api/students", (req, res) => {
    const { name, email, phone, dob } = req.body;
    const sql = "INSERT INTO students (name, email, phone, dob) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, phone, dob], (err, results) => {
        if(err){
            console.log("loi khi luu",err);
            res.status(500).json({message: "loi khi luu",err});          
        }else{
                res.json("luu isnh vien thanh cong");
        }   
     });


}); 













app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});