<?php
class Calculadora {
    private $resultado;

    public function __construct($resultado=0) {
        $this->resultado = $resultado;
    }

    public function sumar($a, $b) {
        return $a + $b;
    }

    public function restar($a, $b) {
        return $a - $b;
    }

    public function multiplicar($a, $b) {
        return $a * $b;
    }

    public function dividir($a, $b) {
        if ($b == 0) {
            // Si b es 0, devolver "Error: División entre cero"
            return "Error: División entre cero";
        }
        return $a / $b;
    }

    public function potencia($a, $b) {
        return pow($a, $b);
    }
}
?>