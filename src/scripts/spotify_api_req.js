async function getAcessToken(apiEndPoint, headerContent, httpRequestBody) {
    
    const response = await fetch(apiEndPoint, {
        method:'POST',
        headers: headerContent,
        body: httpRequestBody
    })
    return response.json()
}

async function getArtistData(apiURL, artistID, sessionAcessToken){
    const fullURL = apiURL+'/artists'+'/'+artistID
    console.log(fullURL)
    const response = await fetch(fullURL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": `Bearer ${sessionAcessToken}`
        }
    })

    return response.json()
}

const clientID = "acc0478f790144b8bc47d99cf517a072"; //your_cliend_ID
const clientSecret = "868c00e7abf14b41b28834402f860221"; //your_client_secret
//You have to create a new app in https://developer.spotify.com/dashboard and input the 
//client ID and secret keys above

const artistID_EDEN = "1t20wYnTiAT0Bs7H1hv9Wt";

const tokenEndpoint = "https://accounts.spotify.com/api/token";
//Send a POST request to the token endpoint URI

const basicAuth = btoa(`${clientID}:${clientSecret}`);
//Encondes in Base 64 the string that contains the client ID and client secret key separated by ':'

const postData = {
    grant_type: 'client_credentials'
};

const headerContent = {
    'Authorization': `Basic ${basicAuth}`,
    'Content-Type': 'application/x-www-form-urlencoded'
};

//const httpReqBody = new URLSearchParams(postData)
const httpReqBody = 'grant_type=client_credentials'

/*
let accessToken = null;
try{
    const data = await getAcessToken(tokenEndpoint, headerContent, httpReqBody)
    accessToken = data.access_token
    console.log(`Acess Token: ${accessToken}`)
} catch(err){
    console.log(`ERROR! ${err}`)
}

if(!accessToken!=null){
    try{
        const response = await getArtistData("https://api.spotify.com/v1", artistID_EDEN, accessToken)
        console.log(response)
    } catch(err) {
        console.error(`Error: ${err}`)
    }
} else {
    console.error("Acess token cannot be null")
}
*/

setCookie("acessToken","unknown", 1)

setCookie("acessToken2", "unknown", 2)

console.log(document.cookie)

console.log(getCookie("acessToken"))

function setCookie(name, value, hoursToLive) {
    const date = new Date()
    date.setTime(date.getTime() + hoursToLive*60*60*1000)
    //console.log(date.getTime())
    let expireDate = "expires="+date.toUTCString()
    //console.log(expireDate)
    document.cookie = `${name}=${value}; ${expireDate}; path=/`
}

function deleteCookie(name) {
    setCookie(name, null, null)
}

function getCookie(name) {
    console.log(document.cookie)
    const cDecoded = document.cookie
    console.log(cDecoded)

    const cArray = cDecoded.split("; ")
    console.log(cArray)

    //iterate over cArray
    let result = null
    cArray.forEach(element => {
        if(element.indexOf(name) == 0){
            result = element.substring(name.length + 2)
        }
    });

    return result
}

