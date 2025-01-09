<?php
session_start();
require_once 'Calculadora.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $primerNumero = isset($_POST['num1']) ? $_POST['num1'] : null;
    $segundoNumero = isset($_POST['num2']) ? $_POST['num2'] : null;
    $operacion = $_POST['operacion'];

    if ($primerNumero === null) {
        // Reinicia la sesion y la pagina si no se introduce el primer numero
        session_destroy();
        header("Location: index.php");
        exit;
    }
    
    
    // Recuperar el ultimo resultado de la sesion si no se introduce el segundo numero
    if ($segundoNumero === null || $segundoNumero === "") {
        $segundoNumero = isset($_SESSION['resultado']) ? $_SESSION['resultado'] : 0;
    }

    $calculadora = new Calculadora();

    switch ($operacion) {
        case 'sumar':
            $resultado = $calculadora->sumar($primerNumero, $segundoNumero);
            break;
        case 'restar':
            $resultado = $calculadora->restar($primerNumero, $segundoNumero);
            break;
        case 'multiplicar':
            $resultado = $calculadora->multiplicar($primerNumero, $segundoNumero);
            break;
        case 'dividir':
            $resultado = $calculadora->dividir($primerNumero, $segundoNumero);
            break;
        case 'potencia':
            $resultado = $calculadora->potencia($primerNumero, $segundoNumero);
            break;
        default:
            $resultado = "Operación no válida.";
    }

    // Almacenar el resultado en la sesion
    $_SESSION['resultado'] = $resultado;
    $_SESSION['mensaje'] = "El resultado de $operacion es: $resultado";
    

    header("Location: index.php");
    exit;
}
?>