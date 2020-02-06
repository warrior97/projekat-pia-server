const express = require('express');
const router = express.Router();
const fs = require('fs');
const FILES = require('../../constants');
const crypto = require('crypto');
const uuid4 = require('uuid/v4');


const authenticateRegistration = () => {
    return true;
}



//login logic
router.get('/', (req, res, next) => {
    /*  Do stuff */
    let rawData = fs.readFileSync(FILES.USERS)
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


//Login logic
router.post('/', (req, res, next) => {
    /*  Do stuff */

    let { username, password } = req.body;
    console.log(username, password);

    let rawData = fs.readFileSync(FILES.USERS)
    let users = JSON.parse(rawData);
    users = users.map(x => {
        let { id, ...y } = x;
        return y;
    });
    let user = users.find(x => x.username == username);
    console.log(password)
    password = crypto.createHash('sha512').update(password).digest('hex');
    console.log(password);
    let didLog = users.find(x => x.password == password && x.username == username);
    let success = (user && didLog) ? true : false;
    let { password: password1, ...y } = user;
    res.send({
        success,
        message: didLog ? 'Good login' : 'Bad login!',
        user: didLog ? y : undefined
    })
})



//register
router.put('/', (req, res, next) => {
    /*  Do stuff */
    let data = req.body;
    if (!('firstname' in data &&
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

    }

    let rawDataUsers = fs.readFileSync(FILES.USERS)
    let users = JSON.parse(rawDataUsers);

    rawDataUsers = fs.readFileSync(FILES.REQUESTS)
    users.push(...JSON.parse(rawDataUsers));

    if (users.find(x => {
        console.log(x)
        return x.username == data.username
    })) {
        res.status(500).send({
            success: false,
            message: 'User already exists!'
        });
        return;
    }
    console.log(data);
    let { firstname, lastname, username, password, dateofbirth, placeofbirth, jmbg, phone, picture, type } = req.body;
    let userParam = req.params.username;
    let rawData = fs.readFileSync(FILES.REQUESTS)
    let requests = JSON.parse(rawData);
    let toWrite = {
        id: uuid4(),
        firstname,
        lastname,
        username,
        password: crypto.createHash('sha512').update(password).digest('hex'),
        dateofbirth,
        placeofbirth,
        jmbg,
        phone,
        type: type ? type : 'user',
        picture
    };
    if (authenticateRegistration(toWrite)) {

        requests.push(toWrite);
        fs.writeFileSync(FILES.REQUESTS, JSON.stringify(requests));
        res.status(200).send({
            success: true,
            message: 'Registration submitted!'
        });

    } else {
        res.status(500).send({
            success: false,
            message: 'Data bad!'
        });
    }


})


//approve or decline request
//true - approve, false - decline
router.patch('/', (req, res, next) => {
    let { username, type } = req.body;

    let rawDataRequests = fs.readFileSync(FILES.REQUESTS)
    let requests = JSON.parse(rawDataRequests);


    let request = requests.find(x => x.username == username);

    if (!request) {
        res.status(500).send({
            success: false,
            message: 'Username does not exist!'
        })
        return;
    }

    if (type) {

        let rawDataUsers = fs.readFileSync(FILES.USERS)
        let users = JSON.parse(rawDataUsers);


        users.push(request);

        fs.writeFileSync(FILES.USERS, JSON.stringify(users));
    }
    requests = requests.filter(x => x.username != username);

    fs.writeFileSync(FILES.REQUESTS, JSON.stringify(requests));

    res.send({
        success:true,
        message: 'User updated succesfully!',
        username: username
    })

})

module.exports = router;