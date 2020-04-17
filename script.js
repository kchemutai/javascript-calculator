let operators=document.querySelectorAll('.operator');
let numbers=document.querySelectorAll('.number');
let display=document.querySelector('#screen-result')
let equals=document.querySelector('.equals');
let clear=document.querySelector('.clear');
const decimal = document.querySelector('.decimal')
const backspace = document.querySelector('.backspace')
let previousValue='',currentValue='';
let chosen_operator = '';

//each time a number button is clicked, append it to the displayed value
numbers.forEach(number=>{
  number.addEventListener('click',(e)=>{
    appendNumber(e.target)
  })
})

//ckecks if an operator has been clicked and sends the current displayed number to num1 
operators.forEach(operator=>{
    operator.addEventListener('click',(e)=>{
      // if an operator is clicked while the previous value is already stored, an operator was also previously chosen, calculate the result and make it the current value in the screen
      if(previousValue !== '')
      {
        let screenValue = display.textContent;
        let calculatedValue = operate(chosen_operator, previousValue, screenValue)
        updateDisplay(calculatedValue)
      }
      previousValue=display.textContent
      display.textContent = ''
      chosen_operator=e.target.textContent;
    })
  })

backspace.addEventListener('click', ()=>{
  let currentScreenValue = display.textContent
  let removelastElement = currentScreenValue.substring(0, currentScreenValue.length-1)
  display.textContent = removelastElement
})

//when AC button is clicked, it should clear the display and any other temportary values
clear.addEventListener('click', clearDisplay)

//when equals is clicked it checks if values in previous and current Values are not empty 
equals.addEventListener('click', ()=>{
  currentValue = display.textContent;
  if(previousValue && currentValue !== '')
  {
  let operation = operate(chosen_operator, previousValue,currentValue)
  display.textContent = operation
  previousValue = ''
  }
})


//each number clicked is appended to the display
function appendNumber(element){
 
  if(display.textContent === '0')
  {
    display.textContent = element.textContent;
  }
  else if(element.textContent==='.'){
    if(!display.textContent.includes('.')){
      display.textContent += element.textContent
    }
  }
  else
  {
    display.textContent +=element.textContent;
  }
}

function updateDisplay(value){
  display.textContent = value;
}
//remove all the values in the display and clear the holders of temporary numbers
function clearDisplay(){
  display.textContent = '0'
  num1=0;
  num2 =0;
  chosen_operator =''
}

function add(a,b){
  return a+b;
}

function divide(a,b){
  let result = a/b
  if(result == 'Infinity'){
    return "Error"
  }
  else if(result.toString().includes('.')){
    return result.toFixed(2)
  }
  else return result
}

function multiply(a,b){
  return a*b;
}

function minus(a,b){
  return a-b;
}


//function to perform the calculation
function operate(operator, num1,num2){
  num1 = parseFloat(num1)
  num2 = parseFloat(num2)
  switch(operator){
    case '*':
      return multiply(num1,num2);
      break;
    
    case '-':
      return minus(num1,num2);
      break;

    case '/':
      return divide(num1,num2);
      break;

    case '+':
      return add(num1,num2);
      break;
  }
}

