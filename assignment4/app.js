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
const pcDescElement = document.getElementById("pcDesc");
const pcSpecsElement = document.getElementById("pcSpecs");
const pcImgElement = document.getElementById("pcImg");
//const hideLoanElement = document.getElementById("hideLoan").style.visibility = "hidden";

let computers = [];
let loanBalance = 0;
let loanExist = false;
let bankBalance = 0;
let salaryBalance = 0;
bBalanceElement.innerHTML = parseInt(bankBalance);
salaryBalanceElement.innerHTML = parseInt(salaryBalance);


// const urls = ["https://noroff-komputer-store-api.herokuapp.com/", "https://noroff-komputer-store-api.herokuapp.com/computers"];
// const promises = urls.map(url => fetch(url));
// await Promise.all(promises);

// for (const promise of promises];{
//     const data = await promise.json();
    
// }
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToList(computers));


const addComputersToList = (computers) => {
    computers.forEach(x => addPcToList(x));
    priceElement.innerText = computers[0].price; 
    pcDescElement.innerText = computers[0].description;
    pcSpecsElement.innerHTML = computers[0].specs;
    pcImgElement.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer[0].image;
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
    pcDescElement.innerText = selectedComputer.description;
    pcSpecsElement.innerText = selectedComputer.specs;
    pcImgElement.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image;
}

const handleGetLoan = () => {
    const loanPrompt = prompt("Please enter the amount you wish to loan");
    let loanAmount = loanPrompt;
    let loanMax = parseInt(bankBalance)*2;
    if (loanExist===false){ 
        if (loanPrompt<=loanMax){ 
            loanBalance = parseInt(loanAmount) + loanBalance;
            loanExist = true;
            loanBalanceElement.innerText = parseInt(loanBalance);
        }
    }
}

const handleWorkButton = () => {
    salaryBalance = parseInt(salaryBalance)+100;
    salaryBalanceElement.innerText = parseInt(salaryBalance);
    if (loanBalance<=0) {
        loanExist = false;
    }
}


const transfSalToBank = () => {
    if(loanExist==true){
        let tmpbankBalance = (90/100)*parseInt(salaryBalance);
        bankBalance = parseInt(tmpbankBalance)+bankBalance;
        let tmpLoanBalance = parseInt(salaryBalance) * 0.1;
        loanBalance = parseInt(loanBalance) - parseInt(tmpLoanBalance);
        salaryBalance = 0;
        bBalanceElement.innerText = parseInt(bankBalance);
        salaryBalanceElement.innerText = parseInt(salaryBalance);
        loanBalanceElement.innerText = parseInt(loanBalance);
        if (loanBalance <= 0) {
            loanExist = false
        }
    }else{
        bankBalance=parseInt(salaryBalance)+bankBalance;
        salaryBalance = 0;
        bBalanceElement.innerText = parseInt(bankBalance);
        salaryBalanceElement.innerText = parseInt(salaryBalanceElement);
        if (loanBalance<=0) {
            loanExist = false;
        }
    }
}

const handlePayLoan = () => {
    //Chore: Hide button
    if (loanExist==true) {
        //Chore: show button
        //document.getElementById("hideLoan").style.visibility = "visible";
        if (loanBalance>=salaryBalance) {
            loanBalance = parseInt(loanBalance) - salaryBalance;
            salaryBalance = 0;
            loanBalanceElement.innerText = parseInt(loanBalance);
            salaryBalanceElement.innerText = parseInt(salaryBalance);
            loanExist = false;
        }else{
            loanBalance = parseInt(loanBalance) - salaryBalance;
            salaryBalance = 0;
            let tempLoanBalance = Math.abs(loanBalance);

            if(loanBalance<0){
                bankBalance = parseInt(tempLoanBalance)+bankBalance;
                loanBalance = 0;
                loanBalanceElement.innerText = parseInt(loanBalance);
                salaryBalanceElement.innerText = parseInt(salaryBalance);
                bBalanceElement.innerText = parseInt(bankBalance);
                loanExist=false;
        }
        }
    }
}

const handlePay = () => {
    const selectedPc = computers[computersElement.selectedIndex];
    const totalPay = selectedPc.price;
    let change = parseInt(bankBalance - totalPay);
        if (change>=0) {
            alert('Congratulations on your new '+ selectedPc.title + 
            '\nTotal change: ' + change);
            bankBalance = parseInt(bankBalance) - totalPay;
            bBalanceElement.innerText = parseInt(bankBalance);
        }else{
            alert('No pain, no gain, go work more and come back when you are rich')
        }
}

computersElement.addEventListener("change", handleComputerChange);
salaryBalanceElement.addEventListener("change",);
payElement.addEventListener("click", handlePay);
loanBalanceElement.addEventListener("change", handleGetLoan);
workElement.addEventListener("click", handleWorkButton)
salaryTransferToBankElement.addEventListener("click", transfSalToBank);
