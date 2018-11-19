const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

//assign middleware
app.use(bodyParser.json());
//app.use(cookieParser());



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