/* =========================================================
   PRODUCTOS DEL CATÁLOGO
   -----------------------------------------------------------
   Para agregar, editar o borrar productos, modificá este
   array. Cada producto necesita:

   id        -> identificador único (texto, sin espacios)
   name      -> nombre que ve el cliente
   category  -> una de las categorías definidas en CATEGORIES
   price     -> precio en pesos (número, sin puntos ni $)
   desc      -> descripción corta (una línea)
   image     -> ruta a la foto en la carpeta /images
               (dejá "" si todavía no tenés la foto y se
               mostrará un espacio reservado)
   ========================================================= */

const CATEGORIES = [
  { id: "todos",        label: "Todos" },
  { id: "textil",       label: "Estampados y sublimación" },
  { id: "tarjeteria",   label: "Tarjetería" },
  { id: "etiquetas",    label: "Etiquetas y vinilos" },
  { id: "stickers",     label: "Stickers" },
  { id: "eventos",      label: "Eventos y regalos" },
];

const PRODUCTS = [
  { id: "p1", name: "Taza sublimada personalizada", category: "textil", price: 6500, desc: "Diseño a elección, foto o frase.", image: "" },
  { id: "p2", name: "Remera estampada", category: "textil", price: 12000, desc: "Estampado DTF de alta durabilidad.", image: "" },
  { id: "p3", name: "Tarjetas personales x100", category: "tarjeteria", price: 8500, desc: "Papel ilustración 300g, dos caras.", image: "" },
  { id: "p4", name: "Tarjetas premium x50", category: "tarjeteria", price: 9500, desc: "Terminación con laminado mate.", image: "" },
  { id: "p5", name: "Etiquetas para productos x50", category: "etiquetas", price: 4500, desc: "Autoadhesivas, tamaño a elección.", image: "" },
  { id: "p6", name: "Vinilo textil personalizado", category: "etiquetas", price: 3200, desc: "Ideal para indumentaria y merch.", image: "" },
  { id: "p7", name: "Plancha de stickers x12", category: "stickers", price: 3800, desc: "Troquelados, diseño a tu gusto.", image: "" },
  { id: "p8", name: "Stickers troquelados individuales", category: "stickers", price: 450, desc: "Precio por unidad, mínimo 10.", image: "" },
  { id: "p9", name: "Cuadro con foto personalizado", category: "eventos", price: 7200, desc: "Marco de madera, distintos tamaños.", image: "" },
  { id: "p10", name: "Totebag personalizada", category: "eventos", price: 5800, desc: "Estampado a tu elección.", image: "" },
  { id: "p11", name: "Banner para evento o local", category: "eventos", price: 15000, desc: "Lona de alta resistencia, medida a pedido.", image: "" },
  { id: "p12", name: "Kit emprendedor", category: "eventos", price: 11000, desc: "Tarjetas + stickers + etiquetas a juego.", image: "" },
];
