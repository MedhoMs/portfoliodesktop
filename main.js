const dialog = document.getElementById("dialog-content");
const fileFolder = document.querySelectorAll(".file-folder"); //Todas las imagenes con esa clase
let closeDialog = document.getElementById("close-dialog");
let iframeDialog = document.getElementById("iframe-dialog");
const windowTitle = document.getElementById("window-title");
///////DISPLAYS///////

let dynamicTitle = document.getElementById("dynamic-title"); //El h2 del dialog

///////DISPLAYS///////

const pages = {
    "Proyectos" : "projects",
    "Contacto" : "contact",
    "Lenguajes.txt" : "languages",
}

const pagesDictKeys = Object.keys(pages);
const pagesDictValues = Object.values(pages);
const pagesDict = Object.entries(pages);

let elementSelected; //Usado para el e.currentTarget
let title; //Usado para extraer el innerHTML del siguiente elemento del e.currentTarget, el <p>nombre</p> del file/folder
let assignPages; //Usado para extraer el valor del objeto "pages", e introducirlo en el "src" del <iframe>, optimizacion pura

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
    elementSelected = e.currentTarget;
    title = elementSelected.nextElementSibling.innerHTML;
    dynamicTitle.innerHTML = title;

    if (pagesDictKeys.includes(title)) {

        for (let i = 0; i < pagesDictKeys.length; i++) {
            if (title === pagesDictKeys[i]) {
                assignPages = pagesDict[i][1];
            }
        }
    }
    
    iframeDialog.setAttribute("src", `/pages/${assignPages}.html`);

    dialog.showModal();
}

function closeDialogAction() {
    dialog.style.top = "15%";
    dialog.style.left = "30%";
    dialog.requestClose();
}