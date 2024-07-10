import axios from 'axios'
import qs from 'qs'
import { ErrorCodes, LineApi } from '../utils/constants'
import { InternalError } from '../errors'

export const issueAccessToken = async (
  clientId: string,
  clientSecret: string,
): Promise<any> => {
  const input = {
    grant_type: LineApi.IssueType,
    client_id: clientId,
    client_secret: clientSecret,
  }
  try {
    const { data } = await axios.post(
      `${LineApi.IssueUrl}`,
      qs.stringify(input),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    return data
  } catch (err) {
    console.log('issueAccessToken err : %s', err)
    let message = 'Unknown Error'
    if (err instanceof Error) message = err.message
    throw new InternalError(ErrorCodes.LineError, message)
  }
}

export const replyMessage = async (
  accessToken: string,
  replyToken: string,
  messages: object[],
): Promise<any> => {
  const dataString = JSON.stringify({
    replyToken,
    messages,
  })

  try {
    const { data } = await axios.post(`${LineApi.ReplyUrl}`, dataString, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    return data
  } catch (err) {
    console.log('reply messages err : %s', err)
    let message = 'Unknown Error'
    if (err instanceof Error) message = err.message
    throw new InternalError(ErrorCodes.LineError, message)
  }
}

export const pushMessage = async (
  accessToken: string,
  to: string,
  messages: object[],
): Promise<any> => {
  const dataString = JSON.stringify({
    to,
    messages,
  })

  try {
    const { data } = await axios.post(`${LineApi.PushMsgUrl}`, dataString, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    return data
  } catch (err) {
    console.log('push messages err : %s', err)
    let message = 'Unknown Error'
    if (err instanceof Error) message = err.message
    throw new InternalError(ErrorCodes.LineError, message)
  }
}

export const setWebhookUrl = async (
  accessToken: string,
  endpoint: string,
): Promise<any> => {
  const dataString = JSON.stringify({
    endpoint,
  })

  try {
    const { data } = await axios.put(
      `${LineApi.WebhookEndpointUrl}`,
      dataString,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return data
  } catch (err) {
    console.log('set webhook url err : %s', err)
    let message = 'Unknown Error'
    if (err instanceof Error) message = err.message
    throw new InternalError(ErrorCodes.LineError, message)
  }
}
