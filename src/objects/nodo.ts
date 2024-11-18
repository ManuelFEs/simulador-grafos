import { ItemRed } from "../util/objetosRed";
import { flecha } from "./flecha";

//Definido como funciones, 1 grupo de entradas, 1 tipo de salida
abstract class nodo extends ItemRed implements nodoBasic { 
    _inFlechas: flecha[] = [];
    _outFlechas: flecha[] = [];
    _tipo!: string;
    constructor(id: string) {
        super(id);
    }
    
    abstract colorSalida() : number; //decide el color de las flechas salientes, no colorea directamente
    
    abstract flechasColorErr(ColorCorrecto: number):flecha[];

    comprobarColores(): flecha[] {
        let flechasMal:flecha[] = [];
        let colorCorrecto = this.colorSalida();
        flechasMal = this.flechasColorErr(colorCorrecto);
        return flechasMal;
    }

    agregarflechaIn(flecha: flecha) { //agrega una flecha de entrada
        this.inFlechas.push(flecha);
        flecha.nodoTo = this;
    }

    quitarflechaIn(flecha: flecha) {
        this.inFlechas.splice(this.inFlechas.indexOf(flecha), 1);
        flecha.nodoTo = undefined;
    }

    agregarflechaOut(flecha: flecha) { //agrega una flecha de salida
        this.outFlechas.push(flecha);
        flecha.nodoFrom = this;
    }

    quitarflechaOut(flecha: flecha) {
        this.outFlechas.splice(this.outFlechas.indexOf(flecha), 1);
        flecha.nodoFrom = undefined;
    }

    public get tipo() : string {
        return this._tipo;
    }

    
    public get inFlechas() : flecha[] {
        return this._inFlechas;
    }

    
    public get outFlechas() : flecha[] {
        return this._outFlechas;
    }

    
    public set inFlechas(v : flecha[]) {
        this._inFlechas = v;
    }
    
    
    public set outFlechas(v : flecha[]) {
        this._outFlechas = v;
    }
    
    
    
}

interface nodoBasic {
    id: string;
    tipo: string;
}

export { nodo, nodoBasic }