import { Injectable } from '@nestjs/common';
import { DelegacionService } from 'src/delegacion/delegacion.service';
import Torneo from './Torneo';
import * as FS from 'fs';

@Injectable()
export class TorneoService {
    private torneos: Torneo[];
    private delegacionesService: DelegacionService;
    public constructor() {
        this.torneos = [];
        this.delegacionesService = new DelegacionService();
        this.loadTorneos();
    }

    public getTorneos() {
        return this.torneos;
    }

    public getTorneo(tipo: string) {
        for (let i = 0; i < this.torneos.length; i++) {
            if (tipo == this.torneos[i].getTipo()) {
                return this.torneos[i];
            }
        }
        return null;
    }

    public addTorneo(datos: any): string {
        try {
            let torneo: Torneo;
            this.loadTorneos();
            if (datos) {
                for (let i = 0; i < this.torneos.length; i++) {
                    if (this.torneos[i].getTipo() == datos.tipo) {
                        throw new Error('El torneo ya se encuentra')
                    }
                }
                torneo = new Torneo(datos.sede, datos.edicion, datos.deporte, datos.tipo);
                this.torneos.push(torneo);
                this.saveTorneos();
                return 'Torneo agregado correctamente';
            } else {
                throw new Error('No hay datos para agregar torneo');
            }
        } catch (error) {
            return error.message;
        }
    }

    public updateTorneo(torneo: Torneo): string {
        try {
            if (torneo) {
                for (let i = 0; i < this.torneos.length; i++) {
                    if (torneo.getTipo() == this.torneos[i].getTipo()) {
                        this.torneos[i] = torneo;
                        this.saveTorneos();
                        this.loadTorneos();
                        return 'Torneo actualizado correctamente';
                    }
                }
                throw new Error('Torneo no encontrado para actualizar');
            } else {
                throw new Error('No hay datos para actualizar');
            }
        } catch (error) {
            return error.message;
        }
    }

    public delTorneo(torneo: Torneo): string {
        try {
            if (torneo) {
                for (let i = 0; i < this.torneos.length; i++) {
                    if (torneo.getTipo() == this.torneos[i].getTipo()) {
                        this.torneos.splice(i, 1);
                        this.saveTorneos();
                        this.loadTorneos();
                        return 'Torneo eliminado correctamente';
                    }
                }
                throw new Error('Torneo no encontrado');
            } else {
                throw new Error('No hay datos para eliminar el torneo');
            }
        } catch (error) {
            return error.message;
        }
    }

    private loadTorneos() {
        try {
            let torneo: Torneo;
            let texto: string = FS.readFileSync('.\\datos\\torneos.txt', 'utf8');
            if (texto) {
                this.torneos = [];
                let registros = texto.split('\n');
                for (let i = 0; i < registros.length; i++) {
                    let registro = registros[i].replace(/\r/, '').split(',');
                    torneo = new Torneo(registro[0], parseInt(registro[1]), registro[2], registro[3]);
                    let participantes = registro[4].split('-');
                    for (let j = 0; j < participantes.length; j++) {
                        let participante = participantes[j].split('|');
                        let delegacion = this.delegacionesService.getDelegacion(participante[0], participante[1])
                        torneo.addParticipantes(delegacion);
                    }
                    this.torneos.push(torneo);
                }
            }
        } catch (error) {
            return error.message;
        }
    }

    private saveTorneos() {
        FS.writeFileSync('.\\datos\\torneos.txt', '');
        for (let i = 0; i < this.torneos.length; i++) {
            let registro = this.torneos[i].guardar();
            FS.appendFileSync('.\\datos\\torneos.txt', `${i == 0 ? '' : '\n'}${registro}`);
        }
    }
}