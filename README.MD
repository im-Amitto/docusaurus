# Markdown Book Genrator

## Prerequisite
- You have to be on Node >= 8.x and Yarn >= 1.5.
- Docusaurus

## Home Page
- docs/doc1.md
## How to run
1. npm install
2. cd website
3. npm start

### Key Files

* **Footer**: The `website/core/Footer.js` file is a React component that acts
 as the footer for the site generated by Docusaurus and should be customized by the user.
* **Configuration file**: The `website/siteConfig.js` file is the main
  configuration file used by Docusaurus.
* **Sidebars**: The `sidebars.json` file contains the structure and order
  of the documentation files.
* **Highlighter**: The `website/static/js/highlighter.js` file contains the code for highlighting.
## Example

```Markdown
... javascript line-numbers {1-3,5}
   var message = "these two lines should be a code block";  
   console.log(message);
   var message = "these two lines should be a code block";  
   console.log(message);
   var message = "these two lines should be a code block";  
   console.log(message);
   var message = "these two lines should be a code block";  
   console.log(message);
...
```
>_replce . with `_

#### Ouput
![Snapshot](https://github.com/bigbinary/markdown-book-generator/blob/master/snapshot/snapshot.png?raw=true)