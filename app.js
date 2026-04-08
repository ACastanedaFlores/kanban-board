const formKanban = document.getElementById("formulario-kanban");
const inputIdea = document.getElementById("IDEA");
const listaHacer = document.getElementById("list-hacer");
const listaProgreso = document.getElementById("list-progreso");
const listaTerminado = document.getElementById("list-terminado");

let tareas = JSON.parse(localStorage.getItem("misTareas")) || [];

formKanban.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const textoTarea = inputIdea.value.trim();

    const nuevaTareaObj = {
        id: Date.now(),
        texto: textoTarea,
        estado: "list-hacer"
    };

    tareas.push(nuevaTareaObj);
    localStorage.setItem("misTareas", JSON.stringify(tareas));

    const nuevo = document.createElement("article");
    nuevo.classList.add("tarjeta");
    nuevo.innerHTML = `<p>${textoTarea}</p><button class="mover">Mover</button>`;

    const botonMover = nuevo.querySelector("button");

    botonMover.addEventListener("click", function (evento) {
        if (nuevo.parentElement.id === "list-hacer") {
            listaProgreso.appendChild(nuevo);
            nuevaTareaObj.estado = "list-progreso";
            localStorage.setItem("misTareas", JSON.stringify(tareas));

        } else if (nuevo.parentElement.id === "list-progreso") {
            listaTerminado.appendChild(nuevo);
            botonMover.innerText = "Borrar";
            botonMover.style.backgroundColor = "#5aa9e6";
            nuevaTareaObj.estado = "list-terminado";
            localStorage.setItem("misTareas", JSON.stringify(tareas));

        } else if (nuevo.parentElement.id === "list-terminado") {
            nuevo.remove();
            tareas = tareas.filter(function (t) {
                return t.id !== nuevaTareaObj.id;
            });
            localStorage.setItem("misTareas", JSON.stringify(tareas));
        }
    });

    listaHacer.appendChild(nuevo);
    inputIdea.value = "";
});

tareas.forEach(function (tareaGuardada) {
    const nuevo = document.createElement("article");
    nuevo.classList.add("tarjeta");
    nuevo.innerHTML = `<p>${tareaGuardada.texto}</p><button class="mover">Mover</button>`;
    const botonMover = nuevo.querySelector("button");

    if (tareaGuardada.estado === "list-hacer") {
        listaHacer.appendChild(nuevo);
    } else if (tareaGuardada.estado === "list-progreso") {
        listaProgreso.appendChild(nuevo);

    } else if (tareaGuardada.estado === "list-terminado") {
        listaTerminado.appendChild(nuevo);
        botonMover.innerText = "Borrar";
        botonMover.style.backgroundColor = "#5aa9e6";
    }

    botonMover.addEventListener("click", function () {
        if (nuevo.parentElement.id === "list-hacer") {
            listaProgreso.appendChild(nuevo);
            tareaGuardada.estado = "list-progreso";
            localStorage.setItem("misTareas", JSON.stringify(tareas));

        } else if (nuevo.parentElement.id === "list-progreso") {
            listaTerminado.appendChild(nuevo);
            botonMover.innerText = "Borrar";
            botonMover.style.backgroundColor = "#5aa9e6";
            tareaGuardada.estado = "list-terminado";
            localStorage.setItem("misTareas", JSON.stringify(tareas));

        } else if (nuevo.parentElement.id === "list-terminado") {
            nuevo.remove();
            tareas = tareas.filter(function (t) {
                return t.id !== tareaGuardada.id;
            });
            localStorage.setItem("misTareas", JSON.stringify(tareas));
        }
    });
});