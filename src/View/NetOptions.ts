import { Edge, Node } from "vis-network/standalone/umd/vis-network";
import canvas from "./Canvas";
import {v4 as uuidv4} from "uuid";

var canvasT: canvas;

var options = {
    physics:{
      enabled: true
    },

    groups:{
      ni: {
        color:{
          background:"white",
          border:"black",
        }
      },
    },

    nodes:{
      shape:"dot",
      size:10,
    },

    edges:{
      color:"black",
      arrows:{
        middle:{
          enabled:true,
          type:"arrow",
        }
      }
    },

    manipulation: {
      enabled: false,

      addNode: addNodeFunction,

      addEdge: addEdgeFunction,

      editNode: editNodeFunction,

      editEdge: editEdgeFunction,

      deleteNode: deleteNodeFunction,

      deleteEdge: deleteEdgeFunction
    }
}


function addNodeFunction(nodeData:Edge, callback:Function, ) {
  nodeData.label = undefined;
  let tipo = 'ni'; //Hardcoded
  nodeData.id = uuidv4();
  canvasT.nodoAgregar(nodeData.id, tipo);
  callback(nodeData);
}

function addEdgeFunction(edgeData:Edge,callback:any) {
  edgeData.color = 'black';
  edgeData.id = uuidv4();
  if (edgeData.from && edgeData.to) {
    canvasT.flechaAgregar(edgeData.id, edgeData.color, edgeData.to, edgeData.from);
  }
  callback(edgeData);
}

function editNodeFunction(nodeData:Node, callback:any) {
  if (nodeData.id) {
    canvasT.nodoEditar(nodeData.id);
  }
  callback(nodeData);
}

function editEdgeFunction(edgeData:Edge, callback:any) {
  canvasT.flechaEditar(edgeData.id!, edgeData.to!, edgeData.from!);
  callback(edgeData);
}

function deleteNodeFunction(nodeData:Node, callback:any) {
  if (nodeData.id) {
    canvasT.nodoEliminar(nodeData.id);
  }
  callback(nodeData);
}

function deleteEdgeFunction(edgeData:any, callback:any) {
  if (edgeData.edges[0]) {
    canvasT.flechaEliminar(edgeData.edges[0]); 
  }
  callback(edgeData);
}


function setCanvas(c : canvas) {
  canvasT = c;
}

export { options, setCanvas }