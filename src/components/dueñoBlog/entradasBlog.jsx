import React, { useState, useEffect } from 'react';

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
                                    {/* <i className="fa fa-image"></i> */}
                                    <img style={{ height: "32px", width: "30px", marginTop: "8px" }} src={entrada.UrlImagenUsuario} alt={entrada.NombreUsuario} className="img-fluid mb20" />
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
                                            <a href="#" className="btn btn-outline-secondary btn-sm">Comentar</a>
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