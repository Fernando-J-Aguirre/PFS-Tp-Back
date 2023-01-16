import Integrante from "./Integrante";

export default class Dirigente extends Integrante {
    private acceso: number;
    private jefe: boolean;

    constructor(credencial: string, apellidoNombres: string, fechaNacimiento: string, paisNacimiento: string, deporte: string, rol: string, acceso: number, jefe: boolean) {
        super(credencial, apellidoNombres, fechaNacimiento, paisNacimiento, deporte, rol);
        this.acceso = acceso;
        this.jefe = jefe;
    }

    public getAcceso(): number { return this.acceso; }
    public setAcceso(acceso: number): void { this.acceso = acceso; }

    public isJefe(): boolean { return this.jefe; }
    public setJefe(jefe: boolean): void { this.jefe = jefe; }

    public guardar(): string {
        let datos: string;
        datos = `dirigente,${super.getCredencial()},${super.getApellidoNombres()},${super.getFechaNacimiento()},${super.getPaisNacimiento()},${super.getDeporte()},${super.getRol()},${this.isJefe().toString()}`;
        return datos;
    }

}