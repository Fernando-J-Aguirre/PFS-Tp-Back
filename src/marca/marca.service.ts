import { Injectable } from '@nestjs/common';
import Marca from 'src/integrante/Marca';
import * as FS from 'fs';

@Injectable()
export class MarcaService {
    private marcas: Marca[] = [];

    constructor() {
        this.loadMarcas();
    }

    public listarMarcas(): Marca[] {
        return this.marcas;
    }

    public getMarca(marca: string): Marca {
        try {
            if (marca) {
                for (let i = 0; i < this.marcas.length; i++) {
                    if (marca == this.marcas[i].getNombre()) {
                        return this.marcas[i];
                    }
                }
            } else {
                throw new Error('No hay datos para buscar marca')
            }
        } catch (error) {
            return error.message;
        }
    }

    public addMarca(datos: any): string {
        try {
            if (datos.nombre && datos.valor) {
                for (let i = 0; i < this.marcas.length; i++) {
                    let nuevaMarca = new Marca(datos.nombre, datos.valor);
                    this.marcas.push(nuevaMarca);
                    this.saveMarcas();
                    this.loadMarcas();
                    return 'ok';
                }
            } else {
                throw new Error('No hay datos de marca para agregar');
            }
        } catch (error) {
            return error.message;
        }
    }

    public delMarca(nombre: any): string {
        try {
            if (nombre) {
                for (let i = 0; i < this.marcas.length; i++) {
                    if (this.marcas[i].getNombre() == nombre) {
                        this.marcas.splice(i, 1);
                        this.saveMarcas();
                        this.loadMarcas();
                        return 'ok';
                    }
                }
            } else {
                throw new Error('No hay datos de marca para eliminar');
            }
        } catch (error) {
            return error.message;
        }
    }

    public updMarca(datos: any): string {
        try {
            if (datos) {
                for (let i = 0; i < this.marcas.length; i++) {
                    if (this.marcas[i].getNombre() == datos.nombre) {
                        let nuevaMarca = new Marca(datos.nombre, datos.valor);
                        this.marcas[i] = nuevaMarca;
                        this.saveMarcas();
                        this.loadMarcas();
                        return 'ok';
                    }
                }
            } else {
                throw new Error('No hay datos de marca para modificar');
            }
        } catch (error) {
            return error.message;
        }
    }

    private loadMarcas() {
        try {
            let marca: Marca;
            let texto: string = FS.readFileSync('.\\datos\\marcas.txt', 'utf8');
            if (texto) {
                this.marcas = [];
                let registros = texto.split('\n');
                for (let i = 0; i < registros.length; i++) {
                    let registro = registros[i].replace(/\r/, '').split('-');
                    marca = new Marca(registro[0], registro[1])
                    this.marcas.push(marca);
                }
            } else {
                throw new Error('Error de datos al cargar')
            }
        } catch (error) {
            return error.message;
        }
    }

    private saveMarcas() {
        FS.writeFileSync('.\\datos\\marcas.txt', '');
        for (let i = 0; i < this.marcas.length; i++) {
            let registro = this.marcas[i].guardar();
            FS.appendFileSync('.\\datos\\marcas.txt', `${i == 0 ? '' : '\n'}${registro}`);
        }
    }

}

