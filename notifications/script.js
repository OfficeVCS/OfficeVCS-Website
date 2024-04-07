async function initialize(){
    await createComponent("../Components/AppNavbar.html", document.getElementById("navbar-container"));
    await createComponent("../Components/AppSidebar.html", document.getElementById("sidebar-container"));

    await getUser();
}

initialize();