/**
 * Recibe las inscripciones del formulario de asesorías y las guarda en esta hoja.
 * Pegar en: Extensiones > Apps Script (desde la Google Sheet donde quieres los datos).
 */
const NOMBRE_HOJA = 'Inscripciones';
const ENCABEZADOS = ['Fecha de registro', 'Nombres y apellidos', 'Celular', 'Correo electrónico',
                     '¿Qué tema te interesa?', 'Jueves elegido', 'Comentario'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const hoja = obtenerHoja_();
    const d = JSON.parse(e.postData.contents);
    hoja.appendRow([
      new Date(),
      limpiar_(d.nombre),
      "'" + String(d.celular || '').replace(/\D/g, ''),   // como texto, para no perder dígitos
      limpiar_(d.correo),
      limpiar_(d.tema),
      limpiar_(d.fechaTexto || d.fecha),
      limpiar_(d.comentario)
    ]);
    return respuesta_({ ok: true });
  } catch (err) {
    return respuesta_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Permite comprobar en el navegador que el enlace funciona.
function doGet() {
  return respuesta_({ ok: true, mensaje: 'El formulario está conectado a la hoja.' });
}

function obtenerHoja_() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = libro.getSheetByName(NOMBRE_HOJA) || libro.insertSheet(NOMBRE_HOJA);
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(ENCABEZADOS);
    hoja.getRange(1, 1, 1, ENCABEZADOS.length)
        .setFontWeight('bold').setFontColor('#ffffff').setBackground('#1590ba');
    hoja.setFrozenRows(1);
    hoja.setColumnWidths(1, ENCABEZADOS.length, 180);
    hoja.getRange('A:A').setNumberFormat('dd/mm/yyyy hh:mm');
  }
  return hoja;
}

// Evita que un texto que empiece con = + - @ se interprete como fórmula.
function limpiar_(v) {
  const s = String(v == null ? '' : v).slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function respuesta_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
                       .setMimeType(ContentService.MimeType.JSON);
}
