// ============================================================
// Pack Vacation 予約受付 GAS スクリプト
// ============================================================
// 設置手順:
// 1. Google スプレッドシートを新規作成 → 拡張機能 → Apps Script
// 2. このコードを貼り付け
// 3. 下の CONFIG を編集（カレンダーIDなど）
// 4. デプロイ → 新しいデプロイ → ウェブアプリ → 全員がアクセス可能
// 5. デプロイURLをカレンダーHTMLの GAS_BOOKING_URL に貼る
// ============================================================

// ===== 設定 =====
var CONFIG = {
  // 通知先メールアドレス
  notifyEmail: 'ouga0315@gmail.com',

  // 物件ごとのGoogleカレンダーID
  // （Googleカレンダーで物件ごとにカレンダーを作成し、そのIDを貼る）
  // カレンダーID の確認方法: Googleカレンダー → 設定 → カレンダーの統合 → カレンダーID
  calendarIds: {
    'sasamori':  'PASTE_SASAMORI_CALENDAR_ID_HERE',
    'akari2':    'PASTE_AKARI2_CALENDAR_ID_HERE',
    'akari4':    'PASTE_AKARI4_CALENDAR_ID_HERE'
  },

  // 物件の表示名
  propertyNames: {
    'sasamori': '民宿笹森家',
    'akari2':   'ゲストハウス灯（2名部屋）',
    'akari4':   'ゲストハウス灯（4名部屋）'
  }
};

// ===== POST 受信（フォーム送信） =====
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // バリデーション
    if (!data.property || !data.checkin || !data.checkout || !data.name || !data.contact) {
      return jsonResponse({ success: false, error: '必須項目が不足しています' });
    }

    // 1. スプレッドシートに記録
    recordToSheet(data);

    // 2. Googleカレンダーに予約イベントを作成
    createCalendarEvent(data);

    // 3. オーナーにメール通知
    sendNotification(data);

    // 4. ゲストに確認メール（メールアドレスがある場合）
    if (data.email) {
      sendGuestConfirmation(data);
    }

    return jsonResponse({ success: true, message: '予約を受け付けました' });

  } catch (err) {
    // エラーでもオーナーに通知
    try {
      MailApp.sendEmail(
        CONFIG.notifyEmail,
        '【予約システムエラー】Pack Vacation',
        'エラーが発生しました:\n' + err.toString() + '\n\nデータ:\n' + e.postData.contents
      );
    } catch(e2) {}

    return jsonResponse({ success: false, error: 'サーバーエラーが発生しました' });
  }
}

// ===== GET 受信（CORS プリフライト対応 & 稼働確認） =====
function doGet(e) {
  return jsonResponse({ status: 'ok', message: 'Pack Vacation Booking API is running' });
}

// ===== スプレッドシート記録 =====
function recordToSheet(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = '予約一覧';
  var sheet = ss.getSheetByName(sheetName);

  // シートがなければ作成
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow([
      '受付日時', '物件', 'チェックイン', 'チェックアウト', '泊数',
      '人数', '氏名', '連絡先', 'メール', '料金（税込）', '備考', 'ステータス'
    ]);
    // ヘッダーを太字に
    sheet.getRange(1, 1, 1, 12).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  // 泊数を計算
  var ci = new Date(data.checkin);
  var co = new Date(data.checkout);
  var nights = Math.round((co - ci) / (1000 * 60 * 60 * 24));

  sheet.appendRow([
    new Date(),                                    // 受付日時
    CONFIG.propertyNames[data.property] || data.property,  // 物件
    data.checkin,                                   // チェックイン
    data.checkout,                                  // チェックアウト
    nights,                                         // 泊数
    data.guests,                                    // 人数
    data.name,                                      // 氏名
    data.contact,                                   // 連絡先
    data.email || '',                               // メール
    data.totalPrice || '',                           // 料金
    data.note || '',                                // 備考
    '新規'                                          // ステータス
  ]);
}

