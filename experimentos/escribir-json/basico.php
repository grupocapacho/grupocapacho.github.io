<?php
// Nombre del archivo JSON
$filename = 'data.json';

// Leer el contenido actual del archivo JSON
if (file_exists($filename)) {
    $jsonData = file_get_contents($filename);
    $data = json_decode($jsonData, true);
} else {
    // Si el archivo no existe, inicializar con un array vacío
    $data = [];
}

// Obtener todos los parámetros de la URL
foreach ($_GET as $key => $value) {
    // Asegurarse de que el valor sea un número entero
    $value = intval($value);
    
    // Si la clave ya existe en el JSON, sumar el valor
    // Si la clave no existe, crearla y asignar el valor
    if (isset($data[$key])) {
        $data[$key] += $value;
    } else {
        $data[$key] = $value;
    }
}

// Escribir los valores actualizados de vuelta al archivo JSON
file_put_contents($filename, json_encode($data));

// Responder con el contenido actualizado
header('Content-Type: application/json');
echo json_encode($data);
?>
