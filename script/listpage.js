'use strict';
import {seedGenerator, uniqueId, randomNumber, deepCopy, isEqual} from '../SeidoHelpers/seido-helpers.js';

const _seeder = new seedGenerator();
let _artists = _seeder.allQuotes;
const _list = document.getElementById('list-of-items');

//search bar and buttons
const allQ = document.querySelector('#all-quotes-btn');
const searchInput = document.getElementById("searchBar");
const searchHits = document.querySelector('#search-hits');
allQ.addEventListener('click', clickHandlerAllQ);
searchInput.addEventListener("keyup", clickHandlerSearch);

//next-prev buttons
const btnNext = document.querySelector('#btnNext');
const btnPrev = document.querySelector('#btnPrev');
btnNext.addEventListener('click', clickNext);
btnPrev.addEventListener('click', clickPrev);

//pages
let currentPage = 0;
const pageSize = 10;
let maxNrPages = Math.ceil(_artists.length/pageSize);
 
removeAllChildNodes(_list);
fillList(0);

function fillList(renderPage) {

    searchHits.innerHTML = `The database now contains ${_artists.length} music groups`;
    const pData = _artists.slice(pageSize*renderPage, pageSize*renderPage+pageSize);
    for (const q of pData) {
        const div = document.createElement('div');
        div.classList.add('col-md-12', 'themed-grid-col');
    
        div.innerText = q.quote;
        _list.appendChild(div);
    }
}    

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function clickNext (event)  {
    currentPage++;
    if (currentPage > maxNrPages-1) currentPage = maxNrPages-1;

    removeAllChildNodes(_list);
    fillList(currentPage)
};

function clickPrev (event)  {
    currentPage--;
    if (currentPage < 0) currentPage = 0;

    removeAllChildNodes(_list);
    fillList(currentPage)
};

function clickHandlerAllQ (event) {
 _artists = _seeder.allQuotes;
 maxNrPages = Math.ceil(_artists.length/pageSize);
 currentPage = 0;
 removeAllChildNodes(_list);
 fillList(0);
}

function clickHandlerSearch (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const searchText = event.target.value.toLowerCase();
        _artists = _seeder.allQuotes.filter ((item) => item.quote.toLowerCase().includes(searchText));
        maxNrPages = Math.ceil(_artists.length/pageSize);
        currentPage = 0;
        removeAllChildNodes(_list);
        fillList(0);
        searchInput.value = null;
    }
}





