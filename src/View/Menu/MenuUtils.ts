import canvas from "../Canvas";

export class MenuHelper {
    
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

        const NodoEliminar: HTMLElement = document.getElementById(
            'NodoEliminar'
        )!;
        if ( NodoEliminar ) NodoEliminar.addEventListener( 
            'click', 
            () => this.NodoEliminar()
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

        const FlechaEliminar: HTMLElement = document.getElementById(
            'FlechaEliminar'
        )!;
        if ( FlechaEliminar ) FlechaEliminar.addEventListener( 
            'click', 
            () => this.FlechaEliminar()
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
        this.superior.NodoAgregarBtn();
    }
    
    NodoEditar(): void {
        this.superior.NodoEditar();
    }

    NodoEliminar(): void {
        this.superior.NodoEliminar();
    }

    FlechaAgregar(): void {
        this.superior.flechaAgregarBtn();
    }

    FlechaEditar(): void {
        this.superior.FlechaEditar();
    }

    FlechaEliminar(): void {
        this.superior.FlechaEliminar();
    }

    FlechaSensor(): void {
        this.superior.FlechaSensor();
    }

    FlechaComando(): void {
        this.superior.FlechaComando();
    }
}