var fs = require('fs')
var data = require('./data.json')

//here the data is an object so you can access to the name property;
console.log(data.name)

//fs.readFile('./data.json', 'utf-8' , function(err, data){})


fs.readFile('./data.json', 'utf-8', (err, data) => {

    //in this case data is a string! So you cannot access directly to 
    // the object name;

    var data = JSON.parse(data)
    console.log(data.name)
})

