# 🛡️ Guía de Mantenimiento: Club Atlético Cercedense

Esta guía explica cómo gestionar los contenidos de la aplicación y cómo funcionan las lógicas automáticas implementadas en el sistema.

---

## ☁️ 1. Actualización de Datos (GitHub Gist)

La aplicación consume los datos de un archivo **JSON** alojado en GitHub Gist. Para actualizar la información (resultados, clasificaciones, fotos), solo debes editar ese archivo.

### Estructura Principal
- **`masculino` / `femenino`**: Datos de los equipos senior (calendario, clasificación, post social).
- **`homeContent`**: Contenido de la pantalla de inicio (Manifiesto, Escolas, Instagram, Socios).
- **`resultadosContent`**: Listado general de resultados de todas las categorías.
- **`directoContent`**: Configuración de retransmisiones en vivo (YouTube).

---

## ⚽ 2. Funcionamiento de los Partidos (MatchCarousel)

El carrusel de partidos tiene varias funciones inteligentes basadas en el texto que escribas en el JSON.

### A. Estados de Partido (Colores)
Dependiendo de lo que pongas en el campo `"status"`, el texto aparecerá en un color diferente:

| Texto en `status` | Color | Significado |
| :--- | :--- | :--- |
| `EN XOGO` | **Verde** | El partido está en directo (incluye punto parpadeante). |
| `DESCANSO` o `PAUSA` | **Gris** | El partido está pausado (entre tiempos). |
| `FIN` o `FINALIZADO` | **Rojo** | El partido ha terminado. |

### B. Etiqueta "LOCAL" automática
En cualquier categoría (Masculino o Femenino), si el título del partido es exactamente **`"ESTA XORNADA"`**, la aplicación pondrá la palabra **LOCAL** en rojo encima del equipo de la izquierda.

### C. El Modo "DESCANSO" (Jornada Libre)
- **Si el rival (`away`) es `"DESCANSO"`**: La tarjeta entra en *Modo Minimalista*, mostrando solo la palabra "DESCANSO" en grande. Ideal para semanas sin partido.
- **Si el rival es un equipo real**: Aunque el estado sea `"status": "DESCANSO"`, se mostrará **toda la información** (equipos, marcador, sede), tratando el "descanso" como el entretiempo de un partido real.

### D. Partidos Pendientes (Visualización "VS" u Hora)
- **Si el marcador (`score`) es `"POR DEFINIR"`**: Se mostrará un elegante **"VS"** en el centro.
- **Si el marcador (`score`) incluye una hora**: Si el sistema detecta un **":"** o una **"H"** (ej: `17:00H`, `12:30`, `18h`), mostrará ese texto en el centro con un estilo de "pre-partido" muy limpio, evitando el tamaño de letra gigante de los goles.

---

## 🏫 3. Sección de Escuelas (Canteira)

Para cambiar la foto de la sección "Únete á Canteira", usa el campo:
`"uneteImage": "URL_DE_TU_IMAGEN"` dentro del objeto `escolas` en `homeContent`.

---

## 📋 4. Consejos para el JSON
1. **Mayúsculas**: Se recomienda escribir los nombres de equipos y categorías en MAYÚSCULAS para mantener la estética premium.
2. **URLs de Imágenes**: Utiliza enlaces directos (que terminen en `.jpg` o `.png`).
3. **Puntos de Clasificación**: Los valores de `pts` y `pj` deben ser números (ej. `58`), no texto (ej. `"58"`).

---

> [!IMPORTANT]
> Los cambios que realices en el **Gist** tardarán unos segundos en aparecer en la app. Si quieres que el cambio sea inmediato, puedes cerrar y volver a abrir la aplicación.
