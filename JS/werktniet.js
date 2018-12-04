let alertM;

if (document.documentElement.lang == "en") {
    alertM = "This is under construction, doesn't work yet."
} else if (document.documentElement.lang == "nl") {
    alertM = "Deze functie is nog onder constructie en werkt nog niet."
}

function init() {
    document.getElementById('subm').onclick = () => {
        alert(alertM);
    }
}

window.onload = () => init();