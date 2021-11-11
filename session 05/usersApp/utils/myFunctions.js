const fs = require("fs");
const uniqid = require("uniqid");
const chalk = require("chalk");
const validator = require("validator");

const user = [{name:"user1", email:"user1@123.com"}];

function writeTofile(arr) {
    fs.writeFileSync("userData.json", JSON.stringify(arr));
}

function readFromFile() {
    let userData;
    try {
        userData = JSON.parse(fs.readFileSync("userData.json"));
        if(!Array.isArray(userData)) throw new Error();
    } catch (error) {
        userData = [];
    }
    return userData;
}

function addUser(newUser) {
    try {
        if(!validator.isEmail(newUser.email)) throw new Error("Not a valid email");

        let allUsers = readFromFile();

        let user = {
            userId: uniqid(),
            ...newUser
        }

        const notUniqEmail = allUsers.find(u=> user.email == u.email);
        if(notUniqEmail) throw new Error("Email alreay exist");

        allUsers.push(user);
        writeTofile(allUsers);
        console.log(chalk.green("User is added successfully"));

    } catch (error) {
        console.log(chalk.red(error.message));
    }
}

function showAll() {
    let allUsers = readFromFile();
    allUsers.forEach(user => {
        console.log(`id: ${user.userId} 
        name: ${user.name}
        email: ${user.email}`);
        console.log("----------------------");
    });
}

//clouser
function findIndex(id) {
    let allUsers = readFromFile();
    let fUser = allUsers.find(user=>user.userId == id);
    return {
        foundUser() {return JSON.stringify(fUser)},
        index() {return allUsers.indexOf(fUser)}
    }
}

function showSingle(id) {
    try {
        let findUserObj = findIndex(id);
        if(findUserObj.index() > 0) {
            console.log(chalk.green(`User is found at position ${findUserObj.index()}`));
            console.log(chalk.green(findUserObj.foundUser()));
        }
        else
            throw new Error("user not found");
    } catch (error) {
        console.log(chalk.red(error.message));
    }
}

function deleteUser(id) {
    try {
        let findUserObj = findIndex(id);
        if(findUserObj.index() >= 0) {
            let data = readFromFile();
            data.splice(findUserObj.index(), 1);
            writeTofile(data);
            console.log(chalk.green(`user deleted successfully`));
        }
        else
            throw new Error("user not found");
    } catch (error) {
        console.log(chalk.red(error.message));
    }
}

function editUser(user) {
    try {
        let findUserObj = findIndex(user.id);
        let index = findUserObj.index();
        // console.log(index);
        if(index >= 0) {
            let data = readFromFile();
            data[index].userId = user.id;
            data[index].name = user.name;
            data[index].email = user.email;

            writeTofile(data);
            // console.log(data[index].name);
            // console.log(data[index]);
            
            console.log(chalk.green(`user number ${index} has been edited successfully`));
        }
        else
            throw new Error("user not found");
    } catch (error) {
        console.log(chalk.red(error.message));
    }
}

// writeTofile(user);
// console.log(readFromFile());

module.exports = {
    addUser,
    showAll,
    showSingle,
    deleteUser,
    editUser
}