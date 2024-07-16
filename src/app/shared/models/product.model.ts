
export interface ProductArray extends CartItem{
  _id: string,
  title: string,
  description?: string,
  price: number,
  discountPercentage?:number,
  rating?: number,
  stock: number,
  brand:  string,
  category:  string,
  thumbnail: string,
  images: string[],
  sale?: boolean,
  color:string,
  washType: string,
  wearType: string,
  sleevesLength: string,
  ideal:string
}

export interface Product {
   products?: ProductArray[],
   total: number,
   skip?: number,
   limit?: number,
}

interface CartItem {
  storedItem:ProductArray
}

export interface Cart{
  result:ProductArray[],
  total?: number
}

export interface Item{
  storedItem: string | undefined,
  message?:string,
  success?: boolean
}

export interface AddedProduct {
  item:ProductArray,
  message:string,
  success: boolean
}

export interface Query{
 max:unknown ;
 skip:unknown;
 product?:string;
 page?:number;
}


export class SearchQuery implements Query {
  max=10;
  skip=0;
  product=undefined;
  page=undefined;
}
