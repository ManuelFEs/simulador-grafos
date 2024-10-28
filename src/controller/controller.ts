import { flechasIniciales, nodosIniciales } from "../model/DatosIniciales";
import red from "../model/red";
import { flechaBasic } from "../objects/flecha";
import canvas, { visjsEdge } from "../View/Canvas";

class controlador {

    canva: canvas;
    red: red;

    constructor() {
        this.red = new red(this);
        this.red.AgregarObj(nodosIniciales, flechasIniciales);
        this.canva = new canvas(this);
        this.updateObjects();
    }

    updateObjects() {
        this.actualizarTodoView();
    }

    getNodos() {
        return this.red.getNodosBasic();
    }

    getFlechas() {
        return this.red.getFlechasBasic();
    }

    getFlecha(id: string) {
        return this.red.getFlechaBasic(id);
    }

    updateFlechaBasicAVis(flecha: flechaBasic) {
        let flechaCanvas :visjsEdge;
        let tempColor: string = "black";
        if (flecha.color == 0) {
            tempColor = "blue";
        }
        if (flecha.color == 1) {
            tempColor = "red";
        }
        flechaCanvas ={ id: flecha.id, to: flecha.nodoTo, from: flecha.nodoFrom, color: tempColor }
        return flechaCanvas;
    }

    updateFlechaVisABasic(flecha: visjsEdge) {
        let flechaView: flechaBasic;
        let tempColor: number = 0;
        if (flecha.color == "blue" ) {
            tempColor = 0;
        }
        if (flecha.color == "red") {
            tempColor = 1;
        }
        flechaView = { id: flecha.id as string, nodoTo: flecha.to as string, nodoFrom: flecha.from as string, color: tempColor as number } as flechaBasic;
        return flechaView;
    }

    //Pass de view a model
    colorearToModel(id: string) {
        this.red.colorear(id);
        this.actualizarEdgesView();
    }

    agregarNodeToModel(id:string, tipo: string) {
        this.red.crearNodo(id, tipo);
    }

    agregarFlechaToModel(edge : visjsEdge) {
        let flecha= this.updateFlechaVisABasic(edge)
        
        this.red.crearFlecha(flecha.id, flecha.color, flecha.nodoTo, flecha.nodoFrom);
    }

    //Pass de model a view
    actualizarEdgesView() {
        this.canva.updateAllEdges(this.getFlechas().map(element => this.updateFlechaBasicAVis(element)));
    }   
    actualizarTodoView() {
        this.canva.updateAllComponents(this.getNodos(), this.getFlechas().map(element => this.updateFlechaBasicAVis(element)));
    }
}

export { controlador }