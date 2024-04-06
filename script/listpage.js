'use strict';
import musicService from'./music-group-service.js';

//Initialize the service
const _service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
  
//Read Database info async
const _data = await _service.readMusicGroupsAsync(0, true, null, 80);
console.log(_data.pageItems);

//list with music groups
let _musicGroups = _data.pageItems;
_musicGroups.forEach(m => {
    console.log(m.name);
});
const _list = document.getElementById('list-of-items');

//search bar and button
const allGroups = document.querySelector('#all-groups-btn');
const searchInput = document.getElementById("searchBar");
const searchBtn = document.querySelector('#search-btn');
const searchHits = document.querySelector('#search-hits');
allGroups.addEventListener("click", clickHandlerAllGroups);
searchInput.addEventListener("keyup", clickHandlerSearch);
searchBtn.addEventListener("click", clickHandlerSearchBtn);

//pagination buttons
const _pageNrBtns = document.getElementById('page-number-btn');
const btnNext = document.querySelector('#btnNext');
const btnPrev = document.querySelector('#btnPrev');
btnNext.addEventListener('click', clickNext);
btnPrev.addEventListener('click', clickPrev);

//pages
let currentPage = 0;
const pageSize = 10;
let maxNrPages = Math.ceil(_musicGroups.length/pageSize);
 
removeAllChildNodes(_list);
removeAllChildNodes(_pageNrBtns);
fillList(0);

function fillList(renderPage) {

    searchHits.innerHTML = `The database now contains ${_musicGroups.length} music groups`;
    const pData = _musicGroups.slice(pageSize*renderPage, pageSize*renderPage+pageSize);
    for (const q of pData) {
        const div = document.createElement('div');
        div.classList.add('col-md-12', 'themed-grid-col');
    
        const printGroupName = document.createElement('p');
        printGroupName.innerText = q.name;
        div.appendChild(printGroupName);

        const button = document.createElement('button');
        button.textContent = 'More info';
        button.classList.add('btn', 'btn-outline-success');
        button.id = `${q.musicGroupId}`;
        button.addEventListener('click', detailsPage);
        div.appendChild(button);

        _list.appendChild(div);
    }

    for (let index = 0; index < maxNrPages; index++) {
        const btn = document.createElement('button');
        btn.classList.add('page-link', 'page-btn');
        btn.innerText = `${index + 1}`;
        btn.addEventListener('click', clickNumber);
        _pageNrBtns.appendChild(btn);
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
    removeAllChildNodes(_pageNrBtns);
    fillList(currentPage)
};

function clickPrev (event)  {
    currentPage--;
    if (currentPage < 0) currentPage = 0;

    removeAllChildNodes(_list);
    removeAllChildNodes(_pageNrBtns);
    fillList(currentPage)
};

function clickNumber (event) {
    event.preventDefault(); 
    const page = parseInt(event.target.innerText) - 1;
    if (page !== currentPage) { 
        currentPage = page; 
        removeAllChildNodes(_list);
        removeAllChildNodes(_pageNrBtns);
        fillList(currentPage); 
    } 
}

function clickHandlerAllGroups (event) {
 _musicGroups = _data.pageItems;
 maxNrPages = Math.ceil(_musicGroups.length/pageSize);
 currentPage = 0;
 removeAllChildNodes(_list);
 removeAllChildNodes(_pageNrBtns);
 fillList(0);
}

function clickHandlerSearch (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const searchText = searchInput.value.toLowerCase();
        _musicGroups = _data.pageItems.filter ((item) => item.name.toLowerCase().includes(searchText));
        maxNrPages = Math.ceil(_musicGroups.length/pageSize);
        currentPage = 0;
        removeAllChildNodes(_list);
        removeAllChildNodes(_pageNrBtns);
        fillList(0);
        searchInput.value = null;
    }
}

function clickHandlerSearchBtn (event) {
    event.preventDefault();
    const searchText = searchInput.value.toLowerCase();
    _musicGroups = _data.pageItems.filter ((item) => item.name.toLowerCase().includes(searchText));
    maxNrPages = Math.ceil(_musicGroups.length/pageSize);
    currentPage = 0;
    removeAllChildNodes(_list);
    removeAllChildNodes(_pageNrBtns);
    fillList(0);
    searchInput.value = null;
}


async function detailsPage (event) {
    event.preventDefault();

    let groupUrl = `detailsPage.html?id=${event.target.id}`
    window.location.href = groupUrl;
}






