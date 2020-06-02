<?php
    class Usuario{
        
        private $nombre;
        private $apellido;
        private $codigoUsuario;
        private $pais;
        private $direccion;
        private $urlImgPerfil;
        private $email;
        private $telefono;
        private $codigoPostal;
        private $fechaNacimiento;
        private $contrasena;
        private $historialCompra = array();
        private $carrito = array(); 
        private $producto = array(
            "articulo" => "",
            "codigoEmpresa" =>"",
            "cantidad" =>""
        );

        public function __construct(
            $nombre,
            $apellido,
            $codigoUsuario,
            $pais,
            $direccion,
            $urlImgPerfil,
            $email,
            $telefono,
            $codigoPostal,
            $fechaNacimiento,
            $contrasena
        ){
            $this->nombre = $nombre;
            $this->apellido = $apellido;
            $this->codigoUsuario = $codigoUsuario;
            $this->pais = $pais;
            $this->direccion = $direccion;
            $this->urlImgPerfil = $urlImgPerfil;
            $this->email = $email;
            $this->telefono = $telefono;
            $this->codigoPostal = $codigoPostal;
            $this->fechaNacimiento = $fechaNacimiento;
            $this->contrasena = $contrasena;
        }

        public function agregarCarrito($articulo, $codigoEmpresa, $cantidad){
            $this->producto = array(
                "articulo" => $articulo,
                "codigoEmpresa" => $codigoEmpresa,
                "cantidad" =>$cantidad
            );

            $this->carrito[] = $this->producto;
            $this->producto = null;
            echo json_encode($this->carrito);
        }

        public function guardarUsuario(){
            $contenidoArchivo=file_get_contents("../data/usuario.json");
            $usuarios = json_decode($contenidoArchivo,true);
            $usuarios[]= array(
                "nombre"            =>$this->nombre,
                "apellido"          =>$this->apellido,
                "codigoUsuario"     =>$this->codigoUsuario,
                "pais"              =>$this->pais,
                "direccion"         =>$this->direccion,
                "urlImgPerfil"      =>$this->urlImgPerfil,
                "email" =>$this->email,
                "telefono"    =>$this->telefono,
                "codigoPostal"      =>$this->codigoPostal,
                "fechaNacimiento"   =>$this->fechaNacimiento,
                "contrasena"        =>$this->contrasena,
                "historialCompra"   =>$this->historialCompra,
                "carrito"           =>$this->carrito

            );
            $archivo = fopen("../data/usuario.json","w");
            fwrite($archivo,json_encode($usuarios));
            //echo json_encode($usuarios);
            fclose($archivo);

        }

        public static function comprarArticulo($codigoUsuario){
            $contenidoArchivo=file_get_contents("../data/usuario.json");
            $usuarios = json_decode($contenidoArchivo,true);
            $usuario = null;
            for ($i=0; $i <sizeof($usuarios); $i++) { 
                if($usuarios[$i]["codigoUsuario"]==$codigoUsuario){
                    echo '{"mensaje":"Se encontro el usuario buscado"}';
                    $usuario = $usuarios[$i];
                    if(sizeof($usuario["carrito"])!=0){
                        for ($j=0; $j <sizeof($usuario["carrito"]) ; $j++) { 
                            $usuario["historialCompra"][] = array_pop($usuario["carrito"]);
                            echo json_encode($usuario["historialCompra"]);
                        }
                        $usuarios[$i] = $usuario;
                        $archivo = fopen("../data/usuario.json","w");
                        fwrite($archivo,json_encode($usuarios));
                        fclose($archivo);
                    break;
                    }
                    else{
                         echo '{"mensaje":"Su carrito esta vacio"}';
                    }
                }
            }
        }

        public static function obtenerUsuario($id){
            $indice = null;
            $contenidoArchivo=file_get_contents("../data/usuario.json");
            $usuarios= json_decode($contenidoArchivo,true);
            for ($i=0; $i <sizeof($usuarios) ; $i++) { 
                if($usuarios[$i]["codigoUsuario"]==$id){
                    $indice=$i;
                }
                else{
                    echo '"mensaje":"el id del usuario a obtener no existe"';
                }
            }
            echo json_encode($usuarios[$indice]);
        }

        public static function obtenerUsuarios(){
            $contenidoArchivo=file_get_contents("../data/usuario.json");
            echo $contenidoArchivo;
        }

        public function actualizarUsuario($id){
            $indice = null;
            $contenidoArchivo=file_get_contents("../data/usuario.json");
            $usuarios= json_decode($contenidoArchivo,true);
            $usuario = null;
            for ($i=0; $i <sizeof($usuarios) ; $i++) { 
                if($usuarios[$i]["codigoUsuario"]==$id){
                    $indice =$i;
                    $usuario = $usuarios[$i];
                }
            }
            
            $usuario["nombre"]          = $this->nombre;
            $usuario["apellido"]        = $this->apellido;
            $usuario["pais"]            = $this->pais;
            $usuario["direccion"]       = $this->direccion;
            $usuario["urlImgPerfil"]    = $this->urlImgPerfil;
            $usuario["telefono"]        = $this->telefono;
            $usuario["codigoPostal"]    = $this->codigoPostal;
            $usuario["fechaNacimiento"] = $this->fechaNacimiento;
            $usuario["contrasena"]      = $this->contrasena;

            $usuarios[$indice] = $usuario;
            $archivo = fopen('../data/usuario.json','w');
            fwrite($archivo, json_encode($usuarios));
            fclose($archivo);
            echo json_encode($usuarios);
        }

        public static function eliminarUsuario($id){
            $contenidoArchivo=file_get_contents("../data/usuario.json");
            $usuarios= json_decode($contenidoArchivo,true);
            for ($i=0; $i <sizeof($usuarios) ; $i++) { 
                if($usuarios[$i]["codigoUsuario"]==$id){
                    array_splice($usuarios, $i,1);
                }
                else{
                    echo '"{mensaje":"el id del usuario a eliminar no existe"}';
                }
            }
            
            $archivo = fopen('../data/usuario.json','w');
            fwrite($archivo, json_encode($usuarios));
            fclose($archivo);
        }
    }
?>