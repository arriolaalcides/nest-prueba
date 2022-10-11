import { Get, Injectable } from '@nestjs/common';
import { postDTO } from './interface/post';
import {metricDTO} from './interface/metric'
import axios from 'axios';
import { readFileSync } from 'fs';
import { join } from 'path';
import {VehicleService} from './vehicle/vehicle.service';

@Injectable()
export class AppService {

  constructor(private vehicleService: VehicleService){}

  getHello(): string {
    return 'Hello World!';
  }

  async getPost():Promise<postDTO[]>{

    try {
      const postList: postDTO[] = await axios.get(process.env.URL);
      console.log(typeof postList['data']);
      return postList['data'];
    } catch (error) {
      console.log(error);
    }

    return [{
        id: 1,
        title: 'string',
        body: 'string',
        userId: 1,
    }];
  }

  async createPost(body: postDTO){
    try {
      const response = await axios.post(process.env.URL, body,{ headers: { 'content-type': 'application/json' } });
      if(!response) throw new Error('Error de creacion Post');
      return response.data;
    } catch (error) {
      throw new error(error);
    }
  }

  async uploadFile(){
    try {
      //const filePath = join(__dirname, ".", ".", "files/", "Data8278.csv");
      //const csvPath = getCSVFile();
      //console.log(process.env.PATH_NAME);
      const cvsFile = readFileSync(process.env.PATH_NAME+'/files/Data8278.csv');
      const cvsData = cvsFile.toString();
      console.log(cvsData);
      return cvsData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMetric():Promise<metricDTO>{

    const labels:Array<string>=[];
    const values:Array<string>=[];

    const metrics = await axios.get(process.env.URL_API)
                        .then((resp) =>{
                                        return resp.data.results
                                      })
                        .catch((e)=>{console.error(e)});

    const metricSource: metricDTO = metrics.map(async (metric: any) =>{
      const names = await this.getNameVehicle(metric.vehicles);
      console.log(names)
      labels.push(metric.name);
      values.push(names.toString());
    })
    
    return {
      labels,
      values // TODO: Get nombre de vehiculos
    }

  }

  private async getNameVehicle(metric: any):Promise<Array<string>>{

    try {
      let values:Array<string>=[];

      const names: Array<string> = metric.map(async(url: string) => {
        let name:string = await this.vehicleService.getValueVehicle(url);
        
        values.push(name);
        return name;

      });
      return names;
    } catch (error) {
      console.error(error)
    }
  }

  async processValues(values: string[]){
    
    const valueNames = values.map((value: any) => {
      
      this.getNameVehicle(value)
      .then(rest => { return rest; })
      .catch((e) => { console.error(e); });
    
    })

    //console.log(await valueNames)

    return valueNames;
  }

  async getName (url: string) {
    const name = await this.vehicleService.getValueVehicle(url);
    return name;
  }

}
function getCSVFile() {
  throw new Error('Function not implemented.');
}

