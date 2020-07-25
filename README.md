Fake ID
=========

Commit identity theft with no victim!

## Installation

  `npm install fakeid`

## Usage
```js
var FakeID = require('fakeid');

/* Create A Person */
var person = new FakeID.Identity();
console.log(`Hello and welcome to the world, ${person.name.join(' ')}; // Hello and welcome to the world, [...] [...]

/* Get Values */
console.log(`Want a friend to call? Call ${person.name[0]} at ${person.phone}`); // Want a friend to call? Call [...] at [...]

/* Generate Data Without Instantiating */
console.log(`Hmm, I wonder if ${FakeID.postcode()} really exists...`); // Hmm, I wonder if [...] really exists...

```


## Contributing

If you'd like to commit a crime yourself, or would like someone else to do it for you, you can feel free to make a [pull request](https://github.com/tascord/fakeId/compare), or submit a [feature request](https://github.com/tascord/fakeId/issues/new?assignees=tascord&labels=enhancement&template=feature-request--i-want-something--.md&title=)!

If something's broken, please [submit a bug report](https://github.com/tascord/fakeId/issues/new?assignees=&labels=bug&template=bug-report--something-broke--.md&title=)!
