const express = require("express");
const events = require("events");
const app = express();
app.use(express.json());

const myEmitter = new events();

var eventListeners = events.EventEmitter.listenerCount(myEmitter, "event");
console.log("--> " + eventListeners + " tane dinliyor");

// 1. Dinleyici
myEmitter.on("event", function firstListener() {
  console.log("Helloooo! first listener");
});

// 2. Dinleyici
myEmitter.on("event", function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});

// 3. Dinleyici
myEmitter.on("event", function thirdListener(...args) {
  const parameters = args.join(", ");
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners("event"));

myEmitter.emit("event", 1, 2, 3, 4, 5);
var eventListeners = events.EventEmitter.listenerCount(myEmitter, "event");
console.log("--> " + eventListeners + " tane dinliyor");

app.get("/", (req, res) => {
  myEmitter.emit("event", "eren", "demir", "test", "dinleme");
  res.send("Main");
});

app.listen(process.env.port || 3000, function () {
  console.log("PORT:3000");
});
