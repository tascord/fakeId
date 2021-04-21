const chalk = require('chalk'),
      names = require('./data/names.json'),
      emails = require('./data/email.json'),
      months = require('./data/months.json'),
      alpha = "abcdefhijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!*_+",
      random = range => Math.floor(Math.random() * range),
      randomBool = (bias = 1) => random(10) % random(100) < bias;

class Identity {

    constructor() {

        this.gender = random(100) < 50 ? 'Male' : 'Female';
        this.name = name(this.gender === 'Male');
        this.postcode = postcode();
        this.email = email(this.name);
        this.phone = phone("+61");
        this.username = username(this.name);
        this.password = password();
        this.birthDate = birthDate();

    }

    passport() {

        console.log('\n' + chalk.cyan.bold('—'.repeat(process.stdout.columns)) + '\n');
        console.log(chalk.blue.bold('Name: ') + chalk.cyan(this.name.join(' ')));
        console.log(chalk.blue.bold('Gender: ') + chalk.cyan(this.gender));
        console.log(chalk.blue.bold('DOB: ') + chalk.cyan(`${this.birthDate.date}/${this.birthDate.month}/${this.birthDate.year} (${new Date().getFullYear() - this.birthDate.year} years old)`));
        console.log(chalk.blue.bold('Email: ') + chalk.cyan(this.email));
        console.log(chalk.blue.bold('Phone no#: ') + chalk.cyan(this.phone));
        console.log(chalk.blue.bold('Postcode: ') + chalk.cyan(this.postcode));
        console.log();
        console.log(chalk.blue.bold('Username: ') + chalk.cyan(this.username));
        console.log(chalk.blue.bold('Password: ') + chalk.cyan(this.password));
        console.log('\n' + chalk.cyan.bold('—'.repeat(process.stdout.columns)) + '\n');

    }

}

function name(male, count = 2) {
    
    if (!male)
        throw new Error("Please provide whether the name is to be male gendered.");
    else if (isNaN(count))
        throw new Error("Please provide valid number of names.");
    else if (count.length < 0)
        throw new Error("Please provide a number of names greater than zero.");

    let _ = [];
    nI = names.initial[male ? 'male' : 'female'];
    nS = names.middle[male ? 'male' : 'female'];

    while(_.length < count - 2) _.push(nS[random(nS.length)]);
    _.push(nI[random(nI.length)]);
    _.unshift(nI[random(nI.length)]);

    return _;

}

function postcode(length = 4) {
    let _ = "";    
    
    while(_.length < length) {
        _ += Math.floor(Math.random() * 10)
    }

    return _;
}

function email(name = null) {
    
    if(!name || typeof name != 'object')
        throw new Error("Please provide an array of names.");

    let _ = [];

    if (randomBool(10))
        _.push(random(100));
    
    if (randomBool(10))
        _.push("_");
    else if(randomBool)
        _.push(".");

    let t = randomBool();
    while(t) {
        if(randomBool()) _.push("_");
        else if(randomBool) _.push(".");
        _.push(name[random(name.length)]);
        t = randomBool();
    }

    if (randomBool(10)) {
        _.push(random(100));
        _.push(random(100));
    }

    _.push(name[name.length - 1]);
    _.push('@' + emails[random(emails.length)]);
    _.unshift(name[0]);

    return _.join('');
    
}

function phone(areaCode) {

    let _ = areaCode.toString();
    while (_.length - areaCode.toString().length < 9)
        _ += random(10);
    return _;

}

function username(name = null) {
    
    if (!name || typeof name !== 'object')
        throw new Error("Please provide an array of names.");
    if (name.length < 1)
        throw new Error("Please provide an array of names.");

    let _ = [];

    if (randomBool(10))
        _.push(random(100));
    else if (randomBool(10))
        _.push('Xx');
    if (randomBool(10))
        _.push('X');

    _.push(name[0]);

    if (randomBool(10))
        _.push("_");
    else if (randomBool)
        _.push(".");

    let t = randomBool();
    while(t) {
        if(randomBool()) _.push("_");
        else if(randomBool) _.push(".");
        _.push(name[random(name.length)]);
        t = randomBool();
    }

    if (randomBool(10))
        _.push(random(100));
    else if (randomBool(10))
        _.push('Xx');
    if (randomBool(10))
        _.push('X');

    return _.join('');

}

function password (length = 18, alphabet = alpha) {

    let _ = "";
    while (_.length < length)
        _ += alphabet[random(alphabet.length)];
    return _;

}

function birthDate() {

    const m = random(Object.keys(months).length) + 1;
    const d = random(months[Object.keys(months)[m - 1]]);
    const y = new Date().getFullYear() - random(30) - 10;

    return {date: d, month: m, year: y};

}

exports.Identity = Identity;
exports.name = name;
exports.postcode = postcode;
exports.email = email;
exports.phone = phone;
exports.username = username;
exports.password = password;
exports.birthDate = birthDate;
