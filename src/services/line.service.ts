import * as line from '../utils/line'
import { MessageType } from '../utils/constants'
import config from '../config'
import * as fs from 'fs'
import { readJSONFile, writeDataToJSONFile } from '../utils/common'

interface Item {
  type: 'beverage' | 'snack' | 'juice'
  name: string
  option?: string
  quantity: number
}

interface JsonData {
  items: Item[]
}
interface OrganizedData {
  beverage: Item[]
  snack: Item[]
  juice: Item[]
}

export const handleWebhookEvent = async (webhookEvent: any) => {
  console.log('@@@@@@@@@@@@@@ webhookEvent: ', webhookEvent)
  const issueToken = await line.issueAccessToken(
    config.line.channelId,
    config.line.channelSecret,
  )
  if (!issueToken) {
    console.log('cannot issue token')
    // Return Error
    throw Error
  }
  const accessToken = issueToken.access_token

  const userId = webhookEvent.source.userId
  const groupId = webhookEvent.source.groupId || ''
  const userMsg = webhookEvent.message.text
  const replyToken = webhookEvent.replyToken

  switch (webhookEvent.type) {
    case 'message':
      // handle message
      const message = webhookEvent.message
      switch (message.type) {
        case MessageType.Text:
          await handleText(accessToken, replyToken, message.text)
          break
        case MessageType.Image:
          // handle Image
          break
        case MessageType.ImageMap:
          // handle ImageMap
          break
        case MessageType.Flex:
          // handle Flex
          break
        default:
          break
      }
      break
    case 'postback':
      // handle postback
      break
    case 'module':
      // handle module
      break
    default:
      return
  }
}

const handleText = async (
  accessToken: string,
  userId: string,
  text: string,
) => {
  if (text.toLowerCase() == 'flex') {
    sendFlexMessage(accessToken, userId)
  } else if (text.toLowerCase() !== 'clear') {
    console.log('NOT CLEARING')
    let textList = formatMessageToArray(text)

    console.log('DATA.MESSAGE: ', text)

    if (textList && textList.length) {
      console.log('Text List: ', textList)
      let jsonData = readJSONFile('data.json')

      writeDataToJSONFile('data.json', textList, jsonData)

      const organizedData = organizeItemsByType(jsonData)
      const textResult = generateTextMessage(organizedData)
      const messages = [
        {
          type: 'text',
          text: textResult,
        },
      ]
      await line.replyMessage(accessToken, userId, messages)
    }
  } else {
    clear()
    const clearMessages = [
      {
        type: 'text',
        text: 'Order Cleared',
      },
    ]
    await line.replyMessage(accessToken, userId, clearMessages)
  }
}

const clear = () => {
  fs.writeFile('data.json', '', (err: any) => {
    if (err) throw err
    console.log('Clear Success')
  })
}

const formatMessageToArray = (text: string) => {
  const textarray = text.trim().split(' ')
  console.log(textarray.length)
  console.log(textarray)
  let type, name, option, quantity

  if (textarray.length == 3 || textarray.length == 4) {
    const ordertype = textarray[0]
    const orderBeverage = ['เพิ่มน้ำ', 'เพิ่มนำ้', 'พน', 'นำ้', 'น้ำ', 'น']
    const orderSnack = ['เพิ่มขนม', 'ขนม', 'ข']
    const orderJuice = ['เพิ่มผลไม้', 'ผลไม้', 'ผล', 'ผ', 'ผม']

    if (orderBeverage.includes(ordertype)) {
      type = 'beverage'
    } else if (orderSnack.includes(ordertype)) {
      type = 'snack'
    } else if (orderJuice.includes(ordertype)) {
      type = 'juice'
    } else {
      console.log('Invaild orderType')
      return []
    }

    name = textarray[1]
    const temp = parseInt(textarray[2])

    if (isNaN(temp)) {
      console.log('Is a string')
      option = textarray[2]
    } else {
      console.log('Is Not a string')
      quantity = temp
    }

    if (typeof textarray[3] !== 'undefined') {
      quantity = +textarray[3]
    }
  } else {
    console.log('The lenght is NOT Correct(3 or 4)')
  }

  const result = [type, name, option, quantity]
  console.log(result)
  return result
}

