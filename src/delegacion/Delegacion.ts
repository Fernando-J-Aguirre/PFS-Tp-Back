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

    public getIntegrantes(): Integrante[] { return this.integrantes; }

    public addIntegrante(integrante: Integrante): string {
        try {
            if (integrante) {
                for (let i = 0; i < this.integrantes.length; i++) {
                    if (integrante.getCredencial() == this.integrantes[i].getCredencial())
                        throw new Error('El integrante ya se encuentra en la lista')
                }
                this.integrantes.push(integrante);
                return 'ok';
            } else {
                throw new Error('No hay datos para agregar')
            }
        } catch (error) {
            return error.message;
        }
    }

    public delIntegrante(integrante: Integrante): string {
        try {
            if (integrante) {
                for (let i = 0; i < this.integrantes.length; i++) {
                    if (integrante.getCredencial() == this.integrantes[i].getCredencial()) {
                        this.integrantes.splice(i, 1);
                        return `ok`;
                    }
                }
            } else {
                throw new Error('El integrante no se encuentra')
            }
        } catch (error) {
            return error.message;
        }
    }

    public guardar(): string {
        let integrantes: string = '';
        for(let i = 0; i < this.integrantes.length; i++) {
            integrantes += `${i==0?'':'-'}${this.integrantes[i].getCredencial()}`;
        }
        return `${this.pais},${this.deporte},${integrantes}`;
    }

}