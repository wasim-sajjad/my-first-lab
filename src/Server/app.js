var express = require('express');

var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');
var _ = require('lodash');

var { mongoose } = require('./db/mongoose');
var { Book } = require('./models/book');
var { User } = require('./models/user');
var { Logger } = require('./models/logger');

var app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    var allowedOrigins = ['http://localhost:4200'];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

//Post route to post the data into database
app.post('/library', (req, res) => {
    console.log(req.body);
    var book = new Book(req.body);

    book.save().then((docs) => {
        res.send(docs);
        //console.log('working here');
    }, (e) => {
        res.status(400).send(e);
    });
});

//get route to get all data
app.get('/library', (req, res) => {
    Book.find().then((library) => {
        console.log('data: ', library);
        res.send(library);
    }, (e) => {
        res.status(400).send(e);
    });
});
//get route to get the data by id
app.get('/library/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Book.findById(id).then((library) => {
        if (!library) {
            return res.status(404).send();
        }
        res.send(library);
    }).catch((e) => {
        res.status(400).send();
    });
});
//Delete route to remove a route by id
app.delete('/library/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Book.findByIdAndRemove(id).then((library) => {
        if (!library) {
            return res.status(404).send();
        }
        res.send(library);
    }).catch((e) => {
        res.status(400).send();
    });
});
//patch route to update the resource by ID
app.patch('/library/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['title', 'description', 'imagePath']);
    if (!ObjectID.isValid) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Book.findByIdAndUpdate(id, { $set: body }, { new: true }).then((library) => {
        if (!library) {
            return res.status(404).send();
        }
        res.send({ library });
    }).catch((e) => {
        res.status(400).send();
    })
});

//login Route will create token at the time registeration user later will be verified with this token
app.post('/login', (req, res) => {
    //console.log('req.body', req.body);
    var user = new User(req.body);
    var body = _.pick(req.body, ['email', 'password']);

    // console.log('body: ', body);

    // var user = new User(req.body);
    // console.log('user: ', user);
    // user.save().then((_user) => {
    //     console.log('user data: ', _user);

    // return _user;

    return User.findOne({ 'email': body.email }).then((_user) => {
        console.log('adfadfadsfadsfa: ', _user);

        //var token =User.generateAuthToken();
        return _user.tokens[0].token;





    }).then((token) => {
        res.send({ token: token });
        // res.header('x-auth', token).send(token);
    }).catch((e) => {
        console.log('error: ', e);
        res.status(400).send(e);
    })
});


//signup Route
app.post('/register', (req, res) => {


    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then((_user) => {
        console.log('content saved');
        return user.generateAuthToken(_user).then(result => {
            res.send({ message: 'User has been created.' });
        }).catch(err => {
            console.log('err: ', err);
            res.send({ message: 'User has not been created.' });
        })

    }).catch((e) => {
        res.status(400).send(e);
    })
});

// var user = new User(req.body);
// console.log('user: ', user);
// user.save().then((_user) => {
//     console.log('user data: ', _user);


// Logger.findByEmail(email).then((user)=>{
//     if(!user){
//         return Promise.reject();
// }
// req.user = user;
// })
//     logger.save().then((result) => {


//  User.generateAuthToken.then((_user) => {
//     console.log('in generate token response: ', _user);
//     res.send({message: 'User has been created.'});
//     console.log('this is working')
// }).catch(err => {
//     res.status(400).send({msg: 'User has not been creaated'});
// })


// res.send(result);

//console.log('working here');
//     }).catch((e) => {
//         res.status(401).send();
//     });
// });



//authentication route
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {

        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
}

app.get('/user/me', authenticate, (req, res) => {
    res.send(req.user);
});



app.listen(3000, () => {
    console.log('Started on port 3000');
});