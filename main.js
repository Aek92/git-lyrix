let textarea1 = document.getElementById('textarea1');
let text1 = document.getElementById('text1');
let hint = document.getElementById('hint');
let responseText = document.getElementById('responseText');
let responseArea = document.getElementById('responseArea');
let synRhyme = document.getElementById("synRhyme");
const saveBtn = document.getElementById('saveBtn');
const rhymeBtn = document.getElementById('submitBtn');
let url = "https://api.datamuse.com/words?rel_rhy=";

let rhymeArray = [];
let rhymeNr = 0;

/*
synRhyme.onclick = () => {
    url = "https://api.datamuse.com/words?rel_syn=";
}
*/

const getRhyme = (string) => {
    rhymeArray = [];
    let input = string;
    let endpoint = url + input;
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let responseObj = JSON.stringify(xhr.response);
            for (let i = 0; i < 10; i++) {
                rhymeArray.push(JSON.parse(responseObj)[i].word);
            }
        }
        let beautiString = rhymeArray.join("<br>");
        if (!responseText.innerHTML) {
            responseArea.style.display = "block";
            responseText.innerHTML = beautiString;
        }
    }
    xhr.open('GET', endpoint);
    xhr.send();
}

let savedText = false;

// window click listener
window.addEventListener('click', function (e) {
    // Checks if click is inside or outside textarea
    if (document.getElementById('textarea1').contains(e.target)) {
        return;
        // If outside textarea:
    } else {
        {
            // AND IF textarea is empty:
            if (!textarea1.value) {
                return
            }
            // Then, execute the following:
            // UI Change:
            textarea1.style.display = "none";
            hint.innerHTML = "Hint: click on a word to replace it with a rhyming word!";
            text1.style.display = "block";

            // Passes string from textarea1 as array to text1.value:
            let array = textarea1.value.split(' ');
            text1.value = array;

            function clickableArray() {
                // Checks if array has already been stored in text1.value variable
                if (savedText === false) {
                    // Each "word" in array: creates span element, adds "word" as content, append to text1
                    array.forEach((word) => {
                        let span = document.createElement('span');
                        span.textContent = word + ' ';
                        text1.appendChild(span);
                    });
                    savedText = true;
                };
                // 
                text1.addEventListener('click', function (event) {
                    if (event.target !== this) {
                        let currentWord = event.target.textContent;
                        let wordWithoutSpace = currentWord.slice(0, currentWord.length - 1)
                        let symbols = ["!", "<", ">", ".", ",", "?", "%", "$", "/", "&", "-", ":", ")", "(", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
                        let lastChar = (wordWithoutSpace.charAt(wordWithoutSpace.length - 1));
                        let storedChar = "";
                        let upperCaseBoolean;
                        // Checks if lastChar is a symbol and if so, removes it for API query and adds it back in at output.
                        if (symbols.includes(lastChar)) {
                            wordWithoutSpace = wordWithoutSpace.slice(0, wordWithoutSpace.length - 1);
                            storedChar = lastChar;
                        };
                        // Checks if firstChar is uppercase and if so, transforms firstChar of output to uppercase.
                        if (rhymeArray.includes(wordWithoutSpace)) {
                            if (rhymeNr === 0) {
                                setTimeout(() => {
                                    event.target.textContent = rhymeArray[rhymeNr - 1] + storedChar + ' ';
                                }, 100);
                            } else {
                                event.target.textContent = rhymeArray[rhymeNr] + storedChar + ' ';
                            }
                        } else {
                            rhymeNr = 0;
                            getRhyme(wordWithoutSpace);
                            if (rhymeNr === 0) {
                                setTimeout(() => {
                                    event.target.textContent = rhymeArray[rhymeNr - 1] + storedChar + ' ';
                                }, 150);
                            } else {
                                event.target.textContent = rhymeArray[rhymeNr] + storedChar + ' ';
                            }
                        }
                        rhymeNr++;
                    }
                });
            }
            // Makes sure the array is added click functionality only once for every savedText:
            if (savedText === false) {
                clickableArray();
            }
        }
    }
});