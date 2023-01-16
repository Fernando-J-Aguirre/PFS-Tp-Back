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

    public getDelegacion(pais: string, deporte: string): Delegacion {
        for (let i = 0; i < this.delegaciones.length; i++) {
            if (this.delegaciones[i].getPais() == pais && this.delegaciones[i].getDeporte() == deporte) {
                return this.delegaciones[i];
            }
        }
        return null;
    }

    public addDelegacion(datos: any): string {
        try {
            if (datos) {
                this.loadDelegaciones();
                let delegacionExiste = this.getDelegacion(datos.pais, datos.deporte);
                if(delegacionExiste) {
                    throw new Error('La delegacion ya se encuentra')
                }
                let delegacion = new Delegacion(datos.pais, datos.deporte);
                this.delegaciones.push(delegacion);
                this.saveDelegaciones();
                return 'Delegacion agregada correctamente';
            } else {
                throw new Error('No hay datos para agregar nueva delegacion');
            }
        } catch (error) {
            return error.message;
        }
    }

    public updateDelegacion(datos: any): string {
        try {
            if (datos) {
                let delegacion = this.delegaciones.find(del => del.getPais() === datos.pais && del.getDeporte() === datos.deporte);               
                    if(delegacion){
                        delegacion.setPais(datos.nuevoPais);
                        delegacion.setDeporte(datos.nuevoDeporte);
                        this.saveDelegaciones();
                        this.loadDelegaciones();
                        return 'ok';
                    }else{
                        throw new Error('La delegacion no existe')
                    }
            } else {
                throw new Error('No hay datos para actualizar la delegacion')
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
