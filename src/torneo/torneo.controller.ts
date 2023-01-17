import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import Torneo from './Torneo';
import { TorneoService } from './torneo.service';

@Controller('torneo')
export class TorneoController {

    public constructor(private torneoService: TorneoService) { }

    @Get()
    public getTorneos() {
        return this.torneoService.getTorneos();
    }
    @Get(":pais/deporte")
    public getTorneo(@Param("tipo") tipo: string) {
        return this.torneoService.getTorneo(tipo);
    }
    @Post()
    public addTorneo(@Body() nuevoTorneo: any) {
        return this.torneoService.addTorneo(nuevoTorneo);
    }
    @Put()
    public updateTorneo(@Body() torneo: Torneo) {
        return this.torneoService.updateTorneo(torneo);
    }
    @Delete(":pais/deporte")
    public deleteMarca(@Param("torneo") torneo: Torneo) {
        return this.torneoService.delTorneo(torneo);
    }

}
