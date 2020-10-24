var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var dbConnectivities = require('./dbConnectivities.json')
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
const e = require('express')
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true);
mongoose.Promise = Promise


//it takes the static file from the direcory
app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var mongoUrl = 'mongodb+srv://'+
            dbConnectivities.mongoConnection.user+':'+
            dbConnectivities.mongoConnection.pass+
            '@clusterfree.xmlot.mongodb.net/'+
            dbConnectivities.mongoConnection.dbName+
            '?retryWrites=true&w=majority'

var Message = mongoose.model(dbConnectivities.mongoConnection.collectionName, {
    name: String,
    message: String
})


app.get('/messages', (req, res) => {

    Message.find({}, (err, message) => {
        res.send(message)
    })
    
})

app.post('/messages', (req, res) => { 
    var message = new Message(req.body)
    
    message
    .save()
    .then(() => {
        console.log('saved')
        return Message.findOne({message: 'badword'})
    })
    .then(censored => {
        if(censored){
            console.log('found a censored word', censored.message, 'from', censored.name)
            return Message.deleteOne({_id: censored.id})
        }
        io.emit('message', req.body)
        res.sendStatus(200)
    })
    .catch((err) => {
        res.sendStatus(500)
        console.error(err)
    })

})


io.on('connection', (socket) => {
    console.log("new User Connected")
})

mongoose
.connect(mongoUrl,
    (err) => {
        if(err){
            console.log('mongo db connection err: ', err)    
        }
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
