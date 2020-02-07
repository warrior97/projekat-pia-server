const express= require('express');
const app = express();
const bodyParser=require('body-parser');
const userRoutes= require('./api/routes/users');
const surveyRoutes=require('./api/routes/surveys')
const requestRouter=require('./api/routes/requests');
app.use(bodyParser.json());

app.use('/api/users',userRoutes);
app.use('/api/surveys',surveyRoutes);
app.use('/api/requests',requestRouter);


module.exports=app;
