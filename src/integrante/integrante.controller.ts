import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import Integrante from './Integrante';
import { IntegranteService } from './integrante.service';

@Controller('integrante')
export class IntegranteController {
    constructor(private integranteService: IntegranteService) { }

    @Get()
    public listIntegrantes(): Integrante[] {
        return this.integranteService.listarTodos();
    }
    @Get(':credencial')
    public listIntegrante(@Param('credencial') credencial: string): Integrante {
        return this.integranteService.getIntegrante(credencial);
    }
    @Post()
    public addIntegrante(@Body() datos: any): string {
        return this.integranteService.addIntegrante(datos);
    }
    @Delete(':credencial')
    public delIntegrante(@Param('credencial') credencial: string): string {
        return this.integranteService.delIntegrante(credencial);
    }
    @Put(':credencial')
    public updIntegrante(@Param('credencial') credencial: string, @Body() datos: any): string {
        return this.integranteService.updIntegrante(credencial, datos);
    }
}
