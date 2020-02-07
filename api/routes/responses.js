const express = require('express');
const router = express.Router();

const fs = require('fs');
const FILES = require('../../constants');
const crypto = require('crypto');
const uuid4 = require('uuid/v4');

router.get('/', (req, res, next) => {

    /*  Do stuff */
    let rawData = fs.readFileSync(FILES.RESPONSES)
    let surveys = JSON.parse(rawData);
    surveys = surveys.map(x => {
        // let { id, ...y } = x;
        return x;
    })

    res.send({
        success: true,
        responses: surveys
    })


})
//Get data for single user
router.get('/:username', (req, res, next) => {
    /*  Do stuff */
    let userParam = req.params.username;
    let rawData = fs.readFileSync(FILES.RESPONSES)
    let surveys = JSON.parse(rawData);
    surveys = surveys.map(x => {
        // let { id, ...y } = x;
        return x;
    });
    surveys = surveys.filter(x => x.username == userParam);
    let success = survey ? true : false
    res.send({
        success,
        responses:surveys
    })

})


//register
router.put('/', (req, res, next) => {
    /*  Do stuff */
    let data = req.body;
    /*if (!('firstname' in data &&
        'lastname' in data &&
        'username' in data &&
        'password' in data &&
        'dateofbirth' in data &&
        'placeofbirth' in data && 'jmbg' in data && 'phone' in data && 'picture' in data)) {
        console.log('Data Missing!');
        console.log(data)
        res.status(501).send({
            success: false,
            message: 'Required fields missing'
        });
        return;

    }*/

    let rawDataSurveys = fs.readFileSync(FILES.RESPONSES)
    let surveys = JSON.parse(rawDataSurveys);
    let datetime=new Date().getTime()/1000;
    let toWrite = {
        id: uuid4(),
        ...data,
        datetime
    };


    surveys.push(toWrite);
    fs.writeFileSync(FILES.RESPONSES, JSON.stringify(surveys));
    console.log('FINAL')
    res.status(200).send({
        success: true,
        message: 'Survey added!!',
        response: toWrite
    });

})
module.exports=router