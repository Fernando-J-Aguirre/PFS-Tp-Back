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
        this.tipo = tipo; //mundial, olimpíadas
    }

    public getSede(): string { return this.sede; }
    public setSede(sede: string): void { this.sede = sede; }

    public getEdicion(): number { return this.edicion; }
    public setEdicion(edicion: number): void { this.edicion = edicion; }

    public getDeporte(): string { return this.deporte; }
    public setDeporte(deporte: string): void { this.deporte = deporte; }

    public getTipo(): string { return this.tipo; }
    public setTipo(tipo: string): void { this.tipo = tipo; }

    public getParticipantes(): Delegacion[] { return this.participantes; }

    public addParticipantes(delegacion: Delegacion): string {
        try {
            if (delegacion) {
                for (let i = 0; i < this.participantes.length; i++) {
                    if ((delegacion.getDeporte() == this.participantes[i].getDeporte()) && (delegacion.getPais() == this.participantes[i].getPais()))
                        throw new Error('La delegacion ya se encuentra');
                }
                this.participantes.push(delegacion);
                return 'ok';
            } else {
                throw new Error('No hay datos para agregar delegacion');
            }
        } catch (error) {
            return error.message;
        }
    }

    public delParticipantes(delegacion: Delegacion): string {
        try {
            if (delegacion) {
                for (let i = 0; i < this.participantes.length; i++) {
                    if ((delegacion.getDeporte() == this.participantes[i].getDeporte()) && (delegacion.getPais() == this.participantes[i].getPais()))
                        this.participantes.splice(i, 1);
                    return 'ok';
                }
                throw new Error('La delegacion no se encuentra para eliminar')
            } else {
                throw new Error('No hay datos para eliminar delegacion')
            }
        } catch (error) {
            return error.message;
        }
    }

    // public updParticipantes(delegacion: Delegacion): string {
    //     try {
    //         if (delegacion) {
    //             for (let i = 0; i < this.participantes.length; i++) {
    //                 if ((delegacion.getDeporte() == this.participantes[i].getDeporte()) && (delegacion.getPais() == this.participantes[i].getPais()))
    //                     this.participantes[i] = delegacion;
    //                 return `ok`;
    //             }
    //         } else {
    //             throw new Error('No hay datos para actualizar delegacion');
    //         }
    //     } catch (error) {
    //         return error.message;
    //     }
    // }

    public guardar(): string {
        let delegacion: string = '';
        for (let i = 0; i < this.participantes.length; i++) {
            delegacion += `${i == 0 ? '' : '-'}${this.participantes[i].getDeporte()},${this.participantes[i].getPais()}`;
        }
        return `${this.sede},${this.edicion},${this.deporte},${this.tipo},${delegacion}`;
    }

}