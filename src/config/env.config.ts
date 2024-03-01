
//Para evitar futuros problemas por la falta de configuracion de alguna variable de entorno podemos hacer esta configuracion para atrapar cuando algo no venga y poner algo por default
//solol funciona en los modulos no valida a nivel main
export const EnvConfiguration = ()=>({
    environment:process.env.NODE_ENV || 'dev',
    mongodb : process.env.MONGODB,
    port    : process.env.PORT || 3001,
    defaultLimit : +process.env.DEFAULT_LIMIT || 7
})