// ===== Googleカレンダーにイベント作成 =====
function createCalendarEvent(data) {
  var calId = CONFIG.calendarIds[data.property];
  if (!calId || calId.indexOf('PASTE_') === 0) {
    // カレンダーID未設定の場合はスキップ
    return;
  }

  var calendar = CalendarApp.getCalendarById(calId);
  if (!calendar) return;

  var ci = new Date(data.checkin + 'T00:00:00');
  var co = new Date(data.checkout + 'T00:00:00');

  var title = '【予約】' + data.name + '様 ' + data.guests + '名';
  var description = '氏名: ' + data.name + '\n' +
                    '人数: ' + data.guests + '名\n' +
                    '連絡先: ' + data.contact + '\n' +
                    (data.email ? 'メール: ' + data.email + '\n' : '') +
                    (data.totalPrice ? '料金: ' + data.totalPrice + '\n' : '') +
                    (data.note ? '備考: ' + data.note + '\n' : '') +
                    '\n※ LP直接予約';

  calendar.createAllDayEvent(title, ci, co, {
    description: description
  });
}

// ===== オーナーへのメール通知 =====
function sendNotification(data) {
  var propName = CONFIG.propertyNames[data.property] || data.property;
  var ci = data.checkin;
  var co = data.checkout;
  var nights = Math.round((new Date(co) - new Date(ci)) / (1000 * 60 * 60 * 24));

  var subject = '【新規予約】' + propName + ' ' + ci + '〜 ' + data.name + '様';

  var body = '━━━━━━━━━━━━━━━━━━━━\n' +
             '  新しい予約が入りました！\n' +
             '━━━━━━━━━━━━━━━━━━━━\n\n' +
             '物件: ' + propName + '\n' +
             '日程: ' + ci + ' → ' + co + '（' + nights + '泊）\n' +
             '人数: ' + data.guests + '名\n' +
             '氏名: ' + data.name + '\n' +
             '連絡先: ' + data.contact + '\n' +
             (data.email ? 'メール: ' + data.email + '\n' : '') +
             (data.totalPrice ? '料金: ' + data.totalPrice + '\n' : '') +
             (data.note ? '備考: ' + data.note + '\n' : '') +
             '\n※ Googleカレンダーに自動登録済みです。\n' +
             '※ Airbnb・Booking.comは15〜30分後に自動ブロックされます。\n';

  MailApp.sendEmail(CONFIG.notifyEmail, subject, body);
}

// ===== チェックインガイドURL =====
var CHECKIN_GUIDES = {
  'sasamori': 'https://www.notion.so/33af814f12fd8151bc5cf028700828ad',
  'akari2':   '',  // ★ 灯のガイドを作成したらURLを貼ってください
  'akari4':   ''   // ★ 灯のガイドを作成したらURLを貼ってください
};

