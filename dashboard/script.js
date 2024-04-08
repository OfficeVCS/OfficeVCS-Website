async function initialize(){
    await createComponent("../Components/AppNavbar.html", document.getElementById("navbar-container"));
    await createComponent("../Components/AppSidebar.html", document.getElementById("sidebar-container"));

    const user =  await getUser();

    document.getElementById("main-container-header").innerHTML = `${user.fullName}'s Dashboard`;
}

initialize();