(function () {
  var DEFAULT_MESSAGES = {
    "大吉": [
      "今日のあなたは追い風そのもの。迷っていた計画に一歩踏み出すと、想像以上に良い流れが生まれます。",
      "努力が実を結ぶ日です。これまで積み重ねたことが、目に見える形で評価されるでしょう。",
      "人とのご縁が大きな幸運を呼びます。気になっていた相手への連絡は吉です。",
      "新しい挑戦に最適な運気です。少し背伸びした目標でも、今なら軽やかに届きます。",
      "あなたの直感が冴えています。最初にピンと来た選択を信じると道が開けます。",
      "うれしい知らせが届きやすい日です。特に仕事や学びに関する話は前向きに受け取りましょう。",
      "金運も上々。欲しかったものは、今のあなたに必要な投資になる可能性があります。",
      "笑顔が福を呼び込みます。いつもより明るい挨拶が、思わぬ幸運のきっかけになります。",
      "停滞していたことが動き出します。焦らず流れに乗ることで、最善の形に整っていきます。",
      "願いごとに追い風が吹いています。周囲の助けに感謝しながら進めば、大きな実りを得られます。"
    ],
    "中吉": [
      "穏やかな上昇運です。派手さはなくても、着実にうれしい成果へ近づいています。",
      "小さな親切が大きな福につながります。今日は誰かのためのひと手間を惜しまないで。",
      "準備してきたことが役立つ日です。焦らず基本に忠実でいるほど運が味方します。",
      "人と比べず自分の歩幅を守ると吉。あなたらしさが一番の魅力になります。",
      "迷ったら無理のない方を選ぶと正解に近づきます。自然体が幸運の鍵です。",
      "会話の中にヒントがあります。何気ない一言が、次の行動を後押ししてくれるでしょう。",
      "今日は整える力が高まっています。机まわりや予定表を見直すと運気もすっきりします。",
      "少し遠回りに見える道が、結果的にいちばん良い選択になります。",
      "気が進まなかったことほど、やってみると収穫があります。最初の一歩だけ軽く踏み出しましょう。",
      "安心できる人との時間が運を育てます。ひとりで抱え込まず、素直に話すと吉です。"
    ],
    "吉": [
      "安定した運気です。大きく欲張るより、いつもの良さを丁寧に発揮するのが正解です。",
      "今日は基本を見直すと流れが良くなります。派手な工夫より土台固めに福があります。",
      "気持ちに余裕を持つことで、見落としていたチャンスに気づけそうです。",
      "頼まれごとは吉。できる範囲で応えると、巡り巡ってあなたの助けになります。",
      "少しの工夫が日常を快適にします。気になっていた不便を一つ解消してみましょう。",
      "落ち着いて言葉を選ぶと、人間関係がぐっとやわらかくなります。",
      "目の前のことを一つずつ終えると吉。積み残しを減らすほど心も軽くなります。",
      "運気は穏やかですが、油断は禁物です。丁寧さを忘れなければ十分に良い一日になります。",
      "買い物や選択は、即決より比較が吉。ひと呼吸おくことで納得できる答えが見つかります。",
      "休むことも大事な開運行動です。今日は体と心のペースを揃えて過ごしてみてください。"
    ],
    "凶": [
      "急ぎすぎに注意。今日は結論を早めるより、一度立ち止まることで失敗を避けられます。",
      "思い通りに進みにくい日ですが、今は整える時期と考えると流れが変わります。",
      "無理な約束は避けた方が吉。余白を残すことで、あとから助かる場面がありそうです。",
      "感情的な反応は損をしやすい日です。返事をする前に深呼吸を一つ。",
      "小さな見落としが起こりやすいので、確認をいつもの二倍丁寧にすると安心です。",
      "対人運は慎重さが鍵です。正しさより思いやりを優先すると穏やかに収まります。",
      "今は攻めるより守る方が得策です。現状維持をしっかりこなせば十分に吉へ転じます。",
      "疲れが判断を鈍らせるかもしれません。早めの休息が今日いちばんの開運法です。",
      "欲張ると空回りしやすい日です。一つに絞って取り組むと傷が浅くて済みます。",
      "焦りは禁物。今日の遠回りは、明日の失敗を防ぐために必要な時間です。"
    ],
    "大凶": [
      "運気は低空飛行ですが、慎重に動けば大事には至りません。今日は守りを最優先に。",
      "思わぬ行き違いが起こりやすい日です。大切な話ほど文字や記録で残しておくと安心です。",
      "無理に流れを変えようとすると疲れが増します。今日は現状維持だけでも十分合格です。",
      "決断は明日に回せるなら延期が無難。今日は情報収集と整理に向いています。",
      "ひとりで抱え込むと視野が狭くなりそうです。信頼できる人の意見を借りてください。",
      "落ち込みやすい日ですが、悪い流れは長く続きません。丁寧な暮らしが回復の近道です。",
      "忘れ物や勘違いに要注意。出発前、送信前、提出前の三回確認が身を守ります。",
      "今日は勝負をかける日ではありません。静かに足元を固めることで、次の好機を迎えられます。",
      "うまくいかない時こそ、自分を責めすぎないことが大切です。小さく整えれば十分です。",
      "厳しい運勢でも、回避できる不運は多くあります。慎重さと休息が今日の最強のお守りです。"
    ]
  };

  var DEFAULT_WEIGHTS = [
    { luck: "大吉", weight: 10 },
    { luck: "中吉", weight: 20 },
    { luck: "吉", weight: 40 },
    { luck: "凶", weight: 20 },
    { luck: "大凶", weight: 10 }
  ];

  function createPlaceholderSvg(luck) {
    var colors = {
      "大吉": ["#fff0c2", "#d19a21"],
      "中吉": ["#ffe6cc", "#c26f3f"],
      "吉": ["#e4f3df", "#4c8c5a"],
      "凶": ["#e3e8ef", "#607389"],
      "大凶": ["#f0dddd", "#8a4a4a"]
    };
    var pair = colors[luck] || ["#f2eadb", "#8f281f"];
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="' + pair[0] + '"/>' +
      '<stop offset="100%" stop-color="#ffffff"/>' +
      '</linearGradient></defs>' +
      '<rect width="800" height="600" rx="32" fill="url(#g)"/>' +
      '<rect x="36" y="36" width="728" height="528" rx="24" fill="none" stroke="' + pair[1] + '" stroke-dasharray="14 10" stroke-width="6"/>' +
      '<text x="400" y="250" text-anchor="middle" font-size="78" font-family="serif" fill="' + pair[1] + '">' + luck + '</text>' +
      '<text x="400" y="340" text-anchor="middle" font-size="28" font-family="sans-serif" fill="' + pair[1] + '">image placeholder</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  function randomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function pickLuck(weights) {
    var total = 0;
    for (var i = 0; i < weights.length; i += 1) {
      total += weights[i].weight;
    }

    var roll = Math.random() * total;
    var cumulative = 0;

    for (var j = 0; j < weights.length; j += 1) {
      cumulative += weights[j].weight;
      if (roll < cumulative) {
        return weights[j].luck;
      }
    }

    return weights[weights.length - 1].luck;
  }

  function resolveImage(luck, options) {
    if (options.imageResolver) {
      var resolved = options.imageResolver(luck);
      if (resolved) {
        return resolved;
      }
    }

    if (options.images && options.images[luck]) {
      return options.images[luck];
    }

    return createPlaceholderSvg(luck);
  }

  function pickFortune(messages, weights, options) {
    var luck = pickLuck(weights);
    var pool = messages[luck] || [];
    var message = pool.length ? pool[randomInt(pool.length)] : '今日は落ち着いて過ごすのが吉です。';

    return {
      luck: luck,
      message: message,
      image: resolveImage(luck, options)
    };
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function createMarkup(options) {
    return (
      '<section class="omikuji-widget__panel">' +
      '<h2 class="omikuji-widget__heading">' + escapeHtml(options.title) + '</h2>' +
      '<p class="omikuji-widget__subheading">' + escapeHtml(options.description) + '</p>' +
      '<button type="button" class="omikuji-widget__button">' + escapeHtml(options.buttonLabel) + '</button>' +
      '<div class="omikuji-widget__result" hidden>' +
      '<span class="omikuji-widget__badge"></span>' +
      '<img class="omikuji-widget__image" alt="" loading="lazy" />' +
      '<p class="omikuji-widget__message"></p>' +
      '</div>' +
      '<p class="omikuji-widget__hint">' + escapeHtml(options.hint) + '</p>' +
      '</section>'
    );
  }

  function normalizeOptions(options) {
    return {
      title: (options && options.title) || 'おみくじ',
      description: (options && options.description) || 'ボタンを押して今日の運勢を占ってみましょう。',
      buttonLabel: (options && options.buttonLabel) || 'おみくじを引く',
      hint: (options && options.hint) || '画像は今後差し替えできるプレースホルダです。',
      messages: (options && options.messages) || DEFAULT_MESSAGES,
      weights: (options && options.weights) || DEFAULT_WEIGHTS,
      images: (options && options.images) || null,
      imageResolver: (options && options.imageResolver) || null
    };
  }

  function mount(target, options) {
    var root = typeof target === 'string' ? document.querySelector(target) : target;
    if (!root) {
      return null;
    }

    var settings = normalizeOptions(options);
    root.classList.add('omikuji-widget');
    root.innerHTML = createMarkup(settings);

    var button = root.querySelector('.omikuji-widget__button');
    var result = root.querySelector('.omikuji-widget__result');
    var badge = root.querySelector('.omikuji-widget__badge');
    var image = root.querySelector('.omikuji-widget__image');
    var message = root.querySelector('.omikuji-widget__message');

    button.addEventListener('click', function () {
      button.disabled = true;
      button.textContent = '占い中...';

      window.setTimeout(function () {
        var fortune = pickFortune(settings.messages, settings.weights, settings);

        result.hidden = false;
        result.dataset.luck = fortune.luck;
        badge.textContent = fortune.luck;
        image.src = fortune.image;
        image.alt = fortune.luck + ' の画像';
        message.textContent = fortune.message;

        button.disabled = false;
        button.textContent = settings.buttonLabel;
      }, 260);
    });

    return {
      draw: function () {
        button.click();
      }
    };
  }

  function autoMount() {
    var nodes = document.querySelectorAll('[data-omikuji]');
    for (var i = 0; i < nodes.length; i += 1) {
      if (!nodes[i].dataset.omikujiMounted) {
        mount(nodes[i]);
        nodes[i].dataset.omikujiMounted = 'true';
      }
    }
  }

  window.OmikujiWidget = {
    mount: mount,
    messages: DEFAULT_MESSAGES,
    createPlaceholderSvg: createPlaceholderSvg
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount);
  } else {
    autoMount();
  }
})();
