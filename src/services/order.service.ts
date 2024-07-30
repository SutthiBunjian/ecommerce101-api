import { Order } from 'type/Order'
import {
  readJSONFile,
  writeUserDataToJSONFile,
  writeOrderDataToJSONFile,
} from '../utils/common'
import { RequestError } from '../errors'
import { ErrorCodes } from '../utils/constants'

const orderDataPath = 'orders.json'

let data: { Orders: Order[] } = { Orders: [] }

const loadData = () => {
  try {
    const loadedData = readJSONFile(orderDataPath)
    if (!loadedData || !loadedData.Orders) {
      data = { Orders: [] }
    } else {
      data = loadedData
    }
  } catch (err) {
    console.error(`Error loading data: ${err}`)
    data = { Orders: [] }
    throw new RequestError(ErrorCodes.BadRequest, `Invalid DataPath`)
  }
}

export const insertOrder = async (order: Order) => {
  console.log('Received insert order:', order)
  loadData()
  console.log('Data is loaded')

  const existingOrder = findOrderbyOrderNumber(order.ordernumber)

  if (existingOrder) {
    console.log(`Order with ordernumber ${order.ordernumber} already exists`)
    handleInsertionProduct(order, existingOrder)
  } else {
    console.log('Order does not exist, adding new order')
    data.Orders.push(order)
  }

  writeOrderDataToJSONFile(orderDataPath, data)
}
const findOrderbyOrderNumber = (orderNumber: number) => {
  return data.Orders.find((order) => order.ordernumber === orderNumber)
}
const findOrderbyUID = (uid: string): Order[] => {
  return data.Orders.filter((order) => order.uid === uid)
}
const findProductbyId = (productId: number, order: Order) => {
  return order.products.find((product) => product.id === productId)
}

const handleInsertionProduct = (order: Order, existingOrder: Order) => {
  order.products.forEach((product) => {
    const existingProduct = findProductbyId(product.id, existingOrder)
    if (existingProduct) {
      existingProduct.quantity += product.quantity
    } else {
      existingOrder.products.push(product)
    }
  })
}

const handleDeletionProduct = (order: Order, existingOrder: Order) => {
  order.products.forEach((product) => {
    const existingProduct = findProductbyId(product.id, existingOrder)
    if (existingProduct) {
      existingProduct.quantity -= product.quantity
      console.log('deleted the product')
    } else {
      existingOrder.products.push(product)
    }
  })
}

export const deleteOrder = async (ordernumber: number) => {
  console.log('Received delete order:', ordernumber)
  loadData()
  console.log('Data is loaded')

  const initialLength = data.Orders.length
  data.Orders = data.Orders.filter((order) => order.ordernumber !== ordernumber)

  if (data.Orders.length < initialLength) {
    writeUserDataToJSONFile(orderDataPath, data)

    console.log(`User with uid: ${ordernumber} has been deleted.`)
  } else {
    console.log(`User with uid: ${ordernumber} not found.`)
    throw new RequestError(
      ErrorCodes.NotFound,
      `User with uid: ${ordernumber} not found.`,
    )
  }
}
export const getAllOrders = () => {
  loadData()
  return data.Orders
}
export const getOrdersByUID = (uid: string): Order[] => {
  loadData()
  const orders = findOrderbyUID(uid)
  if (!orders.length) {
    throw new RequestError(
      ErrorCodes.NotFound,
      `No orders found for user with ID: ${uid}`,
    )
  }
  return orders
}