const organizeItemsByType = (jsonData: JsonData) => {
  console.log('json data: ', jsonData)
  if (!jsonData || !jsonData.items) {
    console.error('EMPTY JSONData')
    return { beverage: [], snack: [], juice: [] }
  }

  const organizedData: { beverage: Item[]; snack: Item[]; juice: Item[] } = {
    beverage: [],
    snack: [],
    juice: [],
  }

  jsonData.items.forEach((item: Item) => {
    switch (item.type) {
      case 'beverage':
        organizedData.beverage.push({
          name: item.name,
          option: item.option,
          quantity: item.quantity,
          type: 'beverage',
        })
        break
      case 'snack':
        organizedData.snack.push({
          name: item.name,
          option: item.option,
          quantity: item.quantity,
          type: 'snack',
        })
        break
      case 'juice':
        organizedData.juice.push({
          name: item.name,
          option: item.option,
          quantity: item.quantity,
          type: 'juice',
        })
        break
      default:
        console.log(`Unrecognized item type '${item.type}'`)
    }
  })
  console.log(`organized Beverage: ${JSON.stringify(organizedData.beverage)}`)
  console.log(`organized Snack: ${JSON.stringify(organizedData.snack)}`)
  console.log(`organized Juice: ${JSON.stringify(organizedData.juice)}`)

  return organizedData
}

const generateTextMessage = (organizedData: OrganizedData) => {
  const beverageLength = organizedData.beverage.length
  const snackLength = organizedData.snack.length
  const juiceLength = organizedData.juice.length

  const startTextMessage = 'SNK-0051 สุพัตรา อาชหาว\n\n'
  let beverageTextMessage = 'น้ำไซส์ L\nรายการร้านกาแฟ\n'

  if (beverageLength < 1) {
    beverageTextMessage += '1.\n'
  }
  for (let i = 0; i < beverageLength; i++) {
    beverageTextMessage += `${i + 1}.${organizedData.beverage[i].name}${
      organizedData.beverage[i].option
        ? ' ' + organizedData.beverage[i].option
        : ''
    } ${organizedData.beverage[i].quantity}\n`
  }

  let snackTextMessage = '\nขนม\n'

  if (snackLength < 1) {
    snackTextMessage += '1.\n'
  }
  for (let i = 0; i < snackLength; i++) {
    snackTextMessage += `${i + 1}.${organizedData.snack[i].name}${
      organizedData.snack[i].option ? ' ' + organizedData.snack[i].option : ''
    } ${organizedData.snack[i].quantity}\n`
  }

  let juiceTextMessage = '\nร้านน้ำผลไม้\n'

  if (juiceLength < 1) {
    juiceTextMessage += '1.\n'
  }

  for (let i = 0; i < juiceLength; i++) {
    juiceTextMessage += `${i + 1}.${organizedData.juice[i].name}${
      organizedData.juice[i].option ? ' ' + organizedData.juice[i].option : ''
    } ${organizedData.juice[i].quantity}\n`
  }
  const result = `${startTextMessage}${
    beverageTextMessage ? beverageTextMessage : '1.'
  }${snackTextMessage}${juiceTextMessage}`
  console.log(result)

  return result
}