// ===== ゲストへの確認メール（HTMLメール + チェックインガイドURL） =====
function sendGuestConfirmation(data) {
  var propName = CONFIG.propertyNames[data.property] || data.property;
  var ci = data.checkin;
  var co = data.checkout;
  var nights = Math.round((new Date(co) - new Date(ci)) / (1000 * 60 * 60 * 24));
  var guideUrl = CHECKIN_GUIDES[data.property] || '';

  var subject = '【ご予約確認】' + propName + ' - Pack Vacation';

  // プレーンテキスト（HTMLが表示できない場合のフォールバック）
  var plainBody = data.name + ' 様\n\n' +
    'この度はPack Vacationをご予約いただき、ありがとうございます。\n\n' +
    '宿泊施設: ' + propName + '\n' +
    'チェックイン: ' + ci + ' 15:00〜\n' +
    'チェックアウト: ' + co + ' 〜10:00\n' +
    '泊数: ' + nights + '泊\n' +
    '人数: ' + data.guests + '名\n' +
    (data.totalPrice ? '料金目安: ' + data.totalPrice + '\n' : '') +
    (guideUrl ? '\nチェックインガイド: ' + guideUrl + '\n※ このメールを保存しておいてください。当日までいつでもガイドを確認できます。\n' : '') +
    '\nPack Vacation / 三條 桜芽\n';

  // HTMLメール本文
  var html = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f7f5f2;font-family:-apple-system,BlinkMacSystemFont,\'Hiragino Sans\',\'Noto Sans JP\',sans-serif;">' +
    '<div style="max-width:520px;margin:0 auto;padding:32px 16px;">' +

    // ヘッダー
    '<div style="text-align:center;padding:24px 0 16px;">' +
      '<div style="font-size:24px;font-weight:700;color:#4a6741;letter-spacing:0.05em;">Pack Vacation</div>' +
      '<div style="font-size:12px;color:#8a7e6e;margin-top:4px;">安曇野のちいさな宿</div>' +
    '</div>' +

    // メインカード
    '<div style="background:#fff;border-radius:16px;padding:28px 24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">' +

      // 挨拶
      '<p style="font-size:14px;color:#333;line-height:1.8;margin:0 0 20px;">' +
        data.name + ' 様<br><br>' +
        'この度は <strong>' + propName + '</strong> をご予約いただき、ありがとうございます。<br>' +
        '以下の内容でご予約を承りました。' +
      '</p>' +

      // 予約情報テーブル
      '<table style="width:100%;border-collapse:collapse;margin:0 0 20px;">' +
        '<tr style="border-bottom:1px solid #eee;"><td style="padding:10px 0;font-size:12px;color:#8a7e6e;width:110px;">宿泊施設</td><td style="padding:10px 0;font-size:14px;color:#333;font-weight:600;">' + propName + '</td></tr>' +
        '<tr style="border-bottom:1px solid #eee;"><td style="padding:10px 0;font-size:12px;color:#8a7e6e;">チェックイン</td><td style="padding:10px 0;font-size:14px;color:#333;">' + ci + '　15:00〜</td></tr>' +
        '<tr style="border-bottom:1px solid #eee;"><td style="padding:10px 0;font-size:12px;color:#8a7e6e;">チェックアウト</td><td style="padding:10px 0;font-size:14px;color:#333;">' + co + '　〜10:00</td></tr>' +
        '<tr style="border-bottom:1px solid #eee;"><td style="padding:10px 0;font-size:12px;color:#8a7e6e;">泊数</td><td style="padding:10px 0;font-size:14px;color:#333;">' + nights + '泊</td></tr>' +
        '<tr style="border-bottom:1px solid #eee;"><td style="padding:10px 0;font-size:12px;color:#8a7e6e;">人数</td><td style="padding:10px 0;font-size:14px;color:#333;">' + data.guests + '</td></tr>' +
        (data.totalPrice ? '<tr><td style="padding:10px 0;font-size:12px;color:#8a7e6e;">料金（税込目安）</td><td style="padding:10px 0;font-size:14px;color:#333;font-weight:600;">' + data.totalPrice + '</td></tr>' : '') +
      '</table>' +

      // チェックインガイドボタン
      (guideUrl ?
        '<div style="text-align:center;margin:24px 0;">' +
          '<a href="' + guideUrl + '" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#4a6741,#6b8f5e);color:#fff;text-decoration:none;border-radius:50px;font-size:14px;font-weight:700;letter-spacing:0.05em;">チェックインガイドを見る</a>' +
          '<p style="font-size:11px;color:#8a7e6e;margin-top:8px;">アクセス・入室方法・注意事項はこちら</p>' +
        '</div>' +
        '<div style="text-align:center;background:#fff8e8;border:1px solid #f0e4c4;border-radius:8px;padding:12px 16px;margin:0 0 16px;">' +
          '<p style="font-size:12px;color:#8a7e6e;margin:0;">📌 <strong style="color:#333;">このメールを保存しておいてください。</strong><br>チェックインガイドのリンクは当日まで何度でもご確認いただけます。</p>' +
        '</div>'
      : '') +

      // メッセージ
      '<div style="background:#f7f5f2;border-radius:10px;padding:16px;margin-top:16px;">' +
        '<p style="font-size:13px;color:#555;line-height:1.8;margin:0;">' +
          '当日は何時ごろいらっしゃるか、事前にお知らせいただけると助かります。<br>' +
          '道順や安曇野のことでアドバイスが必要なときには、ご遠慮なくお知らせください。<br>' +
          'お越しを心よりお待ちしております。' +
        '</p>' +
      '</div>' +

    '</div>' +

    // フッター
    '<div style="text-align:center;padding:24px 0;font-size:11px;color:#aaa;line-height:1.8;">' +
      'Pack Vacation<br>' +
      'ホスト 三條 桜芽（Ouga）<br>' +
      'Instagram: <a href="https://instagram.com/sasamorihouse" style="color:#8a7e6e;">@sasamorihouse</a> / <a href="https://instagram.com/guesthousetomoshibi" style="color:#8a7e6e;">@guesthousetomoshibi</a><br>' +
      '<span style="font-size:10px;">※ このメールは自動送信です</span>' +
    '</div>' +

    '</div>' +
  '</body></html>';

  MailApp.sendEmail(data.email, subject, plainBody, {
    name: 'Pack Vacation',
    replyTo: CONFIG.notifyEmail,
    htmlBody: html
  });
}

// ===== JSON レスポンス生成 =====
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
