//Create two memories for numbers and a state for operators.
let memory1 = 0;
let memory2 = 0;
let op;

let displayedDigits = document.querySelector('#digits');
let displayedOperators = document.querySelector('#operators');
//Add event listeners to the calculator buttons.
//Add keyboard support.
let one = document.querySelector('#one');
one.addEventListener('click', function(){
    operate(1);
});
window.addEventListener('keydown', (e) => {
    if(e.key === '1'){
        operate(1);
    }
});

let two = document.querySelector('#two');
two.addEventListener('click', function(){
    operate(2);
});
window.addEventListener('keydown', (e) => {
    if(e.key === '2'){
        operate(2);
    }
});

let three = document.querySelector('#three');
three.addEventListener('click', function(){
    operate(3);
});
window.addEventListener('keydown', (e) => {
    if(e.key === '3'){
        operate(3);
    }
});

let four = document.querySelector('#four');
four.addEventListener('click', function(){
    operate(4);
});
window.addEventListener('keydown', (e) => {
    if(e.key === '4'){
        operate(4);
    }
});

let five = document.querySelector('#five');
five.addEventListener('click', function(){
    operate(5);
});
window.addEventListener('keydown', (e) => {
    if(e.key === '5'){
        operate(5);
    }
});

let six = document.querySelector('#six');
six.addEventListener('click', function(){
    operate(6);
});
window.addEventListener('keydown', (e) => {
    if(e.key === '6'){
        operate(6);
    }
});

let seven = document.querySelector('#seven');
seven.addEventListener('click', function(){
    operate(7);
});
window.addEventListener('keydown', (e) => {
    if(e.key === '7'){
        operate(7);
    }
});

let eight = document.querySelector('#eight');
eight.addEventListener('click', function(){
    operate(8);
});
window.addEventListener('keydown', (e) => {
    if(e.key === '8'){
        operate(8);
    }
});

let nine = document.querySelector('#nine');
nine.addEventListener('click', function(){
    operate(9);
});
window.addEventListener('keydown', (e) => {
    if(e.key === '9'){
        operate(9);
    }
});

let zero = document.querySelector('#zero');
zero.addEventListener('click', function(){
    operate(0);
});
window.addEventListener('keydown', (e) => {
    if(e.key === '0'){
        operate(0);
    }
});

let decimal = document.querySelector('#decimal');
decimal.addEventListener('click', function(){
    operate('.');
});
window.addEventListener('keydown', (e) => {
    if(e.key === '.'){
        operate('.');
    }
});

let CLR = document.querySelector('#CLR');
CLR.addEventListener('click', function(){
    memory1 = 0;
    memory2 = 0;
    op = undefined;
    displayedDigits.textContent = 0;
    displayedOperators.textContent = '';
});
window.addEventListener('keydown', (e) => {
    if(e.key === 'c'){
        memory1 = 0;
        memory2 = 0;
        op = undefined;
        displayedDigits.textContent = 0;
        displayedOperators.textContent = '';
    }
});

let DEL = document.querySelector('#DEL');
DEL.addEventListener('click', function(){
    operate('DEL');
});
window.addEventListener('keydown', (e) => {
    if(e.key === 'Backspace'){
        operate('DEL');
    }
});

let addition = document.querySelector('#addition');
addition.addEventListener('click', function(){
    operate('+');
});
window.addEventListener('keydown', (e) => {
    if(e.key === '+'){
        operate('+');
    }
});

let subtraction = document.querySelector('#subtraction');
subtraction.addEventListener('click', function(){
    operate('-');
});
window.addEventListener('keydown', (e) => {
    if(e.key === '-'){
        operate('-');
    }
});

let multiplication = document.querySelector('#multiplication');
multiplication.addEventListener('click', function(){
    operate('*');
});
window.addEventListener('keydown', (e) => {
    if(e.key === '*'){
        operate('*');
    }
});

