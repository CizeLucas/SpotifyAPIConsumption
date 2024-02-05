/*code from Imersao Alura that reads the JSON served at localhost:3000 preferably by 
json-server version 0.17.4 (install command: npm i json-server@0.17.4)
*/

const resultPlaylist = document.getElementById("result-playlists");
const resultArtists = document.getElementById("result-artist");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
    
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResult(result))
}

function displayResult(result) {
    console.log(result);
    resultPlaylist.classList.add("hidden");
    const artistName = document.getElementById("artist-name");
    const artistImg = document.getElementById("artist-img");

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImg.src = element.urlImg;
    });

    resultArtists.classList.remove("hidden");
}

searchInput.oninput = function() {
    const searchTerm = searchInput.value;
    if(searchTerm === ''){
        resultPlaylist.classList.remove("hidden");
        resultArtists.classList.add("hidden");
        return;
    }
    requestApi(searchTerm);
}
