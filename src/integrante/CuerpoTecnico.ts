import Integrante from "./Integrante";

export default class CuerpoTecnico extends Integrante {
    private capitan: boolean;

    constructor(credencial: string, apellidoNombres: string, fechaNacimiento: string, paisNacimiento: string, deporte: string, rol: string, capitan: boolean) {
        super(credencial, apellidoNombres, fechaNacimiento, paisNacimiento, deporte, rol);
        this.capitan = capitan;
    }

    public isCapitan(): boolean { return this.capitan; }
    public setCapitan(capitan: boolean): void { this.capitan = capitan; }
}