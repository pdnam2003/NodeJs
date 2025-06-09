const mysql = require("mysql");

const db = mysql.createConnection({
host : "localhost",
user : "root",
password : "",
database : "students"
});
db.connect((err)=>{

if(err){
    console.log(err);
    return;
}
console.log("ket noi thanh cong");
                                            
})
module.exports = db;