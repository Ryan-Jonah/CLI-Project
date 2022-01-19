# CLI-Project
### A command line project created using HTML, CSS, Javascript

Provides custom command line interface to access the information present on my portfolio by use of the Fetch API.  

Supports ls and cd commands to traverse directory tree, and includes links to external resources such as project repositories.  

*Additional features will be added in the future, such as interfacing with my blog through its API (in development)*

<img src="img/CLIdemo.png" alt="Console" />

## Portfolio DOM Classlist Reference

#### *Defines the classes used to fetch elements from portfolio site*

### About

| Classname | Content |
|---|---|
| console-project-title | innerHTML |
| console-project-content | innerHTML |
| console-project-resume | href |
| console-project-github | href |
| console-project-linkedin | href |

### Portfolio

| Classname | Content |
|---|---|
| console-project-title | innerHTML |
| console-project-info | innerHTML |
| console-project-github | href |
| console-project-live | href |

### Blog

| Classname | Content |
|---|---|
| console-blog-title | innerHTML |
| console-blog-abstract | innerHTML |
| console-blog-link | href |

### Contact

| Classname | Content |
|---|---|
| console-about-name | innerHTML |
| console-about-email | innerHTML (href contains mailto) |
| console-about-location | innerHTML |
| console-about-phone | innerHTML | 
  
<br />

## Display Functions
#### Create responses to display in the console  
 
    Create a new text node
    @param {string} text The text to be displayed
    @param {string[]} classes Classes to apply to the new text element
    @param {int} trailingSpaces Number of trailing spaces following text
    @returns A new paragraph element

    function createConsoleReponse(text, classes = [], trailingSpaces = 0)  

<!-- -->

    Creates a name with no special characters or whitespace
    @param {string} name Name to be processed 
    @returns The filtered name
    
    function createDirectoryName(name)  

## Fetch Functions  
#### Used to gather information from portfolio  

    Gathers list of href links for all of the given classname items
    @param {string} className Specifies the class name to search in the DOM
    @returns List of processed anchor elements
    
    async function getHrefByClassAsync(className)  
    
<!-- -->

    Gathers list of innerHTML content for all of the given classname items
    @param {string} className Specifies the class name to search in the DOM
    @param {boolean} directoryName Determines if the result should be parsed whitespace and special characters 
    @returns innerHTML string[]
    
    async function getInnerHtmlByClassAsync(className, directoryName = false)  

<!-- -->

    Class used to fetch elements from an external resource
    @param {string} className Specifies the class name to search in the DOM
    @param {Promise<Document>} DOM A promise resulting in an HTML DOM
    @returns A collection of HTML Elements
    
    async function getElementsByClassNameAsync(className, DOM = portfolioDomAsync)  

## Constructor Functions  
#### Used to create new items in the directory tree  

    Creates a new directory in the directory tree
    @param {string} directoryName Name the new directory
    @param {object} targetDirectory Specifies the new directory location
    @param {boolean} isDirectory Determines the type of item
     
    function createItem(itemName, targetDirectory, description = '', isDirectory = false)  

<!-- -->

    Creates a new link item
    @param {string} linkHref The uri of the link's resource
    @param {object} targetDirectory Specifies the new directory location
    @param {string} linkText The text to be displayed within the link
    @param {boolean} newTab States whether the link should open a new tab
    
    function createLink(linkHref, targetDirectory, linkText, newTab = true)  

## Delay Functionss  
#### Assists in initial onload delay effect  

    Make hidden elements visible after given time delay
    @param {HtmlCollectionOf<Element>} elements Collection of elements to show
    @param {time} time Time in seconds
    
    function visibleAfterDelay(elements, time)  
  
## Miscellaneous Functions  
#### Other functionality related to the project

    Set or remove focus of the input field  
    focusText(removeFocus = false)  
    
# Directory Tree  

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


