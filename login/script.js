createComponent("../Components/Navbar.html", document.getElementById("navbar-container"));

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

    if(targetModal === 2 || targetModal === 3){
        document.getElementById("banner-image").style.backgroundImage = "url('../icons/icon_red.png')";
    } else {
        document.getElementById("banner-image").style.backgroundImage = "url('../icons/icon.png')";
    }
}

function initialize(){
    const queryParams = new URLSearchParams(window.location.search);

    if(queryParams.toString().includes('signup')){
        document.querySelectorAll(".active-modal").forEach(function(elem){
            elem.classList.remove("active-modal")
        });

        document.getElementById("modal-containers").children[1].classList.add("active-modal");
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