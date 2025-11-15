

let footerTime = document.getElementById("footer-time"); //Para mostrar el tiempo
let footerDate = document.getElementById("footer-date"); //Para mostrar la fecha
let windowsButton = document.getElementById("windows-button") //La imagen de windows del footer
let leftArrow = document.getElementById("left-arrow");
let rigthArrow = document.getElementById("rigth-arrow");
let desktop = document.getElementById("desktop");

///////DISPLAYS///////

let windowsButtonOptions = document.getElementById("windows-button-options"); //Es una ventana de options que se abre al pulsar la imagen de windows

///////DISPLAYS///////


///////GLOBAL VARIABLES///////

let windowsOptionActive = true; //Usado para determinar si las opciones de windows estan abiertas o cerradas
let backgroundIndexList = 0; //Usado para identificar en que posicion de la lista de backgrounds estoy

///////GLOBAL VARIABLES///////


///////OBJECTS-LISTS///////

//Esta funcion hace que tanto el mes como el dia tengan un 0 delante cuando solo son 1 cifra
function pad(num) {
    return num.toString().padStart(2, '0');
}

function updateTimeDate() {
    const timeDate = new Date();

    const year = timeDate.getFullYear();
    const month = pad(timeDate.getMonth() + 1);
    const day = pad(timeDate.getDate());
    const hour = pad(timeDate.getHours());
    const minute = pad(timeDate.getMinutes());
    const second = pad(timeDate.getSeconds());

    footerTime.innerHTML = `${hour}:${minute}:${second}`;
    footerDate.innerHTML = `${day}/${month}/${year}`;
}

setInterval(updateTimeDate, 1000);
updateTimeDate();


const backgroundImagesList = ["/imgs/backgrounds/background-desktop0.jpg", "/imgs/backgrounds/background-desktop1.jpg", "/imgs/backgrounds/background-desktop2.jpg"];

///////OBJECTS-LISTS///////


///////EVENTS///////

windowsButton.addEventListener("mouseup", showWindowsOptions);
leftArrow.addEventListener("mouseup", changeBackDesktopBackward);
rigthArrow.addEventListener("mouseup", changeBackDesktopForward);

///////EVENTS///////


//////FUNCTIONS//////

function showWindowsOptions() {

    if (windowsOptionActive == true) {
        windowsButtonOptions.style.opacity = "1";
    } else {
        windowsButtonOptions.style.opacity = "0";
    }

    windowsOptionActive = !windowsOptionActive;
}

window.onload = () => {
    checkArrowsEvents(); //Para desactivar de primeras la flecha de la izquierda
};

function changeBackgroundImage() {
    //desktop.style.opacity = 0;
    //setTimeout(() => {
        desktop.style.backgroundImage = `url('${backgroundImagesList[backgroundIndexList]}')`;
        //desktop.style.opacity = 1;
    //}, 400);
    
    checkArrowsEvents();
}

function changeBackDesktopBackward() { //Cambia el backgroundDesktop hacia atras, la imagen anterior

    if (backgroundIndexList != 0) {
        backgroundIndexList -= 1;
    }

    changeBackgroundImage();
}

function changeBackDesktopForward() { //Cambia el backgroundDesktop hacia delante, la imagen posterior

    if (backgroundIndexList != backgroundImagesList.length - 1) {
        backgroundIndexList += 1;
    }

    changeBackgroundImage();
}

function checkArrowsEvents() {

    if (backgroundIndexList === 0) {
        leftArrow.style.pointerEvents = "none";
    } else {
        leftArrow.style.pointerEvents = "all";
    }
        
    if (backgroundIndexList === (backgroundImagesList.length - 1)) {
        rigthArrow.style.pointerEvents = "none";
    } else {
        rigthArrow.style.pointerEvents = "all";
    }
}
//////FUNCTIONS//////


//Hacer que backgroundImagesList sea un objeto con la imagen (key) y el color de las letras (value), para que cuando el
//fondo sea oscuro, las letras se cambien a white, y viceversa