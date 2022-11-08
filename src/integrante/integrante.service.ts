import { Injectable } from '@nestjs/common';
import Deportista from './Deportista';
import Dirigente from './Dirigente';
import Integrante from './Integrante';
import { MarcaService } from 'src/marca/marca.service';
import * as FS from 'fs';
import Marca from './Marca';
import CuerpoTecnico from './CuerpoTecnico';

@Injectable()
export class IntegranteService {
    private integrantes: Integrante[] = [];
    private marcaService: MarcaService;

    constructor() {
        this.marcaService = new MarcaService();
        this.loadIntegrantes();
    }

    public listarTodos(): Integrante[] {
        return this.integrantes;
    }

    public getIntegrante(credencial: string): Integrante {
        for (let i = 0; i < this.integrantes.length; i++) {
            if (this.integrantes[i].getCredencial() == credencial) {
                return this.integrantes[i];
            }
        }
        return null;
    }

    public addIntegrante(datos: any): string {
        try {
            let nuevoIntegrante: Integrante;
            let marcas: Marca[] = [];
            if (datos) {
                for (let i = 0; i < this.integrantes.length; i++) {
                    let integrante = datos.integrantes[i];
                    if (integrante.acceso) {
                        nuevoIntegrante = new Dirigente(integrante.credencial, integrante.apellidoNombres, integrante.fechaNacimiento, integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.acceso, integrante.jefe);
                        this.integrantes.push(nuevoIntegrante);
                    } else if (integrante.marca) {
                        integrante.marca.forEach(dato => {
                            let marca = new Marca(dato.nombre, dato.valor);
                            marcas.push(marca);
                        });
                        nuevoIntegrante = new Deportista(integrante.credencial, integrante.apellidoNombres, integrante.fechaNacimiento, integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.capitan, marcas);
                    } else {
                        nuevoIntegrante = new CuerpoTecnico(integrante.credencial, integrante.apellidoNombres, integrante.fechaNacimiento, integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.capitan);
                        this.integrantes.push(nuevoIntegrante);
                    }
                }
                this.integrantes.push(nuevoIntegrante);
                this.saveIntegrantes();
                this.loadIntegrantes();
                return 'ok';
            } else {
                throw new Error('No hay datos para agregar nuevo integrante')
            }
        } catch (error) {
            return error.message;
        }
    }

    public delIntegrante(credencial: string): string {
        try {
            if (credencial) {
                for (let i = 0; i < this.integrantes.length; i++) {
                    if (credencial == this.integrantes[i].getCredencial()) {
                        this.integrantes.splice(i, 1);
                        this.saveIntegrantes();
                        this.loadIntegrantes();
                        return 'ok';
                    }
                }
            } else {
                throw new Error('No hay datos para eliminar integrante');
            }
        } catch (error) {
            return error.message;
        }
    }

    public updIntegrante(datos: any): string {
        try {
            let nuevoIntegrante: Integrante;
            if (datos) {
                for (let i = 0; i < this.integrantes.length; i++) {
                    let integrante = datos.integrantes[i];
                    if (integrante.acceso) {
                        nuevoIntegrante = new Dirigente(integrante.credencial, integrante.apellidoNombres, integrante.fechaNacimiento, integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.acceso, integrante.jefe);
                    } else if (integrante.marca) {
                        nuevoIntegrante = new Deportista(integrante.credencial, integrante.apellidoNombres, integrante.fechaNacimiento, integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.capitan, integrante.marcas);
                    } else {
                        nuevoIntegrante = new CuerpoTecnico(integrante.credencial, integrante.apellidoNombres, integrante.fechaNacimiento, integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.capitan);
                    }
                    this.integrantes[i] = nuevoIntegrante;
                    this.saveIntegrantes();
                    this.loadIntegrantes();
                    return 'ok';
                }
            } else {
                throw new Error('No hay datos para agregar nuevo integrante')
            }
        } catch (error) {
            return error.message;
        }
    }


    private loadIntegrantes() {
        try {
            let integrante: Integrante;
            let marcas: Marca[] = [];
            let capitan: any;
            let texto: string = FS.readFileSync('.\\datos\\integrantes.txt', 'utf8');
            if (texto) {
                this.integrantes = [];
                let registros = texto.split('\n');
                for (let i = 0; i < registros.length; i++) {
                    let registro = registros[i].split(',');
                    if (registro.length == 8) {
                        if ((registro[7] == 'true') || (registro[7] == 'false')) {
                            let jefe = (registro[7] == 'true')
                            integrante = new Dirigente(registro[0], registro[1], registro[2], registro[3], registro[4], registro[5], parseInt(registro[6]), jefe);
                        } else {
                            capitan = (registro[6] == 'true')
                            let marcasR = registro[7].split('-');
                            for (let j = 0; j < marcasR.length; j++) {
                                let marca = this.marcaService.getMarca(marcasR[j]);                                
                                marcas.push(marca);
                                console.log(marcasR[j]);
                            }
                            
                            integrante = new Deportista(registro[0], registro[1], registro[2], registro[3], registro[4], registro[5], capitan, marcas);
                        }
                    } else {
                        capitan = (registro[6] == 'true')
                        integrante = new CuerpoTecnico(registro[0], registro[1], registro[2], registro[3], registro[4], registro[5], capitan);
                    }
                    this.integrantes.push(integrante);
                }
            }
        } catch (error) {
            return error.message;
        }
    }

    private saveIntegrantes() {
        FS.writeFileSync('.\\datos\\integrantes.txt', '');
        for (let i = 0; i < this.integrantes.length; i++) {
            let registro = this.integrantes[i].guardar();
            FS.appendFileSync('.\\datos\\integrantes.txt', `${i == 0 ? '' : '\n'}${registro}`);
        }
    }

}
