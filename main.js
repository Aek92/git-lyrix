// Lists relevant information from API provider like url and query strings
// Change values and add/remove new properties to get alter functionality



let wordArray = [ 'stupid' ];

const datamuse = {
	url: 'https://api.datamuse.com/words?',
	queryStrings: {
		rhyme: 'rel_rhy=',
		approxRhyme: 'rel_nry=',
		adjective: 'rel_jjb=',
		noun: 'rel_jja=',
		synonym: 'rel_syn='
	}
};

function addSection (){
    var html, newHtml, element;
    
    element = document.getElementById('container');
	// Create HTML string with placeholder text
	html =
		'<div id="sectionContainer"><div id="songSections"><div class="section" id="section-%id%"><input class="labelInput" id="input-%id%" value="%type%"></input><div class="textBackground" id="textBackground1"><textarea readonly id="text-%id%" class="textarea" cols="50" rows="4"></textarea></div></div></div></div>';
    html.trim();

    // Iterates object and replaces the placeholder text
    for (let [key, value] of Object.entries(datamuse.queryStrings)) {
        let sub = `${value}`.substring(4,7);
        newHtml = html.split('%id%').join(sub);
        newHtml = newHtml.split('%type%').join(key);
        element.insertAdjacentHTML('beforeend', newHtml);
      }
}

document.getElementById('addSectionBtn').addEventListener('click', () => {
	// 1. Create new html section with unique ID
	addSection();
	// 2. Request rhyme, synonym, noun etc....(param)
	genQueryString();

    // 3. Display request in html section
        // Display() function handles this
});

console.log(datamuse.queryStrings);
// Maps url + type of req + word
const genQueryString = function (){
	wordArray.forEach((el) => {
		let urlArr = [];
		Object.keys(datamuse.queryStrings).map((key, value) => {
			urlArr.push(datamuse.url + datamuse.queryStrings[key] + el);
		});
		fetchData(urlArr);
	});
};

//Fetch data ------- >
function fetchData (urls){
	return Promise.all(
		urls.map((url) =>
			fetch(url)
				.then((file) => file.json())
				.then((data) => {
                    let result = []
                    console.log('------------------')
                    data.some((el, index) => {
                        result.push(el.word);
                        //console.log(el.word + '\t\t\t' + url);
                        return ++index === 10
                    })
                    display(result, url.substring(35, 38));
                })
				.catch((error) => { console.log("error", url )})
		)
	);
}

// Displays data ---> Needs improvement
let display = (data, type) => {
    // Gets Html Element based on type av request
    let textArea = document.getElementById(`text-${type}`);
    textArea.value = data.join('\t');
};
