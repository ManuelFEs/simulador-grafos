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
            this.crearFlecha(element['id'], element['color'], element['nodoTo'], element['nodoFrom']);
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

    crearFlecha(id: string, color: number, nodoIn: string, nodoOut: string) {

        let nodoToObj = this.nodos.find(element => element.id === nodoIn);
        let nodofromObj = this.nodos.find(element => element.id === nodoOut);

        if (nodoToObj != undefined && nodofromObj != undefined) {            
            let nuevaFlecha = new flecha(id, nodoToObj, nodofromObj, color)
            this.flechas.push(nuevaFlecha);

            nodoToObj.agregarflechaIn(nuevaFlecha);
            nodofromObj.agregarflechaOut(nuevaFlecha);
        }
        else{
        throw new Error("No existe el nodo de entrada o salida");
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
            return {id: element.id, nodoTo: element.nodoTo!.id, nodoFrom: element.nodoFrom!.id, color: element.color}
        });

        return flechasBasic;
    }

    getFlechaBasic(id: string): flechaBasic{
        let a = this.flechas.find(element => element.id === id);
        if (a === undefined) {
            throw new Error("No existe la flecha");
        }
        return {id: a.id, nodoTo: a.nodoTo!.id, nodoFrom: a.nodoFrom!.id, color: a.color};
    }
    
    public get nodos() : nodo[] {
        return this._nodos;
    }
    
    
    public get flechas() : flecha[] {
        return this._flechas;
    }
    

}

export default red