const ps = require("prompt-sync");
const prompt = ps();

function calcularTotal(precio, cantidad) {
    return precio * cantidad;
}

function mostrarProductos(producto, precio) {
    console.log("\n--- LISTA DE PRODUCTOS ---");

    for (let i = 0; i < producto.length; i++) {
        console.log((i + 1) + "- " + producto[i] + " - $" + precio[i]);
    }
}

function comprarProducto(producto, precio, carrito, cantidades) {
    mostrarProductos(producto, precio);

    let opcionProducto = parseInt(prompt("Ingrese el número del producto que desea comprar: "));

    if (opcionProducto >= 1 && opcionProducto <= producto.length) {
        let cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar: "));

        if (cantidad > 0) {
            let indice = opcionProducto - 1;

            carrito.push(producto[indice]);
            cantidades.push(cantidad);

            console.log("Producto agregado al carrito correctamente.");
        } else {
            console.log("La cantidad debe ser mayor que 0.");
        }
    } else {
        console.log("Producto no válido.");
    }
}

function pagar(producto, precio, carrito, cantidades) {
    let totalPagar = 0;

    if (carrito.length === 0) {
        console.log("No hay productos en el carrito.");
    } else {
        console.log("\n--- FACTURA ---");

        for (let i = 0; i < carrito.length; i++) {
            let indiceProducto = producto.indexOf(carrito[i]);
            let subtotal = calcularTotal(precio[indiceProducto], cantidades[i]);

            console.log(carrito[i] + " x " + cantidades[i] + " = $" + subtotal.toFixed(2));

            totalPagar += subtotal;
        }

        let descuento = 0;

        if (totalPagar >= 10) {
            descuento = totalPagar * 0.10;
        } else if (totalPagar >= 5) {
            descuento = totalPagar * 0.05;
        }

        let totalFinal = totalPagar - descuento;

        console.log("----------------------");
        console.log("Subtotal: $" + totalPagar.toFixed(2));
        console.log("Descuento: $" + descuento.toFixed(2));
        console.log("Total a pagar: $" + totalFinal.toFixed(2));
    }
}

function agregarProducto(producto, precio) {
    let nuevoProducto = prompt("Ingrese el nombre del nuevo producto: ");
    let nuevoPrecio = parseFloat(prompt("Ingrese el precio del nuevo producto: "));

    if (nuevoProducto !== "" && nuevoPrecio > 0) {
        producto.push(nuevoProducto);
        precio.push(nuevoPrecio);

        console.log("Producto agregado correctamente.");
    } else {
        console.log("Datos inválidos. No se pudo agregar el producto.");
    }
}

let op;
let producto = ["Café", "Coca Cola", "Agua", "Azúcar"];
let precio = [0.5, 1.25, 0.35, 0.65];

let carrito = [];
let cantidades = [];

do {
    console.log("\nBienvenido a la tienda más cachimbona");
    console.log(" ");
    console.log("1- Comprar");
    console.log("2- Ver productos");
    console.log("3- Pagar");
    console.log("4- Agregar un producto");
    console.log("5- Salir");

    op = parseInt(prompt("Ingrese una opción del 1 al 5: "));

    switch (op) {
        case 1:
            comprarProducto(producto, precio, carrito, cantidades);
            break;

        case 2:
            mostrarProductos(producto, precio);
            break;

        case 3:
            pagar(producto, precio, carrito, cantidades);
            break;

        case 4:
            agregarProducto(producto, precio);
            break;

        case 5:
            console.log("Gracias por visitar la tienda. ¡Vuelva pronto!");
            break;

        default:
            console.log("Opción inválida. Intente nuevamente.");
            break;
    }

} while (op != 5);