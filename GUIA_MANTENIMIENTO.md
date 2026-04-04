# 🛡️ Guía de Mantenimiento Elite: Club Atlético Cercedense

Esta guía es tu manual definitivo para gestionar la aplicación. Todo el sistema ha sido diseñado con una arquitectura **Elite HUD (Heads-Up Display)** que automatiza el diseño premium basándose en tus datos.

---

## ☁️ 1. Estructura del JSON (app_data.json)

El archivo de datos en GitHub Gist está organizado por **Páginas y Configuración Global** para un mantenimiento ultrarrápido.

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

## 📋 7. Consejos Pro 
1.  **Formato de Hora**: Usa siempre la "H" (ej: `12:00H`) para que el HUD la detecte.
2.  **Imágenes**: Ruta `/images/nombre.webp`.
3.  **Actualización**: Desliza hacia abajo en la pantalla de Inicio para forzar la sincronización con el Gist.

---
> [!IMPORTANT]
> **No borres las comas `,` ni las llaves `{ }`** del JSON. Si la App no carga, revisa que el JSON sea válido.
