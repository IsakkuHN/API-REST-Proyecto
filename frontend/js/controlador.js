var empresas = [
  {
    correoEmpresa: "diunsa@algo.com",
    contraseñaEmpresa: "123456789",
    nombreEmpresa: "Diunsa",
    pais: "Honduras",
    direccionEmpresa: "Tegucigalpa",
    banner: "diunsa-banner.png",
    logotipo: "diunsa-logo.png",
    redes: "DiunsaFB",
    sucursales: [
      {
        longitudLatitud: "",
        nombreSucursal: "",
        promociones: []
      }
    ],
    productos: [
      {
        nombreProducto: "Huawei P20",
        precio: "L.20,000.00",
        descripcionProducto: "algo debe ir aqui",
        fotografia: "huawei-p20-lite-500x500.jpg", fechaInicio: "15 de febrero 2020",
        fechaFinal: "15 de mayo 2020",
        sucursales: "Tegucigalpa, SPS",
        comentarios: [{
          autor: "Moncho",
          calificacion: "5/5",
          descripcionComentario: "Excelente Oferta"
        },
        {
          autor: "Maria",
          calificacion: "5/5",
          descripcionComentario: "Excelente Oferta"
        },
        {
          autor: "Juan Gabriel",
          calificacion: "5/5",
          descripcionComentario: "Excelente Oferta"
        }
        ]
      },
      {
        nombreProducto: "Huawei P10",
        precio: "L.20,000.00",
        descripcionProducto: "algo debe ir aqui",
        fotografia: "huawei-p20-lite-500x500.jpg",
        fechaInicio: "15 de febrero 2020",
        fechaFinal: "15 de mayo 2020",
        sucursales: "Tegucigalpa, SPS",
        comentarios: [{
          autor: "Moncho",
          calificacion: "5/5",
          descripcionComentario: "Excelente Oferta"
        },
        {
          autor: "Maria",
          calificacion: "5/5",
          descripcionComentario: "Excelente Oferta, necesitamos mas ofertas asi."
        },
        {
          autor: "Juan Gabriel",
          calificacion: "5/5",
          descripcionComentario: "Excelente Oferta"
        }
        ]
      },
      {
        nombreProducto: "Huawei P30",
        precio: "L.25,000.00",
        descripcionProducto: "algo debe ir aqui",
        fotografia: "huawei-p20-lite-500x500.jpg",
        fechaInicio: "15 de febrero 2020",
        fechaFinal: "15 de mayo 2020",
        sucursales: "Tegucigalpa, SPS",
        comentarios: [{
          autor: "Moncho",
          calificacion: "5/5",
          descripcionComentario: "Excelente Oferta"
        },
        {
          autor: "Maria",
          calificacion: "5/5",
          descripcionComentario: "Excelente Oferta, necesitamos mas ofertas asi."
        },
        {
          autor: "Juan Gabriel",
          calificacion: "5/5",
          descripcionComentario: "Excelente Oferta"
        }
        ]
      }
    ]
  }
];

var clientes = [{
  nombreCliente: "Juanito",
  direccionCliente: "Col. Humuya",
  correoCliente: "joche@algo.com",
  contraseñaCliente: "123456789",
  urlFoto: "foto-cliente.jpg",
  promocionesFavoritas: [empresas[0].productos[0]],
  empresasFavoritas: [empresas[0].nombreEmpresa],
  compras: [],
  carrito: []
}]

console.log(empresas);
console.log(clientes);

//Generador de perfil de la empresa



function comprobarLogin() {
  
  let bandera = false;
  let usuario = document.getElementById("inputEmailLogin").value;
  let contrasenia = document.getElementById("inputPasswordLogin").value;
  console.log(usuario);
  console.log(contrasenia);
  var nameActual;

  for (let i = 0; i < empresas.length; i++) {
    if ((usuario === empresas[i].correoEmpresa) && (contrasenia === empresas[i].contraseñaEmpresa)) {
      bandera = true;
      nameActual = empresas[i].nombreEmpresa;
    }
  }

  for (let j = 0; j < clientes.length; j++) {
    if ((usuario === clientes[j].correoCliente) && (contrasenia === clientes[j].contraseñaCliente)) {
      bandera = true;
      nameActual = clientes[j].nombreCliente;
    }
  }

  if (bandera === false) {
    alert("usuario o contraseña invalido");
  }

  else {
    alert("Bienvenido " + nameActual);
    document.getElementById("navegacion-bar").innerHTML = "";
    document.getElementById("navegacion-bar").innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"><img src="../img/01-16-___logo2.png" style="height: 50px;"></a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Foxer<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Tienda</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link" href="../html/perfilEmpresa.html">Bienvenido ${nameActual}</a>
          </li>
        </ul>

        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="..." aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0 mr-sm-2" type="button">Buscar</button>
          <button class="btn btn-outline-success my-2 my-sm-0 " type="button">
            <i class="fas fa-shopping-cart"></i>
          </button>
        </form>
      </div>
    </nav>
    `;

  }
}
