const events = require("events")

const emitter = new events.EventEmitter()


emitter.on("customEvent", (message, user) => {
    console.log(`${user}: ${message}`)
})



emitter.emit("customEvent", "Hello word", "Computer")
emitter.emit("customEvent", "That's pretty cool huh?", "Alex")









