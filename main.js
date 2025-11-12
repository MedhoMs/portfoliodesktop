const dialog = document.getElementById("dialog-content");
const fileFolder = document.querySelectorAll(".file-folder"); //Todas las imagenes con esa clase
let closeDialog = document.getElementById("close-dialog");
let iframeDialog = document.getElementsByClassName("iframe-dialog"); //Todos los iframes
const windowTitle = document.getElementById("window-title"); //Div con el titulo de la ventana y el boton de cerrar
///////DISPLAYS///////

let dynamicTitle = document.getElementById("dynamic-title"); //El h2 del dialog

///////DISPLAYS///////

//Objeto que uso para las rutas del iframe
const pages = {
    "Proyectos" : "projects",
    "Contacto" : "contact",
    "Lenguajes.txt" : "languages",
}

const pagesDictKeys = Object.keys(pages); //Obtengo solo las keys
const pagesDict = Object.entries(pages); //Obtengo las keys y values

let elementSelected; //Usado para el e.currentTarget
let title; //Usado para extraer el innerHTML del siguiente elemento del e.currentTarget, el <p>nombre</p> del file/folder
let assignPages; //Usado para extraer el valor del objeto "pages", e introducirlo en el "src" del <iframe>, optimizacion pura
let showIframeDialog; //Usado para seleccionar el iframe de los que hay en el dialog y decidir si mostrarlo o no;

for (let i = 0; i < fileFolder.length; i++) {
    fileFolder[i].addEventListener("mouseup", openFileFolder);
}

closeDialog.addEventListener("mouseup", closeDialogAction);

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