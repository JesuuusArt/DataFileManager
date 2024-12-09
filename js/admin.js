// Estructura de datos de usuarios
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

    insertarFinal(dato) {
        const nuevo = new Nodo(dato, null, this.fin);
        if (this.fin) {
            this.fin.siguiente = nuevo;
        } else {
            this.inicio = nuevo;
        }
        this.fin = nuevo;
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

const listaUsuarios = new ListaDoblementeEnlazada();

const actualizarTabla = () => {
    const tbody = document.querySelector("#user-table tbody");
    tbody.innerHTML = "";
    const usuarios = listaUsuarios.obtenerTodos();
    usuarios.forEach((usuario) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${usuario.username}</td>
            <td>${usuario.email}</td>
            <td>
                <button class="action-btn delete-btn-tb">Eliminar</button>
            </td>`;
        tbody.appendChild(fila);

        fila.querySelector(".delete-btn-tb").addEventListener("click", () => {
            listaUsuarios.eliminarInicio();
            actualizarTabla();
        });
    });
};

document.querySelector("#insert-start-btn").addEventListener("click", () => {
    const username = document.querySelector("#username-input").value.trim();
    const email = document.querySelector("#email-input").value.trim();

    if (username && email) {
        const nuevoUsuario = {
            username: username,
            email: email
        };

        listaUsuarios.insertarFinal(nuevoUsuario);

        document.querySelector("#username-input").value = "";
        document.querySelector("#email-input").value = "";

        actualizarTabla();
    } else {
        alert("Por favor, ingrese tanto el nombre de usuario como el email.");
    }
});

document.querySelector(".search-user-btn").addEventListener("click", () => {
    const username = prompt("Ingrese el nombre de usuario a buscar:");
    const usuarios = listaUsuarios.obtenerTodos();
    const encontrado = usuarios.some(usuario => usuario.username === username);
    if (encontrado) {
        alert(`El usuario "${username}" ha sido encontrado.`);
    } else {
        alert(`El usuario "${username}" no fue encontrado.`);
    }
});

document.querySelector(".delete-start-user-btn").addEventListener("click", () => {
    listaUsuarios.eliminarInicio();
    actualizarTabla(); 
});

document.querySelector(".delete-end-user-btn").addEventListener("click", () => {
    listaUsuarios.eliminarFinal();
    actualizarTabla(); 
});

document.querySelector(".clear-all-users-btn").addEventListener("click", () => {
    listaUsuarios.limpiar();
    actualizarTabla();
});
