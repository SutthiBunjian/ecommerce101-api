import { Product } from '../type/Product'

export interface Order extends Product {
  orderid: string
  ordernumber: number
  products: Product[]
}
