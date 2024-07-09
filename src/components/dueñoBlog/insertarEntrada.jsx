import './css/styleModalInsertar.css'

const InsertarEntrada = () => {

    // EVENTO PARA QUE LA IMAGEN QUE SELECIONO SE COLOQUE DE UNA
    document.getElementById('file-input').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('placeholder-image').src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
    // -- FIN EVENTO --


    return (
        <>
            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Nueva Entrada</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col colImagenEntrada">
                                        <div className="file-input-wrapper">
                                            <input type="file" id="file-input" />
                                            <img src="agregacionFoto.jpg" alt="Seleccionar archivo" id="placeholder-image" />
                                        </div>
                                        <div className="descripcionImagen">
                                            <p>Selecione una Imagen</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                            <label for="floatingInput">Ingrese el Titulo</label>
                                        </div>
                                        <div className="mb-3">
                                            <textarea placeholder='Ingresa La Descripcion de la Entrada' className="form-control" id="message-text"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default InsertarEntrada;