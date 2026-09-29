import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = process.env.SMTP_PORT
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASSWORD = process.env.SMTP_PASSWORD


interface IMailService {
    //@ts-ignore
    transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>
    sendVerifiedCode(to: string, code: number | string): Promise<void>
}

class MailService implements IMailService {
    //@ts-ignore
    transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: true,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD,
            },
        })
    }

    async sendVerifiedCode(to: string, code: number): Promise<void> {
        await this.transporter.sendMail({
            from: SMTP_USER,
            to,
            subject: "Код подтверждения почты",
            text: `Ваш код подтверждения: ${code}. Он действителен 10 минут.`,
            html: `<p>Ваш код подтверждения: <b>${code}</b></p><p>Он действителен 10 минут.</p>`,
        })
    }
}

export default new MailService()