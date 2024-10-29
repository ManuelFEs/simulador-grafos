import vis, { IdType } from "vis-network/standalone/umd/vis-network.min";
import { options, setCanvas } from "./NetOptions";
import { controlador } from "../controller/controller";
import { MenuHelper } from "./Menu/MenuUtils";
import { Id } from "vis-network/declarations/network/gephiParser";
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

    //CUD model to view

    nodoAgregar(id: vis.IdType, tipo: string) {
        id = id.toString();
        this.controller.agregarNodeToModel(id, tipo);
    }

    flechaAgregar(id: vis.IdType, color: string = "black", to: vis.IdType, from:vis.IdType) {
        id = id.toString();
        to = to.toString();
        from = from.toString();
        this.controller.agregarFlechaToModel({id, color, to, from} as visjsEdge);
    }

    nodoEliminar(id: vis.IdType) {
        id = id.toString();
        this.controller.eliminarNodeToModel(id);
    }
    
    flechaEliminar(id: IdType) {
        id = id.toString();
        this.controller.eliminarFlechaToModel(id);
    }
    
    flechaEditar(id: IdType, to: IdType, from: IdType) {
        id = id.toString();
        to = to.toString();
        from = from.toString();
        this.controller.editarFlechaToModel(id, to, from);
    }

    nodoEditar(id: IdType) {
        throw new Error("Method not implemented.");
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

    limpiarBtn() {
        this.controller.limpiarToModel()
    }
    
    nodoAgregarBtn() {
        this.network.addNodeMode()
    }
    
    flechaAgregarBtn() {
        this.network.addEdgeMode()
    }
    
    itemEliminarBtn() {
        this.network.deleteSelected()
    }
    
    nodoEditarBtn() {
        this.network.editNode()
    }
    
    flechaEditarBtn() {
        this.network.editEdgeMode()
    }
    
    flechaComandoBtn() {
        throw new Error("Method not implemented.");
    }

    flechaSensorBtn() {
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