//TODO: comprobar si se puede aprovechar esta clase
abstract class ItemRed { 
    
    _id : string;
    constructor(id: string) {
        this._id = id;
    }

    
    public get id() {
        return this._id;
    }
    
    
}

export { ItemRed }