<?php
// Nombre del archivo JSON
$filename = 'data.json';

// Leer el contenido actual del archivo JSON
if (file_exists($filename)) {
    $jsonData = file_get_contents($filename);
    $data = json_decode($jsonData, true);
    
    // Establecer el encabezado de tipo de contenido a JSON
    header('Content-Type: application/json');
    // Mostrar el contenido del JSON
    echo json_encode($data, JSON_PRETTY_PRINT);
} else {
    echo "No hay datos disponibles.";
}
?>
