# Inglés diario

App web personalizada para practicar inglés en el iPhone. Funciona sin internet una vez instalada.

**Abrir:** https://jaredmendez12.github.io/Gu-a-Ingles/

## Cómo funciona
- **Ruta de 12 unidades (A1 → B1)** que empieza en tu nivel del diagnóstico. La siguiente unidad se abre al dominar el 80% de la actual.
- **Sesión del día:** 20 ejercicios mezclados (escucha y elige, ordena la oración, completa escribiendo, tradúcelo tú, dictado, dilo en voz alta y sonidos difíciles). Se arma con lo que toca repasar, lo nuevo de tu unidad y tus errores.
- **Repetición espaciada:** cada oración vuelve justo antes de que la olvides; lo que fallas regresa en la misma sesión.
- **Historias cortas** sobre programación, videojuegos y la universidad, con audio línea por línea y preguntas.
- **Extras:** tarjetas, contrarreloj de verbos, shadowing con micrófono, habla 1 minuto, quiz, dictado y consulta de verbos.
- **Enviar progreso a Claude** (en Progreso): exporta un JSON cada domingo y adjúntalo en el chat para que Claude ajuste el plan. El mismo archivo sirve para restaurar tu progreso.

## Instalar en el iPhone
1. Abre el enlace en **Safari**.
2. **Compartir → Agregar a pantalla de inicio → Agregar**.
3. Ábrela una vez desde el ícono con internet; después funciona sin conexión.

El progreso se guarda solo en el celular. El micrófono (calificar pronunciación) necesita internet.

## Actualizar contenido
Edita `content.js` o `data.js` y cambia `VERSION` en `sw.js` para que el celular baje la versión nueva.
