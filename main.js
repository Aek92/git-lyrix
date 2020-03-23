let textarea1 = document.getElementById('textarea1');
let text1 = document.getElementById('text1');
let hint = document.getElementById('hint');
let responseText = document.getElementById('responseText');
let responseArea = document.getElementById('responseArea');
const saveBtn = document.getElementById('saveBtn');
const rhymeBtn = document.getElementById('submitBtn');
const url = "https://api.datamuse.com/words?rel_rhy="

let rhymeArray = [];
let rhymeNr = 0;


const getRhyme = (string) => {
    let input = string;
    let endpoint = url + input;
    const xhr = new XMLHttpRequest();
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

                // Each "word" in array: creates span element, adds "word" as content, append to text1
                array.forEach((word) => {
                    let span = document.createElement('span');
                    span.textContent = word + ' ';
                    text1.appendChild(span);
                });
                // 
                text1.addEventListener('click', function(event) {
                    if (event.target !== this) {
                        getRhyme(event.target.textContent);
                        if (rhymeNr === 0) {
                            setTimeout(() => {
                                console.log('1')
                                event.target.textContent = rhymeArray[rhymeNr - 1] + ' ';
                            }, 100);
                        } else {
                            event.target.textContent = rhymeArray[rhymeNr] + ' ';
                        }
                        console.log(event.target.textContent);
                        rhymeNr++; 
                        console.log('2');
                    }
                });
            }

            clickableArray();
        }
    }
});