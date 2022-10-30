import Integrante from "src/integrante/Integrante";

export default class Delegacion {
    private pais: string;
    private deporte: string;
    private integrantes: Integrante[] = [];

    constructor(pais: string, deporte: string) {
        this.pais = pais;
        this.deporte = deporte;
    }

    public getPais(): string { return this.pais; }
    public setPais(pais: string): void { this.pais = pais; }

    public getDeporte(): string { return this.deporte; }
    public setDeporte(deporte: string): void { this.deporte = deporte; }

}