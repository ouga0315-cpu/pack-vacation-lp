# Pack Vacation 予約システム セットアップガイド

このガイドに沿って設定すると、LP（公式サイト）から直接予約を受け付けられるようになります。
予約が入ると、Googleスプレッドシートに記録 → Googleカレンダーに登録 → メール通知 が自動で行われます。

---

## 全体の流れ

1. Googleカレンダーを3つ作成する
2. Googleスプレッドシートを作成し、GASスクリプトを設置する
3. GASスクリプトにカレンダーIDを設定する
4. ウェブアプリとしてデプロイする
5. デプロイURLをカレンダーHTMLに貼り付ける
6. GoogleカレンダーのiCal URLをAirbnbに登録する

---

## ステップ 1: Googleカレンダーを作成する

物件ごとに予約管理用のカレンダーを作ります。

1. [Googleカレンダー](https://calendar.google.com) を開く
2. 左サイドバーの「他のカレンダー」の横にある **＋** をクリック
3. 「新しいカレンダーを作成」を選択
4. 以下の3つを1つずつ作成する：

| カレンダー名 | 説明 |
|---|---|
| `Pack - 笹森家` | 民宿笹森家の予約カレンダー |
| `Pack - 灯 2名部屋` | ゲストハウス灯 2名部屋 |
| `Pack - 灯 4名部屋` | ゲストハウス灯 4名部屋 |

5. それぞれ作成後、**カレンダーIDをメモ**する：
   - 左サイドバーでカレンダー名の横の **⋮** （3点メニュー）→「設定と共有」
   - 下にスクロールして「カレンダーの統合」セクション
   - 「カレンダーID」をコピー（`xxxxxxxx@group.calendar.google.com` のような形式）

> メモ例：
> - 笹森家: `abc123@group.calendar.google.com`
> - 灯2名: `def456@group.calendar.google.com`
> - 灯4名: `ghi789@group.calendar.google.com`

---

## ステップ 2: スプレッドシートとGASスクリプトを設置する

1. [Googleスプレッドシート](https://sheets.google.com) で「空白のスプレッドシート」を新規作成
2. 名前を「Pack Vacation 予約管理」に変更
3. 上部メニューの **拡張機能** → **Apps Script** をクリック
4. エディタが開いたら、最初からある `function myFunction(){}` の内容を**全部消す**
5. `gas-booking/Code.gs` ファイルの中身を**全部コピーして貼り付ける**

---

## ステップ 3: カレンダーIDを設定する

GASエディタ内のコード上部にある `CONFIG` を編集します。

```javascript
calendarIds: {
  'sasamori':  'ここにステップ1でメモした笹森家のカレンダーIDを貼る',
  'akari2':    'ここに灯2名部屋のカレンダーIDを貼る',
  'akari4':    'ここに灯4名部屋のカレンダーIDを貼る'
},
```

例：
```javascript
calendarIds: {
  'sasamori':  'abc123@group.calendar.google.com',
  'akari2':    'def456@group.calendar.google.com',
  'akari4':    'ghi789@group.calendar.google.com'
},
```

`notifyEmail` はすでに `ouga0315@gmail.com` に設定されているので、変更不要です。

編集が終わったら、上部の **💾 保存ボタン**（またはCtrl+S）で保存してください。

---

## ステップ 4: ウェブアプリとしてデプロイする

1. GASエディタ右上の **「デプロイ」** ボタン → **「新しいデプロイ」** をクリック
2. 左側の歯車アイコン ⚙ → **「ウェブアプリ」** を選択
3. 以下のように設定する：

| 項目 | 設定値 |
|---|---|
| 説明 | Pack Vacation 予約受付 |
| 次のユーザーとして実行 | **自分** |
| アクセスできるユーザー | **全員** |

4. **「デプロイ」** をクリック
5. 「承認が必要です」と表示されたら：
   - 「アクセスを承認」をクリック
   - Googleアカウント（ouga0315@gmail.com）を選択
   - 「詳細」→「Pack Vacation 予約受付（安全ではないページ）に移動」をクリック
   - 「許可」をクリック
6. **ウェブアプリのURL** が表示されます → これをコピーしてメモ！

> URLは `https://script.google.com/macros/s/xxxxxx.../exec` のような形です

---

## ステップ 5: デプロイURLをカレンダーHTMLに貼り付ける

以下の2つのファイルを編集します：

### 笹森家カレンダー（`sasamoriya/availability-calendar.html`）

ファイル内の以下の行を見つけて：
```javascript
var GAS_BOOKING_URL = 'PASTE_YOUR_GAS_BOOKING_URL_HERE';
```

ステップ4でコピーしたURLに書き換えます：
```javascript
var GAS_BOOKING_URL = 'https://script.google.com/macros/s/あなたのURL/exec';
```

### 灯カレンダー（`tomoshibi/availability-calendar.html`）

同様に、以下の行を見つけて書き換えます：
```javascript
var GAS_BOOKING_URL = 'PASTE_YOUR_GAS_BOOKING_URL_HERE';
```

→ 同じURLを貼り付けてください。

書き換えたら、GitHub Pagesにプッシュしてください。

---

## ステップ 6: AirbnbにGoogleカレンダーのiCal URLを登録する

LP経由の予約をAirbnbにも自動反映させるため、GoogleカレンダーのiCal URLをAirbnbに登録します。

### 6-1. GoogleカレンダーのiCal URLを取得する

1. [Googleカレンダー](https://calendar.google.com) を開く
2. 左サイドバーでステップ1で作ったカレンダー（例: `Pack - 笹森家`）の **⋮** → 「設定と共有」
3. 「カレンダーの統合」セクションの **「iCal形式の公開URL」** をコピー
4. 3つのカレンダーすべてについて繰り返す

> もし「公開URL」が出ない場合は、「カレンダーの公開設定」で「一般公開して誰でも利用できるようにする」をオンにしてください。

### 6-2. AirbnbのカレンダーにiCal URLを登録する

1. [Airbnbホスティング画面](https://www.airbnb.jp/hosting) を開く
2. 笹森家のリスティング → 「カレンダー」タブ
3. 右上の **⚙（設定）** → 「カレンダーを接続する」
4. 「他のカレンダーをインポート」に、ステップ6-1でコピーした笹森家のiCal URLを貼り付け
5. 灯の2名部屋・4名部屋のリスティングでもそれぞれ同様に設定

これにより、LP経由で予約が入る → Googleカレンダーにイベント作成 → Airbnbが15〜30分ごとに同期 → Airbnb側も自動ブロック、という流れになります。

---

## 動作テスト

すべての設定が完了したら：

1. LPのカレンダーページを開く
2. 空いている日にちをタップ
3. テスト情報を入力して「この内容で予約する」を押す
4. 以下を確認：
   - Googleスプレッドシートの「予約一覧」シートにデータが記録されている
   - Googleカレンダーに予約イベントが作成されている
   - ouga0315@gmail.com にメール通知が届いている
   - ゲストのメールアドレスを入力した場合、確認メールが届いている

---

## トラブルシューティング

### 「送信中...」のまま止まる
→ GAS_BOOKING_URL が正しくコピーされているか確認してください。

### 「サーバーエラーが発生しました」
→ GASエディタで「実行」→「doPost」を手動実行し、エラーログを確認してください。

### Airbnbに反映されない
→ GoogleカレンダーのiCal公開設定がオンになっているか確認してください。Airbnbの同期には15〜30分かかります。

### GASを更新したい場合
→ コードを変更した後、「デプロイ」→「デプロイを管理」→「鉛筆マーク✏️」→ バージョンを「新バージョン」にして「デプロイ」。URLは変わりません。

---

## まとめ

| 設定項目 | 値 |
|---|---|
| 通知先メール | ouga0315@gmail.com（設定済み） |
| 笹森家カレンダーID | ステップ1で取得 |
| 灯2名カレンダーID | ステップ1で取得 |
| 灯4名カレンダーID | ステップ1で取得 |
| GASデプロイURL | ステップ4で取得 → HTMLに貼付 |
| iCal公開URL × 3 | ステップ6で取得 → Airbnbに登録 |
