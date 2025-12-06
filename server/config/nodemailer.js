import nodemailer from 'nodemailer';
import { SMTP_USER, SMTP_PASS } from '../setup/config/env.js';

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    }
})

export default transporter;