let division = document.querySelector('#division');
division.addEventListener('click', function(){
    operate('/');
});
window.addEventListener('keydown', (e) => {
    if(e.key === '/'){
        operate('/');
    }
});

let equal = document.querySelector('#equal');
equal.addEventListener('click', function(){
    operate('=');
});
window.addEventListener('keydown', (e) => {
    if(e.key === '='){
        operate('=');
    }
});

function operate(x){
    //If you click on a number...
    if(typeof(x) === 'number' || x === '.'){
        //If the previously chosen operator is =,
        //then clean up memory 2 upon clicking on a new number.
        if(op === '='){
            memory2 = 0;
            op = undefined;
            displayedOperators.textContent = '';
        }
        //Append the value to memory 2.
        //First see if the user is attempting to
        //enter a decimal point.
        if(x === '.' || typeof(memory2) === 'string'){
            //Prevent the user from entering more than
            //one decimal point.
            if(typeof(memory2) === 'string' && memory2.includes('.') && x === '.'){
                return;
            }
            memory2 = String(memory2);
            //Ensure that the number fits the screen.
            if(memory2.length > 9){
                return;
            }
            memory2 = memory2 + x;
            displayedDigits.textContent = memory2;
        }
        //If the user is not entering a decimal point, do this.
        if(typeof(memory2) === 'number'){
            //Ensure that the number fits the screen.
            if(String(memory2).length > 9){
                return;
            }
            memory2 = memory2 * 10 + x;
            displayedDigits.textContent = memory2;
        }
    //If you click on a non-equal operator...
    } else if(x === '+' || x === '-' || x === '*' || x === '/'){
        //first check whether there are already two numbers
        //stored in memories 1 and 2. If so, operate on
        //those two numbers according to the operator that was chosen earlier.
        memory2 = Number(memory2);
        if(memory1 !== 0){
            if(op === '+'){
                add(memory1, memory2);
            }
            if(op === '-'){
                subtract(memory1, memory2);
            }
            if(op === '*'){
                multiply(memory1, memory2);
            }
            if(op === '/'){
                divide(memory1, memory2);
            }
        }
        //Assign the new operator to op
        //and commit the content in memory 2 to memory 1.
        //Also, wipe out the value in memory 2.
        if(String(memory2).length > 9){
            displayedDigits.textContent = String(memory2).slice(0, 10);
        } else {
            displayedDigits.textContent = memory2;
        }
        op = x;
        displayedOperators.textContent = op;
        memory1 = memory2;
        memory2 = 0;
    //If you click on an equal operator...
    //depending on what's stored in op,
    //choose one of the following operations...
    } else if(x === '='){
        memory2 = Number(memory2);
        if(op === '+'){
            add(memory1, memory2);
        }
        if(op === '-'){
            subtract(memory1, memory2);
        }
        if(op === '*'){
            multiply(memory1, memory2);
        }
        if(op === '/'){
            divide(memory1, memory2);
        }
        if(String(memory2).length > 9){
            displayedDigits.textContent = String(memory2).slice(0, 10);
        } else {
            displayedDigits.textContent = memory2;
        }
        memory1 = 0;
        op = x;
        displayedOperators.textContent = op;
    //If the user clicks on DEL...
    } else if(x === 'DEL'){
        if(op === '=' || memory2 === 0){
            return;
        } else if(typeof(memory2) === 'string'){
            memory2 = memory2.slice(0, -1);
            displayedDigits.textContent = memory2;
        } else if(typeof(memory2) === 'number'){
            memory2 = String(memory2).slice(0, -1);
            memory2 = Number(memory2);
            displayedDigits.textContent = memory2;
        }
    }
}

function add(a, b){
    memory2 = a + b;
}
function subtract(a, b){
    memory2 = a - b;
}
function multiply(a, b){
    memory2 = a * b;
}
function divide(a, b){
    memory2 = a / b;
    if(memory2 === Infinity){
        memory2 = 'Undefined';
    }
}