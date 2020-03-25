// Lists relevant information from API provider like url and query strings
const datamuse = {
    url: "https://api.datamuse.com/words?",
    queryStrings: {
        rhyme: "rel_rhy=",
        approxRhyme: "rel_nry=",
        ajective: "rel_jjb=",
        noun: "rel_jja=",
        synonym: "rel_jja=",
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





let time = 10;
let suggestionObjects = [];

// returns an array with 10 objects {word: "amazing", score: 3000, numSyllables: 1}
function requestSuggestions(queryString, word) {
    let endpoint = datamuse.url + queryString + word;
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
           // suggestionObjects = xhr.response.splice(0, 10);
           for (let i = 0; i < 10; i++) {
                suggestionObjects.push(xhr.response[i]);
            }   
        }
    }
    xhr.open("GET", endpoint, true);
    xhr.send();
}


function wait() {
    requestSuggestions("rel_rhy=", "car");
    setTimeout(function() {
        requestSuggestions("rel_jjb=", "car");
        setTimeout(function() {
            requestSuggestions("rel_nry=", "car");
            setTimeout(function(){
                requestSuggestions("rel_syn=", "car");
                setTimeout(function(){
                    requestSuggestions("rel_jja=", "car");
                    setTimeout(function() {
                        console.log(suggestionObjects);
                    }, time)
                }, time)
            }, time)
        }, time)
    }, time);
}

wait();

