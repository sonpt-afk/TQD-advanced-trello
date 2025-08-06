import {Resend } from 'resend'

const RESEND_API_KEY = '' || process.env.RESEND_API_KEY

const ADMIN_SENDER_EMAIL = 'onboarding@resend.dev' || process.env.ADMIN_SENDER_EMAIL
const resendInstance = new Resend(RESEND_API_KEY)


//FUNCTION gui email
const sendEmail = async ({to, subject, html}) => {
    try {
        const data = await resendInstance.emails.send({
            from: ADMIN_SENDER_EMAIL,
            to,
            subject,
            html
        })
        return data
    } catch (error) {
        console.error('Error sending email:', error)
        throw error
    }
}

export const ResendProvider={
    sendEmail
}