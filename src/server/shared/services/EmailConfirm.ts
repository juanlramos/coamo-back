import nodeMailer from "nodemailer";

const transport = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const EmailConfirm = async (userEmail: string, html: string) => {
  try {
    await transport.sendMail({
      from: `Confirmação de Email <${process.env.EMAIL}>`,
      to: userEmail,
      subject: "CONFIRMAÇÃO DE EMAIL",
      html: html,
    });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return new Error("Erro ao criar registro");
  }
};
