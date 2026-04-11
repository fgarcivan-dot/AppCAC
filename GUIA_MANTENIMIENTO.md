# 🛡️ Guía de Mantenimiento Elite: Club Atlético Cercedense

Esta guía es tu manual definitivo para gestionar la aplicación. Todo el sistema ha sido diseñado con una arquitectura **Elite HUD (Heads-Up Display)** que automatiza el diseño premium basándose en tus datos.

---

## ☁️ 1. Archivo de Datos (public/app_data.json)

El archivo de datos reside en tu repositorio de GitHub. Se ha diseñado con una arquitectura **Elite HUD (Heads-Up Display)** que automatiza el diseño premium basándose en tus datos.

### 📋 Secciones Principales:

1.  **`config`**: (AL INICIO)
    *   `temporada`: Cambia el texto "TEMP. 24/25".
    *   `mesResultados`: Nombre del mes en la pantalla de Resultados.
    *   `mesPartidos`: Nombre del mes en la pantalla de Partidos.

2.  **`inicio`**: 
    *   Gestiona el **Manifiesto**, **Escolas**, **InstaGrid** y el **Banner de Socios**.

3.  **`equipos`**: (MASCULINO / FEMENINO)
    *   `posicion`: Ej: "4º", "LÍDER".
    *   `matches`: Contiene **3 tarjetas** que aparecen en el carrusel de la Home:
        1.  **ÚLTIMO RESULTADO** (Pasado)
        2.  **ESTA XORNADA** (Presente / Enfoque Central)
        3.  **PRÓXIMO PARTIDO** (Futuro)
    *   `standings`: La tabla de clasificación abreviada.
    *   `socialPost`: La última noticia de Instagram con su imagen.

4.  **`resultados`**, **`partidos`**, **`directo`** y **`contacto`**: Secciones específicas por página.

---

## ⚽ 2. Lógica de Estados en el Carrusel

El sistema detecta automáticamente qué diseño mostrar en el carrusel según el campo `"status"`:

| Texto en `status` | Diseño HUD | Significado Táctico |
| :--- | :--- | :--- |
| **`EN XOGO`** | 🟢 **Verde Pulsante** | **PARTIDO EN VIVO**. Muestra el marcador iluminado. |
| **`DESCANSO`** | ⚪ **Gris HUD** | **PAUSA DEL PARTIDO**. Muestra el marcador. |
| **`FIN`** | 🔴 **Rojo HUD** | **RESULTADO FINAL**. Muestra el marcador definitivo. |
| **`PRÓXIMO`** | 💠 **Pre-Partido** | **MUESTRA LA HORA** (ej: 17:00H) en lugar del marcador. No muestra píldora de estado. |

### 💡 Ejemplo de cómo editar un partido en el carrusel:
```json
{
  "title": "ESTA XORNADA",
  "home": "CERCEDENSE",
  "away": "S.D.C TEIXEIRO",
  "date": "DOM 06 ABR, 17:00H",
  "time": "17:00H",
  "status": "PRÓXIMO" // Cambiar a "EN XOGO" cuando empiece
}
```

---

## 🏆 3. Automatismos Especiales

### A. La Regla "DESCANSA"
Si un equipo no juega esa semana:
*   **Acción**: Escribe **`"DESCANSO"`** en el nombre del equipo (`home` o `away`) O en el `status`.
*   **Resultado**: El HUD genera automáticamente una tarjeta minimalista con el texto "DESCANSA" en tipografía gigante.

### B. Marcas de Agua HUD
El sistema genera el código de fondo gigante automáticamente según el `"title"` del partido:
*   `SENIOR` -> `S` | `ALEVÍN` -> `AL-A/B` | `BENXAMÍN` -> `BX-A/B` | `PREBENXAMÍN` -> `PB` | `BIBERÓN` -> `BB`

### C. Eficiencia de Temporada
Los cuadros de victorias se calculan solos. Solo introduce los números en `balanceMasculino / Femenino` dentro de la sección `resultados`.

### D. Resaltado "Orgullo Cercedense"
La tabla de clasificación detecta automáticamente al club:
*   **Acción**: Cualquier equipo con el nombre **"CERCEDENSE"** será detectado por el HUD.
*   **Resultado**: La fila se ilumina con el color primario, un borde acentuado y un indicador de "Club Elite" (punto brillante) junto al nombre. No necesitas marcar nada en el JSON, es automático.

---

## 📊 4. Gestión de Resultados (Última Xornada)

La página de resultados ahora utiliza un sistema de **Pestañas Inteligentes**:

