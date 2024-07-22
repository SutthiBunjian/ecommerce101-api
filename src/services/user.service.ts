import { RequestError } from '../errors'
import { readJSONFile, writeUserDataToJSONFile } from '../utils/common'
import { User } from 'type/User'
import { ErrorCodes } from '../utils/constants'

const userDataPath =
  '/Users/prdi/Workspace/ecommerce101/ecommerce101-api/src/data/Users.Json'

let data: { Users: User[] } = { Users: [] }

const loadData = () => {
  try {
    const loadedData = readJSONFile(userDataPath)
    if (!loadedData || !loadedData.Orders) {
      data = { Users: [] }
    } else {
      data = loadedData
    }
  } catch (err) {
    console.error(`Error loading data: ${err}`)
    data = { Users: [] }
    throw new RequestError(ErrorCodes.BadRequest, `Invalid DataPath`)
  }
}

export const login = async (username: string, password: string) => {
  if (typeof username !== 'string') {
    throw new RequestError(
      ErrorCodes.BadRequest,
      `Invalid username: ${username}`,
    )
  }

  loadData()
  const user = data.Users.find(
    (user) => user.email.toLowerCase() === username.toLowerCase(),
  )

  if (user) {
    if (user.password === password) {
      console.log('Correct log-in info')

      const result = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        uid: user.uid,
      }

      return result
    } else {
      console.log('Wrong Password')
      throw new RequestError(
        ErrorCodes.PasswordNotMatch,
        `Wrong Password is inputted`,
      )
    }
  } else {
    console.log('The EMAIL DOES NOT EXIST')
    throw new RequestError(
      ErrorCodes.NotFound,
      `User not found by username: ${username}`,
    )
  }
}

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
  password: string,
  address: string,
  uid: string,
) => {
  loadData()
  if (checkUserExisting(email)) {
    console.log('THE EMAIL IS TAKEN PLEASE CHOOSE ANOTHER EMAIL')
    throw new RequestError(
      ErrorCodes.Duplicate,
      'THE EMAIL IS TAKEN PLEASE CHOOSE ANOTHER EMAIL',
    )
  } else {
    const newUser: User = {
      firstName,
      lastName,
      email,
      dateOfBirth,
      password,
      address,
      uid,
    }
    data.Users.push(newUser)

    writeUserDataToJSONFile(userDataPath, data)

    const result = {
      firstName,
      lastName,
      email,
      dateOfBirth,
      address,
      uid,
    }

    return result
  }
}

export const deleteUser = (uid: string) => {
  loadData()
  const initialLength = data.Users.length
  data.Users = data.Users.filter((user) => user.uid !== uid)

  if (data.Users.length < initialLength) {
    writeUserDataToJSONFile(userDataPath, data)

    console.log(`User with uid: ${uid} has been deleted.`)
  } else {
    console.log(`User with uid: ${uid} not found.`)
    throw new RequestError(
      ErrorCodes.NotFound,
      `User with uid: ${uid} not found.`,
    )
  }

  return
}

const checkUserExisting = (username: string): boolean => {
  return data.Users.some(
    (user) => user.email.toLowerCase() === username.toLowerCase(),
  )
}
