
 import {StatusCodes } from 'http-status-codes'

import { userService } from '~/services/userService'
import { ResendProvider } from '~/providers/ResendProvider'
import { create } from 'lodash'
const createNew = async (req, res, next) => {
  try {
    const createdUser = await userService.createNew(req.body)

    const to = createdUser.email
    const subject = 'Welcome to our service!'
    const html = `<p>Hello ${createdUser.name},</p><p>Thank you for signing up!</p>`

    //send email with Resend
    const emailResponse = await ResendProvider.sendEmail({ to, subject, html })
    console.log('send email done:', emailResponse);

    res.status(StatusCodes.OK).json(createdUser)

  } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

export const userController = { createNew }