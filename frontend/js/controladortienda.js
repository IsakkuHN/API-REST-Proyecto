var url = "../../backend/api/empresa.php";
var empresas = [];
axios({
    method: 'GET',
    url: url,
    responseType: 'json'
}).then(res => {
    console.log(res);
    this.empresas = res.data;
    document.getElementById("productos").innerHTML = "";
    for (let i = 0; i < empresas.length; i++) {
        for (let j = 0; j < empresas[i].productos.length; j++) {
            document.getElementById("productos").innerHTML += `
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
                                                class="btn btn-outline-success">Agregar</button</div>
                                    </div>
                                </div>
                            </div>
                        </div</div>
                </div>
                    `;
        }
    }
}).catch(error => {
    console.error(error);
});