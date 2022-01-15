//=====Define HTML Elements=====
const consoleBody = document.getElementById('console-body');
const consoleFormInput = document.getElementById('console-input');
const textInput = document.getElementById('text-input');
const displayDirectory = document.getElementById('currentDirectory');

//=====Define Directory Tree START=====
let directories = {
    root: {
        //home
        displayName: 'home',
        description: 'The root directory of the application',
        childDirectories: {
            //home/about
            about: {
                displayName: 'about',
                description: 'Displays general information',
                childDirectories: {
                    //home/about/contact
                    contact: {
                        displayName: 'contact',
                        description: 'Contact information',
                        childDirectories: {}
                    },
                }
            },
            //home/projects
            projects: {
                displayName: 'projects',
                description: 'Presents a list of projects',
                childDirectories: {}
            },
            //home/blog
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
//=====Define Directory Tree END=====

//======Define Commands START=====
let commandOutput = {
    help: [
        'help: Displays this help screen',
        'ls: Lists possible items to display',
        'cd: Change the current working directory (supports "/" or "home" but not "..")',
        'clear: Clear the terminal',
    ],
    about: [],
    contact: [],
    projects: [],
    blog: []    
}
//======Define Commands END=====

//=====Main Function START=====
function consoleMain(){

    //Ensure input is lowercase string
    let input = String(textInput.value).toLowerCase().trim();

    //Separate command from command flags
    let inputCommands = input.split(' ');

    //Display past prompt entries
    consoleBody.appendChild(createConsoleReponse(
        `${displayDirectory.innerHTML} > ${textInput.value}`, 
        [
            'standard-text', 
            'standard-text-glow'
        ],
        )
    );

    //==========Clear==========
    if(inputCommands[0] === 'clear' || inputCommands[0] === 'cls'){
        consoleBody.innerHTML = null;
    }

    //==========Help==========
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

        commandOutput.help.forEach(line => {
            consoleBody.appendChild(createConsoleReponse(
                line, 
                [
                    'standard-text', 
                    'standard-text-glow'
                ],
                2
                )
            );
        })
    }

    //==========List Items==========
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

    //==========Change Directory==========
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

    //==========Blank==========
    else if (input === ''){
        consoleBody.appendChild(document.createElement('br'));
    }

    //==========Error==========
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

fetchPortfolioContent()

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

/**
 * 
 * @param {string} className The element to fetch contents from
 */

//netlify.toml file required on portfolio to bypass CORS policy error on fetch
function fetchPortfolioContent(){
    const response = fetch('https://ryanjonah.com/index.html')  
    .then(response => response.text());
    response.then(html => console.log(html))
}
//=====Display Functions END=====

//=====Delay Functions START=====
visibleAfterDelay(document.getElementsByClassName('delay-1'), 0.5)
visibleAfterDelay(document.getElementsByClassName('delay-2'), 1.8)
visibleAfterDelay(document.getElementsByClassName('delay-3'), 2.5)
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