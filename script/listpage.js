'use strict';
import {seedGenerator, uniqueId, randomNumber, deepCopy, isEqual} from '../SeidoHelpers/seido-helpers.js';

const _seeder = new seedGenerator();
let _artists = _seeder.allQuotes;


function fillList() {
    const _list = document.getElementById('list-of-items');

    while(_list.firstChild){  
        _list.removeChild(_list.firstChild);
    }

    for (const q of _artists) {
        const div = document.createElement('div');
        div.classList.add('col-md-12', 'themed-grid-col');
    
        div.innerText = q.quote;
        _list.appendChild(div);
    }
}    

function clickHandlerAllQ (event) {
 _artists = _seeder.allQuotes;
 fillList();
}

function clickHandlerSearch (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const searchText = event.target.value.toLowerCase();
        _artists = _seeder.allQuotes.filter ((item) => item.quote.toLowerCase().includes(searchText));
        fillList();
    }
}

const searchInput = document.getElementById("searchBar");
const allQ = document.querySelector('#all-quotes-btn');
allQ.addEventListener('click', clickHandlerAllQ);
searchInput.addEventListener("keyup", clickHandlerSearch);