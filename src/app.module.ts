import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CsvModule } from 'nest-csv-parser';
import { VehicleService } from './vehicle/vehicle.service';

@Module({
  imports: [ConfigModule.forRoot(), CsvModule],
  controllers: [AppController],
  providers: [AppService, VehicleService],
})
export class AppModule {}
