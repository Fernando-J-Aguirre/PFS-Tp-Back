import Integrante from "./Integrante";

export default class CuerpoTecnico extends Integrante {
    private capitan: boolean;

    constructor(credencial: string, apellidoNombres: string, fechaNacimiento: string, paisNacimiento: string, deporte: string, rol: string, capitan: boolean) {
        super(credencial, apellidoNombres, fechaNacimiento, paisNacimiento, deporte, rol);
        this.capitan = capitan;
    } 

    public isCapitan(): boolean { return this.capitan; }
    public setCapitan(capitan: boolean): void { this.capitan = capitan; }

    public guardar(): string {
        let datos: string;
        datos = `cuerpo tecnico,${super.getCredencial()},${super.getApellidoNombres()},${super.getFechaNacimiento()},${super.getPaisNacimiento()},${super.getDeporte()},${super.getRol()},${this.isCapitan().toString()}`;
        return datos;
    }
}