import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {VehicleService} from './vehicle/vehicle.service';
import { postDTO } from './interface/post';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly vehicleService: VehicleService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/posts')
  async getPost(): Promise<postDTO[]> {
    const posts = await this.appService.getPost();
     return posts;
  }

  @Get('/postsList')
  async getPostList(): Promise<postDTO[]> {
    const posts = await this.appService.getPost();
     const postTitleBody: postDTO[] = posts.map((post) =>
      {
        return { 
                id: post.id,
                title: post.title 
              }
      }
     );
     return postTitleBody;
  }

  @Post('/post')
  createPost(@Body() payload: postDTO):Promise<postDTO>{

    const newPost = this.appService.createPost(payload);
    console.log(newPost);
    return newPost;
  }

  @Get('/readCsv')
  async readCsv(){
    const fileCsv = await this.appService.uploadFile();
    return fileCsv;
  }

  /*
  @Get('/metric:metric')
  async metric(@Param('metric', any) metric: any){

  }
  */

  @Get('/metric')
  async metric(){
    const veh = await this.appService.getMetric()
    //const val = this.appService.processValues(veh.values)
    const vehicle = this.appService.getName(process.env.URL_API_VEHICLE+"/30/");
    
    console.log(veh)
    return veh;
  }

}
