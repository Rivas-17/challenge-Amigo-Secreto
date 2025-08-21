let amigos = [];
let numeroDeSorteos = 0;

document.addEventListener('DOMContentLoaded', () => {
    amigos = JSON.parse(localStorage.getItem('amigos')) || [];
    mostrarLista();
});

function agregarAmigo() {
    try {
        const nombre = document.getElementById('amigo').value.trim();
        if (!nombre || !/^[a-zA-Z\s]{2,50}$/.test(nombre)) {
            alert("Por favor, inserte un nombre válido.");
            limpiarCaja();
            return;
        }
        if (amigos.includes(nombre)) {
            alert("El nombre ya está en la lista, ingrese otro.");
            limpiarCaja();
            return;
        }
        amigos.push(nombre);
        localStorage.setItem('amigos', JSON.stringify(amigos));
        limpiarCaja();
        mostrarLista();
    } catch (error) {
        alert("Ocurrió un error. Por favor, intenta de nuevo.");
        console.error(error);
    }
}

function limpiarCaja() {
    document.getElementById('amigo').value = '';
}

function mostrarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = amigos.map((amigo, index) => 
        `<li>${amigo} <button onclick="eliminarAmigo(${index})">✕</button></li>`
    ).join('');
    actualizarBotonSortear();
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    localStorage.setItem('amigos', JSON.stringify(amigos));
    mostrarLista();
}

function sortearAmigo() {
    if (amigos.length < 4) {
        alert("¡Necesitas añadir al menos 4 amigos para sortear!");
        return;
    }
    const indice = Math.floor(Math.random() * amigos.length);
    document.getElementById('resultado').innerHTML = `Tu amigo secreto es: ¡${amigos[indice]}! 🎉`;
    numeroDeSorteos++;
    if (numeroDeSorteos > 1 && confirm("¿Deseas reiniciar el juego?")) {
        reiniciarJuego();
    }
}

function reiniciarJuego() {
    amigos = [];
    numeroDeSorteos = 0;
    localStorage.removeItem('amigos');
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    actualizarBotonSortear();
}

function actualizarBotonSortear() {
    const botonSortear = document.getElementById('botonSortear');
    botonSortear.disabled = amigos.length < 4;
}