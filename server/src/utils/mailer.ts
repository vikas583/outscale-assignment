import nodemailer from "nodemailer";
import { IMail } from "../types";
import logger from "./logger";

const transport = nodemailer.createTransport({
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

export const sendEmail = async (data: IMail) => {
  try {
    const resp = await transport.sendMail({
      ...data,
      html: data.content,
      from: process.env.OUTLOOK_USER,
    });
    logger.info("mail resp: " + JSON.stringify(resp, null, 1));
    if (resp && resp.rejected?.length) {
      logger.error(resp);
    }
  } catch (error) {
    console.error(error);
  }
};
