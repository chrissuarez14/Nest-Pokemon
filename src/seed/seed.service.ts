import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonController } from 'src/pokemon/pokemon.controller';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { log } from 'console';



@Injectable()
export class SeedService {

  // private readonly axios: AxiosInstance=axios;
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http:AxiosAdapter,
    ){}
  


  async executeSeed() {

    await this.pokemonModel.deleteMany();
    // const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    // const insertPromisesArray = [];

    const pokemonToInsert :{name: string,no:number}[]=[];
    data.results.forEach(async ({name,url})=>{
      const segments = url.split('/');
      const no:number = +segments[segments.length-2];

      pokemonToInsert.push({name,no});

      //Cuando son pocos registros es bueno de esta manera pero cuando sean bastantes tnremos que esperar demasiado para que nos resuelva

      // const pokemon = await  this.pokemonModel.create({name,no});
      // insertPromisesArray.push(
      //   this.pokemonModel.create({name,no})
      // )

    })


    // await Promise.all(insertPromisesArray);
    // console.log(this.pokemon.);
    await this.pokemonModel.insertMany(pokemonToInsert);

    
    //Esto es igual a hacer un insert into Pokemon value(name,no)
    
    return 'seed executed!'
  }


}
