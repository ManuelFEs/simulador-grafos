import { ItemRed } from "../util/objetosRed";import { nodo } from "./nodo";

class flecha extends ItemRed  {
    
    private _nodoTo: nodo | undefined;
    private _nodoFrom: nodo | undefined;
    private _color : number; //1 = rojo, 0 = azul, 2 = negro

    constructor(_id: string, nodoIn: nodo, nodoOut: nodo, color: number = 2) {
        super (_id);
        this._nodoTo = nodoIn;
        this._nodoFrom = nodoOut;
        this._color = color;
    }

    
    public get id() {
        return this._id;
    }


    public get nodoTo() : nodo | undefined {
        return this._nodoTo;
    }

    public get nodoFrom() : nodo |undefined {
        return this._nodoFrom;
    }

    
    public get color() : number {
        return this._color;
    }

    
    public set nodoTo(v : nodo | undefined) {
        this._nodoTo = v;
    }
    
    
    public set nodoFrom(v : nodo | undefined) {
        this._nodoFrom = v;
    }
    
    
    public set color(v : number) {
        this._color = v;
    }
    
    
}

interface flechaBasic{
    id: string;
    nodoTo: string;
    nodoFrom: string;
    color: number;
}

export { flecha , flechaBasic}