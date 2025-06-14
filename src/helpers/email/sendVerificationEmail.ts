import nodemailer from "nodemailer";

export async function sendVerificationEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `Edulinker <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`Verification email sent to: ${to}`);
  } catch (error) {
    console.error(`Failed to send verification email to ${to}:`, error);
    throw new Error("Failed to send verification email.");
  }
}
