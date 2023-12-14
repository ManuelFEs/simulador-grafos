//Variables
var edges_color = []; // {id: "", color: 1=R, 0=A,-1=N}
var nodes_tipo = [];// {id: "", tipo: 1=NI, 0=BCKGRND}
//Funciones de ejecuciones

//botón colorear flecha roja y consecuentes
function coloring(){

  var selectedEdge;
  network.once("click", function(params) {
    selectedEdge = params.edges[0];
    if(params.edges[0] != undefined){
      coloringRecursion(selectedEdge, 1);
    }
  });
}

function paso(){
  edges.getIds().forEach(function(edge){
    console.log(edges.get(edge))
  });
  console.log(edges)
}


function clean(){
  var allEdges = edges.getIds();
  for(let i = 0; i < allEdges.length; i++){
    resetColor(allEdges[i])
  }
}

//Funciones de procesos básicos
function ColoreoTipoNI(flecha, nodeId){ //Colorea según el tipo de entrada del nodo
  let filteredEdges = FilterEnteringEdges(nodeId);
  let edgeNum, setColor = 1;
  let i;
  for(i = 0; i < edges_color.length; i++){
    if(edges_color[i].id == flecha)
        edgeNum = i

    for(let j = 0; j < filteredEdges.length; j++){
      if(filteredEdges[j] == edges_color[i].id && edges_color[i].color == 1){
        setColor = 0;
      }
      if(setColor == 0)
        break;
    }
  }
  if(setColor == 1){
    edges_color[edgeNum].color = setColor;
    network.updateEdge(flecha, {color: "red" });
  }
  if(setColor == 0){
    edges_color[edgeNum].color = setColor;
    network.updateEdge(flecha, {color: "blue" });
  }
}

function ColorearFlecha(flecha){
  let nodeId;
  let flechaNodeFromId = edges.get(flecha).from
  let flechaNodeToId  = edges.get(flecha).to
  let returnNode
  let k = 0;
  do{
    if(flechaNodeFromId == nodes_tipo[k].id){
      nodeId = nodes_tipo[k].tipo;
      switch(nodeId){
        case 0: //BCKGRND

        break;
        case 1: //NI
          ColoreoTipoNI(flecha, nodes_tipo[k].id)
        break;
      }
    }
    if(flechaNodeToId == nodes_tipo[k].id){
      returnNode = nodes_tipo[k]
    }
    k++;
  }while(nodes_tipo.length > k)
  return returnNode; //nodes_tipo
}

function coloringRecursion(selectedEdge){ //NO USAR NUNCA EDGE.GET() EN OPERACIONES, siempre los propios
  //IMPORTANTE FALLA AL NO SE GRAFOS ESTABLES
  let cola = [];
  cola.push(selectedEdge);

  let allEdges = edges.getIds();
  for(let i = 0; i<allEdges.length; i++){
    if(!edges_color.some(obj => obj.id == allEdges[i])){
      edges_color.push({id: allEdges[i], color: -1});
    }
  }

  let allNodes = nodes.getIds();
  for(let i = 0; i<allNodes.length; i++){
    if(!nodes_tipo.some(obj => obj.id == allEdges[i])){
      nodes_tipo.push({id: allNodes[i], tipo: 1});
    }
  }

  let nodeAct, nodesMal;
  let a = 0;
  do{
    /*
    if(selectedEdge == cola[0] && a != 0){
      cola.shift();
      a++;
      continue; //cambiar
    }*/
    nodeAct = ColorearFlecha(cola.shift());
    nodesMal = ComprobarColores(nodeAct.id);
    Array.prototype.push.apply(cola, nodesMal);
    a++;
    if(a > edges_color.length * 2){ //¿cuál es la cantidad máxima de cambios de color que realizan todas las flechas de un grafo estable?
      let allEdges = edges.getIds();
      //allEdges.forEach((obj) => resetColor(obj)) //NO hacer reset
      alert("El grafo no es estable")
      break;
    }
  console.log(cola.length)
  }while(cola.length > 0);
}

//Funciones de soporte
function resetColor(selectedEdge){ //vuelta a negro
  const foundEdge = edges_color.find(function(obj, index){
    if(obj.id == selectedEdge){
      obj.color = -1
      return obj
    }
  });
  if(typeof foundEdge !== "undefined")
    network.updateEdge(foundEdge.id, {color: "black"});
}

