const chalk = require('chalk');

const names = require('./data/names.json');
const emails = require('./data/email.json');

const random = range => Math.floor(Math.random() * range);
const randomBool = (bias = 1) => random(10) % random(100) < bias;

class Identity {

    name = null;
    gender = null;
    email = null;
    postcode = null;
    phone = null;

    constructor() {

        this.gender = random(100) < 50 ? 'Male' : 'Female';
        this.name = name(this.gender == 'Male');
        this.postcode = postcode();
        this.email = email(this.name);
        this.phone = phone("+61");

    }

    passport() {

        console.log('\n' + chalk.cyan.bold('—'.repeat(process.stdout.columns)) + '\n');
        console.log(chalk.blue.bold('Name: ') + chalk.cyan(this.name.join(' ')));
        console.log(chalk.blue.bold('Gender: ') + chalk.cyan(this.gender));
        console.log(chalk.blue.bold('Email: ') + chalk.cyan(this.email));
        console.log(chalk.blue.bold('Phone no#: ') + chalk.cyan(this.phone));
        console.log(chalk.blue.bold('Postcode: ') + chalk.cyan(this.postcode));
        console.log('\n' + chalk.cyan.bold('—'.repeat(process.stdout.columns)) + '\n');

    }

}

function name(male = null, count = 2) {
    
    if(male == null) throw new Error("Please provide whether the name is to be male gendered.");
    if(isNaN(count)) throw new Error("Please provide valid number of names.");
    if(count.length < 0) throw new Error("Please provide a number of names greater than zero.");

    var _ = [];
    nI = names.initial[male ? 'male' : 'female'];
    nS = names.middle[male ? 'male' : 'female'];

    while(_.length < count - 2) _.push(nS[random(nS.length)]);
    _.push(nI[random(nI.length)]);
    _.unshift(nI[random(nI.length)]);

    return _;

}

function postcode(length = 4) {
    var _ = "";    
    
    while(_.length < length) {
        _ += Math.floor(Math.random() * 10)
    }

    return _;
}

function email(name) {
    
    if(typeof name != 'object') throw new Error("Please provide an array of names.");

    var _ = [];

    if(randomBool(10)) _.push(random(100));
    
    if(randomBool(10)) _.push("_");
    else if(randomBool) _.push(".");

    var t = randomBool();
    while(t) {
        if(randomBool()) _.push("_");
        else if(randomBool) _.push(".");
        _.push(name[random(name.length)]);
        t = randomBool();
    }

    if(randomBool(10)) _.push(random(100));
    if(randomBool(10)) _.push(random(100));

    _.push(name[name.length - 1]);
    _.push('@' + emails[random(emails.length)]);
    _.unshift(name[0]);

    return _.join('');
    
}

function phone(areaCode) {

    var _ = areaCode.toString();
    while(_.length - areaCode.toString().length < 9) _ += random(10);
    return _;

}

exports.Identity = Identity;
exports.name     = name;
exports.postcode = postcode;
exports.email    = email;
exports.phone    = phone;