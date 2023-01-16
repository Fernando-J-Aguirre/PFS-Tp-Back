import { Injectable } from '@nestjs/common';
import { IntegranteService } from 'src/integrante/integrante.service';
import Delegacion from './Delegacion';
import * as FS from 'fs';


@Injectable()
export class DelegacionService {
    private delegaciones: Delegacion[] = [];
    private integranteService: IntegranteService;

    constructor() {
        this.integranteService = new IntegranteService();
        this.loadDelegaciones();
    }

    public listDelegaciones(): Delegacion[] {
        return this.delegaciones;
    }

    public getDelegacion(pais: string): Delegacion {
        for (let i = 0; i < this.delegaciones.length; i++) {
            if (this.delegaciones[i].getPais() == pais) {
                return this.delegaciones[i];
            }
        }
        return null;
    }

    public addDelegacion(datos: any): string {
        try {
            let delegacion: Delegacion;
            this.loadDelegaciones(); //carga las delegaciones existentes
            if (datos) {
                for (let i = 0; i < this.delegaciones.length; i++) {
                    if ((this.delegaciones[i].getPais() == datos.pais) && (this.delegaciones[i].getDeporte() == datos.deporte)) {
                        throw new Error('La delegacion ya se encuentra')
                    }
                }
                delegacion = new Delegacion(datos.pais, datos.deporte);
                this.delegaciones.push(delegacion);
                this.saveDelegaciones(); //guarda las delegaciones
                return 'Delegacion agregada correctamente';
            }
        } catch (error) {
            return error.message;
        }
    }


    private loadDelegaciones() {
        try {
            let delegacion: Delegacion;
            let texto: string = FS.readFileSync('.\\datos\\delegaciones.txt', 'utf8');
            if (texto) {
                this.delegaciones = [];
                let registros = texto.split('\n');
                for (let i = 0; i < registros.length; i++) {
                    let registro = registros[i].replace(/\r/, '').split(',');
                    delegacion = new Delegacion(registro[0], registro[1]);
                    this.delegaciones.push(delegacion);
                }
            }
        } catch (error) { 
            return error.message;
        }
    }


    private saveDelegaciones() {
        FS.writeFileSync('.\\datos\\delegaciones.txt', '');
        for (let i = 0; i < this.delegaciones.length; i++) {
            let registro = this.delegaciones[i].guardar();
            FS.appendFileSync('.\\datos\\delegaciones.txt', `${i == 0 ? '' : '\n'}${registro}`);
        }
    }


}
