//////VARIABLES//////

let projectsTitles = document.querySelectorAll("nav p");
let individualProjects = document.querySelectorAll(".image-and-description");
let projectsImages = document.querySelectorAll(".project-image");

//////VARIABLES//////


//////GLOBAL VARIABLES//////

let projectTitleSelected; //Usado para extraer el titulo del proyecto seleccionado en el nav
let projectImageSelected; //Usado para extraer la imagen del proyecto correspondiente al nav seleccionado
let projectDescription;
let showHideDescription; //Boolean para mostrar u ocultar la descripcion del proyecto seleccionado

//////GLOBAL VARIABLES//////


//////EVENTS//////

projectsTitles.forEach(projectTitle => {
    projectTitle.addEventListener("mouseup", showProject);
});

projectsImages.forEach(projectImage => {
    //Le paso a la funcion los valores de "e", que hara de Target, y true, que será el showHideDescription
    projectImage.addEventListener("mouseover", function(e) {
        showProjectDescription(e, true);
    });

    //Le paso a la funcion los valores de "e", que hara de Target, y false, que será el showHideDescription
    projectImage.addEventListener("mouseleave", function(e) {
        showProjectDescription(e, false);
    });
});

//////EVENTS//////


//////FUNCTIONS//////
individualProjects[0].classList.add("project-visible");
projectsTitles[0].style.borderBottom = "3px solid black";

function showProject(e) {
    projectTitleSelected = e.target.getAttribute("name");
    console.log(projectTitleSelected);

    for (let i = 0; i < individualProjects.length; i++) {
        if (projectTitleSelected === individualProjects[i].id) {
            individualProjects[i].hidden = false;
            projectsTitles[i].style.borderBottom = "3px solid black";
            //Uso el setTimeout para que al quitarle el hidden, espere un momento para que el HTML reconozca que el elemento existe,
            //y pueda aplicarle la clase que permite la animacion
            setTimeout(() => {
                individualProjects[i].classList.add("project-visible");
            }, 200);
        } else {
            individualProjects[i].classList.remove("project-visible");
            projectsTitles[i].style.borderBottom = "none";
            setTimeout(() => {
                individualProjects[i].hidden = true;
            }, 200);
        }
    }
}

function showProjectDescription(e, showHideDescription) {

    projectImageSelected = e.target; //Imagen por la cual paso el raton por arriba
    projectDescription = projectImageSelected.nextElementSibling; //El siguiente elemento de projectImageSelected, el texto

    if (showHideDescription) {
        projectDescription.classList.add("description-visible");
        projectDescription.style.pointerEvents = "none"; //Para que al tocar el texto, el e.target no desaparezca
    } else {
        projectDescription.classList.remove("description-visible");
    }
}

//////FUNCTIONS//////