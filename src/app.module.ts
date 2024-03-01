import { join } from 'path'; // en Node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; 



import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.configuration';


@Module({
  imports: [
    //El orden donde pngamos nuestros elementos importa ya que es secuencial el forRott Siempre va al inicio
    //Usar el log le decimos que use el archivo que creamos  con la configuracion de variables de entorno 
    //Para validar las variables principales usamos el vlidationschema y este puede trabajar en conjunto con el load 
    ConfigModule.forRoot({
      load : [EnvConfiguration],
      validationSchema : JoiValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
      
    }),
    MongooseModule.forRoot(process.env.MONGODB,{
      dbName :'pokemosdb'
    }),
    PokemonModule,
    CommonModule,
    SeedModule,

  ],
})
export class AppModule {

  constructor(){}

}
