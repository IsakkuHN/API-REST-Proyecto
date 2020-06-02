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
        private $seguidores = array();
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
            "evaluaciones"         =>[]
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
            $contrasena
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
                "seguidores"        =>$this->seguidores,
                "redesSociales"     =>$this->redesSociales,
                "productos"     =>$this->productos,
                "comentarios"       =>$this->comentarios,
                "sucursales"        =>$this->sucursales
            );
            $archivo = fopen("../data/empresa.json","w");
            fwrite($archivo,json_encode($empresas));
            fclose($archivo);
        }
    }
?>