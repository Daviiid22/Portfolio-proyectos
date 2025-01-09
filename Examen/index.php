<?php
session_start();
$mensaje = $_SESSION['mensaje'] ?? 'No se ha calculado ningún resultado.';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora PHP</title>
</head>
<body>
    <h1>Calculadora en PHP</h1>
    <form action="Controlador.php" method="POST">
        <label for="num1">Primer número:</label>
        <input type="number" name="num1" step="any" required>
        <br>
        <label for="num2">Segundo número:</label>
        <input type="number" name="num2" step="any">
        <br>
        <label for="operacion">Operación:</label>
        <select name="operacion" required>
            <option value="sumar">Sumar</option>
            <option value="restar">Restar</option>
            <option value="multiplicar">Multiplicar</option>
            <option value="dividir">Dividir</option>
            <option value="potencia">Potencia</option>
        </select>
        <br>
        <button type="submit">Calcular</button>
    </form>

    <h2>Resultado</h2>
    <p><?= htmlspecialchars($mensaje) ?></p>

</body>
</html>
