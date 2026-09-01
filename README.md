# Cronómetro de operativas

Aplicación web para hacer estudios de tiempos en planta: cronometra los pasos de una
operativa, calcula el tiempo y el coste por unidad, y genera un informe en Excel.

Funciona sin instalar nada, desde el navegador, y se puede añadir a la pantalla de
inicio del móvil como si fuera una app.

---

## Archivos del repositorio

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La aplicación entera. Es el único archivo que hay que actualizar cuando hay cambios. |
| `manifest.json` | Nombre, colores e iconos para poder instalarla en el móvil. |
| `sw.js` | Hace que la app abra aunque no haya cobertura. |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png` | Iconos de la app. |
| `.gitattributes` | Ajustes de Git (evita que se estropeen las imágenes). |
| `sync/datos.json` | Se crea solo. Es la copia de los datos sincronizados. **No lo edites a mano.** |

---

## Cómo se usa

**Actividad y pasos.** Define qué mides: renombra los pasos, cámbialos de orden, añade
los que quieras. Cada actividad puede ser de dos tipos:

- **Secuencia**: pasos en orden, con su bucle y su cierre de lote.
- **Runner**: tareas sueltas, sin orden. Al pulsar una tarea se guarda sola la anterior.

**Cronómetro.** Pulsa espacio (o el botón grande) para guardar el paso en curso y pasar
al siguiente. El reloj de sesión sigue corriendo aunque pauses: esa diferencia es el
*tiempo sin asignar*.

**Datos e informe.** Media por paso, coste por unidad, histórico y descarga del informe
en Excel.

### Atajos de teclado

| Tecla | Acción |
|---|---|
| `espacio` | Guardar y siguiente |
| `C` | Cerrar lote |
| `1`–`9` y `0` | Saltar a un paso / cambiar de tarea |
| `Z` | Deshacer la última toma |
| `P` | Pausar |
| `N` | Saltar paso |
| `R` | Poner el crono a 0 |
| `S` | Cerrar sesión |
| `G` | Guardar todo |

---

## Sincronización online

Los datos se guardan en el propio dispositivo. Para llevarlos a otro equipo o móvil se
usa este mismo repositorio de GitHub: la app escribe una copia en `sync/datos.json`.

**Configuración**, en la pestaña *Datos e informe* → *Sincronización online*:

1. **Usuario/organización**: tu usuario de GitHub.
2. **Repositorio**: el nombre de este repositorio.
3. **Rama**: normalmente `main`.
4. **Token**: se crea en GitHub → *Settings* → *Developer settings* →
   *Personal access tokens* → *Fine-grained tokens*. En *Repository access* elige
   **Only select repositories** y marca este repositorio; en *Permissions* →
   *Repository permissions* pon **Contents: Read and write**.

Después: **Guardar estos datos de conexión** → **Subir mis datos a la nube**.
En el otro dispositivo, los mismos datos y **Traer datos de la nube**.

Al traer, lo de la nube y lo local **se combinan**: cada toma lleva su identificador, así
que no se duplican ni se pierden.

> El token se guarda **solo en el dispositivo** y nunca se incluye en `sync/datos.json`.
> Si aparece el error *"Secret detected in content"*, es que se está usando una versión
> antigua de `index.html`.

---

## Actualizar la aplicación

1. Sustituye `index.html` por la versión nueva (**Add file → Upload files**).
2. Confirma los cambios (*Commit changes*).
3. Abre la web con **Ctrl+Shift+R** para saltarte la copia guardada del navegador.

Si cambias `manifest.json`, los iconos o `sw.js`, sube también el archivo que toques y
edita la línea `const VERSION = "crono-v1";` de `sw.js` poniendo `crono-v2`, `crono-v3`…
Sin ese cambio, los dispositivos seguirán usando la copia antigua.

**Los datos no están dentro de `index.html`**, así que actualizar la app no borra las
tomas. Aun así, antes de un cambio grande descarga la copia `.json` desde
*Datos e informe*.

---

## Instalar en el móvil

- **Android (Chrome)**: abre la web → menú ⋮ → *Añadir a pantalla de inicio*.
- **iPhone (Safari)**: abre la web → compartir → *Añadir a pantalla de inicio*.

Queda con su icono y sin barra de navegador. El almacenamiento es el mismo, solo que el
sistema tiene menos tendencia a limpiarlo.

---

## Aviso

Si el repositorio es público, cualquiera puede leer `sync/datos.json`. No incluyas
nombres reales de operarios: usa "Operario 1", "Operario 2".
