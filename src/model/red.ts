import { controlador } from "../controller/controller";
import { flecha, flechaBasic } from "../objects/flecha";
import { nodo, nodoBasic } from "../objects/nodo";
import { nodoNi } from "../objects/nodoNi";
import { coloreador } from "./coloreador";

class red {

    private controller; //creo que es innecesario
    private coloreador = new coloreador(this);
    private _nodos : nodo[] = [];
    private _flechas : flecha[] = [];
    
    constructor(controller: controlador) {
        this.controller = controller;
    }

    AgregarObj(nodos: nodoBasic[], flechas: flechaBasic[]){
        nodos.forEach(element => {
            this.crearNodo(element['id'], element['tipo']);
        })

        flechas.forEach(element => {
            this.crearflecha(element['id'], element['color'], element['nodoIn'], element['nodoOut']);
        })
    }

    colorear(id: string){
        this.coloreador.coloreo(id);
    }

    notify(s: object, e: string) {
        
    }

    //Make nodes and edges
    crearNodo(id: string, tipo: string) {
        switch (tipo) {
            case 'ni':
                this._nodos.push(new nodoNi(id));
                break;
        
            default:
                throw new Error("No existe el tipo de nodo");
        }
        
    }

    crearflecha(id: string, color: number, nodoIn?: string, nodoOut?: string) {

        let nodoInObj = this.nodos.find(element => element.id === nodoIn);
        let nodoOutObj = this.nodos.find(element => element.id === nodoOut);

        let nuevaFlecha = new flecha(id, nodoInObj, nodoOutObj, color)

        this.flechas.push(nuevaFlecha);
        if (nodoInObj) {
            nodoInObj.agregarflechaIn(nuevaFlecha);
        }
        if (nodoOutObj) {
            nodoOutObj.agregarflechaOut(nuevaFlecha);
        }
        
    }

    getNodosBasic(){
        let nodosBasic: nodoBasic[] = this.nodos.map(
            element => {
            return {id: element.id, tipo: element.tipo}
        });

        return nodosBasic;
    }

    getFlechasBasic(){
        let flechasBasic: flechaBasic[] = this.flechas.map(
            element => {
            return {id: element.id, nodoIn: element.nodoIn?.id, nodoOut: element.nodoOut?.id, color: element.color}
        });

        return flechasBasic;
    }

    getFlechaBasic(id: string): flechaBasic{
        let a = this.flechas.find(element => element.id === id);
        if (a === undefined) {
            throw new Error("No existe la flecha");
        }
        return {id: a.id, nodoIn: a.nodoIn?.id, nodoOut: a.nodoOut?.id, color: a.color};
    }
    
    public get nodos() : nodo[] {
        return this._nodos;
    }
    
    
    public get flechas() : flecha[] {
        return this._flechas;
    }
    

}

export default red