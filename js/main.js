//=====Define HTML Elements=====
const consoleBody = document.getElementById('console-body')
const consoleFormInput = document.getElementById('console-input')
const textInput = document.getElementById('text-input');

//=====Define Output Variables=====
let commandDefinitions = [
    'help: displays this help screen',
    'ls: lists possible items to display'
]

let directoryDefinitions = [
    'about: displays general information',
    'portfolio: presents a list of projects',
    'blog: presents a list of blog entries',
    'contact: presents contact information'
]

//=====Main Function START=====
function consoleMain(){

    //Ensure input is lowercase string
    let input = String(textInput.value).toLowerCase()

    //Display input
    consoleBody.appendChild(createConsoleReponse(
        `> ${input}`, 
        [
            'standard-text', 
            'standard-text-glow'
        ],
        )
    );

    //=====Clear=====
    if(input === 'clear' || input === 'cls'){
        consoleBody.innerHTML = null;
    }

    //=====Help=====
    else if(input === 'help' || input === '--help' || input === '-h'){
        consoleBody.appendChild(createConsoleReponse(
            'Welcome to the help menu!', 
            [
                'standard-text', 
                'standard-text-glow'
            ],
            1
            )
        );

        consoleBody.appendChild(createConsoleReponse(
            'Below you will find a list of possible commands:', 
            [
                'standard-text', 
                'standard-text-glow'
            ],
            2
            )
        );

        commandDefinitions.forEach(definition => {
            consoleBody.appendChild(createConsoleReponse(
                definition, 
                [
                    'standard-text', 
                    'standard-text-glow'
                ],
                2
                )
            );
        })
    }

    //=====List Items=====
    else if(input === 'ls' || input === 'pwd'){
        directoryDefinitions.forEach(definition => {
            consoleBody.appendChild(createConsoleReponse(
                definition, 
                [
                    'standard-text', 
                    'standard-text-glow'
                ],
                2
                )
            );
        })
    }

    //=====Blank=====
    else if (input === ''){
        consoleBody.appendChild(document.createElement('br'));
    }

    //=====Error=====
    else{
        consoleBody.appendChild(createConsoleReponse(
            `Could not find command "${input}"!`,
            [
                'error-text', 
                'error-text-glow'
            ], 
            2
            )
        );
        consoleBody.appendChild(createConsoleReponse(
            'Try the "help" command for a list of possible commands.',
            [
                'standard-text', 
                'standard-text-glow'
            ]
            )
        );
    }

    //Reset prompt
    textInput.value = '';
}
//=====Main Function END=====

//=====Display Functions START=====
/**
 * Create a new text node
 * @param {string} text The text to be displayed
 * @param {string[]} classes Classes to apply to the new text element
 * @param {int} trailingSpaces Number of trailing spaces following text
 * @returns A new paragraph element
 */
 function createConsoleReponse(text, classes = [], trailingSpaces = 0){
    const responseContainer = document.createElement('p')
    responseContainer.appendChild(document.createTextNode(String(text)));

    //Add any classes specified
    classes.forEach(classItem => {
        responseContainer.classList.add(classItem);
    });

    //Append <br> nodes
    for (let index = 0; index < trailingSpaces; index++) {
        responseContainer.appendChild(document.createElement('br'));
    }
    
    return responseContainer;
}
//=====Display Functions END=====

//Set or remove focus of the input field
function focusText(removeFocus = false){
    if(removeFocus === true){
        textInput.blur();
    }
    else textInput.focus();
}

//=====Delay Functions START=====
visibleAfterDelay(document.getElementsByClassName('delay-1'), 1)
visibleAfterDelay(document.getElementsByClassName('delay-2'), 1.5)
visibleAfterDelay(document.getElementsByClassName('delay-3'), 2)
visibleAfterDelay(document.getElementsByClassName('delay-4'), 4)

/**
 * Make hidden elements visible after given time delay
 * @param {HtmlCollectionOf<Element>} elements collection of elements to show
 * @param {time} time Time in seconds
 */
function visibleAfterDelay(elements, time){
    setTimeout(() => {
        for (let index = 0; index < elements.length; index++) {
                elements[index].style.visibility = 'visible';
            }  
    }, (time*1000)) 
}

//Enable input only after initial timeout
setTimeout(() => {
    textInput.attributes.removeNamedItem('disabled');
    focusText();
}, 4005);
//=====Delay Functions START=====

//Prevent page refresh when submitting to the console
function preventFormOnSubmit(event){
     event.preventDefault(); 
} 

consoleFormInput.addEventListener('submit', preventFormOnSubmit);