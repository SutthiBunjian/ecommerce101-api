import * as fs from 'fs'
import {
  readJSONFile,
  writeDataToJSONFile,
  writeUserDataToJSONFile,
} from '../utils/common'
import { User } from 'type/User'
import { error } from 'console'

const userDataPath =
  '/Users/prdi/Workspace/ecommerce101/ecommerce101-api/src/data/Users.Json'

let data: { Users: User[] } = { Users: [] }

const loadData = () => {
  try {
    data = readJSONFile(userDataPath)
  } catch (err) {
    console.error(`Error loading data: ${err}`)
  }
}

export const login = async (username: string, password: string) => {
  loadData()
  const user = data.Users.find(
    (user) => user.email.toLowerCase() === username.toLowerCase(),
  )

  if (user) {
    if (user.password === password) {
      console.log('Correct log-in info')
    } else {
      console.log('Wrong Password')
    }
  } else {
    console.log('The EMAIL DOES NOT EXIST')
  }
}

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
  password: string,
  address: string,
  UID: string,
) => {
  loadData()
  if (checkUserExisting(email)) {
    console.log('THE EMAIL IS TAKEN PLEASE CHOOSE ANOTHER EMAIL')
  } else {
    const newUser: User = {
      firstName,
      lastName,
      email,
      dateOfBirth,
      password,
      address,
      UID,
    }
    data.Users.push(newUser)

    writeUserDataToJSONFile(userDataPath, data)
  }
}

export const deleteUser = (UID: string) => {
  loadData()
  const initialLength = data.Users.length
  data.Users = data.Users.filter((user) => user.UID !== UID)

  if (data.Users.length < initialLength) {
    writeUserDataToJSONFile(userDataPath, data)
    console.log(`User with UID: ${UID} has been deleted.`)
  } else {
    console.log(`User with UID: ${UID} not found.`)
  }
}

const checkUserExisting = (username: string): boolean => {
  return data.Users.some(
    (user) => user.email.toLowerCase() === username.toLowerCase(),
  )
}
