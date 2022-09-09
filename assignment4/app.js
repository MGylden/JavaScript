const computersElement = document.getElementById("computers");
const loanElement = document.getElementById("getLoanButton");
const balanceElement = document.getElementById("bankBalance");
const priceElement = document.getElementById("price")

let computers = [];
let loan = 0;
let balance = 0;

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

computersElement.addEventListener("change", handleComputerChange);