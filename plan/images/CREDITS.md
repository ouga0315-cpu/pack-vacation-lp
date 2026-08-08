# 画像クレジット

`plan/images/` 内の画像の帰属情報です。CC BY / CC BY-SA 系ライセンスは表記継承が必要。

## ユーザー撮影（三條桜芽 / Pack Vacation）
以下の画像は Pack Vacation で撮影・所有する写真。© Pack Vacation。

| ファイル | スポット | 元画像 |
|---|---|---|
| nature-01.jpg | 早朝の安曇野・シルエット × 朝もや | focus-morning-tour/p_sil.jpg |
| nature-02.jpg | 新緑の渓流（人物あり） | 2026-05-18 撮影 |
| active-01.jpg | 雲海 × 北アルプス朝焼け × 展望台の人々 | focus-morning-tour/p_alpen.jpg |
| active-02.jpg | 稜線を歩く登山者たち × 雲海 | ouga highlight |
| slow-01.jpg | ログハウスの窓辺 × 紅葉 | focus-morning-tour/p_cabin.jpg |
| slow-02.jpg | ひまわり畑 × 青空 | ouga highlight |
| kids-01.jpg | 子どもたちの食卓（焼きそば・たこ焼き） | 2025-09-24 撮影 |
| dog-01.jpg | 森の中の小道（黄帽子の人） | focus-morning-tour/p_forest.jpg |
| art-01.jpg | 雪景色を望む窓辺 × 座布団 | ouga highlight |

## Wikimedia Commons / Unsplash（残り6枚）
以下は商用可のフリー画像。ライセンス継承が必要。

| ファイル | スポット | ライセンス | 撮影者 / 出典 |
|---|---|---|---|
| food-01.jpg | 大王わさび農園（パノラマ） | CC BY 3.0 | funk bass — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:%E5%A4%A7%E7%8E%8B%E3%82%8F%E3%81%95%E3%81%B3%E8%BE%B2%E5%9C%92_-_panoramio.jpg) |
| food-02.jpg | 安曇野ワイナリー | CC BY-SA 4.0 | [Qurren](https://commons.wikimedia.org/wiki/User:Qurren) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Azumino_Winery.jpg) |
| art-02.jpg | 安曇野ちひろ美術館 | CC BY 2.5 | [663highland](https://commons.wikimedia.org/wiki/User:663highland) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:150922_Chihiro_Art_Museum_Azumino_Japan01s3.jpg) |
| active-03.jpg | 拾ヶ堰 | CC BY-SA 3.0 | [Qurren](https://commons.wikimedia.org/wiki/User:Qurren) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Jikka_Segi.jpg) |
| kids-02.jpg | 安曇野アートヒルズミュージアム | CC BY-SA 4.0 | [Qurren](https://commons.wikimedia.org/wiki/User:Qurren) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Azumino_Arthills_Museum.jpg) |

## DOG-02（三郷スカイライン）について

適切なフリー画像が見つからなかったため、既存の `sasamoriya/images/lifestyle-pet.jpg`（自宿の犬同伴写真）を割り当てています。三條さん撮影後に差し替え推奨。

## 前処理

すべての画像は Python (PIL) で以下の処理を行いました：
- 縦長は上部寄せで4:3に自動クロップ
- 最大幅 1600px にリサイズ（縦横比維持）
- JPEG品質 82・progressive・optimize
- ファイルサイズは 100〜570KB 程度に圧縮

## ライセンス継承の注意

CC BY-SA 系の画像を改変した場合は、同じライセンス（CC BY-SA）で頒布する必要があります。単純なリサイズ・再圧縮は「改変」に該当するため、本ページの帰属表記でクレジットを継承しています。
