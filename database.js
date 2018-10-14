
var mysql = require('mysql');
class Database {

    insertCustomer(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });


            connection.query('INSERT INTO `customer` (`cust_id`, `cust_name`, `address`, `city`, `tel_no`, `username`, `password`, `token`) VALUES (NULL, "' + post.cust_name + '", "' + post.address + '", "' + post.city + '", "' + post.tel_no + '", "' + post.username + '", "' + post.password + '", "' + post.token + '")', function (error, results) {
                if (error) {
                    reject({ error });
                }

                resolve()
            });
            connection.end();



        })
    }

    Login(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });


            connection.query('SELECT * FROM customer WHERE username = "' + post.username + '" AND password = "' + post.password + '"', function (error, results, fields) {
                if (error)
                    reject(error);

                try {

                    let result = {
                        cust_id: results[0].cust_id,
                        cust_name: results[0].cust_name,
                        token: results[0].token
                    }
                    resolve({ result })

                } catch (err) {
                    reject("Incorrect username or password");
                }

            });

            connection.end();


        })
    }

    Token(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });


            connection.query('SELECT * FROM customer WHERE token = "' + post.token + '"', function (error, results, fields) {
                if (error)
                    reject(error);

                try {
                    let result = {
                        cust_id: results[0].cust_id,
                        cust_name: results[0].cust_name
                    }

                    resolve({ result })

                } catch (err) {

                    reject("Invalid token");
                }

            });

            connection.end();


        })
    }
    foodList(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });
            // connection.query('SELECT name,detail,price,cust_name,food_img INNER JOIN customer ON food.cust_id = customer.cust_id WHERE food.cust_id <> "'+ post.cust_id + '"', function (error, results, fields) {
             //   SELECT * FROM `selling` INNER JOIN customer on selling.cust_id = customer.cust_id  INNER JOIN food on selling.food_id = food.food_id WHERE selling.cust_id <>
            connection.query('SELECT selling.food_id,selling.selling_id,name,detail,price,cust_name,food_img,selling.created_date,quantity FROM `selling` INNER JOIN customer on selling.cust_selling_id = customer.cust_id  INNER JOIN food on selling.food_id = food.food_id WHERE selling.cust_selling_id <> "'+ post.cust_id + '" AND NOT selling.quantity = 0', function (error, results, fields) {
                if (error)
                    reject(error);

                try {
                    var objToJson = results;
                    var response = [];
                    for (var key in results) {
                        response.push(results[key]);
                    }
                    objToJson.response = response;
                    var result = JSON.parse(JSON.stringify(objToJson));
                    resolve({result})

                } catch (err) {

                    reject("Invalid token");
                }

            });

            connection.end();


        })
    }
    mySaleList(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });
            // connection.query('SELECT name,detail,price,cust_name,food_img INNER JOIN customer ON food.cust_id = customer.cust_id WHERE food.cust_id <> "'+ post.cust_id + '"', function (error, results, fields) {
             //   SELECT * FROM `selling` INNER JOIN customer on selling.cust_id = customer.cust_id  INNER JOIN food on selling.food_id = food.food_id WHERE selling.cust_id <>
            connection.query('SELECT selling.selling_id,name,detail,price,cust_name,food_img,selling.created_date,quantity FROM `selling` INNER JOIN customer on selling.cust_selling_id = customer.cust_id  INNER JOIN food on selling.food_id = food.food_id WHERE selling.cust_selling_id = "'+ post.cust_id + '"', function (error, results, fields) {
                if (error)
                    reject(error);

                try {
                    var objToJson = results;
                    var response = [];
                    for (var key in results) {
                        response.push(results[key]);
                    }
                    objToJson.response = response;
                    var result = JSON.parse(JSON.stringify(objToJson));
                    resolve({result})

                } catch (err) {

                    reject("Invalid token");
                }

            });

            connection.end();


        })
    }

    getHistorySell(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });
            // connection.query('SELECT name,detail,price,cust_name,food_img INNER JOIN customer ON food.cust_id = customer.cust_id WHERE food.cust_id <> "'+ post.cust_id + '"', function (error, results, fields) {
             //   SELECT * FROM `selling` INNER JOIN customer on selling.cust_id = customer.cust_id  INNER JOIN food on selling.food_id = food.food_id WHERE selling.cust_id <>
            connection.query('SELECT selling.cust_selling_id,name,price,cust_name,transaction.created_date,txn_quantity,price FROM `transaction` INNER JOIN selling on transaction.selling_id = selling.selling_id INNER JOIN customer on selling.cust_selling_id = customer.cust_id INNER JOIN food ON selling.food_id = food.food_id WHERE selling.cust_selling_id = "'+ post.cust_id + '"', function (error, results, fields) {
                if (error)
                    reject(error);

                try {
                    var objToJson = results;
                    var response = [];
                    for (var key in results) {
                        response.push(results[key]);
                    }
                    objToJson.response = response;
                    var result = JSON.parse(JSON.stringify(objToJson));
                    resolve({result})

                } catch (err) {

                    reject("Invalid token");
                }

            });

            connection.end();


        })
    }

    getHistoryBuy(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });
            // connection.query('SELECT name,detail,price,cust_name,food_img INNER JOIN customer ON food.cust_id = customer.cust_id WHERE food.cust_id <> "'+ post.cust_id + '"', function (error, results, fields) {
             //   SELECT * FROM `selling` INNER JOIN customer on selling.cust_id = customer.cust_id  INNER JOIN food on selling.food_id = food.food_id WHERE selling.cust_id <>
            connection.query('SELECT selling.cust_selling_id,name,price,cust_name,transaction.created_date,txn_quantity,price FROM `transaction` INNER JOIN selling on transaction.selling_id = selling.selling_id INNER JOIN customer on selling.cust_selling_id = customer.cust_id INNER JOIN food ON selling.food_id = food.food_id WHERE transaction.cust_buying_id = "'+ post.cust_id + '"', function (error, results, fields) {
                if (error)
                    reject(error);

                try {
                    var objToJson = results;
                    var response = [];
                    for (var key in results) {
                        response.push(results[key]);
                    }
                    objToJson.response = response;
                    var result = JSON.parse(JSON.stringify(objToJson));
                    resolve({result})

                } catch (err) {

                    reject("Invalid token");
                }

            });

            connection.end();


        })
    }
    getUser(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });
           
            connection.query('SELECT * FROM `customer` WHERE cust_id = "'+ post.cust_id + '"', function (error, results, fields) {
                if (error)
                    reject(error);

                try {
                    var objToJson = results;
                    var response = [];
                    for (var key in results) {
                        response.push(results[key]);
                    }
                    objToJson.response = response;
                    var result = JSON.parse(JSON.stringify(objToJson));
                    resolve({result})

                } catch (err) {

                    reject("Invalid token");
                }

            });

            connection.end();


        })
    }

    updateSelling(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });
           
            connection.query('UPDATE selling SET quantity = quantity - 1 WHERE selling_id = "'+ post.selling_id + '"', function (error, results, fields) {
                if (error)
                    reject(error);
                try {
                    console.log("GERs")
                    resolve()
                } catch (err) {

                    reject("Invalid token");
                }

            });
        })
    }

    insertTransaction(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });
           
            connection.query('INSERT INTO `transaction` (`selling_id`,`cust_buying_id`,`txn_quantity`,`amount`) VALUES ("' + post.selling_id + '","' + post.cust_id + '","1","' + post.amount + '") ', function (error, results, fields) {
                if (error)
                    reject(error);

                try {
                    resolve()

                } catch (err) {

                    reject("Invalid token");
                }

            });
            connection.end();


        })
    }

    insertFood(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });
        console.log("####")
            connection.query('INSERT INTO `food` (`name`,`detail`,`price`,`food_img`) VALUES ("' + post.food_name + '","' + post.detail + '","' + post.amount + '","' + post.food_img + '") ', function (error, results, fields) {
                if (error)
                    reject(error);

                try {
                    resolve()
                    
                } catch (err) {

                    reject("Invalid token");
                }

            });
            connection.end();


        })
    }

    insertSelling(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });
           
            connection.query('INSERT INTO `selling` (`food_id`,`cust_selling_id`,`quantity`) VALUES ("' + post.food_id + '","' + post.cust_id + '","' + post.quantity + '") ', function (error, results, fields) {
                if (error)
                    reject(error);

                try {
                    resolve()

                } catch (err) {

                    reject("Invalid token");
                }

            });
            connection.end();


        })
    }


    getLastInserted(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });
           
            connection.query('SELECT food_id from food ORDER BY created_date DESC LIMIT 1', function (error, results, fields) {
                if (error)
                    reject(error);

                try {
                    resolve(results)

                } catch (err) {

                    reject("Invalid token");
                }

            });
            connection.end();


        })
    }

    getFeedBack(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });
           
            connection.query('SELECT * from feedback WHERE food_id =  "' + post.food_id + '" ', function (error, results, fields) {
                if (error)
                    reject(error);

                try {
                    var objToJson = results;
                    var response = [];
                    for (var key in results) {
                        response.push(results[key]);
                    }
                    objToJson.response = response;
                    var result = JSON.parse(JSON.stringify(objToJson));
                    resolve({result})

                } catch (err) {

                    reject("Invalid token");
                }

            });
            connection.end();


        })
    }

    review(post) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: 'password',
                database: 'mymeal'
            });

            connection.connect(function (error) {
                if (error) {
                    reject(error);
                }
            });
           
            connection.query('INSERT feedback (`message`,`food_id`) VALUES ("' + post.message + '","' + post.food_id + '")', function (error, results, fields) {
                if (error)
                    reject(error);

                try {    
                    resolve()

                } catch (err) {

                    reject("Invalid token");
                }

            });
            connection.end();


        })
    }
}




module.exports = Database;