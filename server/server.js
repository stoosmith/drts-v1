const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const knex = require('knex');

// config useful for heroku as you can access NODE_ENV
const config = require('./config/config').get(process.env.NODE_ENV);

//knex connection host can be auto based on ENV: process.env.PG_CONNECTION_STRING
//PORT is 5432
const db = knex({
    client: 'pg',
    connection: {
      host : config.DATABASE,
      user : 'postgres',
      password : 'test',
      database : 'drtsdb'
    }
})

const app = express();

//assign middleware
app.use(bodyParser.json());
app.use(cookieParser());


//test db connection
//console.log(db.select().table('users'));
//or
//db.select().table('users').then(data => {
//    console.log(data);
//})

app.post('/api/register', (req, res) => {
    const { username, email, pw_hash } = req.body;
    db('users').insert({
        username: username, 
        email: email, 
        pw_hash: pw_hash,
        created: new Date()
    }).then(console.log)
    //res.json(res);
})
/*
// GET - single book//
app.get('/api/getBook', (req,res)=>{
    let id = req.query.id;

    Book.findById(id,(err, doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
        })
})
*/


app.get('/', (req, res) => {
    res.send('this is working');
})





const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log('SERVER RUNNING ON PORT: ' + port)
})

/*route thoughts

/ - res = this is working
/signin - Send(req):POST = Return(res):success/fail
/register - req:POST = res:user
/user/:userid -req:GET = res:user


*/