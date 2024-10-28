import { flechasIniciales, nodosIniciales } from "../model/DatosIniciales";
import red from "../model/red";
import { flechaBasic } from "../objects/flecha";
import canvas from "../View/Canvas";

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
        let flechaCanvas;
        let tempColor: string = "black";
        if (flecha.color == 0) {
            tempColor = "blue";
        }
        if (flecha.color == 1) {
            tempColor = "red";
        }

        return flechaCanvas = { id: flecha.id, to: flecha.nodoIn, from: flecha.nodoOut, color: tempColor };
    }


    //Pass de view a model
    colorearToModel(id: string) {
        this.red.colorear(id);
        this.actualizarEdgesView();
    }

    agregarToModel(id:string ) {
        throw new Error("Method not implemented.");
    }

    actualizarEdgesView() {
        this.canva.updateAllEdges(this.getFlechas().map(element => this.updateFlechaBasicAVis(element)));
    }   
    actualizarTodoView() {
        this.canva.updateAllComponents(this.getNodos(), this.getFlechas().map(element => this.updateFlechaBasicAVis(element)));
    }
}

export { controlador }