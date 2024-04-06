'use strict';
import musicService from'./music-group-service.js';


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function findGroup(id) {
    
    //Initialize the service
    const _service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
    //get correct group
    const _group = await _service.readMusicGroupAsync(id);
    
    return _group;
}

const group = await findGroup(id);

//update info
const groupName = document.getElementById("groupName");
groupName.value = `${group.name}`;

const genre = document.getElementById("genre");
genre.value = `${group.strGenre}`;

const established = document.getElementById("established");
established.value = `${group.establishedYear}`;

