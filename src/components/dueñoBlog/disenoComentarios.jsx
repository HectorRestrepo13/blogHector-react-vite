import './css/styleEntradas.css'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const DisenoComentarios = ({ idEntrada, func_mostrarComentarios }) => {


    let [jsonComentarios, setJsonComentarios] = useState(null);
    const [error, setError] = useState(null);

    //  FUNCION DONDE VOY A CONSUMIR LA API PARA TRAER LOS DATOS DE LOS COMENTARIOS
    const func_traerDatosComentarios = async () => {

        try {


            let comentariosApi = await fetch(`https://proyectoblog.onrender.com/comentarios/selecionarComentarios/1`);

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
                console.log(jsonInsertacionComentario);


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







    // ESTE ES PARA QUE SE INICIE CADA VEZ QUE SE CAMBIA EL ID DE LA ENTRADA ENTONCES SE EJECUTE LA FUNCION
    useEffect(() => {
        func_traerDatosComentarios();
    }, [idEntrada]);

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

export default DisenoComentarios;