import { Request, Response } from 'express'

import * as lineService from '../services/line.service'

export const handleLineWebhook = async (req: Request, res: Response) => {
  try {
    if (!Array.isArray(req.body.events)) {
      res.status(500).end()
    }

    await Promise.all(
      req.body.events.map(async (event: any) => {
        await lineService.handleWebhookEvent(event)
      }),
    )

    res.end()
  } catch (err: any) {
    console.error('HandleLineWebhook Error : ', err.message)
    res.status(500).end()
  }
}
