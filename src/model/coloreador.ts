import { flecha } from "../objects/flecha";
import { nodo } from "../objects/nodo";
import red from "./red";

export class coloreador {
    red : red;
    constructor(red: red) {
        this.red = red;
    }

    coloreo(id: string){
        let flechaSeleccionada = this.red.flechas.find(element => element.id === id);
        if (flechaSeleccionada !== undefined) {
            this.coloringLoop(flechaSeleccionada);
        }
    }

    colorClear(){
        for(let i = 0; i<this.red.flechas.length; i++){
            this.red.flechas[i].color = 2;
        }
    }

    private coloringLoop(flechaSeleccionada: flecha) { 
        let cola : flecha[] = [];
        cola.push(flechaSeleccionada);
      
        let nodeAct : nodo | undefined;
        let flechasMalColor: flecha[];
        
        let a = 0;
        do{
            nodeAct = this.Seleccionarflecha(cola.shift() as flecha);
            if(nodeAct == undefined) break;
            
            flechasMalColor = nodeAct.comprobarColores();
            cola = cola.concat(flechasMalColor);
            a++;
            
            if(a > this.red.flechas.length * 2){ //¿cuál es la cantidad máxima de cambios de color que realizan todas las flechas de un grafo estable?
                alert("El grafo no es estable")
                break;
            }
        }while(cola.length > 0);
    }

    private Seleccionarflecha(flecha: flecha){
        this.ColorearFlecha(flecha);
        return flecha.nodoTo;
    }

    private ColorearFlecha(flecha: flecha) {
        flecha.color = 2;
        if(flecha.nodoFrom){
            flecha.color = flecha.nodoFrom.colorSalida();
        }
        else{
            flecha.color = 1;
        }
        alert("pausa")
    }
}

