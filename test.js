const FakeID = require('./');

//Send a list of the new users data
var person = new FakeID.Identity();

console.log(FakeID.username(person.name));