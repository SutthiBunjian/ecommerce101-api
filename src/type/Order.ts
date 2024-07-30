import { Product } from '../type/Product'

export interface Order extends Product {
  uid: string
  ordernumber: number
  products: Product[]
}
