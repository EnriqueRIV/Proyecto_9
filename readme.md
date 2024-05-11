#PROYECTO 9

Se presenta el proyecto 9, el cual muestra el manejo de Node, Puppeteer, JS y manejo de ficheros.
El concepto resumido es: abrir la instancia del browser, navegar a la página a scrapear, navegar dentro la página hasta la categoria solicitada, desplegar todas las tarjetas de la categoria realizando click todas las veces que sea posible en el botón "show more", capturar los links de cada tarjeta y posteriormente abrir cada link para capturar la información requerida (nombre, imagen y descripción), esta información se almacena y exporta en un archivo json.
10/05/24
Se actualizó el archivo "browser.js" cambiando el valor de la opción "headless" de ".launch()" a "false" para que no actue en modo desatendido y pueda observarse los procesos que ejecuta el script en cuanto a instancias del navegador.
