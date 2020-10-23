fs = require('fs');

function phoneNumber(err, data){
    console.log('data: ', data);
}

fs.readdir('/Users/gpinto/CodeProject/node-pojects/become-nodejs-dev-course/', phoneNumber);

console.log('this comes after');
