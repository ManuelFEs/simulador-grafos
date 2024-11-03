import { flecha } from "./flecha";
import { nodo } from "./nodo";

class nodoNi extends nodo {

   
    constructor(id: string) {
        super(id);
    }

    colorSalida(): number { //decide color de flechas salientes
        let hayRojo = false;
        for (let i = 0; i < this.inFlechas.length; i++) {
            if (this.inFlechas[i].color === 1) {
                hayRojo = true;
            }
        }
        
        if(hayRojo) {
            return 0;
        }
        return 1;
    }

    comprobarColores(): flecha[] {
        let flechasMal:flecha[] = [];
        let colorCorrecto = this.colorSalida();
        flechasMal = this.flechasColorErr(colorCorrecto);
        return flechasMal;
    }

    flechasColorErr(colorCorrecto: number): flecha[] {
        const flechasMal: flecha[] = [];
        for (let i = 0; i < this.outFlechas.length; i++) {
            if (this.outFlechas[i].color !== colorCorrecto) {
                flechasMal.push(this.outFlechas[i]);
            }
        }
        return flechasMal
    }
}

export { nodoNi }