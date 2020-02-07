const express= require('express');
const app = express();
const bodyParser=require('body-parser');
const userRoutes= require('./api/routes/users');
const surveyRoutes=require('./api/routes/surveys')
const requestRouter=require('./api/routes/requests');
const responseRouter= require('./api/routes/responses')
app.use(bodyParser.json());

app.use('/api/users',userRoutes);
app.use('/api/surveys',surveyRoutes);
app.use('/api/requests',requestRouter);
app.use('/api/responses',responseRouter);


module.exports=app;
