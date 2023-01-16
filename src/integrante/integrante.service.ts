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
            if (datos) {
                let nuevoIntegrante: Integrante;
                let integrantes = datos.integrantes;
                for (let i = 0; i < integrantes.length; i++) {
                    let integrante = integrantes[i];
                    if (integrante.tipo == 'dirigente') {
                        nuevoIntegrante = new Dirigente(integrante.credencial, integrante.apellidoNombres, integrante.fechaNacimiento, integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.acceso, integrante.jefe);
                    } else if (integrante.tipo == 'deportista') {
                        let marcas: Marca[] = [];
                        if (integrante.marca && integrante.marca.length > 0) {
                        integrante.marca.forEach(dato => {                            
                            let nuevaMarca = new Marca(dato.nombre, dato.valor);
                            this.marcaService.addMarca(nuevaMarca);
                            marcas.push(nuevaMarca);
                        });}        
                        nuevoIntegrante = new Deportista(integrante.credencial, integrante.apellidoNombres, integrante.fechaNacimiento, integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.capitan, marcas);
                    } else {
                        nuevoIntegrante = new CuerpoTecnico(integrante.credencial, integrante.apellidoNombres, integrante.fechaNacimiento, integrante.paisNacimiento, integrante.deporte, integrante.rol, integrante.capitan);
                    }
                    this.integrantes.push(nuevoIntegrante);
                }
                this.saveIntegrantes();
                this.loadIntegrantes();
                return 'OK';
            } else {
                throw new Error('No hay datos para agregar nuevo integrante');
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

    public updIntegrante(credencial: string, datos: any): string {
        try {
            if (datos) {
                const integrante = this.integrantes.find(cred => cred.getCredencial() === credencial);               
                    if(integrante){
                        integrante.setCredencial(datos.credencial);
                        integrante.setApellidoNombres(datos.apellidoNombres);
                        integrante.setFechaNacimiento(datos.fechaNacimiento);
                        integrante.setPaisNacimiento(datos.paisNacimiento);
                        integrante.setDeporte(datos.deporte);
                        integrante.setRol(datos.rol);
                        if (integrante instanceof Deportista) {
                            let deportista = integrante as Deportista;
                            if(datos.marca) {
                                datos.marca.forEach(dato => {                            
                                    let marcaExiste = this.marcaService.getMarca(dato.nombre);
                                    if(marcaExiste) {
                                        marcaExiste.setNombre(dato.nombre);
                                        marcaExiste.setValor(dato.valor);
                                    }                                    
                                    this.marcaService.updMarca(marcaExiste)
                                });                                  
                                deportista.setCapitan(datos.capitan);                            
                        } else if(integrante instanceof Dirigente) {
                            let dirigente = integrante as Dirigente;
                            dirigente.setAcceso( datos.acceso);
                            dirigente.setJefe(datos.jefe);
                        } else if (integrante instanceof CuerpoTecnico) {
                            let cuerpoTecnico = integrante as CuerpoTecnico;
                            cuerpoTecnico.setCapitan(datos.capitan);
                        }
                    }
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
            let texto: string = FS.readFileSync('.\\datos\\integrantes.txt', 'utf8');
            if (texto) {
                this.integrantes = [];
                let registros = texto.split('\n');
                for (let i = 0; i < registros.length; i++) {
                    let registro = registros[i].replace(/\r/, '').split(',');
                    if (registro[0] == 'dirigente') {  
                        integrante = new Dirigente(registro[1], registro[2], registro[3], registro[4], registro[5], registro[6], parseInt(registro[7]), (registro[8] == 'true'));
                    } else if (registro[0] == 'deportista') {
                        let marcas: Marca[] = [];
                        let marcasR = registro[8].split('-');                        
                        for (let j = 0; j < marcasR.length; j++) {
                            let marca = this.marcaService.getMarca(marcasR[j]);
                            marcas.push(marca);
                        }
                        integrante = new Deportista(registro[1], registro[2], registro[3], registro[4], registro[5], registro[6], (registro[7] === 'true'), marcas);
                    } else {
                        integrante = new CuerpoTecnico(registro[1], registro[2], registro[3], registro[4], registro[5], registro[6], (registro[7] === 'true'));
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