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
    constructor(sectionName) {
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
let sectionName = "section" + sectionsCreated;
let sectionsCreated = 1;
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
let wordArray = [["cure"], ["feel"]];
let result = [];

function requestSuggestions(wordsArr) {
    wordsArr.forEach(word => {
        for (queryString in datamuse.queryStrings) {
            let fetchIt = async (arg1, arg2) => {
                let endpoint = datamuse.url + datamuse.queryStrings[queryString] + word;
                console.log(endpoint)
                await fetch(endpoint).then(response => { return response.json(); }).then(data => { result.push(data.splice(0, 10)); return console.log(result); });
            }
            fetchIt(word, queryString);
        }
    });
}

requestSuggestions(wordArray);