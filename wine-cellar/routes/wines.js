/*exports.findAll = function(req, res) {     
    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]); 
}; 
exports.findById = function(req, res) {     
    res.send({id:req.params.id, name: "The Name", description: "description"}); 
}*/

var mongo = require('mongodb'); 
const express = require ('express');
express.Router
var Server = mongo.Server; 
var Db = mongo.Db; 
var BSON = mongo.BSONPure; 

var server = new Server('127.0.0.1', 27017, {auto_reconnect: true}); 
db = new Db('winedb', server);

db.open(function(err, db) {     
    if(!err) {         
        console.log("Connected to 'winedb' database");         
        db.collection('wines', {strict:true}, function(err, collection) {             
            if (err) {                 
                console.log("The 'wines' collection doesn't exist. Creating it with sample data...");                 
                populateDB();             
            }         
        });     
    } 
}); 

/*exports.findById = function(req, res) {     
    var id = req.params.id;     
    console.log('Retrieving wine: ' + id);     
    db.collection('wines')        
    .findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {             
        res.send(item);         
    }); 
};*/

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    db.collection('wines') 
    //.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) { 
      .findOne({'_id':new mongo.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
};

exports.findAll = function(req, res) {     
    db.collection('wines', function(err, collection) {         
        collection.find().toArray(function(err, items) {             
            res.send(items);         
        });     
    }); 
};

exports.addWine = function(req, res) {     
    var wine = req.body;     
    console.log('Adding wine: ' + JSON.stringify(wine));     
    db.collection('wines', function(err, collection) {         
        collection.insert(wine, {safe:true}, function(err, result) {             
            if (err) {                 
                res.send({'error':'An error has occurred'});             
            } else {                 
                console.log('Success: ' + JSON.stringify(result[0]));                 
                res.send(result[0]);             
            }         
        });     
    }); 
}

exports.deleteWine = function(req, res) {     
    var id = req.params.id;     
    console.log('Deleting wine: ' + id);     
    db.collection('wines')         
    //.remove({'_id':new BSON.ObjectID(id)}, function(err, result) {         
    .remove({'_id':new mongo.ObjectID(id)}, function(err, result) {    
        if (err) {                 
            res.send({'error':'An error has occurred - ' + err});             
        } else {                 
            console.log('' + result + ' document(s) deleted');                 
            res.send(req.body);             
        }         
    }); 
}

exports.updateWine = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('wines', function(err, collection) {
        collection.update({'_id':new mongo.ObjectID(id)}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}