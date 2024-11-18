import { controlador } from "../controller/controller";
import { flecha, flechaBasic } from "../objects/flecha";
import { nodo, nodoBasic } from "../objects/nodo";
import { nodoNi } from "../objects/nodoNi";
import { nodoY } from "../objects/nodoY";
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

    colorClear(){
        this.coloreador.colorClear();
    }

    //Make nodes and edges
    crearNodo(id: string, tipo: string) {
        switch (tipo) {
            case "ni":
                this.nodos.push(new nodoNi(id));
                break;
            case "y":
                this.nodos.push(new nodoY(id));
                break;
            default:
                throw new Error("No existe el tipo de nodo para "+id+" "+tipo);
        }
    }

/**
 * Crea una nueva flecha con los datos de id, color, y nodos entrada y salida. 
 * La flecha recibe los nodos de entrada y salida. Los nodos de entrada y salida también reciben la flecha.
 * 
 * @param id - The unique identifier for the flecha.
 * @param color - The color of the flecha, represented as a number.
 * @param nodoIn - The id of the input nodo to which the flecha connects.
 * @param nodoOut - The id of the output nodo to which the flecha connects.
 * 
 * @throws Error if the input or output nodo does not exist.
 */
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

    borrarNodo(id: string) {
        let a = this.nodos.find(element => element.id === id);
        if (a === undefined) {
            throw new Error("No existe el nodo");
        }
        
        a.inFlechas.forEach(element => {
            this.flechas.slice(this.flechas.indexOf(element), 1);
        });
        a.outFlechas.forEach(element => {
            this.flechas.slice(this.flechas.indexOf(element), 1);
        });

        this.nodos.slice(this.nodos.indexOf(a), 1);
    }

    borrarFlecha(id: string) {
        let a = this.flechas.find(element => element.id === id);
        if (a === undefined) {
            throw new Error("No existe la flecha");
        }
        a.nodoTo!.quitarflechaIn(a);
        a.nodoFrom!.quitarflechaOut(a);
        this.flechas.splice(this.flechas.indexOf(a), 1);
    }

    editarNodo(id: string, tipo: string) {
        let a = this.nodos.find(element => element.id === id);
        if (a === undefined) {
            throw new Error("No existe el nodo");
        }
        this.borrarNodo(id)
        this.crearNodo(id, tipo);
    }

    editarFlecha(id: string, to: string, from: string) {
        this.borrarFlecha(id)
        this.crearFlecha(id, 2, to, from);
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