function ComprobarColores(nodeId){ //Funciona SOLO PARA NI
  let filteredEdgesOut = filterExitEdges(nodeId);
  let filteredEdgesIn = FilterEnteringEdges(nodeId);
  let hayRojo = 0;
  let EdgesMal = [];
    for(let i = 0; i < edges_color.length; i++){ 
      for(let j = 0; j < filteredEdgesIn.length; j++){
        if(filteredEdgesIn[j] == edges_color[i].id){
          if(edges_color[i].color == 1){
            hayRojo = 1
            break;
          }
        }
      }
    }

    for(let i = 0; i < edges_color.length; i++){
      for(let j = 0; j < filteredEdgesOut.length; j++){
        if(filteredEdgesOut[j] == edges_color[i].id){
          if(edges_color[i].color == hayRojo || edges_color[i].color == -1){
            EdgesMal.push(edges_color[i].id);
          }
        }
      }
    }
  return EdgesMal;
}

function filterExitEdges(nodeId){
  edgesNodeAct = network.getConnectedEdges(nodeId);

  let updatedEdges = [];

  for (let i = 0; i < edgesNodeAct.length; i++) {
    if (edges.get(edgesNodeAct[i]).from == nodeId) {
      updatedEdges.push(edgesNodeAct[i]);
    }
  }
  return updatedEdges;
}

function FilterEnteringEdges(nodeId){
  edgesNodeAct = network.getConnectedEdges(nodeId);
  let updatedEdges = [];

  for (let i = 0; i < edgesNodeAct.length; i++) {
    if (edges.get(edgesNodeAct[i]).to == nodeId) {
      updatedEdges.push(edgesNodeAct[i]);
    }
  }
  return updatedEdges;
}

function filterExitNodes(nodeId){
  edgesNodeAct = network.getConnectedEdges(nodeId);

  let updatedNodes = [];
  let actualEdge;

  for (let i = 0; i < edgesNodeAct.length; i++) {
    actualEdge = edges.get(edgesNodeAct[i])
    if (actualEdge.from == nodeId && !updatedNodes.includes(actualEdge.to)) {
      updatedNodes.push(edges.get(edgesNodeAct[i]).to);
    }
  }
  return updatedNodes;
}




//Inicialización de elementos del programa
//elementos iniciales, editar para un inicio diferente
var nodes = new vis.DataSet([
  {id: 1, label:"1", },
  {id: 2, label:"2", },
]);
  // create an array with edges
  var edges = new vis.DataSet([
    {from: 1, to: 2, },
    {from: 2, to: 1, },
  ]);


  // create a network
var container = document.getElementById('mynetwork');

  // provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};

var options = {
  physics:{enabled:true},
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
    enabled: true,
    addNode: function(nodeData,callback) {
      nodeData.label = null;
      callback(nodeData);
    },
    addEdge: function(edgeData,callback) {
      /*
      if (edgeData.from === edgeData.to) {
        var r = confirm("Do you want to connect the node to itself?");
        if (r === true) {
          callback(edgeData);
        }
      }
      else {/**/
      callback(edgeData);
      //}
    },
    /*
    editNode: function (data, callback) {
        // filling in the popup DOM elements
      document.getElementById("operation").innerText = "Edit Node";
      document.getElementById("node-id").value = data.id;
      document.getElementById("node-label").value = data.label;
      document.getElementById("saveButton").onclick = saveData.bind(
        this,
        data,
        callback
      );
      document.getElementById("cancelButton").onclick = cancelEdit.bind(
        this,
        callback
      );
      document.getElementById("network-popUp").style.display = "block";
    },/**/

    editEdge: function(data, callback) {
      // check if from and to nodes are undefined
      //if (data.from === undefined || data.to === undefined) {
        // create a new node with a unique id
        var newNodeId = nodes.length + 1;
        var newNode = {id: newNodeId, label: newNodeId.toString()};
        nodes.add(newNode);
        console.log(data.from ," a", data.to)
        // update the edge with the new from and to nodes
        //data.from = newNodeId;
        data.to = newNodeId;
      //}
        console.log(data.from ," a", data.to)
      callback(data);
    },

  }
}

  //funciones de frontend
  function saveData(data, callback) {
    data.id = document.getElementById("node-id").value;
    data.label = document.getElementById("node-label").value;
    clearPopUp();
    callback(data);
  }

  function clearPopUp() {
    document.getElementById("saveButton").onclick = null;
    document.getElementById("cancelButton").onclick = null;
    document.getElementById("network-popUp").style.display = "none";
  }

  function cancelEdit(callback) {
    clearPopUp();
    callback(null);
  }

  // initialize your network!
  var network = new vis.Network(container, data, options);