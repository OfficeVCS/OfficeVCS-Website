function initializeColorScheme(scheme){
    const root = document.documentElement;

    if(scheme === "light"){
        root.setAttribute('data-theme', 'light');
    } else if(scheme === "dark"){
        root.setAttribute('data-theme', 'dark');
    }
}

function setColorScheme(scheme) {
    if (!localStorage.getItem('colorscheme')) {
        localStorage.setItem('colorscheme', 'light');
    }

    if (scheme === 'dark' || scheme === 'light') {
        localStorage.setItem('colorscheme', scheme);
        initializeColorScheme(scheme)
    } else {
        console.log('Invalid color scheme. Please choose "dark" or "light".');
    }
}

window.onload = function(){
    if (!localStorage.getItem('colorscheme')) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            localStorage.setItem('colorscheme', 'dark');
        } else {
            localStorage.setItem('colorscheme', 'light');
        }
    }

    initializeColorScheme(localStorage.getItem('colorscheme'));
}