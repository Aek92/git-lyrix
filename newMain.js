var rhymeController = (() => {
	const url = 'https://api.datamuse.com/words?rel_rhy=';

	// 1. Rhyme request
	var getRhyme = (string) => {
		let input = string;
		let endpoint = url + input;
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.onreadystatechange = () => {
			let array = [];
			if (xhr.readyState === XMLHttpRequest.DONE) {
				let responseObj = JSON.stringify(xhr.response);
				data.rhymes = [];
				for (let i = 0; i < 10; i++) {
					data.rhymes.push(JSON.parse(responseObj)[i].word);
				}
			}
		};
		xhr.open('GET', endpoint);
		xhr.send();
	};

	var addWords = (song) => {
		data.org = song;
	};

	var data = {
		org: [],
		rhymes: [],
		replaced: []
	};

	return {
		addData: (song) => {
			addWords(song);
		},

		getData: () => {
			return data;
		},

		addRhyme: () => {
			getRhyme();
		},

		testing: () => {
			console.log(data);
		}
	};
})();

var UIController = (() => {
	// 1.

	var DOMstrings = {
		inputAreaID: '#textarea1',
		savedTextID: '#text1',
		responseTextID: '#responseArea',
		saveBtnID: '#saveBtn',
		submitBtn: '#submitBtn',
		saved: '.saved'
	};

	var removeChild = (collection) => {
		const myNode = document.querySelector(collection);
		if (myNode.firstChild) {
			while (myNode.firstChild) {
				myNode.removeChild(myNode.lastChild);
			}
		}
	};

	return {
		displaySaved: (...songArr) => {
			let element, collection;
			element = DOMstrings.saved;
			removeChild(element);
            
            collection = document.querySelector(element)

            
			songArr.org.forEach((arr) => {
                console.log(arr.append);
				var span = document.createElement('span');
				span.textContent = arr.append;
				collection.appendChild(span);
                collection.setAttribute('id', 'text1');
            });
            
            collection.addEventListener('click', (event) => {
                if(event.target !== this) {
                    console.log(this);
                    console.log(event.target.textContent);
                }
            })

            

		},

		displayRhyme: (...rhymes) => {
			let element;
			element = DOMstrings.responseTextID;
			removeChild(element);
			rhymes['0'].forEach((arr) => {
				let p = document.createElement('p');
				p.textContent = arr;
				document.querySelector(element).appendChild(p);
			});
		},

		getInput: () => {
			return {
				textIN: document.querySelector(DOMstrings.inputAreaID).value
			};
		},

		getDomString: () => {
			return DOMstrings;
		}
	};
})();

var controller = ((rhymeCtrl, UICtrl) => {
	var DOM = UICtrl.getDomString();

	// 1. Setup  eventlisteners
	var setupEventListeners = () => {
		// Save event
		document.querySelector(DOM.saveBtnID).addEventListener('click', addToSaved);

		//Press Enter to Save
		document.addEventListener('keypress', function (event){
			if (event.keyCode === 13 || event.which === 13) {
				addToSaved();
				//ctrlAddItem();
			}
		});

		//Submit Event
		document.querySelector(DOM.submitBtn).addEventListener('click', reqRhyme);
	};

	var addToSaved = () => {
		var input,
			song = [];

		input = UICtrl.getInput();
		if (input.textIN.value !== '') {
			song.append = input.textIN;
			rhymeCtrl.addData(song);
			UICtrl.displaySaved(rhymeCtrl.getData().org);
		}
	};

	var reqRhyme = (fromSavedArr) => {
		rhymeCtrl.addRhyme('cat');
		setTimeout(() => {
			UICtrl.displayRhyme(rhymeCtrl.getData().rhymes);
		}, 100);
	};

	// 2.

	return {
		init: () => {
			console.log('App has started!');
			setupEventListeners();
		}
	};
})(rhymeController, UIController);

controller.init();
