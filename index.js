var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

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
});

function queryProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        console.table(res);
        questions();
    })
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
            var quantity = parseInt(answer.quantity);
            var item = answer.item;
            connection.query("SELECT * FROM products WHERE item_ID = ?", item, function(err, res) {
                if (quantity > res[0].stock_quantity) {
                    console.log("Not enough stock");
                } else {
                    orderQuantity(quantity, item);
                    var price = quantity * res[0].price;
                    console.log("Total Price: $" + Math.floor(price * 100) / 100);
                }
            })
        })
}

function orderQuantity(quantity, item) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_ID = ?",
        [quantity, item],
        console.log("Order Placed!")
        
    );
}
  