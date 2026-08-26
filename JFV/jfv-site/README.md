# JFV Impresiones y Diseño — sitio web

## Estructura
```
index.html        → Landing (inicio, sobre nosotros, servicios, galería)
catalogo.html      → Catálogo con carrito y formulario de pedido
css/style.css      → Todos los estilos
js/main.js         → Menú, animaciones y carrusel de la landing
js/catalog.js      → Lógica del carrito y el modal de pedido
js/products.js      → Lista de productos del catálogo (EDITAR ACÁ)
images/logo.png     → Logo recortado desde tu foto de perfil
```

## Lo primero que tenés que cambiar

1. **Número de WhatsApp**: en `js/catalog.js`, línea con `WHATSAPP_NUMBER`,
   poné el número real en formato internacional sin espacios ni signos
   (ejemplo: `5493424123456`). También está en el footer de `index.html`
   (`https://wa.me/...`).

2. **Fotos**: buscá los bloques marcados como "espacio para foto" o
   `photo-slot` en `index.html` y reemplazalos por tu propia imagen, por
   ejemplo:
   ```html
   <img src="images/taller.jpg" alt="Nuestro taller">
   ```
   Guardá tus fotos dentro de la carpeta `images/`.

3. **Productos del catálogo**: abrí `js/products.js` y editá, agregá o
   borrá productos. Si tenés una foto para un producto, completá el campo
   `image` con la ruta (ejemplo: `"images/taza.jpg"`). Si lo dejás vacío
   (`""`), se muestra un espacio reservado prolijo.

4. **Instagram**: en el footer de `index.html`, actualizá el link de
   Instagram si hace falta.

## Cómo probarlo
Abrí `index.html` con doble clic, o mejor, serví la carpeta con un
servidor local (por ejemplo la extensión "Live Server" de VS Code) para
que las rutas relativas funcionen sin problemas.

## Cómo publicarlo
Podés subir esta carpeta a GitHub Pages igual que hiciste con otros
sitios: creá un repo, subí estos archivos y activá GitHub Pages apuntando
a la rama principal.

## Cómo funciona el pedido
El carrito se guarda en el navegador del cliente (localStorage). Al
tocar "Finalizar pedido" y completar el formulario, se arma un mensaje
con el detalle del pedido y los datos de contacto, y se abre WhatsApp
para que el cliente te lo envíe directamente.
