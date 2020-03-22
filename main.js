let textarea1 = document.getElementById('textarea1');
let text1 = document.getElementById('text1');
let responseText = document.getElementById('responseText');
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
        responseText.innerHTML = beautiString;
    }
    xhr.open('GET', endpoint);
    xhr.send();
}

const stringToArray = (string) => {
    newArray = string.split(' ');
    text1.value = newArray;
}

saveBtn.onmousedown = () => {
    if (!textarea1.value) {
        return
    }

    textarea1.style.display = "none";
    text1.style.display = "block";

    stringToArray(textarea1.value);

    function clickableArray() {
        let array = text1.value;
        console.log(array);
        array.forEach((word) => {
            let span = document.createElement('span');
            span.textContent = word + ' ';
            text1.appendChild(span);
        });
        text1.addEventListener('click', function(event) {
            if (event.target !== this) {
                console.log(event.target.textContent);
                getRhyme(event.target.textContent);
                event.target.textContent = rhymeArray[rhymeNr] + ' ';
                rhymeNr++;
            }
        });
    }

    clickableArray();
}

rhymeBtn.onclick = () => {
    if (text1.value) {
        console.log('Finding rhymes for: ' + text1.value[2]);
        return getRhyme(text1.value[2]);
    } else {
        return console.log('Error: no words to rhyme!')
    }
}






/*
var sequencePdb = ["want", "these", "to", "be", "clickable"];

// just pretend we got the data from the XHR
(function() {
  var sequenceLabel = document.getElementById("sequence-label");
  
  // wrap each sequence in a span
  sequencePdb.forEach(function(pdb) {
    var span = document.createElement('span');
    
    // use textContent instead of innerHTML to avoid XSS attacks!
    span.textContent = pdb;
    
    sequenceLabel.appendChild(span);
  });
  
  // only need one event listener
  sequenceLabel.addEventListener('click', function(event) {
    // rule out the #sequence-label itself if it was clicked directly
    if (event.target !== this) {
      // event.target is span, textContent is string value
      console.log(event.target.textContent);
    }
  });
}());
*/