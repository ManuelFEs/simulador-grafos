import canvas from "../Canvas";

export class TopMenuHelper {
    
    superior: canvas;
    canvas!: HTMLElement;
    constructor(superior: canvas) {
        this.superior = superior;
    }
    init(): void {

        const colorear: HTMLElement = document.getElementById(
            'colorear'
        )!;
        if ( colorear ) colorear.addEventListener( 
            'click', 
            () => this.colorear()
        );

        const limpiar: HTMLElement = document.getElementById(
            'limpiar'
        )!;
        if ( limpiar ) limpiar.addEventListener( 
            'click', 
            () => this.limpiar()
        );

        const NodoAgregar: HTMLElement = document.getElementById(
            'NodoAgregar'
        )!;
        if ( NodoAgregar ) NodoAgregar.addEventListener( 
            'click', 
            () => this.NodoAgregar()
        );

        const NodoEditar: HTMLElement = document.getElementById(
            'NodoEditar'
        )!;
        if ( NodoEditar ) NodoEditar.addEventListener( 
            'click', 
            () => this.NodoEditar()
        );

        const FlechaAgregar: HTMLElement = document.getElementById(
            'FlechaAgregar'
        )!;
        if ( FlechaAgregar ) FlechaAgregar.addEventListener( 
            'click', 
            () => this.FlechaAgregar()
        );

        const FlechaEditar: HTMLElement = document.getElementById(
            'FlechaEditar'
        )!;
        if ( FlechaEditar ) FlechaEditar.addEventListener( 
            'click', 
            () => this.FlechaEditar()
        );

        const ItemEliminar: HTMLElement = document.getElementById(
            'ItemEliminar'
        )!;
        if ( ItemEliminar ) ItemEliminar.addEventListener( 
            'click', 
            () => this.ItemEliminar()
        );

        const FlechaSensor: HTMLElement = document.getElementById(
            'FlechaSensor'
        )!;
        if ( FlechaSensor ) FlechaSensor.addEventListener( 
            'click', 
            () => this.FlechaSensor()
        );

        const FlechaComando: HTMLElement = document.getElementById(
            'FlechaComando'
        )!;
        if ( FlechaComando ) FlechaComando.addEventListener( 
            'click', 
            () => this.FlechaComando()
        );

        this.canvas = document.getElementById(
            'mynetwork'
        )!;
        if ( canvas ) this.canvas.addEventListener( 
            'contextmenu', 
            (e) => this.addMenuContext(e)
        );

        const menubar: HTMLElement = document.getElementById(
            'menubar'
        )!;
        if ( menubar ) this.canvas.addEventListener( 
            'contextmenu', 
            (e) => e.preventDefault()
        );
    }

    limpiar(): any {
        this.superior.limpiarBtn();
    }

    addMenuContext(e: MouseEvent){  
        e.preventDefault();

        if (e.button === 2) { // Clic derecho
            this.superior.seleccionarItem();
        }
    }
    
    colorear(): void {
        this.superior.colorear();
    }

    NodoAgregar(): void {
        this.superior.nodoAgregarBtn();
    }
    
    NodoEditar(): void {
        this.superior.nodoEditarBtn();
    }

    ItemEliminar(): void {
        this.superior.itemEliminarBtn();
    }

    FlechaAgregar(): void {
        this.superior.flechaAgregarBtn();
    }

    FlechaEditar(): void {
        this.superior.flechaEditarBtn();
    }

    FlechaSensor(): void {
        this.superior.flechaSensorBtn();
    }

    FlechaComando(): void {
        this.superior.flechaComandoBtn();
    }
}