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
}