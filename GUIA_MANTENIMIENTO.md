# 🛡️ Guía de Mantenimiento: Club Atlético Cercedense

Esta guía explica cómo gestionar los contenidos de la aplicación y cómo funcionan las lógicas automáticas implementadas en el sistema.

---

## ☁️ 1. Actualización de Datos (GitHub Gist)

La aplicación consume los datos de un archivo **JSON** alojado en GitHub Gist. Para actualizar la información (resultados, clasificaciones, fotos), solo debes editar ese archivo.

---

## ⚽ 2. Funcionamiento de los Partidos (MatchCarousel)

El carrusel de partidos tiene funciones inteligentes basadas en lo que escribas en el JSON.

### A. Estados de Partido (Colores)
Dependiendo de lo que pongas en el campo `"status"`, el texto aparecerá en un color diferente:

| Texto en `status` | Color | Significado |
| :--- | :--- | :--- |
| `EN XOGO` | **Verde** | El partido está en directo (incluye punto parpadeante). |
| `DESCANSO` o `PAUSA` | **Gris** | El partido está pausado (entre tiempos). |
| `FIN` o `FINALIZADO` | **Rojo** | El partido ha terminado. |

### B. Etiqueta "LOCAL" (Diseño de Placa)
Ahora **todas las tarjetas** muestran automáticamente una placa roja con letras blancas que dice **LOCAL** encima del equipo de la izquierda. No tienes que hacer nada en el JSON, el sistema lo pone siempre para mayor profesionalidad.

### C. El Modo "DESCANSO" (Diseño Centrado)
- **Si el estado (`status`) es `"DESCANSO"`**: La tarjeta se vuelve **minimalista y limpia**. Se ocultan los equipos y toda la información adicional, y se muestra el título (ej: "ESTA XORNADA") y la palabra "DESCANSO" **centrados uno encima del otro**. Esto sirve tanto para jornadas libres como para indicar pausa total.

### D. Partidos Pendientes (Visualización "VS" u Hora)
- **Si el marcador (`score`) es `"POR DEFINIR"`**: Se mostrará un elegante **"VS"** con opacidad suave en el centro.
- **Si el marcador (`score`) incluye una hora**: Si el sistema detecta un **":"** o una **"H"** (ej: `17:00H`, `12:30`, `18h`), mostrará ese texto en el centro con un estilo de "pre-partido" limpio.

---

## 🏫 3. Sección de Escuelas (Canteira)

Para cambiar la foto de la sección "Únete á Canteira", usa el campo:
`"uneteImage": "URL_DE_TU_IMAGEN"` dentro del objeto `escolas` en `homeContent`.

---

## 📋 4. Consejos para el JSON
1. **Mayúsculas**: Se recomienda escribir los nombres de equipos y categorías en MAYÚSCULAS.
2. **URLs de Imágenes**: Utiliza enlaces directos (que terminen en `.jpg` o `.png`). Recomendamos `postimg.cc`.
3. **Puntos de Clasificación**: Los valores de `pts` y `pj` deben ser **números** (ej. `58`), no texto entre comillas (ej. `"58"`).

---

> [!IMPORTANT]
> Los cambios que realices en el **Gist** tardarán unos segundos en aparecer en la app. Si quieres que el cambio sea inmediato, cierra y vuelve a abrir la aplicación.
