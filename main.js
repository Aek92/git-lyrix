let textarea1 = document.getElementById('textarea1');
let text1 = document.getElementById('text1');
let responseText = document.getElementById('responseText');
const saveBtn = document.getElementById('saveBtn');
const rhymeBtn = document.getElementById('submitBtn');
const url = "https://api.datamuse.com/words?rel_rhy="

const getRhyme = (string) => {
    let input = string;
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

const stringToArray = (string) => {
    newArray = string.split(' ');
    text1.value = newArray;
    text1.innerHTML = newArray;
}

saveBtn.onmousedown = () => {
    if (!textarea1.value) {
        return
    }
    stringToArray(textarea1.value);
}

rhymeBtn.onclick = () => {
    if (text1.value) {
        console.log('Finding rhymes for: ' + text1.value[2]);
        return getRhyme(text1.value[2]);
    } else {
        return console.log('Error: no words to rhyme!')
    }
}

// Pass either an id or a DOM element
var wrapContent = (function() {

    // This could be passed as a parameter
    var oSpan = document.createElement('span');
    oSpan.className = 'mySpanClass';
  
    return function(id) {
      var el = (typeof id == 'string')? document.getElementById(id) : id;
      var node, nodes = el && el.childNodes;
      var span;
      var fn = arguments.callee;
  
      for (var i=0, iLen=nodes.length; i<iLen; i++) {
        node = nodes[i];
        if (node.nodeType == 3) {
          span = oSpan.cloneNode(false);
          node.parentNode.insertBefore(span, node);
          span.appendChild(node);
        } else {
          fn(node);
        }
      }
    }
  }());