'use strict';
import musicService from'./music-group-service.js';

//Initialize the service
const _service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
  
//Read Database info async
const _data = await _service.readMusicGroupsAsync(0, true, null, 80);
console.log(_data.pageItems);





//get correct group
const _testGroup = _data.pageItems[0];

//update info
const groupName = document.getElementById("groupName");
groupName.value = `${_testGroup.name}`;

const genre = document.getElementById("genre");
genre.value = `${_testGroup.strGenre}`;

const established = document.getElementById("established");
established.value = `${_testGroup.establishedYear}`;