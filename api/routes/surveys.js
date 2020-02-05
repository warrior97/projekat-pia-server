const express = require('express');
const router = express.Router();

const fs = require('fs');
const FILES = require('../../constants');
const crypto = require('crypto');
const uuid4 = require('uuid/v4');

router.get('/',(req,res,next)=>{

     /*  Do stuff */
     let rawData = fs.readFileSync(FILES.SURVEYS)
     let users = JSON.parse(rawData);
     users = users.map(x => {
         let { id, password, ...y } = x;
         return y;
     })
 
     res.send({
         success: true,
         users: users
     })
 

})


//Get data for single user
router.get('/:username', (req, res, next) => {
    /*  Do stuff */
    let userParam = req.params.username;
    let rawData = fs.readFileSync(FILES.USERS)
    let users = JSON.parse(rawData);
    users = users.map(x => {
        let { id, password, ...y } = x;
        return y;
    });
    let user = users.find(x => x.username == userParam);
    let success = user ? true : false
    res.send({
        success,
        user
    })

})
