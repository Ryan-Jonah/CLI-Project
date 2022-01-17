//==========Fetch HTML DOM of Portfolio==========
const parser = new DOMParser();

const portfolioDomAsync = fetch('https://ryanjonah.com/')
.then(response => response.text())
.then(htmlText => {return parser.parseFromString(htmlText, 'text/html')})

//==========Define HTML Elements==========

//Console
const consoleBody = document.getElementById('console-body');
const consoleFormInput = document.getElementById('console-input');
const textInput = document.getElementById('text-input');
const displayDirectory = document.getElementById('currentDirectory');

/* -----Fetch About-----
// console-about-title    : innerHTML
// console-about-content  : innerHTML
// console-about-name     : innerHTML
// console-about-email    : innerHTML (href contains mailto)
// console-about-location : innerHTML
// console-about-phone    : innerHTML
// console-about-resume   : href
// console-about-github   : href
// console-about-linkedin : href
*/
getInnerHtmlByClassAsync('console-about-title')
    .then(title => {
     //Create about item
     directories.root.childDirectories.about.childDirectories[title[0]]
     = new Object();

     //Display name
     directories.root.childDirectories.about.childDirectories[title[0]]
     .displayName = title[0];

     //Description
     getInnerHtmlByClassAsync('console-about-content')
        .then(info => {
            directories.root.childDirectories.about.childDirectories[title[0]]
            .description = info[0];
        })

    //===Contact Information===

    //Create name item
     getInnerHtmlByClassAsync('console-about-name')
        .then(name => {
            directories.root.childDirectories.contact.childDirectories['Name']
            = new Object();

            directories.root.childDirectories.contact.childDirectories['Name']
            .description = name[0];
        })

     //Create location item
    getInnerHtmlByClassAsync('console-about-location')
        .then(location => {
            directories.root.childDirectories.contact.childDirectories['Location']
            = new Object();
            
            directories.root.childDirectories.contact.childDirectories['Location']
            .description = location[0];
        })

     //Create phone item
    getInnerHtmlByClassAsync('console-about-phone')
        .then(phone => {
            directories.root.childDirectories.contact.childDirectories['Phone']
            = new Object();
            
            directories.root.childDirectories.contact.childDirectories['Phone']
            .description = phone[0];
        })

     //Create email item
     getHrefByClassAsync('console-about-email')
        .then(emailLink => {

            directories.root.childDirectories.contact.childDirectories['Email']
            = new Object();

            getInnerHtmlByClassAsync('console-about-email')
                .then(email => {
                    emailLink[0].classList.add('info-text', 'info-text-glow', 'text-inline');
                    emailLink[0].innerHTML = `[-> ${email}]`;

                    directories.root.childDirectories.contact.childDirectories['Email']
                    .description = emailLink[0];
                })

        })

})


/*-----Fetch Projects-----
console-project-title  : innerHTML
console-project-info   : innerHTML
console-project-github : href
console-project-live   : href
*/
getInnerHtmlByClassAsync('console-project-title')
    .then(titles => {
        getInnerHtmlByClassAsync('console-project-info')
        .then(info => {
            getHrefByClassAsync('console-project-github')
            .then(github => {
                getHrefByClassAsync('console-project-live')
                .then(live => {
                    titles.forEach((title, index) => {
    
                        //Create new project item
                        directories.root.childDirectories.projects.childDirectories[title]
                        = new Object();
                
                        //Display name
                        directories.root.childDirectories.projects.childDirectories[title]
                        .displayName = title;
                
                        //Description
                        directories.root.childDirectories.projects.childDirectories[title]
                        .description = info[index].replace(RegExp(/(<br>)+/), ' ');
                
                        //Repository link
                        github[index].classList.add('info-text', 'info-text-glow');
                        github[index].innerHTML = '[-> Github]';
                        directories.root.childDirectories.projects.childDirectories[title]
                        .repository = github[index];
                
                        //Live link
                        live[index].classList.add('info-text', 'info-text-glow');
                        live[index].innerHTML = '[-> Site]';
                        directories.root.childDirectories.projects.childDirectories[title]
                        .live = live[index];

                        //Hotfix to remove links: could be better implemented
                        if(live[index].href === `${window.location.href}#`){
                            live[index].hidden = true;
                        }

                })
            })
        })
    })
})

