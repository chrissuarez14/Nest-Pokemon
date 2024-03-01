//Debido a que el env.config trabaja solo encapsulado para la aplicacion de nest es decir dentro del moudlo principal  y sus submodulos debe 
//hacerse esta configuracion usando la libreria joi que debemos instalar, ya que la otra no puede validar a nivel main

import Joi, * as joi from 'joi';


export const JoiValidationSchema = joi.object({
    MONGODB : joi.required(),
    PORT : joi.number().default(3005),
    DEFAULT_LIMIT : joi.number().default(5)
})