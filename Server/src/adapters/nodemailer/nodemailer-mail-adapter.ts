import { mailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0877a30ca2a25d",
    pass: "f99734e7081349"
  }
});

export class NodeMailerMailAdapter implements mailAdapter{
  async sendMail({ subject, body }: SendMailData){
    await transport.sendMail({
      from: 'Equipe feedget <oi@feedget.com>',
      to: 'Jardiel <jardiel.carlosm@gmail.com>',
      subject: subject,
      html: body,
    })
  };
}