/*-----Fetch Blog-----
console-blog-title    : innerHTML
console-blog-abstract : innerHTML
console-blog-link     : href
*/
getInnerHtmlByClassAsync('console-blog-title')
    .then(titles => {
        getInnerHtmlByClassAsync('console-blog-abstract')
        .then(abstract => {
            getHrefByClassAsync('console-blog-link')
            .then(blogLink => {
                titles.forEach((title, index) => {
    
                    //Create new blog item
                    directories.root.childDirectories.blog.childDirectories[title]
                    = new Object();
            
                    //Display name
                    directories.root.childDirectories.blog.childDirectories[title]
                    .displayName = title;
            
                    //Blog Description
                    directories.root.childDirectories.blog.childDirectories[title]
                    .description = abstract[index].replace(RegExp(/(<br>)+/), ' ');
            
                    //Blog link
                    blogLink[index].classList.add('info-text', 'info-text-glow');
                    blogLink[index].innerHTML = `[-> ${title}]`;
                    directories.root.childDirectories.blog.childDirectories[title]
                    .blogLink = blogLink[index];
            
                    console.log(directories.root.childDirectories.blog.childDirectories);
            })
        })
    })
})

//==========Define Directory Tree START==========
let directories = {
    root: {
        //home
        displayName: 'home',
        description: 'The root directory of the application',
        childDirectories: {
            //home/about
            about: {
                displayName: 'about',
                description: 'Contains general information',
                childDirectories: {}
            },
            //home/projects
            projects: {
                displayName: 'projects',
                description: 'Directory which contains a list of my personal projects',
                childDirectories: {}
            },
            //home/blog
            blog: {
                displayName: 'blog',
                description: 'Presents a list of blog entries',
                childDirectories: {}
            },
            //home/contact
            contact: {
                displayName: 'contact',
                description: 'Contains contact information',
                childDirectories: {}
            },

        }
    }
}

//Initialize in root directory
let currentDirectory = directories.root;
displayDirectory.innerHTML = currentDirectory.displayName;
//==========Define Directory Tree END==========

