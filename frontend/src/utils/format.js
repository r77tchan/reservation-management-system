// Create.jsで使用している時間、日付のフォーマット関数
// サーバー側、特にデータベース保存の形式との変換

// ステータスのマッピング
const getStatusLabel = (status) => {
  switch (status) {
    case 0:
      return '確認済み'
    case 1:
      return '未確認'
    case 2:
      return '失敗'
    default:
      return '不正な値(未実装)'
  }
}

// 時間のフォーマット
const formatTime = (time) => {
  // time が "HH:mm:ss" の形式で送られてくる場合
  return time.slice(0, 5) // "HH:mm" を返す
}

// 日付のフォーマット
const formatDate = (dateString) => {
  const date = new Date(dateString) // 日付文字列を Date オブジェクトに変換
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月は0から始まるため +1
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}` //
}
const formatDate2 = (dateString) => {
  const date = new Date(dateString) // 日付文字列を Date オブジェクトに変換
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月は0から始まるため +1
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}` //
}

export { getStatusLabel, formatTime, formatDate, formatDate2 }
