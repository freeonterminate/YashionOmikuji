# Omikuji Widget

他の HTML に簡単に埋め込める、おみくじ用の小さなウィジェットです。

## 使い方

```html
<link rel="stylesheet" href="assets/omikuji.css" />
<div id="fortune-box"></div>
<script src="assets/omikuji.js"></script>
<script>
  OmikujiWidget.mount("#fortune-box");
</script>
```

`data-omikuji` 属性を付けた要素は自動でマウントされます。

```html
<div data-omikuji></div>
<script src="assets/omikuji.js"></script>
```

## PNG の置き方

デフォルトでは `assets/omikuji-images` フォルダを見に行きます。
以下の5ファイル名で PNG を置くと、結果に応じて自動表示されます。日本語ファイル名は使いません。

- `daikichi.png`
- `chukichi.png`
- `kichi.png`
- `kyo.png`
- `daikyo.png`

ファイルが見つからない場合は、プレースホルダ画像を表示します。

## カスタマイズ

見出し文言の変更:

```html
<script>
  OmikujiWidget.mount("#fortune-box", {
    title: "本日の開運くじ",
    description: "運勢とひとことを表示します。",
    buttonLabel: "今日の運勢を見る",
    hint: "画像はあとで差し替えできます。"
  });
</script>
```

画像フォルダを変える場合:

```html
<script>
  OmikujiWidget.mount("#fortune-box", {
    imageDirectory: "./images/fortune"
  });
</script>
```

この場合もファイル名は `daikichi.png` などの英語名で判定します。

結果は `大吉 / 中吉 / 吉 / 凶 / 大凶` の5種類です。文言は各10件、合計50件を内蔵しています。

