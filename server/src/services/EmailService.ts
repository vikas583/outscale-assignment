import nodemailer from "nodemailer";
import { Service } from "typedi";
import { IMail } from "../types";
import logger from "../utils/logger";

@Service()
export class EmailService {
  private static transport = nodemailer.createTransport({
    port: 587,
    host: "smtp-mail.outlook.com",
    secure: false,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.OUTLOOK_USER,
      pass: process.env.OUTLOOK_USER_PASSWORD,
    },
  });

  async sendEmail(data: IMail) {
    const resp = await EmailService.transport.sendMail({
      ...data,
      html: data.content,
      from: "DIR <dir@evalueserve.com>",
    });
    logger.info("mail resp: " + JSON.stringify(resp, null, 1));
    if (resp && resp.rejected?.length) {
      logger.error(resp);
    }
  }
}