const sendFlexMessage = async (accessToken: string, userId: string) => {
  const flexTemplate = [
    {
      type: 'flex',
      altText: 'this is a flex message',
      contents: {
        type: 'carousel',
        contents: [
          {
            type: 'bubble',
            hero: {
              type: 'image',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
              size: 'full',
              aspectRatio: '20:13',
              aspectMode: 'cover',
              action: {
                type: 'uri',
                label: 'Line',
                uri: 'https://linecorp.com/',
              },
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'อเมริกาโน่',
                  weight: 'bold',
                  size: 'xl',
                  contents: [],
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  spacing: 'sm',
                  margin: 'lg',
                  contents: [
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          text: 'Place',
                          size: 'sm',
                          color: '#AAAAAA',
                          flex: 1,
                          contents: [],
                        },
                        {
                          type: 'text',
                          text: 'Mezzo',
                          size: 'sm',
                          color: '#666666',
                          flex: 5,
                          wrap: true,
                          contents: [],
                        },
                      ],
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          text: 'Time',
                          size: 'sm',
                          color: '#AAAAAA',
                          flex: 1,
                          contents: [],
                        },
                        {
                          type: 'text',
                          text: '10:00-12:00',
                          size: 'sm',
                          color: '#666666',
                          flex: 5,
                          wrap: true,
                          contents: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            footer: {
              type: 'box',
              layout: 'horizontal',
              flex: 0,
              contents: [
                {
                  type: 'button',
                  action: {
                    type: 'message',
                    label: '0%',
                    text: 'เพิ่มน้ำ อเมริกาโน่ หวาน0 1',
                  },
                  height: 'sm',
                  style: 'link',
                },
                {
                  type: 'button',
                  action: {
                    type: 'message',
                    label: '100%',
                    text: 'เพิ่มน้ำ อเมริกาโน่ หวาน100 1',
                  },
                },
              ],
            },
          },
          {
            type: 'bubble',
            direction: 'ltr',
            hero: {
              type: 'image',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
              size: 'full',
              aspectRatio: '20:13',
              aspectMode: 'cover',
              action: {
                type: 'uri',
                label: 'Line',
                uri: 'https://linecorp.com/',
              },
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'ครัวซอง',
                  weight: 'bold',
                  size: 'xl',
                  contents: [],
                },
                {
                  type: 'box',
                  layout: 'baseline',
                  margin: 'md',
                  contents: [
                    {
                      type: 'icon',
                      url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                      size: 'sm',
                    },
                    {
                      type: 'icon',
                      url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                      size: 'sm',
                    },
                    {
                      type: 'icon',
                      url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                      size: 'sm',
                    },
                    {
                      type: 'icon',
                      url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
                      size: 'sm',
                    },
                    {
                      type: 'icon',
                      url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png',
                      size: 'sm',
                    },
                    {
                      type: 'text',
                      text: '4.0',
                      size: 'sm',
                      color: '#999999',
                      flex: 0,
                      margin: 'md',
                      contents: [],
                    },
                  ],
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  spacing: 'sm',
                  margin: 'lg',
                  contents: [
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          text: 'Place',
                          size: 'sm',
                          color: '#AAAAAA',
                          flex: 1,
                          contents: [],
                        },
                        {
                          type: 'text',
                          text: 'Mezzo',
                          size: 'sm',
                          color: '#666666',
                          flex: 5,
                          wrap: true,
                          contents: [],
                        },
                      ],
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          text: 'Time',
                          size: 'sm',
                          color: '#AAAAAA',
                          flex: 1,
                          contents: [],
                        },
                        {
                          type: 'text',
                          text: '10:00-12:00',
                          size: 'sm',
                          color: '#666666',
                          flex: 5,
                          wrap: true,
                          contents: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            footer: {
              type: 'box',
              layout: 'vertical',
              flex: 0,
              spacing: 'sm',
              contents: [
                {
                  type: 'button',
                  action: {
                    type: 'message',
                    label: '+1',
                    text: 'เพิ่มขนม ครัวซอง 1',
                  },
                  height: 'sm',
                  style: 'link',
                },
                {
                  type: 'spacer',
                },
              ],
            },
          },
        ],
      },
    },
  ]
  console.log('PUSHING', flexTemplate)
  console.log('TYPE OF:', typeof flexTemplate)
  await line.replyMessage(accessToken, userId, flexTemplate)
  console.log('Message sent successfully')
}
