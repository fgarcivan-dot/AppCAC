# 🛡️ Guía de Mantenimiento: Club Atlético Cercedense

Esta guía explica cómo gestionar los contenidos de la aplicación y cómo funcionan las lógicas automáticas de diseño premium implementadas.

---

## ☁️ 1. Actualización de Datos (GitHub Gist)

La aplicación consume los datos de un archivo **JSON** alojado en GitHub Gist. Para actualizar la información (resultados, clasificaciones, fotos), solo debes editar ese archivo. Los cambios se verán reflejados al abrir la app o al deslizar hacia abajo para actualizar.

---

## ⚽ 2. El Carrusel Master (Página de Inicio)

El carrusel de la pantalla de inicio ahora es inteligente y de alta precisión:

### A. Paso Obligatorio (Strict Paging)
El carrusel obliga a pasar las tarjetas **una a una**. Aunque deslices rápido, el sistema frenará en la siguiente tarjeta para asegurar una navegación profesional.

### B. Estados de Partido (Colores Automáticos)
Dependiendo de lo que pongas en el campo `"status"`, el marcador cambiará de color automáticamente:

| Texto en `status` | Color | Significado |
| :--- | :--- | :--- |
| `EN XOGO` | **Verde** | El partido está en directo (incluye punto parpadeante). |
| `DESCANSO` o `PAUSA` | **Gris** | El partido está pausado (entre tiempos). |
| `FIN` o `FINALIZADO` | **Rojo** | El partido ha terminado. |

---

## 🏆 3. Diseño Elite Universal (Página de Partidos)

Hemos unificado toda la sección de competición bajo el diseño **Hero Pro**. Ya no existen listas pequeñas; todas las categorías tienen el mismo protagonismo.

### A. La Lógica "DESCANSA" (Automático)
Si un equipo no juega, el sistema genera un cartel de **"DESCANSA"** centrado.
- **Cómo activarlo**: Escribe la palabra **`"DESCANSO"`** en el campo `"home"` o `"away"` de tu JSON. 
- **Opcional**: Pon `"DESCANSA"` en el campo `"time"`.

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

Al deslizar hacia abajo para actualizar:
- Verás **"DESLIZA PARA ACTUALIZAR"** con expansión de letras.
- Al soltar, aparecerá **"ACTUALIZANDO"** con un pulso de luz roja.

---

## 📋 5. Consejos para el JSON Profesional
1. **Mayúsculas**: Escribe nombres de equipos y categorías en MAYÚSCULAS.
2. **Resultados**: Si no hay marcador, pon `"POR DEFINIR"` o la hora (ej: `"17:00H"`) en el campo `"score"`.
3. **Imágenes**: Usa enlaces directos `.jpg` o `.png`.

---

> [!IMPORTANT]
> **Estabilidad en iOS**: Hemos implementado un reseteo de seguridad que fuerza el posicionamiento correcto 0.5ms después de cambiar de página para evitar saltos de pantalla indeseados.

---
