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

画像の差し替え:

```html
<script>
  OmikujiWidget.mount("#fortune-box", {
    images: {
      大吉: "./images/daikichi.jpg",
      中吉: "./images/chukichi.jpg",
      吉: "./images/kichi.jpg",
      凶: "./images/kyo.jpg",
      大凶: "./images/daikyo.jpg"
    }
  });
</script>
```

結果は `大吉 / 中吉 / 吉 / 凶 / 大凶` の5種類です。文言は各10件、合計50件を内蔵しています。

画像は現時点では SVG のプレースホルダを自動生成しています。画像を細かく出し分けたい場合は `imageResolver(luck)` オプションも使えます。
