import { ItemRed } from "../util/objetosRed";import { nodo } from "./nodo";

class flecha extends ItemRed  {
    
    _nodoIn?: nodo;
    _nodoOut?: nodo;
    _color : number; //1 = rojo, 0 = azul, 2 = negro

    constructor(_id: string, nodoIn?: nodo, nodoOut?: nodo, color: number = 2) {
        super (_id);
        this._nodoIn = nodoIn;
        this._nodoOut = nodoOut;
        this._color = color;
    }

    
    public get id() {
        return this._id;
    }


    public get nodoIn() : nodo | undefined {
        return this._nodoIn;
    }

    public get nodoOut() : nodo |undefined {
        return this._nodoOut;
    }

    
    public get color() : number {
        return this._color;
    }
    
    
    public set color(v : number) {
        this._color = v;
    }
    
    
}

interface flechaBasic{
    id: string;
    nodoIn?: string;
    nodoOut?: string;
    color: number;
}

export { flecha , flechaBasic}