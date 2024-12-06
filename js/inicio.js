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

    limpiar() {
        this.inicio = null;
        this.fin = null;
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
}

// Inicializar estructuras
const lista = new ListaDoblementeEnlazada();

// Funciones para actualizar la tabla
const actualizarTabla = () => {
    const tbody = document.querySelector("#file-table tbody");
    tbody.innerHTML = ""; // Limpiar tabla
    const archivos = lista.obtenerTodos();
    archivos.forEach((archivo) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${archivo}</td>
            <td>
                <button class="delete-btn">Eliminar</button>
            </td>`;
        tbody.appendChild(fila);

        // Añadir evento de eliminación a cada botón
        fila.querySelector(".delete-btn").addEventListener("click", () => {
            lista.eliminarInicio(); // Opcional: adaptar para eliminar el elemento específico
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

document.querySelector(".delete-start-btn").addEventListener("click", () => {
    lista.eliminarInicio();
    actualizarTabla();
});

document.querySelector(".delete-end-btn").addEventListener("click", () => {
    lista.eliminarFinal();
    actualizarTabla();
});

document.querySelector(".clear-all-btn").addEventListener("click", () => {
    lista.limpiar();
    actualizarTabla();
});

document.querySelector(".search-btn").addEventListener("click", () => {
    const valor = prompt("Ingrese el nombre del archivo a buscar:");
    if (lista.buscar(valor)) {
        alert(`El archivo "${valor}" sí existe en la lista.`);
    } else {
        alert(`El archivo "${valor}" no fue encontrado.`);
    }
});
