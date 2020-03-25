// Lists relevant information from API provider like url and query strings
const datamuse = {
    url: "https://api.datamuse.com/words?",
    queryStrings: {
        perfectRhyme: "rel_rhy=",
        approxRhyme: "rel_nry=",
        adjFromNoun: "rel_jjb=",
        nounFromAdj: "rel_jja=",
    }
}

// Lists all class names for section elements in order.
// IDs are assigned as classname + sectionNumber.


// const sectionModuleTemplate = {
//     section: "section",
//     labelInput: "labelInput",
//     textBackground: "textBackground",
//     textarea: "textarea",
//     text: "text",
//     hint: "hint",
// }

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

function newSectionName() {

}
let sectionsCreated = 1;
let sectionName = "section" + sectionsCreated;

let sections = [];

const addSectionBtn = document.getElementById("addSectionBtn");

addSectionBtn.addEventListener("click", function() {
    sectionsCreated++;
    window["section" + sectionsCreated] = {};
    for (let key in sectionModuleTemplate) {
        window["section" + sectionsCreated][key] = sectionModuleTemplate[key] + sectionsCreated;
    }
    sections.push(window["section" + sectionsCreated]);
    console.log(sections);
});












class Word {
    constructor(index) {

        // Key-value pairs are set to properties of returned JSON object.
        // Query strings are keys, suggestions as respective values.
    }
}

// Upon saving text:
// 1. saves words to array without spaces
// 2. wraps array element in span elements
// 3. forEach creates objects out of elements



// section1.p.wordIndex2.addEventListener("click", suggestionController(event))






// returns an array with 10 objects {word: "amazing", score: 3000, numSyllables: 1}
function requestSuggestions(queryString, word) {
    let endpoint = datamuse.url + queryString + word;
    let suggestionObjects = [];
    let xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint, true);
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            suggestionObjects = xhr.response.splice(0, 10);
            console.log(suggestionObjects);
            return suggestionObjects;
        }
    }
    xhr.send();
}



let hello = requestSuggestions("rel_rhy=", "they");

console.log(hello);

console.log("Did I cheat? I should be last")