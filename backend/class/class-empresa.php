<?php
    class Empresa{
        private $nombreEmpresa;
        private $codigoEmpresa;
        private $urlBanner;
        private $urlLogotipo;
        private $pais;
        private $direccion;
        private $web;
        private $email;
        private $contrasena;
        private $redesSociales = array(
            "facebook" => "",
            "instagram" =>"",
            "twitter" =>""
        );
        private $productos = array();
        private $comentarios = array();
        private $sucursales = array();
        private $producto = array(
            "nombre"             =>"",
            "codigo"             =>"",
            "descripcion"        =>"",
            "imagen"             =>"",
            "precioInicial"      =>"",
            "descuento"          =>"",
            "favorito"           =>"",
            "inicioOferta"       =>"",
            "finOferta"          =>"",
            "cantidad"           =>"",
            "existencia"         =>"",
            "sucursalDisponible" =>"",
            "evaluacion"         =>[]
        );
        public function __construct(
            $nombreEmpresa,
            $codigoEmpresa,
            $urlBanner,
            $urlLogotipo,
            $pais,
            $direccion,
            $web,
            $email,
            $contrasena,
            $redesSociales,
            $productos,
            $comentarios,
            $sucursales
        ){
            $this->nombreEmpresa = $nombreEmpresa;
            $this->codigoEmpresa = $codigoEmpresa;
            $this->urlBanner = $urlBanner;
            $this->urlLogotipo = $urlLogotipo;
            $this->pais = $pais;
            $this->direccion = $direccion;
            $this->web = $web;
            $this->email = $email;
            $this->contrasena = $contrasena;
            $this->redesSociales = $redesSociales;
            $this->productos = $productos;
            $this->comentarios = $comentarios;
            $this->sucursales = $sucursales;
        }

        public function guardarEmpresa(){
            $contenidoArchivo=file_get_contents("../data/empresa.json");
            $empresas = json_decode($contenidoArchivo,true);
            $empresas[]= array(
                "nombreEmpresa"     =>$this->nombreEmpresa,
                "codigoEmpresa"     =>$this->codigoEmpresa,
                "urlBanner"     =>$this->urlBanner,
                "urlLogotipo"              =>$this->urlLogotipo,
                "pais"         =>$this->pais,
                "direccion"      =>$this->direccion,
                "web" =>$this->web,
                "email"    =>$this->email,
                "contrasena"      =>$this->contrasena,
                "redesSociales"     =>$this->redesSociales,
                "productos"     =>$this->productos,
                "comentarios"       =>$this->comentarios,
                "sucursales"        =>$this->sucursales
            );
            $archivo = fopen("../data/empresa.json","w");
            fwrite($archivo,json_encode($empresas));
            fclose($archivo);
        }

        public function actualizarEmpresa($id){
            $indice = null;
            $contenidoArchivo=file_get_contents("../data/empresa.json");
            $empresas= json_decode($contenidoArchivo,true);
            $empresa = null;
            for ($i=0; $i <sizeof($empresas) ; $i++) { 
                if($empresas[$i]["codigoEmpresa"]==$id){
                    $indice =$i;
                    $empresa = $empresas[$i];
                }
            }

        
            
            $empresa["nombreEmpresa"]     = $this->nombreEmpresa;
            $empresa["codigoEmpresa"]     = $this->codigoEmpresa;
            $empresa["urlBanner"]         = $this->urlBanner;
            $empresa["urlLogotipo"]       = $this->urlLogotipo;
            $empresa["pais"]              = $this->pais;
            $empresa["direccion"]         = $this->direccion;
            $empresa["web"]               = $this->web;
            $empresa["email"]             = $this->email;
            $empresa["contrasena"]        = $this->contrasena;
            $empresa["redesSociales"]     = $this->redesSociales;
            $empresa["productos"]         = $this->productos;
            $empresa["comentarios"]       = $this->comentarios;
            $empresa["sucursales"]        = $this->sucursales;

            $empresas[$indice] = $empresa;
            $archivo = fopen('../data/empresa.json','w');
            fwrite($archivo, json_encode($empresas));
            fclose($archivo);
            echo json_encode($empresas);
        }

        public static function actualizarEmpresas($json){
            $archivo = fopen('../data/empresa.json','w');
            fwrite($archivo, $json);
            fclose($archivo);
            echo json_encode($json);
        }

        public static function obtenerEmpresas(){
            $contenidoArchivo=file_get_contents("../data/empresa.json");
            echo $contenidoArchivo;
        }

        public static function obtenerEmpresa($id){
            $indice = null;
            $contenidoArchivo=file_get_contents("../data/empresa.json");
            $empresas= json_decode($contenidoArchivo,true);
            for ($i=0; $i <sizeof($empresas) ; $i++) { 
                if($empresas[$i]["codigoEmpresa"]==$id){
                    $indice=$i;
                }
            }
            
            if($indice==null){
                echo '"mensaje":"el id del usuario a obtener no existe"';
            }
            echo json_encode($empresas[$indice]);
        }

        public static function eliminarEmpresa($id){
            $bandera = false;
            $contenidoArchivo=file_get_contents("../data/empresa.json");
            $empresas= json_decode($contenidoArchivo,true);
            for ($i=0; $i <sizeof($empresas) ; $i++) { 
                if($empresas[$i]["codigoEmpresa"]==$id){
                    array_splice($empresas, $i,1);
                    $bandera=true;
                }  
            }
            if($bandera==false){
                    echo '{"mensaje":"el id del usuario a eliminar no existe"}';
                }
            
            $archivo = fopen('../data/empresa.json','w');
            fwrite($archivo, json_encode($empresas));
            fclose($archivo);
        }
    }
?>