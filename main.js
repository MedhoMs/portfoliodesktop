const dialog = document.getElementById("dialog-content");
const fileFolder = document.querySelectorAll(".file-folder"); //Todas las imagenes con esa clase
let closeDialog = document.getElementById("close-dialog");
let iframeDialog = document.getElementsByClassName("iframe-dialog"); //Todos los iframes
const windowTitle = document.getElementById("window-title"); //Div con el titulo de la ventana y el boton de cerrar
let footerTime = document.getElementById("footer-time"); //Para mostrar el tiempo
let footerDate = document.getElementById("footer-date"); //Para mostrar la fecha
let windowsButton = document.getElementById("windows-button") //La imagen de windows del footer
let leftArrow = document.getElementById("left-arrow");
let rigthArrow = document.getElementById("rigth-arrow");
let desktop = document.getElementById("desktop");

///////DISPLAYS///////

let dynamicTitle = document.getElementById("dynamic-title"); //El h2 del dialog
let windowsButtonOptions = document.getElementById("windows-button-options"); //Es una ventana de options que se abre al pulsar la imagen de windows

///////DISPLAYS///////


///////OBJECTS-LISTS///////

//Objeto que uso para las rutas del iframe
const pages = {
    "Proyectos" : "projects",
    "Contacto" : "contact",
    "Lenguajes.txt" : "languages",
}

const pagesDictKeys = Object.keys(pages); //Obtengo solo las keys
const pagesDict = Object.entries(pages); //Obtengo las keys y values

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


const backgroundImagesList = ["/imgs/background-desktop0.jpg", "/imgs/background-desktop1.jpg", "/imgs/background-desktop2.jpg"];


///////OBJECTS-LISTS///////

let elementSelected; //Usado para el e.currentTarget
let title; //Usado para extraer el innerHTML del siguiente elemento del e.currentTarget, el <p>nombre</p> del file/folder
let assignPages; //Usado para extraer el valor del objeto "pages", e introducirlo en el "src" del <iframe>, optimizacion pura
let showIframeDialog; //Usado para seleccionar el iframe de los que hay en el dialog y decidir si mostrarlo o no;
let windowsOptionActive = true; //Usado para determinar si las opciones de windows estan abiertas o cerradas
let backgroundIndexList = 0; //Usado para identificar en que posicion de la lista de backgrounds estoy

///////EVENTS///////

for (let i = 0; i < fileFolder.length; i++) {
    fileFolder[i].addEventListener("mouseup", openFileFolder);
}

closeDialog.addEventListener("mouseup", closeDialogAction);
windowsButton.addEventListener("mouseup", showWindowsOptions);
leftArrow.addEventListener("mouseup", changeBackDesktopBackward);
rigthArrow.addEventListener("mouseup", changeBackDesktopForward);

///////EVENTS///////



//////LOGICA MOVER DIALOG//////

let offsetX, offsetY;

const move = (e) => {
    dialog.style.top = `${e.clientY - offsetY}px`;
    dialog.style.left = `${e.clientX - offsetX}px`;
}

windowTitle.addEventListener("mousedown", (e) => {
    offsetX = e.clientX - dialog.offsetLeft;
    offsetY = e.clientY - dialog.offsetTop;
    dialog.addEventListener("mousemove", move);
});

dialog.addEventListener("mouseup", () => {
    dialog.removeEventListener("mousemove", move);
});

//////LOGICA MOVER DIALOG//////


//////FUNCTIONS//////

function openFileFolder(e) {
    elementSelected = e.currentTarget; //Selecciono el elemento que acabo de pulsar (la imagen)
    title = elementSelected.nextElementSibling.innerHTML; //El "title" sera el contenido del siguiente elemento de elementSelected(imagen), que sera un <p>
    dynamicTitle.innerHTML = title; //Contenido del h2 del dialog

    if (pagesDictKeys.includes(title)) { //Si en las keys del objeto se encuentra "title":

        for (let i = 0; i < pagesDictKeys.length; i++) {
            if (title === pagesDictKeys[i]) { //Si "title" es igual a alguna de las keys:
                assignPages = pagesDict[i][1]; //A "assignPages" le asigno el value correspondiente a la key[i]
            }
        }
    }
    
    for (let i = 0; i < iframeDialog.length; i++) {
        iframeDialog[i].hidden = true; //Pongo todos los iframes en hidden cuando llamo a openFileFolder()
    }

    showIframeDialog = document.getElementById(`iframe-${assignPages}`); //Selecciono el iframe especifico segun su id
    showIframeDialog.hidden = false; //Le quito el hidden para que solo se muestre ese
    
    //iframeDialog.setAttribute("src", `/pages/${assignPages}.html`);

    dialog.showModal();
}

function closeDialogAction() {
    dialog.style.top = "15%";
    dialog.style.left = "30%";
    dialog.requestClose();
}


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

function changeBackDesktopBackward() {

    if (backgroundIndexList != 0) {
        backgroundIndexList -= 1;
    }

    changeBackgroundImage();
}

function changeBackDesktopForward() {

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