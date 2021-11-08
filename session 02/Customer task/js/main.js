const addCustomerForm = document.getElementById("addCustomer");
const tbody = document.querySelector("#showAll");
const headers = document.querySelectorAll(".head");
const withdrawForm = document.getElementById("withdraw");
const addBalanceForm = document.getElementById("addBalance");
const showSingle = document.getElementById("showSingle");
const showList = document.getElementById("showList");
const singleTable = document.getElementById("singleTable");
const single = document.getElementById("single");

const readLocalStorage = () => {
    let data
    try {
        data = JSON.parse(localStorage.getItem('customers'));
        if(!data || !Array.isArray(data)) throw new Error();
    }
    catch(e) {
        data = [];
    }
    return data;
}

const writeLocalStorage = (data) => {
    localStorage.setItem("customers", JSON.stringify(data));
}

const addCustomer = (newCustomer) => {
    let data = readLocalStorage();
    data.push(newCustomer);
    writeLocalStorage(data);
}

if(addCustomerForm) {
    addCustomerForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const customer = {
            name: this.elements.userName.value,
            balance: this.elements.balanceAmount.value,
            accNum: Date.now(),
            address: {
                city: this.elements.cityName.value,
                street: this.elements.streetName.value,
                build: this.elements.buildNum.value,
            },
            transactions: []
        }
        addCustomer(customer);
        this.reset();
        window.location.replace("index.html");
    });
}

function createBtn(ele, classes, txt) {
    btn = document.createElement(ele);
    btn.classList = classes;
    btn.textContent = txt;
    return btn;
}

// const deletCustomer = (customers, index) => {
//     customers.splice(index, 1);
//     writeLocalStorage(customers);
//     showCustomers(newData);
//     window.location.replace("index.html");
// }

const showSin = (customer) => {
    singleTable.textContent = "";
    showList.textContent = "";
    for(item in customer) {
        // console.log(customer[item]);
        if(item === "transactions") continue;
        if(item === "address") customer[item] = `${customer[item].city} -  ${customer[item].street} - ${customer[item].build}`;
        listEle = createBtn("li", "list-group-item", `${item}: ${customer[item]}`);
        showList.appendChild(listEle);
    }
    for(tran of customer.transactions) {
        // console.log(tran.type);
        row = document.createElement("tr");
        singleTable.appendChild(row);
        
        typeCol = document.createElement("td");
        typeCol.textContent = tran.type;
        row.appendChild(typeCol);

        balanceCol = document.createElement("td");
        balanceCol.textContent = tran.amount;
        row.appendChild(balanceCol);
    }
    // console.log(customer.balance);
    single.textContent = `Final Balance: ${customer.balance}`;
}

const showCustomers = (customers) => {
    tbody.textContent = "";
    customers.forEach((customer, index) => {
        let row = document.createElement("tr");
        tbody.appendChild(row);
        
        let col = document.createElement("td");
        row.appendChild(col);
        col.textContent = customer.accNum;
        
        let col1 = document.createElement("td");
        row.appendChild(col1);
        col1.textContent = customer.name;

        let col2 = document.createElement("td");
        row.appendChild(col2);

        showBtn = createBtn("button", "btn btn-primary mx-1", "Show");
        col2.appendChild(showBtn);
        showBtn.addEventListener("click", function(e) {
            localStorage.setItem("customerId", index);
            window.location.replace("showSingle.html");
        });

        withDrawBtn = createBtn("button", "btn btn-danger mx-1", "Withdraw");
        col2.appendChild(withDrawBtn);
        withDrawBtn.addEventListener("click", function(e) {
            localStorage.setItem("customerId", index);
            window.location.replace("withdraw.html");
        });

        addBalanceBtn = createBtn("button", "btn btn-warning mx-1", "Add Balance");
        col2.appendChild(addBalanceBtn);
        addBalanceBtn.addEventListener("click", function(e) {
            localStorage.setItem("customerId", index);
            window.location.replace("addBalance.html");
        });

    });
}

if(showSingle) {
    if(!localStorage.getItem("customerId")) window.location.replace("index.html");
    const index = localStorage.getItem("customerId");
    console.log(index);
    const customers = readLocalStorage();
    // console.log(customers[index]);
    showSin(customers[index]);
}

if(withdrawForm) {
    if(!localStorage.getItem("customerId")) window.location.replace("index.html");
    const index = localStorage.getItem("customerId");
    // console.log(index);
    const customers = readLocalStorage();
    
    withdrawForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const bal = Number(this.elements.withdrawAmount.value);
        let limit = Number(customers[index].balance);
        // console.log(this.withdrawAmount.value);
        const withdrawObj = {
            type: "withdraw",
            amount: bal,
            status: false
        }
        // console.log(bal - limit);
        if(bal < limit && bal > 100) {
            customers[index].transactions.push(withdrawObj);
            limit -= bal;
            customers[index].balance = JSON.stringify(limit);
        }
        else {
            console.log("Withdrawal amount range must be less that your balance and more than 100");
        }
        writeLocalStorage(customers);
        window.location.replace("showSingle.html");
        localStorage.removeItem("customerId");
    });
}

if(addBalanceForm) {
    if(!localStorage.getItem("customerId")) window.location.replace("index.html");
    const index = localStorage.getItem("customerId");
    const customers = readLocalStorage();

    addBalanceForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const bal = Number(this.elements.addAmount.value);
        let limit = Number(customers[index].balance);
        console.log(limit);
        const addBalanceObj = {
            type: "Add Balance",
            amount: bal,
            status: false
        }
        if(bal < 6000 && bal > 100) {
            customers[index].transactions.push(addBalanceObj);
            limit += bal;
            customers[index].balance = JSON.stringify(limit);
        }
        else {
            console.log("You can only add balance in range must be less than 600 and more than 100");
        }
        writeLocalStorage(customers);
        window.location.replace("showSingle.html");
        localStorage.removeItem("customerId");
    });

}

if(tbody) {
    let data = readLocalStorage();
    showCustomers(data);
}