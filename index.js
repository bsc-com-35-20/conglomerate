//importing 
const express = require ('express')
const app = express()
const mysql = require('mysql')
app.use(express.json());


const {posts} =require('./src/posts/post.model')
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'chisomo',
    password: '12345678',
    database: 'conglomerate'
});

//feature 1
//code to create a new user
app.post('/users', (req,res)=>{
    const First_name = req.body.First_name;
    const Last_name = req.body.Last_name;
    const Email_address= req.body.Email_address;
    const phone_number = req.body.phone_number;
    const sex = req.body.sex;

    dbConnection.query('INSERT INTO users (First_name, Last_name, Email_address, phone_number, sex) values (?,?,?,?,?)', [First_name, Last_name, Email_address, phone_number, sex], (err,result)=>{
        if (err){
            console.log(err)
        }else{
            res.send("posted")
        }
    })

})

//feature 2
//get all users
app.get('/users', (req,res)=>{
    dbConnection.query('SELECT * FROM users', function(err,result){
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})


app.listen(3000,function(){
    console.log('Conglomerate listening on port 3000')

    dbConnection.connect(function(err){
        if (err) throw err;
        console.log("connected to MySQL");
    });
    
})
