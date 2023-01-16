export default class Marca {
    private nombre: string;
    private valor: string;

    constructor(nombre: string, valor: string) {
        this.nombre = nombre;
        this.valor = valor;
    }

    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }

    public getValor(): string { return this.valor; }
    public setValor(valor: string): void { this.valor = valor; }

    public guardar(): string {
        let datos: string;
        datos = `${this.nombre}-${this.valor}`;
        return datos;
    }

}