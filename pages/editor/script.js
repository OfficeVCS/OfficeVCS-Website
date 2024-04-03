async function initialize() {
    await createComponent("../../Components/PagesEditorNavbar.html", document.getElementById("navbar-container"));

    const token = getToken();

    console.log(token)

    if (!token) {
        console.error('No token found. Please log in.');
        location.href = "../../login";
    }

    const response = await fetch(`https://us-central1-office-vcs.cloudfunctions.net/app/getUser`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        mode: 'cors'
    });

    const context = response;

    console.log(context);

    document.getElementById("profile-picture").innerHTML = "KK"
}

initialize()