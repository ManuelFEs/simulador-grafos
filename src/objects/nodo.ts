import { ItemRed } from "../util/objetosRed";
import { flecha } from "./flecha";

//Definido como funciones, 1 grupo de entradas, 1 tipo de salida
abstract class nodo extends ItemRed implements nodoBasic { 
    _InFlechas: flecha[] = [];
    _OutFlechas: flecha[] = [];
    _tipo!: string;
    constructor(id: string) {
        super(id);
    }
    
    abstract colorSalida() : number; //decide el color de las flechas salientes, no colorea directamente

    abstract comprobarColores():flecha[];

    abstract flechasColorErr(ColorCorrecto: number):flecha[];

    agregarflechaIn(flecha: flecha) { //agrega una flecha de entrada
        this.inFlechas.push(flecha);
    }

    quitarflechaIn(flecha: flecha) {
        this.inFlechas.splice(this.inFlechas.indexOf(flecha), 1);
    }

    agregarflechaOut(flecha: flecha) { //agrega una flecha de salida
        this.outFlechas.push(flecha);
    }

    quitarflechaOut(flecha: flecha) {
        this.outFlechas.splice(this.outFlechas.indexOf(flecha), 1);
    }

    public get tipo() : string {
        return this._tipo;
    }

    
    public get inFlechas() : flecha[] {
        return this._InFlechas;
    }

    
    public get outFlechas() : flecha[] {
        return this._OutFlechas;
    }
    
    
    
}

interface nodoBasic {
    id: string;
    tipo: string;
}

export { nodo, nodoBasic }