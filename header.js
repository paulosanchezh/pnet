
// Carga todas las variables necesarias en contexto global
let menu = document.querySelector('.navMovil');
let abrir = document.querySelector('#imgMenu');
let cerrar = document.querySelector('#imgMenuAbierto');

abrir.addEventListener('click', abrirMenu);
cerrar.addEventListener('click', cerrarMenu);

function abrirMenu() {
    menu.style.display = 'block';
    abrir.style.display = 'none';
    cerrar.style.display = 'block';
}

function cerrarMenu() {
    menu.style.display = 'none';
    cerrar.style.display = 'none';
    abrir.style.display = 'block';
}

