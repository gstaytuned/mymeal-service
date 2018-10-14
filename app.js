const Database = require('./database');
var express = require('express'), bodyParser = require('body-parser');
var app = express()
require('random-token');

initApp()
app.post('/register', function (req, res) {
    var db = new Database();

    var post = {
        username: req.body.username,
        password: req.body.password,
        cust_name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        tel_no: req.body.tel_no,
        token: genTokens()
    }

    db.insertCustomer(post).then(() => {
        res.status(200).send({ message: "User created" })
    }).catch((error) => {
        res.status(400)
    })

});

app.post('/login', function (req, res) {
    var db = new Database();
    var post = {
        username: req.body.username,
        password: req.body.password
    }

    db.Login(post).then((result) => {
        console.log(result.result.cust_name)
        res.status(200).send({
            message: "Login success",
            cust_name: result.result.cust_name,
            cust_id: result.result.cust_id,
            token: result.result.token
        })
    }).catch((error) => {
        res.status(400).send({ message: error })
    })

});

app.post('/token', function (req, res) {
    var db = new Database();
    var post = {
        token: req.body.token,
    }

    db.Token(post).then((result) => {
        console.log(result)
        res.status(200).send({ message: "Login success", cust_name: result.result.cust_name, cust_id: result.result.cust_id })
    }).catch((error) => {

        res.status(400).send({ message: error })
    })

});

app.post('/getUser', function (req, res) {
    var db = new Database();
    var post = {
        cust_id: req.body.cust_id,
    }

    db.getUser(post).then((result) => {
        res.status(200).send({ message: "Login success",address: result.result[0].address, cust_name: result.result.cust_name, cust_id: result.result.cust_id })
    }).catch((error) => {

        res.status(400).send({ message: error })
    })

});

async function initApp() {
    await startService()

}

function startService() {
    var server = app.listen(3000, function () {

        var host = server.address().address
        var port = server.address().port

        console.log(" app listening at http://%s:%s", host, port)
    })
    app.use(express.json());
}

function genTokens() {
    var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
    return token = randomToken(30)
}


app.post('/getFoodList', function (req, res) {
    var db = new Database();
    var post = {
        cust_id: req.body.cust_id
    }

    db.foodList(post).then((result) => {

        res.status(200).send({  
            food_list: result.result
        })
    }).catch((error) => {
        res.status(400).send({ message: error })
    })

});

app.post('/buy', function (req, res) {
    var db = new Database();
    var post = {
        cust_id: req.body.cust_id,
        selling_id:req.body.selling_id,
        amount:req.body.amount
    }

    db.updateSelling(post).then((result) => {
        db.insertTransaction(post).then((result) => {
        
            res.status(200).send({message:"Success"})
        }).catch((error) => {
            res.status(400).send({ message: error })
        })
    }).catch((error) => {
        res.status(400).send({ message: error })
    })

});

app.post('/sell', function (req, res) {
    var db = new Database();
    var post = {
        cust_id: req.body.cust_id,
        food_name:req.body.food_name,
        detail:req.body.detail,
        amount:req.body.amount,
        quantity:req.body.quantity,
        food_img:req.body.food_img
    }

    db.insertFood(post).then((result) => {
        db.getLastInserted(post).then((result) => {
            post.food_id = result[0].food_id
            db.insertSelling(post).then((result) => {
                
                res.status(200).send({message:"Success"})
            }).catch((error) => {
                res.status(400).send({ message: error })
            })
        
            
        }).catch((error) => {
            res.status(400).send({ message: error })
        })
    }).catch((error) => {
        res.status(400).send({ message: error })
    })

});

app.post('/mySaleList', function (req, res) {
    var db = new Database();
    var post = {
        cust_id: req.body.cust_id
    }

    db.mySaleList(post).then((result) => {

        res.status(200).send({  
            food_list: result.result
        })
    }).catch((error) => {
        res.status(400).send({ message: error })
    })

});

app.post('/getHistoryBuy', function (req, res) {
    var db = new Database();
    var post = {
        cust_id: req.body.cust_id
    }

    db.getHistoryBuy(post).then((result) => {

        res.status(200).send({  
            history_list: result.result
        })
    }).catch((error) => {
        res.status(400).send({ message: error })
    })

});

app.post('/getHistorySell', function (req, res) {
    var db = new Database();
    var post = {
        cust_id: req.body.cust_id
    }

    db.getHistorySell(post).then((result) => {

        res.status(200).send({  
            history_list: result.result
        })
    }).catch((error) => {
        res.status(400).send({ message: error })
    })
});
app.post('/getFeedBack', function (req, res) {
    var db = new Database();
    var post = {
        food_id: req.body.food_id
    }

    db.getFeedBack(post).then((result) => {
        res.status(200).send({  
            feed_back: result.result
        })
    }).catch((error) => {
        res.status(400).send({ message: error })
    })});

app.post('/review', function (req, res) {
        var db = new Database();
        var post = {
            food_id: req.body.food_id,
            message: req.body.message
        }
    
        db.review(post).then((result) => {
            res.status(200).send({  
                message: "success"
            })
        }).catch((error) => {
            res.status(400).send({ message: error })
        })});