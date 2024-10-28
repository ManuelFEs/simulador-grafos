import { Edge, Node } from "vis-network/standalone";
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

      addNode: addEdgeFunction,

      addEdge: function(edgeData:Edge,callback:any) {
        callback(edgeData);
      },


      editNode: function (nodeData:Node, callback:any) {
        callback(nodeData);
      },

      editEdge: function(edgeData:Edge, callback:any) {
        callback(edgeData);
      },
    }
}


function addEdgeFunction(nodeData:Edge, callback:Function, ) {
  nodeData.label = undefined;
  if (nodeData.id) {
    canvasT.nodoAgregar(nodeData.id)
  }
  callback(nodeData);
  
}

function setCanvas(c : canvas) {
  canvasT = c;
}

export { options, setCanvas }