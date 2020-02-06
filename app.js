const express= require('express');
const app = express();
const bodyParser=require('body-parser');
const userRoutes= require('./api/routes/users');
const surveyRoutes=require('./api/routes/surveys')
app.use(bodyParser.json());

app.use('/api/users',userRoutes);
app.use('/api/surveys',surveyRoutes);



module.exports=app;
