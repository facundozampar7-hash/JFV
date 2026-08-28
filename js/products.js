/* =========================================================
   CONFIGURACIÓN DEL CATÁLOGO — Google Sheets
   -----------------------------------------------------------
   Los productos ya NO se editan a mano en un archivo. Se
   cargan en vivo desde una Google Sheet, y se administran
   desde el panel en admin.html.

   Ver el archivo README.md, sección "Catálogo con Google
   Sheets", para los pasos de configuración.
   ========================================================= */

const CATALOG_SHEET_URL = "https://script.google.com/macros/s/AKfycbxJtSqR5R0fJjA1FtnTdhp4eKWmw0CeSllny8nFW-m0IeRs9TEbV8ukGykLQwhnXYEy/exec";

/* Secciones fijas del catálogo. Se usan tanto para los filtros
   del catálogo público como para el desplegable del panel de
   administrador, así siempre coinciden. */
const CATALOG_CATEGORIES = [
  "Estampados y sublimación",
  "Tarjetería",
  "Etiquetas y vinilos",
  "Stickers",
  "Eventos",
  "Regalos personalizados",
  "Impresión 3D",
];
