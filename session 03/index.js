// //clouser: substitute for object in oop
// const calculate = (a, b) => {
//     return {
//         add() {console.log(a + b);},
//         sub() {console.log(a - b);},
//         mul() {console.log(a * b);}
//     }
// }
// obj = calculate(1, 2);
// obj.add();
// obj.sub();
// obj.mul();

//callback
// const checkType = (value, checker) => {
//     if(typeof value === "string") checker(false, "error")
//     else checker("valid number", false)
// }

// checkType(10, (result, error)=>{
//     if(!error) console.log(result);
//     else console.log(error);
// });

const commonApiLink = "https://jsonplaceholder.typicode.com/";
const apis = {
    title: "posts",
    attrs: ["userId", "id", "title", "body"],
    postAtrr: ["title", "body", "userId"]
}
const methods = ["GET", "POST", "PUT", "DELETE"];

const displayDiv = document.getElementById("display");
const btnWrapper = document.getElementById("btnWrapper");
const apiName = document.getElementById("apiName");

apiName.textContent = apis.title;

const createMyOwnElement = (parent, ele, txt=null, classes=null) =>{
    myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if(txt) myElement.textContent = txt
    if(classes) myElement.classList=classes
    return myElement
}

methods.forEach(method=>{
    btn = createMyOwnElement(btnWrapper, "button", method, "btn btn-primary mx-4");
});

const arrBtn = document.querySelectorAll("button");

arrBtn.forEach(btn => {
    btn.addEventListener("click", async function(e){
        displayDiv.textContent = "";
        if(btn.textContent == "GET") {
            try {
                let data = await (await fetch(`${commonApiLink}${apis.title}`)).json();
                // console.log(data);
                table = createMyOwnElement(displayDiv, "table", "", "table");
                thead = createMyOwnElement(table, "thead");
                tbody = createMyOwnElement(table, "tbody");
                
                apis.attrs.forEach(atr => {
                    th = createMyOwnElement(thead, "th", atr, "mx-4");
                    // td = createMyOwnElement(tbody, "td"); 
                });
                
                data.forEach(item => {
                    // console.log(item);
                    tr = createMyOwnElement(tbody, "tr", "","my-4");
                    apis.attrs.forEach(atr => {
                        td = createMyOwnElement(tr, "td", item[atr], "mx-4");
                    });
                });

            } catch (error) {
                error.message;
            }
        }
        else if(btn.textContent == "POST" || btn.textContent == "PUT") {
            form = createMyOwnElement(displayDiv, "form");
            apis.postAtrr.forEach(atr => {
                label = createMyOwnElement(form, "label", atr);
                inputField = createMyOwnElement(form, "input", "", "form-control mb-4");
                inputField.name = `new${atr}`;
            });
            submitBtn = createMyOwnElement(form, "button", "Submit", "btn btn-danger");

            (btn.textContent == "PUT")? id = "/1" : id ="";
            form.addEventListener("submit", function(e) {
                e.preventDefault();
                try {
                    fetch(`${commonApiLink}${apis.title}${id}`, {
                        method: btn.textContent,
                        body: JSON.stringify({
                            title: form.elements.newtitle.value,
                            body: form.elements.newbody.value,
                            userId: form.ele.newuserId.value,
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    .then((response) => response.json())
                    .then((json) => console.log(json));
                } catch (error) {
                    error.message;
                }
            });
        }
        else if(btn.textContent == "DELETE") {
            id = "/1";
            try {
                fetch(`${commonApiLink}${apis.title}${id}`, {
                    method: 'DELETE',
                })
                .then(console.log("deleted"));
            } catch (error) {
                error.message;
            }
        }
    });
});

// const displayData = (button, apiLink) => {
//     button.addEventListener("click", async () => {
//         displayDiv.textContent = "";
//         try {
//             let data = await fetch(apiLink);
//             let dataJson = await data.json();
//             // displayDiv.textContent = JSON.stringify(dataJson[0]);
//             arr = JSON.stringify(dataJson);
//             console.log(typeof dataJson);
//             // for(item in )
//         } catch (error) {
//             console.log(error.message);
//         }
//     });
// }

// displayData(postsBtn, "https://jsonplaceholder.typicode.com/posts");

// displayData(commentsBtn, "https://jsonplaceholder.typicode.com/comments");

// displayData(photosBtn, "https://jsonplaceholder.typicode.com/photos");

// displayData(todosBtn, "https://jsonplaceholder.typicode.com/todos");
