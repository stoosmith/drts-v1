const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
//may also be able to used npm install bcrypt instead of bcrypt-nodejs (not sure what the difference is tbh)

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
const SALT_I = config.SALT_I;

//assign middleware
app.use(bodyParser.json());
app.use(cookieParser());


//test db connection
//console.log(db.select().table('users'));
//or
//db.select().table('users').then(data => {
//    console.log(data);
//})

//this should really be sent via https as it contains the password
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    console.log(SALT_I);

    //bcrypt.hash(password, null,null, function(err, hash) {
    bcrypt.hash(password, 10, null, function(err, hash) {
        //if(err) return next(err);
        console.log(hash);

        db('users')
            //returning() is a knex function that will generate the fields you want to return.
            .returning('*')
            .insert({
                username: username, 
                email: email, 
                pw_hash: hash,
                created: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => res.status(400).json(err)); //OR .catch(err => res.status(400).json('unable to register'))
    
        })
})

/*a user profile*/
app.get('/api/profile/:id', (req,res) => {
    const { id } = req.params;
    //can use {id} because the property and value are the same otherwise ({id: id})
    db.select().from('users').where({id}) 
        .then(user => {
            if (user.length){
                res.json(user[0]);
            } else {
                res.status(400).json('no user found');
            }            
        })
        .catch(err => res.status(400).json(err)); //OR .catch(err => res.status(400).json('user not found'))
})

/*list of 'active?' Leagues*/
app.get('/api/leagues/', (req,res) => {
    //req could be used for query params for ordering, filtering, qty-returned etc.
    db.select().from('leagues') //need to add the .where('active_flag',true)
        .then(leagues => {
            if (leagues.length){
                res.json(leagues);
            } else {
                res.status(400).json('No active leagues');
            }
        })
        .catch(err => res.status(400).json(err));
})




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