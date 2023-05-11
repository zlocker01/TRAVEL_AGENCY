import { Testimonial } from "../models/testimoniales.js";

const guardarTestimonial = async (req, res) => {
    //validacion formulario
    const {nombre, correo, mensaje} = req.body;
    const errores = [];
    if(nombre.trim() ===''){
        errores.push({mensaje: 'El nombre está vacio'});
    };
    if(correo.trim() ===''){
        errores.push({mensaje: 'El correo está vacio'});
    };
    if(mensaje.trim() ===''){
        errores.push({mensaje: 'El mensaje esta vacio'});
    };
    if(errores.length > 0){
        //consultar Testimoniales existente
        const testimoniales = await Testimonial.findAll();

        //mostrar errores
        res.render('testimoniales', {
            pagina: 'Testiomnailes',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else {
            //almacenar en DB
            try {
                await Testimonial.create({
                    nombre,
                    correo,
                    mensaje,
                });
                res.redirect('/testimoniales');
            } catch (error) {
                console.log(error);
            };
        };
    };

export {guardarTestimonial};