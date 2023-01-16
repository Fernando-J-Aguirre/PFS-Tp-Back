export default abstract class Integrante {
    protected credencial: string;
    protected apellidoNombres: string;
    protected fechaNacimiento: string;
    protected paisNacimiento: string;
    protected deporte: string;
    protected rol: string;

    constructor(credencial: string, apellidoNombres: string, fechaNacimiento: string, paisNacimiento: string, deporte: string, rol: string) {
        this.credencial = credencial;
        this.apellidoNombres = apellidoNombres;
        this.fechaNacimiento = fechaNacimiento;
        this.paisNacimiento = paisNacimiento;
        this.deporte = deporte;
        this.rol = rol;
    }

    public getCredencial(): string { return this.credencial; }
    public setCredencial(credencial: string): void { this.credencial = credencial; }

    public getApellidoNombres(): string { return this.apellidoNombres; }
    public setApellidoNombres(apellidoNombres: string): void { this.apellidoNombres = apellidoNombres; }

    public getFechaNacimiento(): string { return this.fechaNacimiento; }
    public setFechaNacimiento(fechaNacimiento: string): void { this.fechaNacimiento = fechaNacimiento; }

    public getPaisNacimiento(): string { return this.paisNacimiento; }
    public setPaisNacimiento(paisNacimiento: string): void { this.paisNacimiento = paisNacimiento; }

    public getDeporte(): string { return this.deporte; }
    public setDeporte(deporte: string): void { this.deporte = deporte; }

    public getRol(): string { return this.rol; }
    public setRol(rol: string): void { this.rol = rol; }

    abstract guardar(): string; 
}