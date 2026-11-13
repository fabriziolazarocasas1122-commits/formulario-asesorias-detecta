# Formulario de asesorías gratuitas – Detecta Clínica

Formulario de inscripción a las asesorías gratuitas de **Nutrición** 🥗 y **Psicología** 🧠 del Área de Preventivo (4to piso) de Detecta Clínica.

- 📅 Calendario que solo habilita los jueves (desde las 10:30 a. m.)
- 📝 Datos: nombres y apellidos, celular, correo electrónico y tema de interés
- 💬 Espacio para comentarios
- 🤖 Detecto en versión psicólogo y nutricionista

## Archivos

```
formulario-asesorias/
├── index.html                  # el formulario (abrir en el navegador)
├── logo.png
├── detecto-psicologo.png
└── detecto-nutricionista.png
```

Para verlo, abre `formulario-asesorias/index.html` en el navegador o activa GitHub Pages.

## Conectar con Google Sheets

Cada inscripción se guarda como una fila nueva en una hoja de Google Sheets: fecha de registro, nombres y apellidos, celular, correo, tema, jueves elegido y comentario.

1. Crea una hoja nueva en [sheets.new](https://sheets.new) y ponle un nombre (ej. *Inscripciones asesorías*).
2. En la hoja, ve a **Extensiones → Apps Script**.
3. Borra lo que aparece y pega todo el contenido de `google-sheets/Codigo.gs`. Guarda (💾).
4. Haz clic en **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
5. Haz clic en **Implementar**, autoriza los permisos y **copia la URL** que termina en `/exec`.
6. Abre `formulario-asesorias/index.html`, busca esta línea y pega la URL entre las comillas:
   ```js
   const URL_GOOGLE_SHEETS = '';
   ```
7. Listo: llena una inscripción de prueba y revisa la pestaña **Inscripciones** de tu hoja (se crea sola con sus encabezados).

> Si cambias el código de Apps Script, vuelve a **Implementar → Gestionar implementaciones → Editar → Nueva versión** para que los cambios se apliquen.
>
> Mientras `URL_GOOGLE_SHEETS` esté vacío, el formulario no guarda nada: solo muestra el resumen para copiarlo.
