const inputField = document.getElementById('inputField');
const submitBtn = document.getElementById('submitBtn');
const responseText = document.getElementById('responseText');
const url = "https://api.datamuse.com/words?rel_rhy="


const getRhyme = () => {
    let input = inputField.value;
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
}
