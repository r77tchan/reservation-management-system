const nodemailer = require('nodemailer')

// Nodemailerの設定
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Gmailを使用する場合（他のサービスでも可）
  auth: {
    user: process.env.EMAIL_USER, // 送信元メールアドレス
    pass: process.env.EMAIL_PASS, // アプリパスワード
  },
})

// メール送信関数
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // 送信元
      to, // 送信先
      subject, // 件名
      text, // 本文
    }

    await transporter.sendMail(mailOptions)
    console.log('メール送信成功')
  } catch (error) {
    console.error('メール送信失敗:', error)
    throw error
  }
}

module.exports = { sendEmail }
