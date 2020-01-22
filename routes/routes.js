const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const path = require('path')


var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
  });


  router.get('/api/v1/publicaciones', (peticion, respuesta) => {
    pool.getConnection((err, connection) => {
      let consulta
      let modificadorConsulta = ""
      const busqueda = ( peticion.query.busqueda ) ? peticion.query.busqueda : ""
      if (busqueda != ""){
        modificadorConsulta = `
          WHERE
          titulo LIKE '%${busqueda}%' OR
          resumen LIKE '%${busqueda}%' OR
          contenido LIKE '%${busqueda}%'
        `
        modificadorPagina = ""
      }
      consulta = `
        SELECT
        publicaciones.id id, titulo, resumen, fecha_hora, pseudonimo, votos, avatar
        FROM publicaciones
        INNER JOIN autores
        ON publicaciones.autor_id = autores.id
        ${modificadorConsulta}
        ORDER BY fecha_hora DESC
      `
      connection.query(consulta, (error, filas, campos) => {
        if(filas.length > 0){
          respuesta.status(200)
          respuesta.json({data: filas})
        }else{
          respuesta.status(404)
        }
      })
      connection.release()
    })
  });


  router.get('/api/v1/publicaciones/:id', (peticion, respuesta) => {
    pool.getConnection((err, connection) => {
      const consulta = `
        SELECT *
        FROM publicaciones
        WHERE id = ${connection.escape(peticion.params.id)}
      `
      connection.query(consulta, (error, filas, campos) => {
        if (filas.length > 0) {
          respuesta.status(201)
          respuesta.json({data: filas[0]});
        }
        else {
          respuesta.status(404);
          respuesta.send({errors: ["No se encuentra esa tarea"]});
        }
      })
      connection.release()
    })
  });


  router.get('/api/v1/autores', (peticion, respuesta) => {
    pool.getConnection((err, connection) => {
      const consulta = `
        SELECT *
        FROM autores
      `
      connection.query(consulta, (error, filas, campos) => {
        if(filas.length > 0){
          respuesta.status(200)
        respuesta.json({data: filas});
        }else{
          respuesta.status(404)
        }
        
      })
  
      connection.release()
    })
  });


  router.get('/api/v1/autores/:id', (peticion, respuesta) => {
     
    pool.getConnection((err, connection) => {
      const consulta = `
        SELECT *
        FROM autores
        INNER JOIN
        publicaciones
        ON
        autores.id = publicaciones.autor_id
        where autores.id = ${connection.escape(peticion.params.id)}
        ORDER BY autores.id DESC, publicaciones.fecha_hora DESC
      `
      connection.query(consulta, (error, filas, campos) => {
          if(filas.length > 0){
            let AUTOR = {
                pseudonimo: filas[0].pseudonimo,
                avatar: filas[0].avatar,
            };   
            let PUBLICACIONES= [];
    
            filas.forEach(element => {
                PUBLICACIONES.push({titulo: element.titulo, resumen: element.resumen, contenido: element.contenido, foto: element.foto});
            });
            respuesta.status(200)
            respuesta.json({data: {autor: AUTOR, publicaciones: PUBLICACIONES}})
          }else{
            respuesta.status(404);
            respuesta.send({errors: ["No existe el autor"]});
          }      
      })
  
  
      connection.release()
    })
  });

  router.post('/api/v1/autores', (peticion, respuesta) => {
    pool.getConnection((err, connection) => {
      const email = peticion.body.email.toLowerCase().trim()
      const pseudonimo = peticion.body.pseudonimo.trim()
      const contrasena = peticion.body.contrasena
      const consultaEmail = `
        SELECT *
        FROM autores
        WHERE email = ${connection.escape(email)}
      `
      connection.query(consultaEmail, (error, filas, campos) => {
        if (filas.length > 0) {
          respuesta.send({Errors: "El email ingresado ya existe"})
        }
        else {
          const consultaPseudonimo = `
            SELECT *
            FROM autores
            WHERE pseudonimo = ${connection.escape(pseudonimo)}
          `
          connection.query(consultaPseudonimo, (error, filas, campos) => {
            if (filas.length > 0) {
                respuesta.send({Errors: "El pseudonimo ingresado ya existe"})
            }
            else {
              const consulta = `
                                  INSERT INTO
                                  autores
                                  (email, contrasena, pseudonimo)
                                  VALUES (
                                    ${connection.escape(email)},
                                    ${connection.escape(contrasena)},
                                    ${connection.escape(pseudonimo)}
                                  )
                                `
              connection.query(consulta, (error, filas, campos) => {
                const nuevoId = filas.insertId;
                const queryConsult = `SELECT * 
                                            FROM autores
                                                WHERE id = ${connection.escape(nuevoId)}
                                    `
                connection.query(queryConsult, (error, filas, campos) => {
                    respuesta.status(201);
                    respuesta.json({data: filas[0]})
                })

              })
            }
          })
        }
      })
      connection.release()
    })
  });


  router.post('/api/v1/publicaciones', (peticion, respuesta) => {
    pool.getConnection((err, connection) => {
      let email = peticion.query.email;
      let pass = peticion.query.contrasena;
      const date = new Date()
      const fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

      const consultaEmail = `
      SELECT * 
            FROM autores
                WHERE email = ${connection.escape(email)}
      `;

      const consultaPass = `
      SELECT * 
            FROM autores
                WHERE contrasena = ${connection.escape(pass)}
      `;

      connection.query(consultaEmail, (error, filas, campos) => {
          if(filas.length > 0){
            connection.query(consultaPass, (error, filas, campos) => {     
                if(filas.length > 0){
                    let autorId = filas[0].id;
                    const consulta = `
                    INSERT INTO
                    publicaciones
                    (titulo, resumen, contenido, autor_id, fecha_hora)
                    VALUES
                    (
                      ${connection.escape(peticion.body.titulo)},
                      ${connection.escape(peticion.body.resumen)},
                      ${connection.escape(peticion.body.contenido)},
                      ${connection.escape(autorId)},
                      ${connection.escape(fecha)}
                    )
                  `;            

                    connection.query(consulta, (error, filas, campos) => {
                        const nuevoId = filas.insertId;
                        const queryConsult = `SELECT * 
                                            FROM publicaciones
                                                WHERE id = ${connection.escape(nuevoId)}
                                            `;
                        connection.query(queryConsult, (error, filas, campos) => {
                            respuesta.status(201);
                            respuesta.json({data: filas[0]})
                        })
                    })
                }else{
                    respuesta.json({Errors: "Datos de usuario incorrectos"})
                }
            })
          }else{
            respuesta.json({Errors: "Datos de usuario incorrectos"})
          }
      })

      connection.release()
    })
  });

  router.delete('/api/v1/publicaciones/:id', (peticion, respuesta) => {
    pool.getConnection((err, connection) => {
        let email = peticion.query.email;
        let pass = peticion.query.contrasena;

        
        const consultaEmail = `
        SELECT * 
            FROM autores
                WHERE email = ${connection.escape(email)}
        `;

        const consultaPass = `
        SELECT * 
            FROM autores
                WHERE contrasena = ${connection.escape(pass)}
        `;

        connection.query(consultaEmail, (error, filas, campos) => {
            if(filas.length > 0){
                connection.query(consultaPass, (error, filas, campos) => {
                    if(filas.length > 0){
                        let autorId = filas[0].id;
                        const consulta = `
                        DELETE
                        FROM
                        publicaciones
                        WHERE
                        id = ${connection.escape(peticion.params.id)}
                        AND
                        autor_id = ${connection.escape(autorId)}
                      `;

                      connection.query(consulta, (error, filas, campos) => {
                        if (filas && filas.affectedRows > 0){
                            respuesta.status(204)
                            respuesta.send('Publicación eliminada')
                          }
                          else{
                            respuesta.status(404)
                            respuesta.json({Errors: "No se pudo eliminar la publicacion o no existe la misma"});
                          }
                      })

                    }else{
                        respuesta.json({Errors: "Datos de usuario incorrectos"})
                    }
                })
            }else{
                respuesta.json({Errors: "Datos de usuario incorrectos"})
            }
        });

      connection.release()
    })
  });
  

  module.exports = router