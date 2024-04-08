async function initialize(){
    richTextField.document.designMode = 'On';

    await createComponent("../../Components/AppNavbar.html", document.getElementById("navbar-container"));

    const user =  await getUser();

    document.getElementById("main-container-header").innerHTML = `${user.fullName}'s Dashboard`;
}

function execCmd(command, value = null) {
    document.getElementById("richTextField").document.execCommand(command, false, value);
}

initialize();