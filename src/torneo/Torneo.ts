import Delegacion from "src/delegacion/Delegacion";

export default class Torneo {
    private sede: string;
    private edicion: number;
    private deporte: string;
    private tipo: string;
    private participantes: Delegacion[] = [];

    constructor(sede: string, edicion: number, deporte: string, tipo: string) {
        this.sede = sede;
        this.edicion = edicion;
        this.deporte = deporte;
        this.tipo = tipo;
    }

    public getSede(): string { return this.sede; }
    public setSede(sede: string): void { this.sede = sede; }

    public getEdicion(): number { return this.edicion; }
    public setEdicion(edicion: number): void { this.edicion = edicion; }

    public getDeporte(): string { return this.deporte; }
    public setDeporte(deporte: string): void { this.deporte = deporte; }

    public getTipo(): string { return this.tipo; }
    public setTipo(tipo: string): void { this.tipo = tipo; }

}