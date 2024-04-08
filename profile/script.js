async function initialize(){

    await createComponent("../Components/AppNavbar.html", document.getElementById("navbar-container"));

    const user =  await getUser();

    document.getElementById("profile-main-circle").innerHTML = user.fullName.match(/\b(\w)/g).join('');
    document.getElementById("profile-name").innerHTML = user.fullName;
    document.getElementById("profile-email").innerHTML = user.email;
    document.getElementById("profile-main-circle").style.background = `var(--profile-color-${user.color})`;
    document.getElementById("profile-progress-bar").children[0].style.background = `var(--profile-color-${user.color})`;
    document.getElementById("progress-complete").style.color = `var(--profile-color-${user.color})`;

    for(let i = 1; i < 8; i++){
        const newDiv = document.createElement("div");

        newDiv.style.background = `var(--profile-color-${i})`;

        newDiv.addEventListener("click", function(e){
            document.querySelector(".active-profile-color").classList.remove("active-profile-color");
            newDiv.classList.add("active-profile-color");
        });

        document.getElementById("profile-color-selector").appendChild(newDiv);
    }

    document.getElementById("edit-profile-name").value = user.fullName;
    document.getElementById("edit-profile-email").value = user.email;

    document.getElementById("profile-color-selector").children[user.color - 1].classList.add("active-profile-color");
}

function toggleModal(open, index) {
    const modalBackground = document.getElementById('modals-container');
    const modals = document.querySelectorAll('.modal');

    if (open) {
        // Add the class to the modal background to show it
        modalBackground.classList.add('active-modal-background');

        // First, remove the 'active-modals' class from all modals to ensure only one is active at a time
        modals.forEach(modal => {
            modal.classList.remove('active-modal');
        });

        // Then, add the 'active-modals' class to the specific modal by index
        if (modals[index]) {
            modals[index].classList.add('active-modal');
        }
    } else {
        // Remove the 'active-modals' class from all modals to close them
        modals.forEach(modal => {
            modal.classList.remove('active-modal');
        });

        // Remove the class from the modal background to hide it
        modalBackground.classList.remove('active-modal-background');
    }
}

document.getElementById("edit-profile-btn").addEventListener("click", async function(){
    const uuid = getToken();

    let color = 1;

    for(let i = 0; i < document.getElementById('profile-color-selector').children.length; i++){
        if(document.getElementById('profile-color-selector').children[i].classList.contains('active-profile-color')) {
            color = i + 1; // Found the element, update the index
            break; // Exit the loop since we found the element
        }
    }

    const response = await fetch(`https://us-central1-office-vcs.cloudfunctions.net/app/updateUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${uuid}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({
            fullName: document.getElementById('edit-profile-name').value,
            email: document.getElementById('edit-profile-email').value,
            color: color
        }),
        mode: 'cors'
    });

    if(response.status === 200){
        location.reload();
    }
})

initialize();