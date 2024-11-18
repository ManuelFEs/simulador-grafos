import { flechaBasic } from "../objects/flecha"
import { nodoBasic } from "../objects/nodo"

export const nodosIniciales: nodoBasic[] = [
    {id: '1', tipo: 'ni' },
    {id: '2', tipo: 'ni' },
    {id: '3', tipo: 'ni' },
    {id: '4', tipo: 'ni' },
    {id: '5', tipo: 'y' },
]

export const flechasIniciales: flechaBasic[]  = [
    {id: '10', nodoTo: '1', nodoFrom: '2', color: 2},
    {id: '20', nodoTo: '2', nodoFrom: '3', color: 2},
    {id: '30', nodoTo: '4', nodoFrom: '3', color: 2},
    {id: '40', nodoTo: '1', nodoFrom: '4', color: 2},
    {id: '50', nodoTo: '1', nodoFrom: '4', color: 2}
]
