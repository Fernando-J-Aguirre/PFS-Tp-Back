import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import Marca from 'src/integrante/Marca';
import { MarcaService } from './marca.service';

@Controller('marca')
export class MarcaController {
    public constructor(private marcaService: MarcaService) {

    }

    @Get()
    public getMarcas() {
        return this.marcaService.listarMarcas();
    }
    @Get(":marca")
    public getMarca(@Param("marca") marca : string) {
        return this.marcaService.getMarca(marca);
    }
    @Post()
    public addMarca(@Body() datos: any) {
        return this.marcaService.addMarca(datos);
    }
    @Put()
    public updateMarca(@Body() datos: any) {
        return this.marcaService.updMarca(datos);
    }
    @Delete(":nombre")
    public deleteMarca(@Param("nombre") nombre : string) {
        return this.marcaService.delMarca(nombre);
    }
}
