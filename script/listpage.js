'use strict';
import {seedGenerator, uniqueId, randomNumber, deepCopy, isEqual} from '../SeidoHelpers/seido-helpers.js';

const _seeder = new seedGenerator();
let _artists = _seeder.allQuotes;
//let _search = input från html
//_artists = _artists.filter ((item) => item.quote.toLowerCase().includes('love'))



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

function clickHandlerLoveQ (event) {
    _artists = _seeder.allQuotes;
    _artists = _artists.filter((item) => item.quote.toLowerCase().includes('love'));
    fillList();
}

const allQ = document.querySelector('#all-quotes-btn');
const loveQ = document.querySelector('#love-quotes-btn');
allQ.addEventListener('click', clickHandlerAllQ);
loveQ.addEventListener('click', clickHandlerLoveQ);