var url = "../../backend/api/empresa.php";
var empresas = []
function generarContenido() {
    document.getElementById("contenidoPerfil").innerHTML = "";
    for (let i = 0; i < empresas.length; i++) {
        document.getElementById("contenidoPerfil").innerHTML = `
            <div id="foto">
            <h2>
                ${empresas[i].nombreEmpresa}
            </h2>
            <div class="bannerEmpresa"
                style="
                  background-image: url(../img/${empresas[i].banner});">
                  <div class="bannerContenido ">
                <img src="../img/${empresas[i].logotipo}" alt=""
                    class="img-thumbnail rounded-circle" style="height: 200px;">
                    </div>
            </div>
            </div>
                `;
    }
}

generarContenido();


function generarProductos() {
    document.getElementById("contenidoProductos").innerHTML = "";
    for (let i = 0; i < empresas.length; i++) {
        for (let j = 0; j < empresas[i].productos.length; j++) {
            document.getElementById("contenidoProductos").innerHTML += `
                <div class="col-lg-4 text-center">
                    <svg class="bd-placeholder-img rounded-circle" width="140" height="140"
                        xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"
                        aria-label="Placeholder: 140x140">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777"
                            dy=".3em">140x140</text>
                    </svg><h1></h1><br>
                    <h2>${empresas[i].productos[j].nombreProducto}</h2><br>
                        <button class="btn btn-outline-danger" href="#" role="button" data-target=".bd-example-modal-lg"
                            data-toggle="modal" onclick="descripcionProductoModal(id)" id="${empresas[i].productos[j].nombreProducto}" value="${empresas[i].productos[j].nombreProducto}">Ver Mas »
                        </button>
                </div>
    `;
        }
    }

}

function descripcionProductoModal(identidad) {

    document.getElementById("ventanaModalEmpresa").innerHTML = "";
    let bandera = false;

    for (let i = 0; i < empresas.length; i++) {
        for (let j = 0; j < empresas[i].productos.length; j++) {
            for (let k = 0; k < empresas[i].productos[j].comentarios.length; k++) {
                if (empresas[i].productos[j].nombreProducto === document.getElementById(identidad).value) {
                    let interno = empresas[i].productos[j].comentarios;
                    let comments = "";
                    for (let m = 0; m < interno.length; m++) {
                        comments +=
                            `<h6><b>
              ${interno[m].autor}
            </b></h6>
            <h6>
              ${interno[m].calificacion}
            </h6>
            <h6><em>
              ${interno[m].descripcionComentario}
            </em></h6><br>`;
                    }

                    document.getElementById("ventanaModalEmpresa").innerHTML = `
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">${empresas[i].productos[j].nombreProducto}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body" id="contenidoll-modal">
                      <div class="text-center mb-3">
                          <svg class="bd-placeholder-img rounded-circle text-center" width="140" height="140"
                              xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false"
                              role="img" aria-label="Placeholder: 140x140">
                              <title>Placeholder</title>
                              <rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777"
                                  dy=".3em">140x140</text>
                          </svg>
                      </div>
  
                      <h5>Descripcion</h5>
                      <p>
                      ${empresas[i].productos[j].descripcionProducto}
                      </p>
                      <h5>Duracion de la Oferta</h5>
                        <p>
                          ${empresas[i].productos[j].fechaInicio} - ${empresas[i].productos[j].fechaFinal}
                        </p>
                      <h1></h1><br>
                      <h5>Comentarios</h5>
                      ${comments}
  
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-outline-danger" data-dismiss="modal"><i class="fas fa-times"></i></button>
                      <button type="button" class="btn btn-outline-success">Añadir al carrito <i class="fas fa-cart-plus"></i></button>
                  </div>
              </div>
          </div>
          `;
                    bandera = true;
                }
                if (bandera === true) {
                    break;
                }
            }
            if (bandera === true) {
                break;
            }
        }
        if (bandera === true) {
            break;
        }
    }

}

