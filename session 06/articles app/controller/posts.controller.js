const fs = require("fs");
const { redirect } = require("statuses");
const uniqid = require("uniqid");
const validator = require('validator');

const readFromFile = () => {
    let data;
    try {
        data = JSON.parse(fs.readFileSync("./model/posts.json"));
        if(!Array.isArray(data)) throw new Error();
    } catch (error) {
        data = [];
    }
    return data;
}

const writeToFile = (data) => {
    fs.writeFileSync("./model/posts.json", JSON.stringify(data));
}

const home = (req, res) => {
    const allPosts = readFromFile();
    res.render("home", {
        pageTitle: "Home",
        allPosts,
        noData: allPosts.length == 0 ? true : false
    });
}

const showPost = (req, res) => {
    const allPosts = readFromFile();
    const post = allPosts.find(p=>p.id==req.params.id);
    if(!post) res.render('err404', {pageTitle:'post not found', err:"invalid post id"});
    res.render("showPost", {
        pageTitle: "Show single post",
        post
    });
}

const addPost = (req, res) => {
    res.render("addPost", {
        pageTitle: "Add new post"
    });
}

const addPostLogic = (req, res) => {
    try {
        if(!validator.isEmail(req.body.email)) throw new Error();
        let allPosts = readFromFile();
        let post = {
            ...req.body,
            id: uniqid()
        }
        allPosts.push(post);
        writeToFile(allPosts);
        res.redirect("/");
    } catch (error) {
        res.render("err404", {pageTitle: "Email error page", err: "Email not valid"});
    }
}

const editPost = (req, res) => {
    let allPosts = readFromFile();
    let post = allPosts.find(p=>p.id==req.params.id);
    res.render("editPost", {
        pageTitle: "Edit post",
        post
    });
}

const editPostLogic = (req, res) => {
    try {
        if(!validator.isEmail(req.body.email)) throw new Error();
        let allPosts = readFromFile();
        let index = allPosts.findIndex(p=>p.id==req.params.id);
        let post = {
            ...req.body,
            id: req.params.id
        }
        allPosts[index] = post;
        writeToFile(allPosts);
        res.redirect("/");
    } catch (error) {
        res.render("err404", {pageTitle: "Email error page", err: "Email not valid"});
    }
}

const delPost = (req, res) => {
    const allPosts = readFromFile().filter(p=>p.id!=req.params.id);
    writeToFile(allPosts);
    res.redirect("/");
}

const deleteAll = (req, res) => {
    writeToFile([]);
    res.redirect("/");
}

module.exports = {
    home,
    showPost,
    addPost,
    addPostLogic,
    editPost,
    editPostLogic,
    delPost,
    deleteAll
}