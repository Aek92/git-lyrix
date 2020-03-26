// Lists relevant information from API provider like url and query strings
// Change values and add/remove new properties to get alter functionality
const datamuse = {
    url: "https://api.datamuse.com/words?",
    queryStrings: {
        rhyme: "rel_rhy=",
        approxRhyme: "rel_nry=",
        ajective: "rel_jjb=",
        noun: "rel_jja=",
        synonym: "rel_syn=",
    }
}


// Lists all class names for section elements in order.
// IDs are assigned as classname + sectionNumber.
class sectionModuleTemplate {
    constructor() {
        section = "section";
        labelInput = "labelInput",
        textBackground = "textBackground",
        textarea = "textarea";
        text = "text";
        hint = "hint";

    }
}


// Introduces "Add section" functionality
// Temporarily tied to the HTML button 
const addSectionBtn = document.getElementById("addSectionBtn");
let sectionsCreated = 1;
let sectionName = "section" + sectionsCreated;
let sections = [];

addSectionBtn.addEventListener("click", function () {
    sectionsCreated++;
    window["section" + sectionsCreated] = {};
    for (let key in sectionModuleTemplate) {
        window["section" + sectionsCreated][key] = sectionModuleTemplate[key] + sectionsCreated;
    }
    sections.push(window["section" + sectionsCreated]);
    console.log(sections);
});



// wordArray: Simulating the words array made from textarea userinput:
// result: Simulating the location in a section object where arrays of "word-objects" will be pushed.
let wordArray = ["cure", "feel", "they", "run", "see", "drive", "green", "wall", "blue", "win"];
let result = [];

function requestSuggestions(wordsArr) {
    wordsArr.forEach(word => {
        for (queryString in datamuse.queryStrings) {
            let fetchIt = async () => {
                let endpoint = datamuse.url + datamuse.queryStrings[queryString] + word;
                await fetch(endpoint)
                .then(response => { return response.json(); })
                .then(data => { return result.push(data.splice(0, 10)); })
                .catch(error => {return console.log("This error was beautifully caught by Mikkel Inc.: "+ error)});
            }
            fetchIt(word, queryString);
        }
    });
}
requestSuggestions(wordArray);


// Test-run fetch and calculate response time
// Set variable "time" to ms allowance
let time = 170;

setTimeout(function() {
    
    let numberOfWords = wordArray.length;
    let numberOfQueryStrings = Object.keys(datamuse.queryStrings).length;
    let numberOfRequests = numberOfWords * numberOfQueryStrings;
    let suggestionCount = 0;
    result.forEach(element => {
        suggestionCount += element.length;
    });
    console.log(result);
    console.log(`====== Fetch Test Results ======`);
    console.log(`Requests attempted: ${numberOfRequests}`);
    console.log(`Time allowed: ${time}ms`);
    console.log(`Successful requests: ${result.length}`);
    console.log("Word-suggestions saved: " + suggestionCount);
    console.log(`------ Speed Results ------`);
    console.log(`Avg time to complete a request: ${Math.round(time / result.length)}ms`);
    console.log(`Estimated time needed to complete all requests: ${Math.round(numberOfRequests * (time / result.length))}ms`);
    if (result.length < 15) {
        console.log("WARNING: inaccurate results - INCREASE time allowance.");
    } else if (result.length === 50) {
        console.log("WARNING: inaccurate results - DECREASE time allowance.");
    }
}, time);
