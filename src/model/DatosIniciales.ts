import { flechaBasic } from "../objects/flecha"
import { nodoBasic } from "../objects/nodo"

export const nodosIniciales: nodoBasic[] = [
    {id: '1', tipo: 'ni' },
    {id: '2', tipo: 'ni' },
]

export const flechasIniciales: flechaBasic[]  = [
    {id: '10', nodoIn: '1', nodoOut: '2', color: 1},
    {id: '20', nodoIn: '2', nodoOut: '1', color: 2}
]