import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DelegacionService } from './delegacion.service';

@Controller('delegacion')
export class DelegacionController {

    public constructor(private delegacionService : DelegacionService) {   }

    @Get()
    public listDelegaciones() {
        return this.delegacionService.listDelegaciones();
    }
    @Get(":pais/deporte")
    public getDelegacion(@Param("pais") pais : string, @Param("deporte") deporte : string) {
        return this.delegacionService.getDelegacion(pais, deporte);
    }
    @Post()
    public addDelegacion(@Body() nuevaDelegacion: any) {
        return this.delegacionService.addDelegacion(nuevaDelegacion);
    }
    @Put()
    public updateDelegacion(@Body() nuevaDelegacion: any) {
        return this.delegacionService.updateDelegacion(nuevaDelegacion);
    }
    @Delete(":pais/deporte")
    public deleteMarca(@Param("pais") pais : string, @Param("deporte") deporte : string) {
        return this.delegacionService.delDelegacion(pais, deporte);
    }
}
