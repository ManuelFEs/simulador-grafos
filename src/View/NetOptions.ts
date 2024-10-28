import { Edge, Node } from "vis-network/standalone/umd/vis-network";
import canvas from "./Canvas";


var canvasT: canvas;

var options = {
    physics:{
      enabled: true
    },
    nodes:{
      color:"black",
      shape:"dot",
      size:7,
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

      editNode: function (nodeData:Node, callback:any) {
        callback(nodeData);
      },

      editEdge: function(edgeData:Edge, callback:any) {
        callback(edgeData);
      },
    }
}


function addNodeFunction(nodeData:Edge, callback:Function, ) {
  nodeData.label = undefined;
  let tipo = 'ni'; //Hardcoded
  if (nodeData.id) {
    canvasT.nodoAgregar(nodeData.id, tipo);
  }
  callback(nodeData);
}

function addEdgeFunction(edgeData:Edge,callback:any) {
  edgeData.color = 'black';
  callback(edgeData);
  if (edgeData.id && edgeData.from && edgeData.to && edgeData.color) {
    canvasT.flechaAgregar(edgeData.id, edgeData.color, edgeData.to, edgeData.from);
  }
}

function setCanvas(c : canvas) {
  canvasT = c;
}

export { options, setCanvas }