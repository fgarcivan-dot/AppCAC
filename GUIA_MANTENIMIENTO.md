# 🛡️ Guía de Mantenimiento: Club Atlético Cercedense

Esta guía explica cómo gestionar los contenidos de la aplicación y cómo funcionan las lógicas automáticas de diseño premium implementadas.

---

## ☁️ 1. Actualización de Datos (GitHub Gist)

La aplicación consume los datos de un archivo **JSON** alojado en GitHub Gist. Para actualizar la información (resultados, clasificaciones, fotos), solo debes editar ese archivo. Los cambios se verán reflejados al abrir la app o al deslizar hacia abajo para actualizar.

---

## ⚽ 2. El Carrusel Master (Página de Inicio)

El carrusel de la pantalla de inicio está diseñado para la **máxima fidelidad informativa**:

### A. Diseño Original
En esta pantalla **no se modifica el diseño** aunque un equipo descanse. Siempre se muestran los dos nombres de los equipos y el marcador (que puede ser la hora o "DESCANSO" en gris) para mantener la estética uniforme de la portada.

### B. Estados de Partido (Colores Automáticos)
Dependiendo de lo que pongas en el campo `"status"`, el marcador cambiará de color automáticamente:

| Texto en `status` | Color | Significado |
| :--- | :--- | :--- |
| `EN XOGO` | **Verde** | El partido está en directo (incluye punto parpadeante). |
| `DESCANSO` o `PAUSA` | **Gris** | El partido está pausado (entre tiempos). |
| `FIN` o `FINALIZADO` | **Rojo** | El partido ha terminado. |

---

## 🏆 3. Diseño Elite (Sección Próximos Partidos)

Esta sección (donde aparecen Seniors y Canteira) utiliza el diseño **Hero Pro Ultra-Minimalista**.

### A. La Lógica "DESCANSA" (Ultra-Limpia)
Cuando un equipo tiene jornada libre, la tarjeta se transforma en un cartel central de alto impacto:
- **Cartel Central**: Aparece el texto **DESCANSA** en tamaño gigante.
- **Sin Distracciones**: Se han eliminado automáticamente el círculo de "REPOSO" superior, el icono del "Fantasma", el texto inferior de "Reposo" y el "Estado de equipo".
- **Cómo activarlo**: Escribe la palabra **`"DESCANSO"`** en el campo `"home"` o `"away"` de tu JSON.

### B. Marcas de Agua HUD (Dinámicas)
El sistema detecta la categoría y pone un código gigante de diseño en el fondo de la tarjeta automáticamente:
- **SENIOR A / B** -> `A` / `B`
- **ALEVÍN A / B** -> `AL-A` / `AL-B`
- **BENXAMÍN A / B** -> `BX-A` / `BX-B`
- **PREBENXAMÍN** -> `PB`
- **BIBERÓN** -> `BB`
- **Resto** (Xuvenil, Cadete, INF) -> `XU`, `CD`, `IF`.

---

## 🔄 4. Actualización "Liquid Refresh"

Al deslizar hacia abajo para actualizar, la app se conecta a GitHub para bajar los últimos cambios del Gist. Es el momento donde aparece el texto **"ACTUALIZANDO"** con pulso de luz roja.

---

## 📋 5. Consejos para el JSON Profesional
1. **Mayúsculas**: Escribe nombres de equipos y categorías en MAYÚSCULAS para mayor impacto visual.
2. **Resultados**: Si no hay marcador todavía, pon la hora (ej: `"17:00H"`) o `"POR DEFINIR"` en el campo `"score"`.
3. **Escudos**: El sistema ya tiene pre-cargados los escudos principales, solo necesitas los nombres.

---
