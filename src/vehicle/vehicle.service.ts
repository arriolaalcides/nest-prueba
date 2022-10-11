import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VehicleService {

    async getValueVehicle(url: string){
        try {
            const vehicleValue = await axios.get(url);
            return vehicleValue.data?.name;
        } catch (error) {
            throw new Error(error);
        }
    }
}
