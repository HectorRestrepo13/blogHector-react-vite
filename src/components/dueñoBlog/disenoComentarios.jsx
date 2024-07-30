import './css/styleEntradas.css'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'


const DisenoComentarios = ({ idEntrada, func_mostrarComentarios }) => {


    let [jsonComentarios, setJsonComentarios] = useState(null);
    let [insertacionComentario, setInsertacionComentario] = useState(null)
    const [error, setError] = useState(null);

    //  FUNCION DONDE VOY A CONSUMIR LA API PARA TRAER LOS DATOS DE LOS COMENTARIOS
    const func_traerDatosComentarios = async () => {

        try {


            let comentariosApi = await fetch(`https://proyectoblog.onrender.com/comentarios/selecionarComentarios/${idEntrada}`);

            if (!comentariosApi.ok) {
                throw new Error(`Hubo un error al Consumir la APi de los comentarios Verificar: ${comentariosApi.status}`)
            }

            jsonComentarios = await comentariosApi.json();
            console.log(jsonComentarios)
            setJsonComentarios(jsonComentarios);


        }
        catch (error) {
            setError(error.message);
            console.log(`Hubo un error en la función: func_traerDatosComentarios verificar: ${error}`);

        }
    }

    // -- FIN FUNCION --

    // Función para agregar un cero delante si el valor es menor que 10
    function agregarCero(valor) {
        return valor < 10 ? '0' + valor : valor;
    }




    // FUNCION PARA INSERTAR UN COMENTARIO NUEVO

    const func_insertarComentario = async (e) => {
        e.preventDefault(); // para evitar la recarga automatica del form
        try {
            let textoComentario = e.target.textoComentario.value;

            if (textoComentario != "") {
                const idEntrada = e.target.datoAdicional.value;

                let fechaActual = new Date();
                // Formatear la fecha en el formato AAAA-MM-DD
                const año = fechaActual.getFullYear();
                const mes = agregarCero(fechaActual.getMonth() + 1); // Los meses son de 0 a 11, por lo que se agrega 1
                const día = agregarCero(fechaActual.getDate());

                fechaActual = `${año}-${mes}-${día}`;

                // obtengo la cedula del usuario desde el local Store
                let local = window.localStorage;
                let cedulaUsuario = JSON.parse(local.getItem("usuario"))
                cedulaUsuario = cedulaUsuario.descripcion.CedulaUsuario;

                let jsonDatos = {
                    DescripcionComentario: textoComentario,
                    FechaComentario: fechaActual,
                    UsuarioCedulaUsuario: cedulaUsuario,
                    EntradaId: idEntrada
                }
                setInsertacionComentario("procesando insertacion")
                let insertarComentario = await fetch("https://proyectoblog.onrender.com/comentarios/insertarComentario/", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json', // Tipo de contenido
                    },
                    body: JSON.stringify(jsonDatos)
                })

                if (!insertarComentario.ok) {
                    throw new Error(`Hubo un error al Consumir la API de insertar el comentario!!  ERROR: ${insertarComentario.status}`);
                }

                let jsonInsertacionComentario = await insertarComentario.json();
                setInsertacionComentario(null)
                console.log(jsonInsertacionComentario);
                if (jsonInsertacionComentario.status == true) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: jsonInsertacionComentario.descripcion
                    });
                }
                else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Hubo un error mirar la Consola"
                    });
                }


            }
            else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "info",
                    title: "Escribe Primero un comentario para poder Publicarlo!!"
                });
            }


        } catch (error) {
            console.log(`Hubo un erro al Insertar el comentario: ${error}`)
        }
    }

    // -- FIN FUNCION --


    // FUNCION PARA EDITAR EL COMENTARIO

    const func_editarComentario = (id, nombre, apellido) => {
        // enviamos los datos antes de abrir el modal
        document.getElementById("nombreUsuarioComentario").textContent = `${nombre} ${apellido}`;
        document.getElementById("inputNuevoComentario").value = "Hola";


        var myModal = new bootstrap.Modal(document.getElementById('modalEditar'));
        myModal.show();
    }

    // -- FIN FUNCION --






    // ESTE ES PARA QUE SE INICIE CADA VEZ QUE SE CAMBIA EL ID DE LA ENTRADA ENTONCES SE EJECUTE LA FUNCION
    useEffect(() => {
        func_traerDatosComentarios();
    }, [idEntrada, insertacionComentario]);

    // ESTE POR SI HAY UN ERROR 

    if (error) {
        return (
            <>
                <div className="vtimeline-point" key={idEntrada}>
                    <div className="vtimeline-block">
                        <div className="vtimeline-content">
                            <div className="datosEntrada">
                                {/* aca van a ir los comentarios */}
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="contenedorSinComentarios">
                                                <div className="alert alert-danger" role="alert">
                                                    <h2>Error: {error}</h2>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // ESTE RETURN ES PARA QUE MUESTRE QUE ESTA CARGANDO

    if (!jsonComentarios) {
        return (
            <>
                <div className="vtimeline-point" key={idEntrada}>
                    <div className="vtimeline-block">
                        <div className="vtimeline-content">
                            <div className="datosEntrada">
                                {/* aca van a ir los comentarios */}
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="contenedorCarga">
                                                <div className="spinner-grow text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <div className="spinner-grow text-secondary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <div className="spinner-grow text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <div className="spinner-grow text-danger" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <div className="spinner-grow text-warning" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <div className="spinner-grow text-info" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <div className="spinner-grow text-light" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }

    // ESTE RETURN ES POR SI EL JSON DEVOLVIO UN FALSE, ENTONCES ES PORQUE NO TIENE ENTRADAS 

    if (jsonComentarios.status === false) {
        return (
            <>
                <div className="vtimeline-point" key={idEntrada}>
                    <div className="vtimeline-block">
                        <div className="vtimeline-content">
                            <div className="datosEntrada">
                                {/* aca van a ir los comentarios */}
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="contenedorSinComentarios">
                                                <div style={{ backgroundColor: "transparent", color: "white", display: "flex", justifyContent: "center" }} className="alert alert-secondary" role="alert">
                                                    Esta Entrada no Tiene Comentarios!
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <div className="contenedorComentarios">
                                                <div className="contendorBotonCerrar">
                                                    <a href="#" onClick={func_mostrarComentarios.bind(this, null)} className="btn btn-outline-secondary btn-sm">Cerrar</a>

                                                </div>
                                                <form className='formularioPublicacion' onSubmit={func_insertarComentario}>
                                                    <div className="contenedorInput">
                                                        {
                                                            insertacionComentario == null ? (<>
                                                                <div className="mb-3">
                                                                    <div className="input-group">
                                                                        <span className="input-group-text textoInput" id="basic-addon3">Nuevo</span>
                                                                        <input placeholder='Escribir Comentario' type="text" className="form-control inputComentar" id="textoComentario" aria-describedby="basic-addon3 basic-addon4" />

                                                                    </div>
                                                                </div>
                                                                <input type="hidden" id="datoAdicional" value={idEntrada} />

                                                                <div className="btnPublicarComentario">
                                                                    <button type='submit' className='btnPublicar' >Publicar</button>

                                                                </div>

                                                            </>) : (<>

                                                                <div className="spinner-grow text-primary" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                                <div className="spinner-grow text-secondary" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                                <div className="spinner-grow text-success" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                                <div className="spinner-grow text-danger" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                                <div className="spinner-grow text-warning" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                                <div className="spinner-grow text-info" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                                <div className="spinner-grow text-light" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </>)
                                                        }

                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </>
        );
    }

    //  ESTE RETURN ES EL QUE SE VA MOSTRAR SI TIENE COMENTARIOS LA ENTRADA 
    return (
        <>

            <div className="vtimeline-point" key={idEntrada}>

                <div className="vtimeline-block">
                    <div className="vtimeline-content">
                        <div className="datosEntrada">
                            {/* aca van a ir los comentarios */}
                            <div className="container">
                                {jsonComentarios.datos && jsonComentarios.datos.length > 0 ? (jsonComentarios.datos.map((datos) => (
                                    <div className="row" key={datos.id}>
                                        <div className="col">
                                            <div className="card text-bg-dark mb-3" style={{ maxWidth: "100%" }}>
                                                <div className="infoPerfil">
                                                    <div className="contenedorImagenPerfil">
                                                        <img style={{ height: "40px", width: "40px", borderRadius: "10px", marginLeft: "10px", marginTop: "10px" }} src={jsonComentarios.urlImagenUsuario != null ? jsonComentarios.urlImagenUsuario : imagenUsuarioSinPerfil.jpg} alt="fotoPerfilUsuario" />
                                                    </div>
                                                    <div className="contenedorNombrePerfil">
                                                        <h5 className="card-title">{datos.Usuario.NombreUsuario}</h5>
                                                    </div>
                                                    <div className="contenedorBTNEditar">
                                                        <svg onClick={func_editarComentario(datos.id, datos.Usuario.NombreUsuario, datos.Usuario.ApellidoUsuario)} xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "10px" }} width="28" height="40" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                        </svg>
                                                    </div>
                                                    <div className="contenedorBTNBorrar">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="card-header"></div>
                                                <div className="card-body">
                                                    <p className="card-text">{datos.DescripcionComentario}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                ) : (
                                    <h2>No hay comentarios</h2>
                                )}

                                <div className="row">
                                    <div className="col">
                                        <div className="contenedorComentarios">
                                            <div className="contendorBotonCerrar">
                                                <a href="#" onClick={func_mostrarComentarios.bind(this, null)} className="btn btn-outline-secondary btn-sm">Cerrar</a>

                                            </div>
                                            <form className='formularioPublicacion' onSubmit={func_insertarComentario}>
                                                <div className="contenedorInput">
                                                    {
                                                        insertacionComentario == null ? (<>
                                                            <div className="mb-3">
                                                                <div className="input-group">
                                                                    <span className="input-group-text textoInput" id="basic-addon3">Nuevo</span>
                                                                    <input placeholder='Escribir Comentario' type="text" className="form-control inputComentar" id="textoComentario" aria-describedby="basic-addon3 basic-addon4" />

                                                                </div>
                                                            </div>
                                                            <input type="hidden" id="datoAdicional" value={idEntrada} />

                                                            <div className="btnPublicarComentario">
                                                                <button type='submit' className='btnPublicar' >Publicar</button>

                                                            </div>

                                                        </>) : (<>

                                                            <div className="spinner-grow text-primary" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                            <div className="spinner-grow text-secondary" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                            <div className="spinner-grow text-success" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                            <div className="spinner-grow text-danger" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                            <div className="spinner-grow text-warning" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                            <div className="spinner-grow text-info" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                            <div className="spinner-grow text-light" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </>)
                                                    }
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>

                                {/*  ACA VA IR EL DISEÑO DEL MODAL DE EDITAR EL COMENTARIO */}
                                <div className="row">
                                    <div className="col">
                                        <div className="modal fade" id="modalEditar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content disenoModal">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="nombreUsuarioComentario">Hector Restrepo</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <textarea className="cometarioNuevo" id="inputNuevoComentario" rows="5"></textarea>

                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btnCancelarComentario" data-bs-dismiss="modal">Cancelar</button>
                                                        <button type="button" className="btnGuardarCometario">Guardar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    );
}

export default DisenoComentarios;