//===========Define Commands START==========
let commandOutput = {
    //Help
    help: [
        'help: Displays this help screen',
        'ls: Lists possible items to display',
        'cd: Change the current working directory (supports "/" or "home" but not "..")',
        'clear: Clear the terminal',
    ],
    //About
    about: [],
    contact: [],
    //Projects
    projectTitles: [],
    projectInfo: [],
    projectGithub: [],
    projectLive: [],
    //Blog
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
                'info-text', 
                'info-text-glow'
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

        //Iterate over entries in commandOutput collection
        commandOutput.help.forEach(line => {
            consoleBody.appendChild(
                createConsoleReponse(line, ['standard-text', 'standard-text-glow'], 2)
            );
        })

        //Directory legend
        consoleBody.appendChild(
            createConsoleReponse('<==Legend==>', ['standard-text', 'standard-text-glow'])
        );

        //Directory
        consoleBody.appendChild(
            createConsoleReponse('directory', ['directory-text', 'directory-text-glow'])
        );

        //Standard item
        consoleBody.appendChild(
            createConsoleReponse('item', ['title-text', 'title-text-glow'])
        );

        //Link
        consoleBody.appendChild(
            createConsoleReponse('[-> link]', ['info-text', 'info-text-glow'], 2)
        );

    }

    //==========List Items==========
    else if(inputCommands[0] === 'ls' || inputCommands[0] === 'dir' ){
        for (const [directory, keys] of Object.entries(currentDirectory.childDirectories)) {

            //Determine if end of directory tree
            let directoryStyle = (keys.childDirectories !== undefined) 
                ? ['directory-text', 'directory-text-glow'] 
                : ['title-text', 'title-text-glow']

            //Adjust spacing based on number properties present to display
            let spaceAfterPropertyName = 2
            if (Object.keys(keys).length > 3){
                consoleBody.appendChild(createConsoleReponse('', [], 1));
                spaceAfterPropertyName = 1
            } 

            //Displays directories and their descriptions
            consoleBody.appendChild(createConsoleReponse(
                `${directory} `, 
                [
                    directoryStyle[0],
                    directoryStyle[1],
                    'inline-text'
                ]
                )
            );

            //TODO: Change quicfix for email to support all link descriptions
            if(directory === 'Email'){
                consoleBody.appendChild(keys.description);
                continue;
            }

            //Displays directory description
            consoleBody.appendChild(createConsoleReponse(
                keys.description, 
                [
                    'standard-text', 
                    'standard-text-glow',
                    'inline-text'
                ],
                2
                )
            );

            //Iterate over and displays directory contents
            Object.values(keys).forEach(item => {        

                //Hyperlinks
                if (item instanceof HTMLAnchorElement){
                    consoleBody.appendChild(consoleBody.appendChild(item));
                }
            })
        }
    }

    //==========Change Directory==========
    else if(inputCommands[0] === 'cd'){
        //Check command success
        let changedDirectory = false;

        //Change to specific directory if it contains childDirectories 
        for (const [directory, keys] of Object.entries(currentDirectory.childDirectories)){
            if (inputCommands[1] === directory && keys.childDirectories !== undefined){
                currentDirectory = currentDirectory.childDirectories[directory];
                displayDirectory.innerHTML += `/${directory}`;
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
//==========Main Function END==========

//==========Display Functions START==========
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
 * Creates a name with no special characters or whitespace
 * @param {string} name Name to be processed 
 * @returns The filtered name
 */
function createDirectoryName(name){
    return name.replace(RegExp(/\W\ +/), ' ')
        .replace(RegExp(/ +/), '')
        .toLowerCase();
}
//==========Display Functions END==========

//==========Fetch Functions START==========

/**
 * Gathers list of href links for all of the given classname items
 * @param {string} className Specifies the class name to search in the DOM
 * @returns List of processed anchor elements
 */
 async function getHrefByClassAsync(className, title = 'Link'){
    const elements = await getElementsByClassNameAsync(className);

    let linkCollection = [];
    for (let index = 0; index < elements.length; index++) {

        let newLink = document.createElement('a');
        newLink.href = elements[index].getAttribute('href');

        //Default text
        newLink.innerHTML = title;

        //Set links to open in new tab
        newLink.setAttribute('target', '_blank');

        linkCollection.push(newLink);
    }

    return linkCollection;
}

 /**
 * Gathers list of innerHTML content for all of the given classname items
 * @param {string} className Specifies the class name to search in the DOM
 * @param {boolean} directoryName Determines if the result should be parsed whitespace and special characters 
 * @returns innerHTML string[]
 */
async function getInnerHtmlByClassAsync(className, directoryName = false){
    const elements = await getElementsByClassNameAsync(className);

    let classContentCollection = [];
    for (let index = 0; index < elements.length; index++) {
        let content = elements[index].innerHTML;

        if (directoryName){
            content = createDirectoryName(content)
        }
        classContentCollection.push(content);
    }

    return classContentCollection;
}

/**
 * Class used to fetch elements from an external resource
 * @param {string} className Specifies the class name to search in the DOM
 * @param {Promise<Document>} DOM A promise resulting in an HTML DOM
 * @returns A collection of HTML Elements
 */
async function getElementsByClassNameAsync(className, DOM = portfolioDomAsync){
    const document = await DOM;
    return document.getElementsByClassName(className);
}
//==========Fetch Functions END==========


//==========Delay Functions START==========
visibleAfterDelay(document.getElementsByClassName('delay-1'), 0.5)
visibleAfterDelay(document.getElementsByClassName('delay-2'), 1.8)
visibleAfterDelay(document.getElementsByClassName('delay-3'), 2.5)
visibleAfterDelay(document.getElementsByClassName('delay-4'), 4)

//TODO: Require async resolutions before proceeding past "Gathering Requirements..."

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

//=====Scroll Functions END=====
//TODO: Add Scrolling
//=====Scroll Functions END=====

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