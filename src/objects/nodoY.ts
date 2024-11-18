import { flecha } from "./flecha";
import { nodo } from "./nodo";

class nodoY extends nodo {

   
    constructor(id: string) {
        super(id);
    }

    colorSalida(): number { //decide color de flechas salientes
        let hayAzul = false;
        for (let i = 0; i < this.inFlechas.length; i++) {
            if (this.inFlechas[i].color === 0) {
                hayAzul = true;
            }
        }
        if(hayAzul) {
            return 0;
        }
        return 1;
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

export { nodoY }