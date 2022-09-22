const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql')


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "@Sanjay13@",
    database: "myapp", 
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get',(req, res) => {
    const sqlSelect = "SELECT * FROM login_data;"
    db.query(sqlSelect, (err, result) =>{
        res.send(result)
    })
})

app.post('/api/insert/', (req, res) => {
    const id = req.body.id
    const userName = req.body.userName
    const password = req.body.password
    const sqlInsert = "INSERT INTO myapp.login_data (id, username, password) VALUES (?, ?, ?);"
    db.query(sqlInsert, [id, userName, password],(err, result) =>{
        res.send(result)
    })
});


app.delete('/api/delete/:userName', (req, res) => {

    const name = req.params.userName
    const sqlDelete = "DELETE FROM myapp.login_data WHERE username = ?;"
    db.query(sqlDelete, name,(err, result) =>{
        if (err) console.log(err)
    })
});

// app.put('/api/update/', (req, res) => {

//     const name = req.body.movieName
//     const review = req.body.movieReview
//     const sqlUpdate = "UPDATE myapp.movie_reviews SET movie_review = ? WHERE movie_name = ?;"
//     db.query(sqlUpdate, [review, name],(err, result) =>{
//         console.log(result)
//     })
    
// });




app.listen('3001', () =>{
    console.log('listenning to port 3001')
})