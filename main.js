let textarea1 = document.getElementById('textarea1');
let text1 = document.getElementById('text1');
const submitBtn = document.getElementById('submitBtn');
let responseText = document.getElementById('responseText');
const url = "https://api.datamuse.com/words?rel_rhy="

const getRhyme = () => {
    let input = textarea1.value;
    let endpoint = url + input;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        let array = [];
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let responseObj = JSON.stringify(xhr.response);
            for (let i = 0; i < 10; i++) {
                array.push(JSON.parse(responseObj)[i].word);
            }
        }
        let beautiString = array.join("<br>");
        responseText.innerHTML = beautiString;
    }
    xhr.open('GET', endpoint);
    xhr.send();
}


submitBtn.onclick = () =>  {
    getRhyme();
    textareaToText();
}

function textareaToText() {
}

document.body.onclick = () => {
    if (!textarea1.value) {
        return
    }
    text1.innerHTML = textarea1.value;
    textarea1.style.display = "none";
    console.log(text1.innerHTML);
}

text1.onclick = 


function hideTextArea() {
    
}