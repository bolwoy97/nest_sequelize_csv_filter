import { Controller, Get, Header,  HttpCode,  HttpStatus,  Param,  Post,  Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { documentsStorage } from 'src/modules/fileStorage';
import { CsvFilterService } from './csvFilter.service';


@Controller('api/csv_filter')
export class CsvFilterController { 
    constructor(private readonly csvFilterService: CsvFilterService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', documentsStorage),
  )
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; ')
  async filter(@UploadedFile() file): Promise<any> {
    const filename = await this.csvFilterService.filter(file);
    return this.csvFilterService.send(filename);
  }


  
  @Get(":name")
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; ')
  async send( @Param('name') name: string): Promise<any> {
    return this.csvFilterService.send(name);
  }



}
