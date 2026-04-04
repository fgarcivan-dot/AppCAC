# 🛡️ Guía de Mantenimiento: Club Atlético Cercedense

Esta guía explica cómo gestionar los contenidos de la aplicación y cómo funcionan las lógicas automáticas de diseño premium implementadas.

---

## ☁️ 1. Actualización de Datos (GitHub Gist)

La aplicación consume los datos de un archivo **JSON** alojado en GitHub Gist. Para actualizar la información (resultados, clasificaciones, fotos), solo debes editar ese archivo. Los cambios se verán reflejados al abrir la app o al deslizar hacia abajo para actualizar.

---

## ⚽ 2. El Carrusel Master (MatchCarousel)

El carrusel de la pantalla de inicio ahora es inteligente y de alta precisión:

### A. Paso Obligatorio (Strict Paging)
Para mantener una estética profesional, el carrusel obliga a pasar las tarjetas **una a una**. Aunque deslices rápido, el sistema frenará en la siguiente tarjeta para asegurar que el usuario vea todos los partidos.

### B. Indicador "Pill Slider"
Usamos un selector de cápsula de cristal traslúcida. El bloque rojo se mueve dinámicamente bajo el número de partido activo. Es 100% automático y se adapta al número de partidos que pongas en el JSON.

### C. La Lógica "DESCANSA" (Automático)
Si un equipo no juega esa semana, el sistema limpia la tarjeta y muestra un mensaje potente: **"DESCANSA"**. 
- **Cómo activarlo**: Escribe la palabra `"DESCANSO"` en el campo `"home"` o `"away"` de tu JSON. El sistema hará el resto (ocultará escudos, mapas y centrará el texto).

---

## 🏆 3. Rediseño Elite Seniors (Tarjetas Hero)

En la sección de **Partidos**, hemos creado una jerarquía visual para los equipos principales:

1.  **Senior A y B**: Estos equipos aparecen con **Tarjetas Hero** de gran formato (`190px`).
2.  **Marca de Agua**: El sistema detecta si es el equipo "A" o el "B" y pone una letra gigante de fondo.
3.  **Canteira**: El resto de categorías siguen apareciendo en una lista compacta y ágil para facilitar la lectura de muchos partidos seguidos.

---

## 🔄 4. Sincronización "Ethereal Liquid"

Cuando deslizas hacia abajo para actualizar los datos:
- Verás el texto **"DESLIZA PARA ACTUALIZAR"** con una animación de expansión de letras.
- Al soltar, aparecerá **"ACTUALIZANDO"** con un pulso de luz roja atmosférico. Este sistema está optimizado por la GPU para que sea fluido incluso en móviles antiguos.

---

## 📋 5. Consejos para el JSON Profesional
1. **Mayúsculas**: Escribe nombres de equipos y categorías en MAYÚSCULAS para mantener la estética HUD.
2. **Resultados**: Si el partido no ha empezado, pon `"POR DEFINIR"` o la hora (ej: `"17:00H"`) en el campo `"score"`.
3. **Imágenes**: Usa siempre enlaces directos `.jpg` o `.png`.

---

> [!IMPORTANT]
> **Estabilidad en iOS/iPhone**: Si notas que al navegar la pantalla intenta subir sola, no te preocupes. Hemos implementado un reseteo de seguridad que fuerza el posicionamiento correcto 0.5ms después de cambiar de página.

---
