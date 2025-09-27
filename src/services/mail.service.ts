// mail.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransporter({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendConfirmationEmail(to: string, token: string) {
    const confirmUrl = `http://kwazé-kréyol.fr/confirm-email?token=${token}`;

    await this.transporter.sendMail({
      from: this.configService.get('MAIL_FROM'),
      to,
      subject: 'Confirmation de votre adresse e-mail',
      html: `<p>Merci de vous être inscrit !</p>
             <p>Cliquez ici pour confirmer votre e-mail : <a href="${confirmUrl}">${confirmUrl}</a></p>`,
    });
  }


  async sendReinitialisationMail(user:any, token: string) {

    const resetLink = `https://kwazé-kréyol.fr/reset-password?token=${token}`;

    await this.transporter.sendMail({
        from: this.configService.get('MAIL_FROM'),
        to: user.email,
        subject: 'Réinitialisation de votre mot de passe',
        html: `
          <h3>Réinitialisation du mot de passe</h3>
          <p>Bonjour ${user.pseudo},</p>
          <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
          <a href="${resetLink}">Réinitialiser le mot de passe</a>
          <p>Ce lien expirera dans 15 minutes.</p>
        `,
    })

  }
}
