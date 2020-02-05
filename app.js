const express= require('express');
const app = express();
const bodyParser=require('body-parser');
const userRoutes= require('./api/routes/users');
app.use(bodyParser.json());

app.use('/api/users',userRoutes);



module.exports=app;
