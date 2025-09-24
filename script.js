function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('visible');
        }
    });
}
let options = { threshold: [0.1] };
let observer = new IntersectionObserver(onEntry, options);
document.querySelectorAll('.animate-on-scroll').forEach(elem => {
    observer.observe(elem);
});

// Animar elementos del carrito al añadir
const listaCarrito = document.getElementById('lista-carrito');
const originalActualizarCarrito = window.actualizarCarrito;

window.actualizarCarrito = function() {
    originalActualizarCarrito();
    const items = listaCarrito.querySelectorAll('li');
    items.forEach(item => {
        item.classList.remove('show-item');
        setTimeout(() => item.classList.add('show-item'), 50);
    });
};
    let carrito = [];
    function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}
    function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCompra = document.getElementById('total');
    listaCarrito.innerHTML = '';

    let total = 0;
    carrito.forEach((item, index) => {
    total += item.precio;
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    li.textContent = item.nombre;
    const span = document.createElement('span');
    span.classList.add('badge', 'bg-primary', 'rounded-pill');
    span.textContent = `Bs${item.precio.toFixed(2)}`;

    // Boton eliminar item
    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
    btnEliminar.textContent = 'X';
    btnEliminar.onclick = () => {
    carrito.splice(index, 1);
    actualizarCarrito();
};

    li.appendChild(span);
    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);
});

    totalCompra.textContent = `Total: Bs${total.toFixed(2)}`;
}

    // Validar y enviar formulario
    (function () {
    const formulario = document.getElementById('formularioPedido');
    formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (!formulario.checkValidity()) {
    formulario.classList.add('was-validated');
    return;
}

    if (carrito.length === 0) {
    alert('Tu carrito está vacío. Agrega productos antes de enviar el pedido.');
    return;
}

    // Aquí puedes agregar el envío real a servidor o email si tienes backend

    // Mostrar confirmación
    alert(`Gracias ${document.getElementById('nombre').value}!\nTu pedido ha sido enviado.\nTotal: Bs${carrito.reduce((sum, item) => sum + item.precio, 0).toFixed(2)}`);

    // Limpiar formulario y carrito
    formulario.reset();
    formulario.classList.remove('was-validated');
    carrito = [];
    actualizarCarrito();
});
})();
