import axios,{AxiosInstance}  from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

// Para que se pueda inyectar debemos usar el @Injectable
@Injectable()
export class AxiosAdapter implements HttpAdapter{

    
    private  axios: AxiosInstance=axios;
    async get<T>(url: string): Promise<T> {


        try{
            const { data } = await this.axios.get<T>(url);
            return data;
        }catch(ex){
            throw new Error('This is an error - Check logs');
        }

    }

}