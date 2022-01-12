
//HTML elements
const consoleBody = document.getElementById('console-body')
const consoleFormInput = document.getElementById('console-input')
const textInput = document.getElementById('text-input');

//Set focus of the input field
let focusText = function(removeFocus = false){
    if(removeFocus === true){
        textInput.blur();
    }
    else textInput.focus();
}

//Focus text on load
window.onload = focusText();

let consoleMain = function(){
    //Clear
    if(textInput.value === 'clear'){
        consoleBody.innerHTML = null;
    }
    //Help
    else if(textInput.value === 'help'){
        consoleBody.appendChild(createHelpNode());
    }
    else if (textInput.value === ''){
        consoleBody.appendChild(createNewlineNode());
    }
    else{
        consoleBody.appendChild(createErrorNode());
    }
    textInput.value = '';
}

//Nodes

//Newline
let createHelpNode = function(){
    const helpElement = document.createElement('p');
    helpElement.appendChild(document.createTextNode("Here is the help menu!"));
    return helpElement;
}

//Help
let createNewlineNode = function(){
    return document.createElement("br"); 
}

//Error
let createErrorNode = function(){
    const errorElement = document.createElement('p');
    errorElement.appendChild(document.createTextNode("Invalid command!")); 
    errorElement.classList.add('error-text');
    errorElement.classList.add('error-text-glow');
    return errorElement;
}

//Prevent page refresh when submitting to the console
function preventFormOnSubmit(event){
     event.preventDefault(); 
} 

consoleFormInput.addEventListener('submit', preventFormOnSubmit);