const express = require('express');
const router = express.Router();

const fs = require('fs');
const FILES = require('../../constants');
const crypto = require('crypto');
const uuid4 = require('uuid/v4');

router.get('/', (req, res, next) => {

    /*  Do stuff */
    let rawData = fs.readFileSync(FILES.SURVEYS)
    let surveys = JSON.parse(rawData);
    surveys = surveys.map(x => {
        // let { id, ...y } = x;
        return x;
    })

    res.send({
        success: true,
        surveys: surveys
    })


})


//Get data for single user
router.get('/:username', (req, res, next) => {
    /*  Do stuff */
    let userParam = req.params.username;
    let rawData = fs.readFileSync(FILES.SURVEYS)
    let surveys = JSON.parse(rawData);
    surveys = surveys.map(x => {
        // let { id, ...y } = x;
        return x;
    });
    surveys = surveys.filter(x => x.username == userParam);
    let success = survey ? true : false
    res.send({
        success,
        surveys
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

    let rawDataSurveys = fs.readFileSync(FILES.SURVEYS)
    let surveys = JSON.parse(rawDataSurveys);

    let toWrite = {
        id: uuid4(),
        ...data
    };


    surveys.push(toWrite);
    fs.writeFileSync(FILES.SURVEYS, JSON.stringify(surveys));
    res.status(200).send({
        success: true,
        message: 'Survey added!!',
        survey: toWrite
    });

})

router.delete('/', (req, res, next) => {
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

    let rawDataSurveys = fs.readFileSync(FILES.SURVEYS)
    let surveys = JSON.parse(rawDataSurveys);

    surveys=surveys.filter(x=>{
        x.id=data.id
    })

    fs.writeFileSync(FILES.SURVEYS, JSON.stringify(surveys));
    res.status(200).send({
        success: true,
        message: 'Survey added!!',
        survey: toWrite
    });

})

module.exports = router;