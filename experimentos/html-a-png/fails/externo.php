<?php
// Obtener el parámetro 'ip' de la URL
$ip = isset($_GET['ip']) ? $_GET['ip'] : 'default.server.com';

// Ruta al archivo que contiene el HTML
$htmlFilePath = 'html-base.html';

// Verificar si el archivo existe y se puede leer
if (file_exists($htmlFilePath)) {
    // Cargar el contenido HTML desde el archivo
    $htmlContent = file_get_contents($htmlFilePath);

    // Guardar el contenido HTML en un archivo temporal
    $htmlFile = tempnam(sys_get_temp_dir(), 'html_') . '.html';
    file_put_contents($htmlFile, $htmlContent);

    // Nombre del archivo de salida
    $outputFile = tempnam(sys_get_temp_dir(), 'img_') . '.png';

    // Ruta al ejecutable wkhtmltoimage
    $wkhtmltoimagePath = 'C:\xampp\wkhtmltopdf\wkhtmltoimage.exe';

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
} else {
    echo "El archivo HTML especificado no existe o no se puede leer.";
}
?>