1.  **SÉNIOR**: Agrupa los resultados de los equipos Masculino y Femenino.
2.  **CANTEIRA**: Agrupa automáticamente todos los resultados de las categorías inferiores.
3.  **Enlaces de Temporada**: El sistema genera botones automáticos hacia la clasificación completa. Estos enlaces se gestionan desde el campo `externalUrl` dentro de cada equipo en la sección `equipos`.

---

## 🏟️ 6. Jornadas de Doble Partido

El sistema ahora permite mostrar **múltiples partidos** para una misma categoría en un mismo fin de semana (Doble Xornada).

1.  **Página de Partidos**: Añade dos objetos seguidos en la lista `"proximos"`. Cada uno debe tener su propia `"date"` (ej: SÁB 12 y DOM 13) y un `"id"` único.
2.  **Página de Resultados**: Añade dos resultados seguidos en la `"lista"` de resultados. El sistema los agrupará y mostrará ambos marcadores automáticamente.

### 💡 Ejemplo de JSON para Doble Partido:
```json
{
  "id": 101, // ID Único
  "home": "CERCEDENSE",
  "away": "RIVAL SÁBADO",
  "date": "SÁB 04 ABR",
  "time": "16:30H",
  "category": "XUVENIL",
  "venue": "O ROXO"
},
{
  "id": 102, // Otro ID Único
  "home": "RIVAL DOMINGO",
  "away": "CERCEDENSE",
  "date": "DOM 05 ABR",
  "time": "11:00H",
  "category": "XUVENIL",
  "venue": "FORA"
}
```

---

## 🔔 7. Notificaciones Push (Instantáneas)

La aplicación cuenta con un **"Robot" (GitHub Action)** que vigila el archivo `app_data.json` por ti.

### ⚡ ¿Cómo funcionan?
1.  **Activación por Guardado**: En el momento exacto en que guardas un cambio en el archivo de GitHub, el robot se activa.
2.  **Sincronización:** La app revisa si hay cambios en GitHub cada **15 segundos** automáticamente. No hace falta cerrar y abrir la app.
3.  **Diferenciación de Goles**: Si cambias el marcador de un partido en "EN XOGO", la app detecta si es gol del Cercedense o del rival.
4.  **Seguimiento de Cantera**: Si añades un resultado a la lista general o fijas una hora para un partido de cantera, el sistema envía un aviso a todos los usuarios.

### 📝 Cómo enviar una notificación:
1.  Entra en tu repositorio **AppCAC** en GitHub.
2.  Navega hasta `public/app_data.json`.
3.  Haz clic en el lápiz para **Editar**.
4.  Realiza tus cambios (ej: poner un marcador o activar un directo) y haz clic en **Commit changes**.
5.  **¡Listo!** En pocos segundos, la notificación llegará a todos los móviles.

---

## 📺 8. Retransmisión en Directo (YouTube HUD)

La App incluye un reproductor de vídeo inmersivo que se activa solo cuando el club está emitiendo.

### 🎬 Cómo activar un directo:
1.  **Localiza el ID del vídeo**: En cualquier link de YouTube (ej: `youtube.com/watch?v=ABC123XYZ`), el ID son las letras finales (`ABC123XYZ`).
2.  **Edita el JSON**:
    *   `isLive`: Cámbialo a **`true`**.
    *   `videoId`: Pega el ID del vídeo.
3.  **Resultado**: La App enviará automáticamente una notificación de **"¡ESTAMOS EN DIRECTO!"** y el botón de la web será reemplazado por un reproductor de vídeo a pantalla completa que empieza a reproducirse solo.

### 💡 Consejos del Directo:
*   **Pantalla Completa**: El reproductor permite expandir el vídeo a toda la pantalla del móvil pulsando el icono de YouTube.
*   **Fin del directo**: Cuando termine el partido, vuelve a poner `isLive` en **`false`** para que la App vuelva a mostrar la info del próximo encuentro.

---

## 📋 9. Consejos Pro 
1.  **Formato de Hora**: Usa siempre la "H" (ej: `12:00H`) para que el HUD la detecte.
2.  **Imágenes**: Ruta `/images/nombre.webp` o enlaces directos a postimg.cc.
3.  **Actualización Remota**: Ya no necesitas deslizar para actualizar; al abrir la app o ir a una sección, el sistema ya pide los datos a GitHub automáticamente.

---
> [!IMPORTANT]
> **No borres las comas `,` ni las llaves `{ }`** del JSON. Si la App no carga, revisa que el JSON sea válido.
