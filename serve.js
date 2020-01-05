// Inspired by https://gist.github.com/icebob/0dda386fceb8e14b91d84d057fac676f
"use strict";

// Generate webpack config with CLI service
const webpackConfig = require("@vue/cli-service/webpack.config.js");

// Create express app
const express = require("express");
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Configure webpack as middleware
const webpack = require("webpack");

webpackConfig.entry.app.unshift('webpack-hot-middleware/client');
const compiler = webpack(webpackConfig);
const devMiddleware = require('webpack-dev-middleware'); // eslint-disable-line
app.use(devMiddleware(compiler, {
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    headers: {"Access-Control-Allow-Origin": "*"},
    stats: {colors: true}
}));

const hotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line
app.use(hotMiddleware(compiler, {
    log: console.log
}));

// Read in the "class" to store all our data on the server side
// If you need to change how data is handled, check the dataHandler.js file!
const Data = require("./dataHandler.js");

var data = new Data();
data.initializeData();

io.on('connection', function (socket) {
    // Send list of orders and text labels when a client connects
    socket.emit('initialize', {
        orders: data.getAllOrders(),
        uiLabels: data.getUILabels(),
        ingredients: data.getIngredients()
    });

    // When someone orders something
    socket.on('order', function (order, eatHere) {
        order.eatHere = eatHere;
        var orderIdAndName = data.addOrder(order);
        data.changeStockWithOrder(order, false);
        // send updated info to all connected clients, note the use of io instead of socket
        socket.emit('orderNumber', orderIdAndName);
        io.emit('currentQueue', {
            orders: data.getAllOrders(),
            ingredients: data.getIngredients(),
        });
    });

    // send UI labels in the chosen language
    socket.on('switchLang', function (lang) {
        socket.emit('switchLang', data.getUILabels(lang));
    });

    // When order is canceled in kitchen, add the ingredients to stock again
    socket.on('cancelOrder', function (item, orderid) {
        data.changeStockWithOrder(item, true);
        data.markOrderCanceled(orderid);
        io.emit('currentQueue', {
            orders: data.getAllOrders(),
            ingredients: data.getIngredients(),
        });
    });

    // when order is marked as done, send updated queue to all connected clients
    socket.on('orderDone', function (orderId) {
        data.markOrderDone(orderId);
        io.emit('currentQueue', {orders: data.getAllOrders()});
    });

    socket.on('clearOrder', function (item) {
        data.markOrderCleared(item);
        io.emit('currentQueue', {orders: data.getAllOrders()});
    });

    socket.on('orderStarted', function (orderId) {
        data.markOrderStarted(orderId);
        io.emit('currentQueue', {orders: data.getAllOrders()});
    });

    socket.on('orderNotStarted', function (orderId) {
        data.markOrderNotStarted(orderId);
        io.emit('currentQueue', {orders: data.getAllOrders()});
    });

    socket.on('updateStock', function (item, saldo) {
        data.changeStock(item, saldo);
        io.emit('currentQueue', {ingredients: data.getIngredients()});
    });

    socket.on('addIngredient', function (ingredient, initSaldo) {
        data.newIngredient(ingredient, initSaldo);
        io.emit('currentQueue', {ingredients: data.getIngredients()});
    });

    socket.on('fetchData', function () {
        socket.emit('initialize', {
            orders: data.getAllOrders(),
            uiLabels: data.getUILabels(),
            ingredients: data.getIngredients()
        })
    });
});


const port = 8080;
http.listen(port, function () {
    console.log("Developer server running on http://localhost:" + port);
});
