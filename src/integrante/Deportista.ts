import Integrante from "./Integrante";
import Marca from "./Marca";

export default class Deportista extends Integrante {
    private capitan: boolean;
    private marcas: Marca[];

    constructor(credencial: string, apellidoNombres: string, fechaNacimiento: string, paisNacimiento: string, deporte: string, rol: string, capitan: boolean, marcas: Marca[]) {
        super(credencial, apellidoNombres, fechaNacimiento, paisNacimiento, deporte, rol);
        this.capitan = capitan;
        this.marcas = marcas;
    }

    public isCapitan(): boolean { return this.capitan; }
    public setCapitan(capitan: boolean): void { this.capitan = capitan; }

    public getMarcas(): Marca[] { return this.marcas; }
    public setMarcas(marcas: Marca[]): void { this.marcas = marcas; }

    public addMarca(marca: Marca): string {
        try {
            if (marca) {
                for (let i = 0; i < this.marcas.length; i++) {
                    if (marca.getNombre() == this.marcas[i].getNombre())
                        throw new Error('El nombre da la marca ya existe');
                }
                this.marcas.push(marca);
                return 'ok';
            } else {
                throw new Error('No hay datos para nueva marca')
            }
        } catch (error) {
            return error.message;
        }
    }

    public delMarca(marca: Marca): string {
        try {
            if (marca) {
                for (let i = 0; i < this.marcas.length; i++) {
                    if (marca.getNombre() == this.marcas[i].getNombre()) {
                        this.marcas.splice(i, 1);
                        return 'ok';
                    }
                }
            } else {
                throw new Error('Sin datos para eliminar marca')
            }
        } catch (error) {
            return error.message;
        }
    }

    public guardar(): string {
        let datos: string = '';
        let marcas: string = '';
        for (let i = 0; i < this.marcas.length; i++) {
            marcas += `${i==0? '': '-'}${this.marcas[i].getNombre()}`;            
        }
        datos += `deportista,${super.getCredencial()},${super.getApellidoNombres()},${super.getFechaNacimiento()},${super.getPaisNacimiento()},${super.getDeporte()},${super.getRol()},${this.isCapitan().toString()},${marcas}`; 
        return datos;
    }
}