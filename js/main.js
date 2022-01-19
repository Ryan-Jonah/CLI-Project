//==========Fetch HTML DOM of Portfolio==========
const parser       = new DOMParser();
const portfolioUrl = 'https://ryanjonah.com/';

const portfolioDomAsync = fetch(portfolioUrl)
    .then(response => response.text())
    .then(htmlText => {return parser.parseFromString(htmlText, 'text/html')})

//==========Define HTML Elements==========
const consoleBody      = document.getElementById('console-body');
const consoleFormInput = document.getElementById('console-input');
const textInput        = document.getElementById('text-input');
const displayDirectory = document.getElementById('currentDirectory');

/* -----Fetch About-----
// console-about-title    : innerHTML
// console-about-content  : innerHTML
// console-about-resume   : href
// console-about-github   : href
// console-about-linkedin : href
*/
getInnerHtmlByClassAsync('console-about-title')
    .then(title => {
     getInnerHtmlByClassAsync('console-about-content')
        .then(info => {
            //Create home/about/title[0]
            createItem(title[0], directories.root.childDirectories.about, info[0]);
        })

    //Create resume item
     getHrefByClassAsync('console-about-resume')
     .then(resumeLink => {

        //Quickfix to replace local url with portfolio url
        resumeLink[0].href = resumeLink[0].href.replace(window.location.href, portfolioUrl);

        //Download resume
        createLink(
            resumeLink[0], 
            directories.root.childDirectories.about.childDirectories[title[0]], 
            "Resume"
            );
     })

     //TODO: Add skills + education/experience section
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
                        createItem(
                            title, 
                            directories.root.childDirectories.projects, 
                            info[index].replace(RegExp(/(<br>)+/), ' ')
                        )
                
                        //Repository link
                        createLink(
                            github[index], 
                            directories.root.childDirectories.projects.childDirectories[title],
                            'Github'
                        )
                
                        //Live link
                        createLink(
                            live[index], 
                            directories.root.childDirectories.projects.childDirectories[title],
                            'Live'
                        )

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
                    createItem(
                        title, 
                        directories.root.childDirectories.blog, 
                        abstract[index].replace(RegExp(/(<br>)+/), ' ')
                    )

                    //Blog link
                    createLink(
                        blogLink[index],
                        directories.root.childDirectories.blog.childDirectories[title],
                        title
                    )      
            })
        })
    })
})

/*-----Fetch Contact-----
// console-about-name     : innerHTML
// console-about-email    : innerHTML (href contains mailto)
// console-about-location : innerHTML
// console-about-phone    : innerHTML
*/
//Create home/contact/Name
getInnerHtmlByClassAsync('console-about-name')
.then(name => {
    createItem('Name', directories.root.childDirectories.contact, name[0]);
})

 //Create home/contact/Location
getInnerHtmlByClassAsync('console-about-location')
    .then(location => {
        createItem('Location', directories.root.childDirectories.contact, location[0]);
    })

 //Create home/contact/Phone
getInnerHtmlByClassAsync('console-about-phone')
    .then(phone => {
        createItem('Phone', directories.root.childDirectories.contact, phone[0]);
    })

 //Create home/contact/Email
 getHrefByClassAsync('console-about-email')
    .then(emailLink => {
        getInnerHtmlByClassAsync('console-about-email')
            .then(email => {

                createItem('Email', directories.root.childDirectories.contact, emailLink[0])

                createLink(
                    emailLink[0], 
                    directories.root.childDirectories.contact.childDirectories['Email'].description, 
                    emailLink[0])
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
                description: 'Contains links to my personal projects',
                childDirectories: {}
            },
            //home/blog
            blog: {
                displayName: 'blog',
                description: 'Contains my most recent blog entries',
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
 async function getHrefByClassAsync(className){
    const elements = await getElementsByClassNameAsync(className);

    let linkCollection = [];
    for (let index = 0; index < elements.length; index++) {

        let newLink = document.createElement('a');
        newLink.href = elements[index].getAttribute('href');

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

//==========Constructor Functions START==========
/**
 * Creates a new directory in the directory tree
 * @param {string} directoryName Name the new directory
 * @param {object} targetDirectory Specifies the new directory location
 * @param {boolean} isDirectory Determines the type of item
 */
function createItem(itemName, targetDirectory, description = '', isDirectory = false){

    //Remove invalid characters for cd command
    isDirectory ? itemNameSafe = createDirectoryName(itemName) 
                : itemNameSafe = itemName;

    //Create only if no duplicates exist
    if (targetDirectory.childDirectories[itemNameSafe] === undefined)
    {
        targetDirectory.childDirectories[itemNameSafe] = new Object();
        targetDirectory.childDirectories[itemNameSafe].displayName = itemName;
        targetDirectory.childDirectories[itemNameSafe].description = description;

        if (isDirectory){
            targetDirectory.childDirectories[itemNameSafe].childDirectories = new Object();    
        }  
    }
}

/**
 * Creates a new link item
 * @param {string} linkHref The uri of the link's resource
 * @param {object} targetDirectory Specifies the new directory location
 * @param {string} linkText The text to be displayed within the link
 * @param {boolean} newTab States whether the link should open a new tab
 */
function createLink(linkHref, targetDirectory, linkText, newTab = true){

    linkHref.classList.add('info-text', 'info-text-glow', 'text-inline');
    linkHref.innerHTML = `[-> ${linkText}]`;
    targetDirectory[linkText] = linkHref;

    if (newTab){
        linkHref.setAttribute('target', '_blank');
    }
}
//==========Constructor Functions END==========

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