function generarProductosEmpresa(id){
    axios({
        method: 'GET',
        url: url,
        responseType: 'json'
    }).then(res => {
        console.log(res);
        this.empresas = res.data;
        for (let i = 0; i < empresas.length; i++) {
            if(id==empresas[i].codigoEmpresa){
                console.log ("Se encontro la Empresa");
                document.getElementById("productos").innerHTML="";
                for (let j = 0; j < empresas[i].productos.length; j++) {
                    document.getElementById("productos").innerHTML +=`
                            <div class="col-lg-4 col-md-6 mb-4">
                                <div class="card card-cascade ">

                                    <!-- Imagen -->
                                    <div class="view view-cascade overlay">
                                        <img class="card-img-top" 
                                            src="${empresas[i].productos[j].imagen}"
                                            alt="Card image cap" style="height: 100%; width: 100%; object fit: cover;">
                                    </div>

                                    <!-- Contenido -->
                                    <div class="card-body card-body-cascade">

                                        <!-- Label -->
                                        <h5 class="pink-text pb-2 pt-1"></i>${empresas[i].productos[j].nombre}</h5>
                                        <button class="btn btn-outline-success waves-effect waves-light"
                                            data-toggle="modal" data-target="#staticProduct${j}"
                                            onclick="">Ver Mas</button>

                                        <div class="modal fade" id="staticProduct${j}" data-backdrop="static"
                                            data-keyboard="false" tabindex="-1" role="dialog"
                                            aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div class="modal-dialog dialog-scrollable modal-lg modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="staticLabel">${empresas[i].productos[j].nombre}</h5>
                                                        <button type="button" class="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body row">
                                                        <div class="col-4">
                                                            <img src="${empresas[i].productos[j].imagen}"
                                                                class="card-img" alt="..."
                                                                style="height: 200px; width: auto; ">
                                                        </div>
                                                        <div class="col-4">
                                                            <p class="card-text">${empresas[i].productos[j].descripcion}</p>
                                                            <p class="card-text">
                                                                <small class="text-muted">
                                                                Del ${empresas[i].productos[j].inicioOferta} al ${empresas[i].productos[j].finOferta} <br>
                                                                Precio Inicial Lps. ${empresas[i].productos[j].precioInicial} <br>
                                                                ${empresas[i].productos[j].descuento}% de Descuento<br>
                                                                Unidades disponibles: ${empresas[i].productos[j].sucursalDisponible[0]} <br>
                                                                    <a href="#">${empresas[i].nombreEmpresa}</a>
                                                                </small>
                                                            </p>
                                                        </div>
                                                        <div class="col-4 text-left">
                                                            <img src="../img/qr.jpg" style="height: 200px;" alt="">
                                                        </div>

                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-outline-danger"
                                                            data-dismiss="modal">Cancelar</button>
                                                        <button type="button"
                                                            class="btn btn-outline-success">Agregar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                    `;
                }
            }
        }
    }).catch(error => {
        console.error(error);
    });
}


function obtenerEmpresas() {
    axios({
        method: 'GET',
        url: url,
        responseType: 'json'
    }).then(res => {
        this.empresas = res.data;
    }).catch(error => {
        console.error(error);
    });
}

function actualizarEmpresas(){
    function obtenerUsuarios() {
        axios({
            method: 'POST',
            url: url,
            responseType: 'json',
            data: this.empresas
        }).then(res => {
            console.log(res);
        }).catch(error => {
            console.error(error);
        });
    }
}

function agregarProducto(idEmpresa){

    let producto ={
    nombre : document.getElementById("nombreProducto").value,
    codigo : document.getElementById("codigoProducto").value,
    descripcion : document.getElementById("descripcion").value,
    imagen : document.getElementById("urlImagen").value,
    precioInicial: document.getElementById("precioProducto").value,
    descuento: document.getElementById("descuento").value,
    inicioOferta : document.getElementById("inicioOferta").value,
    finOferta : document.getElementById("finalOferta").value,
    cantidad : document.getElementById("cantidadProducto").value,
    sucursalDisponible : [document.getElementById("sucursal").value]
    }

    for (let i = 0; i < empresas.length; i++) {
        if(idEmpresa==empresas[i].codigoEmpresa){
            empresas[i].productos.push(producto);
            console.log(empresas[i].productos);
            axios({
                method: 'PUT',
                url: url+"?id="+empresas[i].codigoEmpresa,
                responseType: 'json',
                data: JSON.stringify(empresas[i])
            }).then(res => {
                console.log(res);
            }).catch(error => {
                console.error(error);
            });
            generarProductosEmpresa(parseInt(empresas[i].codigoEmpresa));
            break;
        }
        
    }
    

/*
    axios({
        method: 'POST',
        url: url,
        responseType: 'json',
        data: usuario
    }).then(res => {
        console.log(res);
        obtenerUsuarios();
        limpiar();
    }).catch(error => {
        console.error(error);
    });*/
}

generarProductosEmpresa(1);