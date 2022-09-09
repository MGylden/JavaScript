const computersElement = document.getElementById("computers");
const loanElement = document.getElementById("getLoanButton");
const bBalanceElement = document.getElementById("bankBalance");
const priceElement = document.getElementById("price");
const payElement = document.getElementById("payButton");
const payLoanElement = document.getElementById("payLoanButton");
const workElement = document.getElementById("workButton");
const salaryBalanceElement = document.getElementById("salaryBalance");
const salaryTransferToBankElement = document.getElementById("transferSalaryToBank");
const loanBalanceElement = document.getElementById("loanBalance");

let computers = [];
let loan = 0;
let bankBalance = 500;
let salaryBalance = 500;
loanBalanceElement.innerHTML = parseInt(loan);
bBalanceElement.innerHTML = parseInt(bankBalance);
salaryBalanceElement.innerHTML = parseInt(salaryBalance);

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToList(computers));


const addComputersToList = (computers) => {
    computers.forEach(x => addPcToList(x));
    priceElement.innerText = computers[0].price; 
}

const addPcToList = (pc) => {
    const pcElement = document.createElement("option");
    pcElement.value = pc.id;
    pcElement.appendChild(document.createTextNode(pc.title));
    computersElement.appendChild(pcElement);
}

const handleComputerChange = e => {
    const selectedComputer = computers[e.target.selectedIndex];
    priceElement.innerText = selectedComputer.price;
}

const handleBankBalance = () => {
    bankBalance;
}

const handleGetLoan = () => {
    const loanPrompt = prompt("Please enter the amount you wish to loan");
    let loanBalance = parseInt(bankBalance*2);
    let loans = 0;
    if (loans>1) {
        if (loanBalance>bankBalance) {
            loan = parseInt(loanUserInput+loan);
            loans++;
    }
    }
    
} 

const handleSalaryBalance = () => {
    salaryBalance;
}

const handlePay = () => {
    const selectedPc = computers[computersElement.selectedIndex];
    const totalPay = selectedPc.price;
    let change = parseInt(bankBalance - totalPay);
        if (change>=0) {
            alert('Congratulations on your new '+ selectedPc.title + 
            '\nTotal change: ' + change);
        }else{
            alert('No pain, no gain, go work more and come back when you are rich')
        }
}

computersElement.addEventListener("change", handleComputerChange);
bBalanceElement.addEventListener("change", handleBankBalance);
salaryBalanceElement.addEventListener("change", handleSalaryBalance);
payElement.addEventListener("click", handlePay);
loanBalanceElement.addEventListener("change", handleGetLoan);
