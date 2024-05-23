<?php
// Obtener el parámetro 'ip' de la URL
$ip = isset($_GET['ip']) ? $_GET['ip'] : 'default.server.com';

// Contenido HTML que quieres convertir en una imagen PNG, con el parámetro inyectado
$htmlContent = '<svg height="28"role="img"width="76.75"xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"><g shape-rendering="crispEdges"><rect fill="#555"height="28"id="contenedor"width="80.75"x="0"/></g><g fill="#fff"font-family="Verdana,Geneva,DejaVu Sans,sans-serif"font-size="100"text-anchor="middle"text-rendering="geometricPrecision"><text fill="#fff"font-weight="bold"id="estado"textLength="567.5"transform="scale(.1)"x="370"y="175">...</text></g></svg><style>body{margin:0}</style><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script>function checkServerStatus(){$.getJSON("https://api.mcsrvstat.us/3/' . $ip . '",function(e){if(0==e.online)$("#estado").text("OFFLINE"),$("#contenedor").css("fill","#e05d44");else{e.players.online;1==e.players.online&&"",null==e.icon?($("#estado").text("OFFLINE"),$("#contenedor").css("fill","#e05d44")):($("#estado").text("ONLINE"),$("#contenedor").css("fill","#4c1"))}})}checkServerStatus()</script>';

// Guardar el contenido HTML en un archivo temporal
$htmlFile = tempnam(sys_get_temp_dir(), 'html_') . '.html';
file_put_contents($htmlFile, $htmlContent);

// Nombre del archivo de salida
$outputFile = tempnam(sys_get_temp_dir(), 'img_') . '.png';

// Ruta al ejecutable wkhtmltoimage
$wkhtmltoimagePath = 'C:\Program Files\xampp\php\wkhtmltoimage.exe';

// Dimensiones fijas para la imagen
$width = 76;  // Ancho en píxeles
$height = 28; // Alto en píxeles

// Comando para ejecutar wkhtmltoimage
$command = "\"$wkhtmltoimagePath\" --width $width --height $height $htmlFile $outputFile";

// Ejecutar el comando
exec($command, $output, $returnVar);

// Verificar si el comando se ejecutó correctamente
if ($returnVar !== 0) {
    echo "Error generando la imagen.";
    unlink($htmlFile); // Eliminar archivo temporal HTML
    exit(1);
}

// Leer el contenido de la imagen generada
$imageContent = file_get_contents($outputFile);

// Eliminar archivos temporales
unlink($htmlFile);
unlink($outputFile);

// Enviar la imagen como respuesta
header('Content-Type: image/png');
echo $imageContent;
?>
