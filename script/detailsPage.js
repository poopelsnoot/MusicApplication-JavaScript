'use strict';
import musicService from'./music-group-service.js';

//Initialize the service
const _service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);

//get id from url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const group = await findGroup(id);
fillGroupInfo(group);
fillArtistList(group);
fillAlbumList(group);


async function findGroup(id) {
    
    //get correct group
    const _group = await _service.readMusicGroupAsync(id, false);
    
    return _group;
}

function fillGroupInfo(group) {
    //update info
    const groupName = document.getElementById("groupName");
    groupName.value = `${group.name}`;

    const genre = document.getElementById("genre");
    genre.value = `${group.strGenre}`;

    const established = document.getElementById("established");
    established.value = `${group.establishedYear}`;
}

function fillArtistList(group) {
    //update artists
    const _artists = group.artists;
    const _artistList = document.getElementById("artistList");
    
    if( _artists.length > 0) {
        
        for (const a of _artists) {
            const div = document.createElement('div');
            div.classList.add("col-md-12", "themed-grid-col");
    
            const printArtistName = document.createElement('p');
            printArtistName.innerText = `${a.firstName} ${a.lastName}`;
            div.appendChild(printArtistName);
    
            _artistList.appendChild(div);
        }
    }
    else {
        const div = document.createElement('div');
        div.classList.add("col-md-12", "themed-grid-col");

        const printArtistName = document.createElement('p');
        printArtistName.innerText = `No known artist in this music group`;
        div.appendChild(printArtistName);
    
        _artistList.appendChild(div);
    }
}

function fillAlbumList(group) {
    //update albums
    const _albums = group.albums;
    const _albumList = document.getElementById("albumList");
    
    if( _albums.length > 0) {
        
        for (const a of _albums) {

            const printAlbumName = document.createElement('div');
            printAlbumName.classList.add("col-md-10", "themed-grid-col");
            printAlbumName.innerText = `${a.name}`;
            _albumList.appendChild(printAlbumName);

            const printAlbumYear = document.createElement('div');
            printAlbumYear.classList.add("col-md-2", "themed-grid-col");
            printAlbumYear.innerText = `${a.releaseYear}`;
            _albumList.appendChild(printAlbumYear);
        }
    }
    else {
        const div = document.createElement('div');
        div.classList.add("col-md-12", "themed-grid-col");

        const printAlbumName = document.createElement('p');
        printAlbumName.innerText = `No known album from this music group`;
        div.appendChild(printAlbumName);
    
        _albumList.appendChild(div);
    }
}

