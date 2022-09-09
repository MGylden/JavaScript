let map = new Map();

new Map() // creates the Map.
map.set(key, value) // stres key/value pair.
map.get(key) // returns the value found by the key, undefined otherway.
map.has(key) // returns true, if the key exists, false otherway.
map.delete(key) // removes the key.
map.clear() // cleares the wentire Map object.
map.size // returns the current size of the map object.
let persons = new Map([
    ['Uwe', 100],
    ['Katie', 200],
    ['Jon', 300]
]) 

console.log(persons.size);

for(let name of persons.keys()){
    console.log(name);
}

for(let name of persons.values()){
    console.log(name);
}

for(let entry of persons){
    console.log(entry);
}
persons.forEach((value, key, map) => {console.log(`${key}: ${value}`);});
persons.forEach((key, value, map) => {console.log(`${key}: ${value}`);});

setInterval.forEach((value, valueAgain, set) => )