var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sqlpassword",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    queryProducts();
    questions();
    
    // connection.end();
});

function queryProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity > 0) {
                console.log("ID: " + res[i].item_ID + " | " + res[i].product_name + " | $" + res[i].price + " | " + res[i].stock_quantity);  
            }
        }
    });
}

function questions() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "Please enter the ID of the item you would like to purchase."
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ])
        .then(function(answer) {
            connection.query(
                // var userQuantity = stock_quantity - answer.quantity;
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: answer.quantity
                    },
                    {
                        item_ID: answer.item
                    }
                ],
                function(error) {
                    // if (err) throw err;
                    console.log("Order Placed!");
                }
            );
        })
}
  