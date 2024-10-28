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

    //CRUD objetos to view

    nodoAgregar(id: vis.IdType, tipo: string) {
        id = id.toString();
        this.controller.agregarNodeToModel(id, tipo);
    }

    flechaAgregar(id: vis.IdType, color: string, to: vis.IdType, from:vis.IdType) {
        id = id.toString();
        to = to.toString();
        from = from.toString();
        this.controller.agregarFlechaToModel({id, color, to, from} as visjsEdge);
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

    NodoAgregarBtn() {
        this.network.addNodeMode()
    }
    
    NodoEliminar() {
        this.network.deleteSelected()
    }
    
    flechaAgregarBtn() {
        this.network.addEdgeMode()
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


export interface visjsEdge{
    id: number | string;
    to?: number | string;
    from?: number | string;
    color: string;
}

export interface visjsNode{
    id: number | string;
}

export default canvas