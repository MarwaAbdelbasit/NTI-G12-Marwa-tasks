const fs = require("fs");

const yargs = require("yargs");
const utils = require("./utils/myFunctions");

//add user
yargs.command({
    command: "addUser",
    builder: {
        name: {type: "string", demandOption: true},
        email: {type: "string", demandOption: true}
    },
    handler: function(argv) {
        let user = {
            name: argv.name,
            email: argv.email
        };
        utils.addUser(user);
    }
})

//show all users
yargs.command({
    command: "showAll",
    handler: function() {
        console.log(utils.showAll());
    }
})

//show single user
yargs.command({
    command: "showSingle",
    builder: {
        id: {type: "string", demandOption: true}
    },
    handler: function(argv) {
        utils.showSingle(argv.id);
    }
})

//edit user
yargs.command({
    command: "editUser",
    builder: {
        id: {type: "string", demandOption: true},
        name: {type: "string", demandOption: true},
        email: {type: "string", demandOption: true}
    },
    handler: function(argv) {
        let user = {
            id: argv.id,
            name: argv.name,
            email: argv.email
        }
        utils.editUser(user);
    }
})

//delete user
yargs.command({
    command: "deleteUser",
    builder: {
        id: {type: "string", demandOption: true}
    },
    handler: function(argv) {
        utils.deleteUser(argv.id);
    }
})

yargs.argv