createComponent("../Components/Navbar.html", document.getElementById("navbar-container"));

function displayAlert(context){
    document.getElementById("error-modal").innerHTML = context;
    document.getElementById("error-modal").classList.add("active-modal");

    setTimeout(function(){
        document.getElementById("error-modal").classList.remove("active-modal");
    }, 5000);
}

document.getElementById("forgot-password-btn").addEventListener("click", function (e) {
    document.querySelectorAll(".active-modal").forEach(function(elem){
        elem.classList.remove("active-modal")
    });

    document.getElementById("modal-containers").children[2].classList.add("active-modal");

    checkImage();
});

function checkImage(){
    const children = document.querySelectorAll('#modal-containers > *');

    let targetModal = -1;
    children.forEach((child, index) => {
        if (child.classList.contains('active-modal')) {
            targetModal = index;
        }
    });

    const red_image = [2, 3, 4];
    const green_image = [5];

    if(red_image.includes(targetModal)){
        document.getElementById("banner-image").style.backgroundImage = "url('../icons/icon_red.png')";
    } else if(green_image.includes(targetModal)) {
        document.getElementById("banner-image").style.backgroundImage = "url('../icons/icon_green.png')";
    } else {
        document.getElementById("banner-image").style.backgroundImage = "url('../icons/icon.png')";
    }
}

document.getElementById("delete-btn").addEventListener("click", async function (e) {
    e.preventDefault();

    const userObj = {
        email: document.getElementById("delete-user-email").value,
        password: document.getElementById("delete-user-password").value
    }

    const response = await fetch(`https://us-central1-office-vcs.cloudfunctions.net/app/deleteUser`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify(userObj),
        mode: 'cors'
    });

    const context = await response.text();

    displayAlert(context);

    if(context === "User deleted successfully"){
        if (window.history.replaceState) {
            // Create a new URL object with the current page's URL
            let newUrl = new URL(window.location.href);
            // Clear the search parameters
            newUrl.search = '';
            // Replace the current entry in the browser's history
            window.history.replaceState({}, '', newUrl);
            // Reload the page without query parameters
            window.location.reload();
        }
    }

    console.log(context)
});

document.getElementById("log-in-btn").addEventListener("click", async function (e) {
    e.preventDefault();

    const userObj = {
        email: document.getElementById("log-in-email").value,
        password: document.getElementById("log-in-password").value,
        keepMeSignedIn: document.getElementById("keep-signed-in").classList.contains("active-checkbox")
    }

    //console.log(userObj);

    const response = await fetch(`https://us-central1-office-vcs.cloudfunctions.net/app/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify(userObj),
        mode: 'cors'
    });

    const context = response.status;

    if(context === 200){
        const message = await response.json();

        displayAlert(message.message)

        if(userObj.keepMeSignedIn){
            window.localStorage.setItem('token', message.token);
        } else {
            window.sessionStorage.setItem('token', message.token);
        }
    } else {
        const text = await response.text();

        displayAlert(text);
    }
});

document.getElementById("sign-up-btn").addEventListener("click", async function (e) {
    e.preventDefault();

    const userObj = {
        fullName:document.getElementById("sign-up-name").value,
        email: document.getElementById("sign-up-email").value,
        password: document.getElementById("sign-up-password").value
    }

    console.log(userObj);

    const response = await fetch(`https://us-central1-office-vcs.cloudfunctions.net/app/createUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify(userObj),
        mode: 'cors'
    });

    const context = await response.text();

    displayAlert(context);

    if(context === "User created successfully"){
        if (window.history.replaceState) {
            // Create a new URL object with the current page's URL
            let newUrl = new URL(window.location.href);
            // Clear the search parameters
            newUrl.search = '';
            // Replace the current entry in the browser's history
            window.history.replaceState({}, '', newUrl);
            // Reload the page without query parameters
            window.location.reload();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Select all dropdowns on the page
    var dropdowns = document.querySelectorAll('.dropdown');

    // Function to close all dropdown lists
    function closeAllDropdowns(except) {
        dropdowns.forEach(function(dropdown) {
            if (dropdown !== except) {
                dropdown.querySelector('.dropdown-list').style.display = 'none';
            }
        });
    }

    dropdowns.forEach(function(dropdown) {
        var dropdownSelect = dropdown.querySelector('.dropdown-select');
        var dropdownList = dropdown.querySelector('.dropdown-list');
        var dropdownOptions = dropdown.querySelectorAll('.dropdown-option');
        var select = dropdown.querySelector('.select');

        // Event listener for the select click
        dropdownSelect.addEventListener('click', function(event) {
            closeAllDropdowns(dropdown);
            dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
            event.stopPropagation(); // Prevent the click from closing the dropdown immediately
        });

        // Event listener for each option in the dropdown
        dropdownOptions.forEach(function(option) {
            option.addEventListener('click', function() {
                select.textContent = this.textContent;
                dropdownList.style.display = 'none';
            });
        });
    });

    // Event listener for closing dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-select')) {
            closeAllDropdowns();
        }
    });
});

function initialize(){
    const queryParams = new URLSearchParams(window.location.search);

    if(queryParams.toString().includes('signup')){
        document.querySelectorAll(".active-modal").forEach(function(elem){
            elem.classList.remove("active-modal")
        });

        document.getElementById("modal-containers").children[1].classList.add("active-modal");
    } else if(queryParams.toString().includes('delete')){
        document.querySelectorAll(".active-modal").forEach(function(elem){
            elem.classList.remove("active-modal")
        });

        document.getElementById("modal-containers").children[4].classList.add("active-modal");
    } else if(queryParams.toString().includes('onboarding')){
        document.querySelectorAll(".active-modal").forEach(function(elem){
            elem.classList.remove("active-modal")
        });

        document.getElementById("modal-containers").children[5].classList.add("active-modal");
    }

    document.querySelectorAll(".back-button").forEach(function(elem){
        elem.addEventListener("click", function(){
            const targetModal = parseInt(elem.getAttribute("data-container"));

            document.querySelectorAll(".active-modal").forEach(function(elem){
                elem.classList.remove("active-modal")
            });

            document.getElementById("modal-containers").children[targetModal].classList.add("active-modal");

            checkImage();
        })
    });

    document.querySelectorAll(".checkbox").forEach(function(checkbox) {
        checkbox.addEventListener('click', function() {
            checkbox.classList.toggle('active-checkbox');
        });
    });

    checkImage();
}

initialize();