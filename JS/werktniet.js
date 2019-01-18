let alertM;

if (document.documentElement.lang == "en") {
    alertM = `This is under construction, doesn't work yet. Once the next version is up and running, you'll be able to send me as many emails as you like!
    The new version is under construction at the moment.`
} else if (document.documentElement.lang == "nl") {
    alertM = `Deze functie is nog onder constructie en werkt nog niet. Van zodra de volgende versie online komt, kun je mij zo veel mails sturen als je maar wil
    De nieuwe versie wordt gemaakt op dit moment.`
}

function init() {
    document.getElementById('subm').onclick = () => {
        alert(alertM);
    }
}

window.onload = () => init();