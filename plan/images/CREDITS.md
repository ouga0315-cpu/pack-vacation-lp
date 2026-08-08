# 画像クレジット

`plan/images/` 内の画像の帰属情報です。CC BY / CC BY-SA ライセンスは表記継承が必要。

| ファイル | スポット | ライセンス | 撮影者 / 出典 |
|---|---|---|---|
| nature-01.jpg | 安曇野わさび田湧水群 | CC BY 4.0 | ブルーノ・プラス (Bruno Plus) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Azumino_Wasabida_Yusuigun2.jpg) |
| nature-02.jpg | 烏川渓谷（渓谷橋からの眺め） | CC BY-SA 3.0 | [Qurren](https://commons.wikimedia.org/wiki/User:Qurren) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Karasu_River_view_from_Karasugawakeikokubashi-bridge.jpg) |
| food-01.jpg | 大王わさび農園（パノラマ） | CC BY 3.0 | funk bass — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:%E5%A4%A7%E7%8E%8B%E3%82%8F%E3%81%95%E3%81%B3%E8%BE%B2%E5%9C%92_-_panoramio.jpg) |
| food-02.jpg | 安曇野ワイナリー | CC BY-SA 4.0 | [Qurren](https://commons.wikimedia.org/wiki/User:Qurren) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Azumino_Winery.jpg) |
| art-01.jpg | 碌山美術館 | CC BY 2.5 | [663highland](https://commons.wikimedia.org/wiki/User:663highland) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:150921_Rokuzan_Art_Museum_Azumino_Nagano_pref_Japan01s3.jpg) |
| art-02.jpg | 安曇野ちひろ美術館 | CC BY 2.5 | [663highland](https://commons.wikimedia.org/wiki/User:663highland) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:150922_Chihiro_Art_Museum_Azumino_Japan01s3.jpg) |
| active-01.jpg | 天神坂からの北アルプス朝焼け ※撮影地は白馬村 | CC BY-SA 4.0 | [くろふね](https://commons.wikimedia.org/wiki/User:くろふね) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:%E5%A4%A9%E7%A5%9E%E5%9D%82%E3%81%8B%E3%82%89%E3%81%AE%E5%8C%97%E3%82%A2%E3%83%AB%E3%83%97%E3%82%B9%E3%81%AE%E6%9C%9D%E7%84%BC%E3%81%91.jpg) |
| active-02.jpg | 燕岳（合戦尾根より望む） | CC BY-SA 3.0 | [Σ64](https://commons.wikimedia.org/wiki/User:Σ64) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Mt.Tsubakurodake_from_Gassen-one_01.jpg) |
| active-03.jpg | 拾ヶ堰 | CC BY-SA 3.0 | [Qurren](https://commons.wikimedia.org/wiki/User:Qurren) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Jikka_Segi.jpg) |
| slow-01.jpg | 安曇野しゃくなげの湯 | CC BY-SA 4.0 | [Qurren](https://commons.wikimedia.org/wiki/User:Qurren) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Azumino_Shakunage_no_yu.jpg) |
| slow-02.jpg | 国営アルプスあづみの公園 | CC BY-SA 2.0 | Sei F ([Flickr](https://www.flickr.com/photos/125983633@N03/)) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Alps_Azumino_National_Government_Park_01_-_May_25,_2019.jpg) |
| dog-01.jpg | 森の小道（イメージ） ※安曇野の実写ではない | Unsplash License | [ActionVance](https://unsplash.com/@actionvance) — [Unsplash](https://unsplash.com/photos/g41ZkoO75rE) |
| kids-01.jpg | 中房川 | CC BY-SA 3.0 | [Triglav](https://commons.wikimedia.org/wiki/User:Triglav) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Nakabusa_River_Nagano_Japan.jpg) |
| kids-02.jpg | 安曇野アートヒルズミュージアム | CC BY-SA 4.0 | [Qurren](https://commons.wikimedia.org/wiki/User:Qurren) — [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Azumino_Arthills_Museum.jpg) |

## DOG-02（三郷スカイライン）について

適切なフリー画像が見つからなかったため、既存の `sasamoriya/images/lifestyle-pet.jpg`（自宿の犬同伴写真）を割り当てています。三條さん撮影後に差し替え推奨。

## 前処理

すべての画像は Python (PIL) で以下の処理を行いました：
- 最大幅 1600px にリサイズ（縦横比維持）
- JPEG品質 82・progressive・optimize
- ファイルサイズは 250〜570KB 程度に圧縮

## ライセンス継承の注意

CC BY-SA 系の画像を改変した場合は、同じライセンス（CC BY-SA）で頒布する必要があります。単純なリサイズ・再圧縮は「改変」に該当するため、本ページの帰属表記でクレジットを継承しています。
