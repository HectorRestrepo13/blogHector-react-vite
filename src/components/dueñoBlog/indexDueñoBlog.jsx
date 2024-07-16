import React from 'react';
import EntradasBlog from './entradasBlog';
import HeaderBlog from './headerBlog';
import InsertarEntrada from './insertarEntrada';
import { useState } from 'react';
const DueñoBlog = () => {
    // console.log(datosUsuario)


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div style={{ padding: "0px" }} className="col">
                        <HeaderBlog />
                    </div>
                </div>
            </div>
            <div className="container">

                <div className="row">


                    <div className="col-12">
                        <div className="btnRedactar">
                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg></button>

                        </div>
                        {/* ACA COLOCO EL  MODAL QUE ES PARA INSERTAR LAS ENTRADAS */}
                        <InsertarEntrada></InsertarEntrada>
                        <div className="page-timeline">

                            {/* Pongo las Entradas del blog */}
                            <EntradasBlog></EntradasBlog>






                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

export default DueñoBlog;