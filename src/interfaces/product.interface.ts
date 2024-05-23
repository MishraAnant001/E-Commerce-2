export interface IProduct {
    _id?:string,
    name:string,
    price:number,
    description?:string,
    category:string,
    stock:number,
    status?:boolean,
    storeid?:string
}