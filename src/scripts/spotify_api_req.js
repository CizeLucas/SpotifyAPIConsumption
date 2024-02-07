async function getAcessToken() {
    const clientID = "acc0478f790144b8bc47d99cf517a072"; //your_cliend_ID
    const clientSecret = "868c00e7abf14b41b28834402f860221"; //your_client_secret
    //You have to create a new app in https://developer.spotify.com/dashboard and input the 
    //client ID and secret keys above

    const basicAuth = btoa(`${clientID}:${clientSecret}`);
    //Encondes in Base 64 the string that contains the client ID and client secret key separated by ':'

    const apiTokenEndpoint = "https://accounts.spotify.com/api/token";
    //Send a POST request to the token endpoint URI

    const headerContent = {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    /*const postData = {
        grant_type: 'client_credentials'
    };
    const httpReqBody = new URLSearchParams(postData)*/

    const httpRequestBody = 'grant_type=client_credentials'

    const response = await fetch(apiTokenEndpoint, {
        method:'POST',
        headers: headerContent,
        body: httpRequestBody
    })
    return response.json()
}

function setCookie(name, value, hoursToLive) {
    const date = new Date()
    date.setTime(date.getTime() + hoursToLive*60*60*1000)
    let expireDate = "expires="+date.toUTCString()
    document.cookie = `${name}=${value}; ${expireDate}; path=/`
}

function deleteCookie(name) {
    setCookie(name, null, null)
}

function getCookie(name) {
    const cDecoded = document.cookie
    const cArray = cDecoded.split("; ")
    let result = null
    cArray.forEach(element => {
        if(element.indexOf(name) == 0){
            result = element.split('=')[1]
        }
    })
    return result
}

function cookieExists(name){
    const cDecoded = document.cookie
    const cArray = cDecoded.split("; ")
    let isCookiePresent = false
    cArray.forEach((element) => {
        if(element.indexOf(name) == 0)
            isCookiePresent = true
    })
    return isCookiePresent
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



const artistID_EDEN = "1t20wYnTiAT0Bs7H1hv9Wt";

/*
let accessToken = null;
try{
    const data = await getAcessToken(apiapiapiTokenEndpoint, headerContent, httpReqBody)
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

if(!cookieExists("access_token")){
    try{
    const response = await getAcessToken()
    console.log(response.access_token)
    setCookie("access_token", `${response.access_token}`, `${response.expires_in}`)
    console.log(`Made a request to the Spotify API and got the accessToken (${getCookie("access_token")})`)
    } catch(err) {
        window.prompt("Bad API access_token request, please reload your page")
        window.prompt(err)
    }
} else {
    console.log(`accessToken stored in a cookie: ( ${getCookie("access_token")} )`)
}


