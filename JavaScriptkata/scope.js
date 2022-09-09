var x = 7;
function foo (){
    console.log(this.x+this.y);
}
foo();
var foo = function(){
    console.log(this.x+this.y);
}
foo();
var y = 8;
function foo (){
console.log(y);
}
foo();