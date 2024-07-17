import React, { useState, useEffect } from 'react';
import './css/styleEntradas.css'



const EntradasBlog = () => {
    const [jsonDatosEntradas, setJsonDatosEntradas] = useState([]);
    const [loading, setLoading] = useState(true);

    // USO DEL "useEffect" PARA QUE SE EJECUTE UNA VEZ SE CARGUE LA PAGINA 
    useEffect(() => {
        const fetchEntradas = async () => {
            try {
                let response = await fetch("https://proyectoblog.onrender.com/entradas/traerTodasLasEntradas/");
                response = await response.json();
                if (response.status === true) {
                    console.log(response.descripcion)
                    setJsonDatosEntradas(response.descripcion);
                } else {
                    console.log(response.error);
                }
            } catch (error) {
                console.log("Hubo un error al traer los datos de las entradas " + error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntradas();
    }, []);

    // FUNCION PARA FORMATEAR LA FECHA
    const formatFecha = (fechaStr) => {
        const fecha = new Date(fechaStr);
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return fecha.toLocaleDateString('es-ES', opciones);
    };
    // -- FIN FUNCION --

    if (loading) {
        return <p>Cargando entradas...</p>;
    }

    return (
        <>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                jsonDatosEntradas.length > 0 ? (
                    jsonDatosEntradas.map((entrada) => {
                        const fechaFormateada = formatFecha(entrada.FechaCreacion);
                        return (
                            <div className="vtimeline-point" key={entrada.id}>
                                <div className="vtimeline-icon">
                                    <i className="fa fa-image"></i>
                                    {/* <img style={{ height: "32px", width: "30px", marginTop: "8px" }} src={entrada.UrlImagenUsuario} alt={entrada.NombreUsuario} className="img-fluid mb20" /> */}
                                </div>
                                <div className="vtimeline-block">
                                    <span className="vtimeline-date">{fechaFormateada}</span>
                                    <div className="vtimeline-content">
                                        <div className="datosEntrada">
                                            <a href="#"><img style={{ height: "300px", width: "100%" }} src={entrada.UrlImagenEntrada} alt={entrada.TituloEntrada} className="img-fluid mb20" /></a>
                                            <a href="#"><h3>{entrada.TituloEntrada}</h3></a>
                                            <ul className="post-meta list-inline">
                                                <li className="list-inline-item">
                                                    <i className="fa fa-user-circle-o"></i> <a href="#">{entrada.NombreUsuario} {entrada.ApellidoUsuario}</a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-calendar-o"></i> <a href="#">{fechaFormateada}</a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <i className="fa fa-tags"></i> <a href="#">Blog</a>
                                                </li>
                                            </ul>
                                            <p>{entrada.ContenidoEntrada}</p><br />
                                            <button className="btnPublicar">Comentar</button>
                                        </div>

                                    </div>
                                </div>
                                {/* ACA VOY A COLOCAR EL DISEÑO DONDE VAN A IR LOS COMENTARIOS */}
                                <div className="vtimeline-point" key={entrada.id}>

                                    <div className="vtimeline-block">
                                        <div className="vtimeline-content">
                                            <div className="datosEntrada">
                                                {/* aca van a ir los comentarios */}
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="contenedorComentarios">
                                                                <div className="contendorBotonCerrar">
                                                                    <a href="#" className="btn btn-outline-secondary btn-sm">Cerrar</a>

                                                                </div>
                                                                <div className="contenedorInput">
                                                                    <div className="mb-3">
                                                                        <div className="input-group">
                                                                            <span className="input-group-text textoInput" id="basic-addon3">Nuevo</span>
                                                                            <input placeholder='Escribir Comentario' type="text" className="form-control inputComentar" id="basic-url" aria-describedby="basic-addon3 basic-addon4" />

                                                                        </div>
                                                                    </div>
                                                                    <div className="btnPublicarComentario">
                                                                        <button className='btnPublicar' >Publicar</button>

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
                            </div>


                        );
                    })
                ) : (
                    <p>No hay entradas disponibles</p>
                )
            )}
        </>
    );
};

export default EntradasBlog;