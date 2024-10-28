import vis from "vis-network/standalone/umd/vis-network.min";
import { options, setCanvas } from "./NetOptions";
import { controlador } from "../controller/controller";
import { MenuHelper } from "./Menu/MenuUtils";
class canvas {
  

    container: HTMLElement = document.getElementById('mynetwork') as HTMLElement;
    controller : controlador
    network!: vis.Network;
    menu: MenuHelper;

    constructor(controlador: controlador) {
        this.menu = new MenuHelper(this);
        this.controller = controlador;
        setCanvas(this);
        this.run();
        
    } 
    
    /*
     * run
    */
   public run() {
       this.startNetwork();
       this.menu.init();
    }

    startNetwork() {
        let data = {}
        this.network = new vis.Network(this.container, data, options);
    }

    updateAllComponents(nodes: visjsNode[], edges: visjsEdge[]) {
        let data = {
            nodes: nodes,
            edges: edges
        };

        this.network.setData(data);
    }

    edgeUpdate(edge: visjsEdge) {
        this.network.updateEdge(edge.id, {color: edge.color});
    }


    seleccionarItem() {
        this.network.once("click", (params) => {

        })
    }

    updateAllEdges(edges: visjsEdge[]) {
        edges.forEach((edge) => {
            this.edgeUpdate(edge);
        })
    }

    //Funciones de botones

    colorear(){ //TODO hacer funcionar
        let selectedEdge : string;
        this.network.once("click", (params) => {
            selectedEdge = params.edges[0];
            if(params.edges[0] != undefined){
                this.controller.colorearToModel(selectedEdge);
            }
        });
    }

    nodoAgregar(id: vis.IdType) {
        
    }

    NodoAgregarBtn() {
        this.network.addNodeMode()
    }
    
    NodoEliminar() {
        let a = this.network.deleteSelected()
    }
    FlechaAgregar() {
        throw new Error("Method not implemented.");
    }
    FlechaEditar() {
        throw new Error("Method not implemented.");
    }
    FlechaEliminar() {
        throw new Error("Method not implemented.");
    }
    NodoEditar() {
        throw new Error("Method not implemented.");
    }
    FlechaComando() {
        throw new Error("Method not implemented.");
    }
    FlechaSensor() {
        throw new Error("Method not implemented.");
    }
}


interface visjsEdge{
    id: number | string;
    to?: number | string;
    from?: number | string;
    color: string;
}

interface visjsNode{
    id: number | string;
}

export default canvas