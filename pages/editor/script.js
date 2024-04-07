function getToken() {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
}

function removeToken() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
}

function initializeNavbar(){
    const scheme = localStorage.getItem('colorscheme')
    const elem = document.getElementById("theme-checkbox")

    if(scheme === "light"){
        elem.checked = false;
    } else if(scheme === "dark"){
        elem.checked = true;
    }
}

document.getElementById("theme-checkbox").onchange = function(){
    const elem = document.getElementById("theme-checkbox")

    if(elem.checked){
        localStorage.setItem('colorscheme', 'dark');
        initializeColorScheme("dark")
    } else {
        localStorage.setItem('colorscheme', 'light');
        initializeColorScheme("light")
    }
}

async function initialize() {
    initializeNavbar();

    const token = getToken();

    console.log(token)

    if (!token) {
        console.error('No token found. Please log in.');
        location.href = "../../login";
    }

    await fetch(`https://us-central1-office-vcs.cloudfunctions.net/app/getUser`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    }).then(async function(response){
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, ${await response.text()}`);
        }
        return response.json();
    })
        .then(data => console.log('User Data:', data))
        .catch(error => console.error('Error fetching user data:', error));

    document.getElementById("profile-picture").innerHTML = "KK"
}

initialize()