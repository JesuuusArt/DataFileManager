// Estructuras de Datos
class Nodo {
    constructor(dato, siguiente = null, anterior = null) {
        this.dato = dato;
        this.siguiente = siguiente;
        this.anterior = anterior;
    }
}

class ListaDoblementeEnlazada {
    constructor() {
        this.inicio = null;
        this.fin = null;
    }

    insertarInicio(dato) {
        const nuevo = new Nodo(dato, this.inicio);
        if (this.inicio) {
            this.inicio.anterior = nuevo;
        } else {
            this.fin = nuevo;
        }
        this.inicio = nuevo;
    }

    insertarFinal(dato) {
        const nuevo = new Nodo(dato, null, this.fin);
        if (this.fin) {
            this.fin.siguiente = nuevo;
        } else {
            this.inicio = nuevo;
        }
        this.fin = nuevo;
    }

    buscar(dato) {
        let actual = this.inicio;
        while (actual) {
            if (actual.dato === dato) {
                return true;
            }
            actual = actual.siguiente;
        }
        return false;
    }

    obtenerTodos() {
        const elementos = [];
        let actual = this.inicio;
        while (actual) {
            elementos.push(actual.dato);
            actual = actual.siguiente;
        }
        return elementos;
    }

    editarArchivo(archivoAntiguo, archivoNuevo) {
        let actual = this.inicio;
        while (actual) {
            if (actual.dato === archivoAntiguo) {
                actual.dato = archivoNuevo; 
                return;
            }
            actual = actual.siguiente;
        }
    }

    eliminarInicio() {
        if (this.inicio) {
            const eliminado = this.inicio.dato;
            this.inicio = this.inicio.siguiente;
            if (this.inicio) {
                this.inicio.anterior = null;
            } else {
                this.fin = null;
            }
            return eliminado;
        }
        return null;
    }

    eliminarFinal() {
        if (this.fin) {
            const eliminado = this.fin.dato;
            this.fin = this.fin.anterior;
            if (this.fin) {
                this.fin.siguiente = null;
            } else {
                this.inicio = null;
            }
            return eliminado;
        }
        return null;
    }

    limpiar() {
        this.inicio = null;
        this.fin = null;
    }    
}

// Inicializar estructuras
const lista = new ListaDoblementeEnlazada();

// Función para actualizar la tabla
const actualizarTabla = () => {
    const tbody = document.querySelector("#file-table tbody");
    tbody.innerHTML = "";
    const archivos = lista.obtenerTodos();
    archivos.forEach((archivo) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${archivo}</td>
            <td>
                <button class="edit-btn-tb">Editar</button>
                <button class="delete-btn-tb">Eliminar</button>
            </td>`;
        tbody.appendChild(fila);

        fila.querySelector(".edit-btn-tb").addEventListener("click", () => {
            const archivoAntiguo = archivo;
            const nuevoNombre = prompt("Ingrese el nuevo nombre para el archivo:", archivo);
            if (nuevoNombre && nuevoNombre !== archivoAntiguo) {
                lista.editarArchivo(archivoAntiguo, nuevoNombre);
                actualizarTabla();
            }
        });

        fila.querySelector(".delete-btn-tb").addEventListener("click", () => {
            lista.eliminarInicio();
            actualizarTabla(); 
        });
        
    });
};

// Eventos de botones
document.querySelector(".add-start-btn").addEventListener("click", () => {
    const input = document.querySelector("#new-file-content");
    const valor = input.value.trim();
    if (valor) {
        lista.insertarInicio(valor);
        input.value = "";
        actualizarTabla();
    }
});

document.querySelector(".add-end-btn").addEventListener("click", () => {
    const input = document.querySelector("#new-file-content");
    const valor = input.value.trim();
    if (valor) {
        lista.insertarFinal(valor);
        input.value = "";
        actualizarTabla();
    }
});

document.querySelector(".search-btn").addEventListener("click", () => {

    const valor = prompt("Ingrese el nombre del archivo a buscar:");
    if (lista.buscar(valor)) {
        alert(`El archivo "${valor}" sí existe en la lista.`);
    } else {
        alert(`El archivo "${valor}" no fue encontrado.`);
    }
});

document.querySelector(".edit-btn").addEventListener("click", () => {
    const archivoSeleccionado = prompt("Ingrese el nombre del archivo a editar:");

    if (archivoSeleccionado) {
        const archivos = lista.obtenerTodos();
        
        const archivoIndex = archivos.findIndex(archivo => archivo === archivoSeleccionado);

        if (archivoIndex !== -1) {
            const nuevoNombre = prompt("Ingrese el nuevo nombre para el archivo:", archivos[archivoIndex]);

            if (nuevoNombre && nuevoNombre !== archivos[archivoIndex]) {
                lista.editarArchivo(archivoSeleccionado, nuevoNombre);
                actualizarTabla();
                alert(`El archivo ha sido actualizado a "${nuevoNombre}".`);
            }
        } else {
            alert(`El archivo "${archivoSeleccionado}" no fue encontrado.`);
        }
    }
});

document.querySelector(".delete-start-btn").addEventListener("click", () => {
    lista.eliminarInicio();
    actualizarTabla();
});

document.querySelector(".delete-end-btn").addEventListener("click", () => {
    console.log("El botón de editar fue presionado");
    lista.eliminarFinal();
    actualizarTabla();
});

document.querySelector(".clear-all-btn").addEventListener("click", () => {
    console.log("El botón de editar fue presionado");
    lista.limpiar();
    actualizarTabla();
});