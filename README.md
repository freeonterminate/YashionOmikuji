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

おみくじを引くと、結果の下に `本日の開運記事はこちら` として [Yashion の RSS](https://yashion.jp/feed/) からランダムな記事を1件表示します。RSS はウィジェット読込時にすぐ先読みします。以前は idle 待ちと直列フォールバックで遅くなっていましたが、現在は先読みを即開始し、cross-origin 時の取得待ちも短くなるように調整しています。

引く前は `assets/omikuji-images/title.png` を表示し、記事エリアの見出しは `おみくじを引くと開運記事が読めるよ` になります。

## 回数制限

おみくじの回数は `localStorage` と Cookie に保存し、その日は一度だけ引けます。
表示された開運記事を開くと、その場でもう一度引けるようになります。

画面には次の注意書きが表示されます。

- `おみくじは一日一回ひけるよ！`
- `…本当はヒミツなんだけど、開運記事を読むとまた引けるよ！`

## デバッグ

Cookie と `localStorage` の回数制限を消すデバッグボタンは、通常は表示されません。なお、このリポジトリの `index.html` サンプルは初期状態でデバッグ有効にしてあります。
必要なときだけ次のどちらかで有効にできます。

```html
<div data-omikuji data-omikuji-debug="true"></div>
```

```html
<script>
  OmikujiWidget.mount("#fortune-box", {
    debug: true
  });
</script>
```

## PNG の置き方

デフォルトでは `assets/omikuji-images` フォルダを見に行きます。
以下のファイル名で PNG を置くと、自動表示されます。日本語ファイル名は使いません。

- `title.png`
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
    hint: ""
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

この場合もファイル名は `title.png` や `daikichi.png` などの英語名で判定します。

RSS URL を変える場合:

```html
<script>
  OmikujiWidget.mount("#fortune-box", {
    feedUrl: "https://example.com/feed/"
  });
</script>
```

結果は `大吉 / 中吉 / 吉 / 凶 / 大凶` の5種類です。文言は各10件、合計50件を内蔵しています。

