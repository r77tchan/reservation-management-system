// Auth.jsで使用しているバリデーションチェック

export const validateFields = (fields) => {
  const errors = {}

  if ('username' in fields) {
    if (!fields.username) {
      errors.username = '氏名は必須です。'
    } else if (fields.username.length < 2) {
      errors.username = '氏名は2文字以上で入力してください。'
    }
  }

  if ('email' in fields) {
    if (!fields.email) {
      errors.email = 'メールアドレスは必須です。'
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      errors.email = '有効なメールアドレスを入力してください。'
    }
  }

  if ('password' in fields) {
    if (!fields.password) {
      errors.password = 'パスワードは必須です。'
    } else if (fields.password.length < 6) {
      errors.password = 'パスワードは6文字以上で入力してください。'
    }
  }

  return errors
}
