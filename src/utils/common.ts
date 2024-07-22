import * as dateFns from 'date-fns'
import { ErrorDetails } from '../validations/types'
import { SuccessResponse, ErrorResponse } from '../utils/response'
import * as fs from 'fs'
import { Order } from 'type/Order'

export const toSuccessResponse = (data?: any): SuccessResponse => {
  return {
    message: 'success',
    data: data,
  }
}

export const toErrorResponse = (
  code: string,
  message: string,
  details?: ErrorDetails,
): ErrorResponse => {
  return {
    error: {
      code: code,
      message: message,
      details: details,
    },
  }
}

export const parseStringToDate = (s: string): Date => {
  return dateFns.parseISO(s)
}

export const isEmpty = (obj: object) => Object.keys(obj).length === 0

export const readJSONFile = (path: string, type: string = '') => {
  try {
    const readFileOutput = fs.readFileSync(path, 'utf-8')
    if (!readFileOutput.trim()) {
      return { [type]: [] }
    }
    return JSON.parse(readFileOutput)
  } catch (err) {
    console.error(`Error reading JSON file: ${err}`)
    return { [type]: [] }
  }
}

export const writeDataToJSONFile = (
  path: string,
  textList: any,
  jsonData: any,
) => {
  console.log('jsonData items:', jsonData.items)

  const objData = {
    type: textList[0],
    name: textList[1],
    option: textList[2],
    quantity: textList[3],
  }

  const index = jsonData.items.findIndex(
    (item: any) => item.name === objData.name && item.option === objData.option,
  )

  console.log('Index: ', index)

  if (index >= 0) {
    jsonData.items[index].quantity += objData.quantity
  } else {
    jsonData.items.push(objData)
  }
  console.log('After jsonData items:', jsonData.items)

  fs.writeFile(path, JSON.stringify(jsonData), (err) => {
    if (err) throw err
    console.log('Written Success')
  })
}

export const writeUserDataToJSONFile = (path: string, jsonData: any) => {
  console.log('jsonData items:', jsonData.Users)

  fs.writeFile(path, JSON.stringify(jsonData), (err) => {
    if (err) throw err
    console.log('Written Success')
  })
}

export const writeOrderDataToJSONFile = (
  path: string,
  jsonData: { Orders: Order[] } | null,
) => {
  if (!jsonData) {
    console.error('No data to write')
    return
  }
  console.log('jsonData items:', jsonData)

  fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) throw err
    console.log('Written Success')
  })
}
