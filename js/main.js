//=====Define HTML Elements=====
const consoleBody = document.getElementById('console-body');
const consoleFormInput = document.getElementById('console-input');
const textInput = document.getElementById('text-input');
const displayDirectory = document.getElementById('currentDirectory');

//=====Define Directory Tree=====
let directories = {
    root: {
        displayName: 'home',
        description: 'The root directory of the application',
        childDirectories: {
            about: {
                displayName: 'about',
                description: 'Displays general information',
                childDirectories: {
                    contact: {
                        displayName: 'contact',
                        description: 'Contact information',
                        childDirectories: {}
                    },
                }
            },
            projects: {
                displayName: 'projects',
                description: 'Presents a list of projects',
                childDirectories: {}
            },
            blog: {
                displayName: 'blog',
                description: 'Presents a list of blog entries',
                childDirectories: {}
            },

        }
    }
}

//Initialize in root directory
let currentDirectory = directories.root;
displayDirectory.innerHTML = currentDirectory.displayName;

//======Define Commands START=====
let commands = {
    help: [
        'help: Displays this help screen',
        'ls: Lists possible items to display',
        'cd: Change the current working directory (supports / and home but not ..)',
        'clear: Clear the terminal'
    ],
    cd: [
        'change directory'
    ]
}
//======Define Commands END=====

//=====Main Function START=====
function consoleMain(){

    //Ensure input is lowercase string
    let input = String(textInput.value).toLowerCase().trim();

    //Separate command from command flags
    let inputCommands = input.split(' ');

    //Display input
    consoleBody.appendChild(createConsoleReponse(
        `${displayDirectory.innerHTML} > ${input}`, 
        [
            'standard-text', 
            'standard-text-glow'
        ],
        )
    );

    //=====Clear=====
    if(inputCommands[0] === 'clear' || inputCommands[0] === 'cls'){
        consoleBody.innerHTML = null;
    }

    //=====Help=====
    else if(inputCommands[0] === 'help'){
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

        commands.help.forEach(definition => {
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
    else if(inputCommands[0] === 'ls' || inputCommands[0] === 'pwd'){
        for (const [key, value] of Object.entries(currentDirectory.childDirectories)) {
            consoleBody.appendChild(createConsoleReponse(
                `${key} : ${value.description}`, 
                [
                    'standard-text', 
                    'standard-text-glow'
                ],
                2
                )
            );
        }
    }

    //=====Change Directory=====
    else if(inputCommands[0] === 'cd'){
        //Check command success
        let changedDirectory = false;

        //Change to specific directory
        for (const [key, value] of Object.entries(currentDirectory.childDirectories)){
            if (inputCommands[1] === key){
                currentDirectory = currentDirectory.childDirectories[key];
                displayDirectory.innerHTML += `/${key}`;
                changedDirectory = true;
            }
        }

        //Change to root directory
        if (inputCommands[1] === '/' || inputCommands[1] === 'home'){
            currentDirectory = directories.root;
            displayDirectory.innerHTML = currentDirectory.displayName;
            changedDirectory = true;
        }
        
        //Directory not changed
        if (changedDirectory === false)
            consoleBody.appendChild(createConsoleReponse(
                `Could not find directory "${inputCommands[1]}"!`,
                [
                    'error-text', 
                    'error-text-glow'
                ], 
                2
                )
            );
        
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
    window.scrollTo(0, document.body.scrollHeight);
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

//=====Delay Functions START=====
visibleAfterDelay(document.getElementsByClassName('delay-1'), 1)
visibleAfterDelay(document.getElementsByClassName('delay-2'), 1.5)
visibleAfterDelay(document.getElementsByClassName('delay-3'), 2)
visibleAfterDelay(document.getElementsByClassName('delay-4'), 4)

/**
 * Make hidden elements visible after given time delay
 * @param {HtmlCollectionOf<Element>} elements Collection of elements to show
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
//=====Delay Functions END=====

//Prevent page refresh when submitting to the console
consoleFormInput.addEventListener('submit', preventFormOnSubmit);

function preventFormOnSubmit(event){
    event.preventDefault(); 
} 

//Set or remove focus of the input field
function focusText(removeFocus = false){
    if(removeFocus === true){
        textInput.blur();
    }
    else textInput.focus();
}