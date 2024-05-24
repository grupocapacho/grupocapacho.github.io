<?php
// Nombre del archivo JSON
$filename = 'data.json';

// Obtener la fecha actual en un formato adecuado (YYYY-MM-DD)
$currentDate = date('Y-m-d');

// Leer el contenido actual del archivo JSON
if (file_exists($filename)) {
    $jsonData = file_get_contents($filename);
    $data = json_decode($jsonData, true);
} else {
    // Si el archivo no existe, inicializar con un array vacío
    $data = [];
}

// Verificar si hay datos para la fecha actual, si no, inicializar un array vacío
if (!isset($data[$currentDate])) {
    $data[$currentDate] = [];
}

// Obtener todos los parámetros de la URL
foreach ($_GET as $key => $value) {
    // Asegurarse de que el valor sea un número entero
    $value = intval($value);
    
    // Si la clave ya existe en el JSON para esta fecha, sumar el valor
    // Si la clave no existe, crearla y asignar el valor
    if (isset($data[$currentDate][$key])) {
        $data[$currentDate][$key] += $value;
    } else {
        $data[$currentDate][$key] = $value;
    }
}

// Escribir los valores actualizados de vuelta al archivo JSON
file_put_contents($filename, json_encode($data));

// Mostrar un mensaje personalizado
//echo "Los datos han sido actualizados correctamente.";
?>