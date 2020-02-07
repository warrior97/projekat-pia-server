const express = require('express');
const router = express.Router();
const fs = require('fs');
const FILES = require('../../constants');
const crypto = require('crypto');
const uuid4 = require('uuid/v4');



router.get('/',(req,res,next)=>{
    let rawData = fs.readFileSync(FILES.REQUESTS)
    let requests = JSON.parse(rawData);
    requests = requests.map(x => {
        let { id, password, ...y } = x;
        return y;
    })
    console.log('Hello!');
    res.send({
        success: true,
        requests: requests
    })
})
module.exports = router;