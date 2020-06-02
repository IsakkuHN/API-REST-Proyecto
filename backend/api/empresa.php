<?php
    header("Content-Type: application/json");
    include_once("../class/class-empresa.php");

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            //echo "Guardar";
            $_POST = json_decode(file_get_contents('php://input'), true);
            $empresa = new Empresa(
                $_POST["nombreEmpresa"],
                $_POST["codigoEmpresa"],
                $_POST["urlBanner"],
                $_POST["urlLogotipo"],
                $_POST["pais"],
                $_POST["direccion"],
                $_POST["web"],
                $_POST["email"],
                $_POST["contrasena"]
            );
            $empresa->guardarEmpresa();
            
            //Usuario::comprarArticulo(2);
            $resultado['Mensaje'] ="guardar el usuario: ".json_encode($_POST);
            echo json_encode($resultado);

        break;
        case 'GET':
            
            if(isset($_GET['id'])) {
                Empresa::obtenerEmpresa($_GET['id']);
            }
            else{
                Empresa::obtenerEmpresas();
            }
        break;
        case 'PUT':
            //echo "Actualizar Un Usuario";
            $_PUT = json_decode(file_get_contents('php://input'), true);
            $empresa = new Empresa(
                $_PUT["nombreEmpresa"],
                $_PUT["codigoEmpresa"],
                $_PUT["urlBanner"],
                $_PUT["urlLogotipo"],
                $_PUT["pais"],
                $_PUT["direccion"],
                $_PUT["web"],
                $_PUT["email"],
                $_PUT["contrasena"]
            );
            $empresa->actualizarEmpresa($_GET['id']);
            $resultado['Mensaje'] = ' id= '.$_GET['id'].', informacion a actualizar: '.json_encode($_PUT);
            $empresa =null;
            echo json_encode($resultado);


        break;
        case 'DELETE':
            
            Empresa::eliminarEmpresa($_GET['id']);
            $resultado['Mensaje'] = "Eliminar un usuario con el id: ".$_GET['id'];
            echo json_encode($resultado);
        break;
    }
?>