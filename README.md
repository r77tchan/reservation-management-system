# 予約管理システム

## ディレクトリ構成

reservation-management-system/
│
├── frontend/ # フロントエンド（React）
│ ├── public/ # 静的ファイル（HTML、画像など）
│ ├── src/
│ │ ├── components/ # React のコンポーネント
│ │ │ ├── Calendar.js
│ │ │ ├── ReservationForm.js
│ │ │ ├── ReservationList.js
│ │ │ ├── PrivateRoute.js
│ │ │ └── Notification.js
│ │ │ └── Navbar.js
│ │ ├── pages/ # 各ページのコンポーネント
│ │ │ ├── HomePage.js
│ │ │ ├── LoginPage.js
│ │ │ ├── RegisterPage.js
│ │ │ └── AdminPage.js
│ │ ├── services/ # API 通信関連（Axios 設定など）
│ │ │ └── api.js
│ │ ├── utils/ # 共通のユーティリティ関数
│ │ ├── App.js # アプリケーションのルートコンポーネント
│ │ ├── index.js # React アプリのエントリーポイント
│ │ └── routes.js # React Router のルーティング設定
│ ├── package.json
│ └── .env # 環境変数（API の URL など）
│
├── backend/ # バックエンド（Express）
│ ├── config/ # 設定ファイル
│ │ └── database.js # MySQL 接続設定
│ ├── controllers/ # ビジネスロジック（コントローラー）
│ │ ├── authController.js
│ │ ├── reservationController.js
│ │ └── userController.js
│ ├── middleware/ # 認証・エラーハンドリング用のミドルウェア
│ │ ├── authMiddleware.js
│ │ └── errorHandler.js
│ ├── models/ # データベースモデル（MySQL）
│ │ ├── User.js
│ │ └── Reservation.js
│ ├── routes/ # ルート定義
│ │ ├── authRoutes.js
│ │ ├── reservationRoutes.js
│ │ └── userRoutes.js
│ ├── utils/ # ユーティリティ関数やヘルパー
│ │ ├── jwtHelper.js # JWT トークン関連
│ │ └── bcryptHelper.js # パスワードのハッシュ化
│ ├── server.js # Express サーバーのエントリーポイント
│ ├── package.json
│ └── .env # 環境変数（データベース接続情報、JWT シークレットなど）
│
├── mysql/ # データベース設定・初期化用のスクリプト
│ └── init.sql # テーブル作成や初期データ挿入の SQL スクリプト
│
└── README.md # プロジェクトの説明とセットアップガイド

### **フロントエンド (frontend/)**

1. **`components/`**: UI コンポーネントを配置するディレクトリです。予約のリスト表示、フォーム、カレンダー表示、通知機能などが含まれます。
2. **`pages/`**: 各ページのコンポーネントを配置します。ホーム、ログイン、登録、管理者ページなど、React Router を使ってページ遷移を管理します。
3. **`services/`**: API 通信を管理する場所です。`Axios`のインスタンスやリクエストを一元管理します。
4. **`utils/`**: 共通で使えるヘルパー関数やロジックを格納します。例えば、データフォーマット用の関数などです。
5. **`App.js`**: アプリ全体のルートコンポーネントで、ルーティングの設定や全体の状態管理を行います。
6. **`index.js`**: React アプリケーションのエントリーポイントです。

### **バックエンド (backend/)**

1. **`config/`**: データベースやサーバー設定などの設定ファイルを置きます。`database.js`には MySQL 接続の設定があります。
2. **`controllers/`**: 主要なビジネスロジックを持つファイル群です。ユーザー認証、予約管理などの処理を担当します。
3. **`middleware/`**: 認証、エラーハンドリングなどのミドルウェアを定義します。JWT の検証やエラーメッセージ処理を行います。
4. **`models/`**: データベースのスキーマを定義する場所です。`User`や`Reservation`のテーブルが対象です。
5. **`routes/`**: API エンドポイントのルーティングを定義します。ユーザー認証、予約管理用のルートが含まれます。
6. **`server.js`**: Express サーバーのエントリーポイントで、アプリ全体の起動を管理します。

### **データベース (mysql/)**

- **`init.sql`**: MySQL の初期設定やテーブルの作成、サンプルデータの挿入スクリプトを配置します。データベースのセットアップ時に使用します。

### **環境変数 (.env)**

フロントエンドとバックエンドそれぞれに`.env`ファイルを用意し、データベース接続情報、JWT シークレット、API ベース URL などの機密情報や環境設定を管理します。
# reservation-management-system
# reservation-management-system
