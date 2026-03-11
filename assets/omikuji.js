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

  var LUCK_IMAGE_NAMES = {
    "大吉": "daikichi",
    "中吉": "chukichi",
    "吉": "kichi",
    "凶": "kyo",
    "大凶": "daikyo"
  };

  var STORAGE_KEY = 'omikujiWidgetState';
  var COOKIE_KEY = 'omikujiWidgetState';
  var feedCache = {};

  function createPlaceholderSvg(label, pair) {
    var colors = pair || ["#f2eadb", "#8f281f"];
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="' + colors[0] + '"/>' +
      '<stop offset="100%" stop-color="#ffffff"/>' +
      '</linearGradient></defs>' +
      '<rect width="800" height="600" rx="32" fill="url(#g)"/>' +
      '<rect x="36" y="36" width="728" height="528" rx="24" fill="none" stroke="' + colors[1] + '" stroke-dasharray="14 10" stroke-width="6"/>' +
      '<text x="400" y="250" text-anchor="middle" font-size="78" font-family="serif" fill="' + colors[1] + '">' + label + '</text>' +
      '<text x="400" y="340" text-anchor="middle" font-size="28" font-family="sans-serif" fill="' + colors[1] + '">image placeholder</text>' +
      '</svg>';
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  function createFortunePlaceholderSvg(luck) {
    var colors = {
      "大吉": ["#fff0c2", "#d19a21"],
      "中吉": ["#ffe6cc", "#c26f3f"],
      "吉": ["#e4f3df", "#4c8c5a"],
      "凶": ["#e3e8ef", "#607389"],
      "大凶": ["#f0dddd", "#8a4a4a"]
    };
    return createPlaceholderSvg(luck, colors[luck] || ["#f2eadb", "#8f281f"]);
  }

  function createTitlePlaceholderSvg() {
    return createPlaceholderSvg('おみくじ', ["#f8e7cf", "#a3512c"]);
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

  function normalizeDirectory(path) {
    if (!path) {
      return './assets/omikuji-images';
    }

    return path.replace(/[\\/]+$/, '');
  }

  function buildImagePath(luck, options) {
    var filename = LUCK_IMAGE_NAMES[luck] || 'placeholder';
    return normalizeDirectory(options.imageDirectory) + '/' + filename + '.png';
  }

  function buildTitleImagePath(options) {
    return normalizeDirectory(options.imageDirectory) + '/title.png';
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

    return buildImagePath(luck, options);
  }

  function pickFortune(messages, weights, options) {
    var luck = pickLuck(weights);
    var pool = messages[luck] || [];
    var message = pool.length ? pool[randomInt(pool.length)] : '今日は落ち着いて過ごすのが吉です。';

    return {
      luck: luck,
      message: message,
      image: resolveImage(luck, options),
      fallbackImage: createFortunePlaceholderSvg(luck)
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

  function decodeEntities(value) {
    var textarea = document.createElement('textarea');
    textarea.innerHTML = value;
    return textarea.value;
  }

  function stripHtml(value) {
    var tmp = document.createElement('div');
    tmp.innerHTML = value || '';
    return (tmp.textContent || tmp.innerText || '').trim();
  }

  function clipText(value, maxLength) {
    if (!value || value.length <= maxLength) {
      return value;
    }

    return value.slice(0, maxLength - 1).trim() + '…';
  }

  function formatArticleDate(value) {
    if (!value) {
      return '';
    }

    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  function getTodayKey() {
    var parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date());
    var map = {};

    for (var i = 0; i < parts.length; i += 1) {
      if (parts[i].type !== 'literal') {
        map[parts[i].type] = parts[i].value;
      }
    }

    return [map.year, map.month, map.day].join('-');
  }

  function parseStoredState(rawValue) {
    var today = getTodayKey();
    if (!rawValue) {
      return {
        date: today,
        drawCount: 0,
        bonusCount: 0
      };
    }

    try {
      var parsed = JSON.parse(rawValue);
      if (!parsed || parsed.date !== today) {
        return {
          date: today,
          drawCount: 0,
          bonusCount: 0
        };
      }

      return {
        date: today,
        drawCount: Math.max(0, Number(parsed.drawCount) || 0),
        bonusCount: Math.max(0, Number(parsed.bonusCount) || 0)
      };
    } catch (error) {
      return {
        date: today,
        drawCount: 0,
        bonusCount: 0
      };
    }
  }

  function readCookie(name) {
    var escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : '';
  }

  function loadDrawState() {
    var rawValue = '';

    try {
      rawValue = window.localStorage.getItem(STORAGE_KEY) || '';
    } catch (error) {
      rawValue = '';
    }

    if (!rawValue) {
      rawValue = readCookie(COOKIE_KEY);
    }

    return parseStoredState(rawValue);
  }

  function clearDrawState() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      // Ignore localStorage failures.
    }

    document.cookie = COOKIE_KEY + '=; path=/; max-age=0; samesite=lax';
  }

  function saveDrawState(state) {
    var safeState = parseStoredState(JSON.stringify(state));
    var rawValue = JSON.stringify(safeState);

    try {
      window.localStorage.setItem(STORAGE_KEY, rawValue);
    } catch (error) {
      // Ignore localStorage failures and rely on cookies when possible.
    }

    document.cookie = COOKIE_KEY + '=' + encodeURIComponent(rawValue) + '; path=/; max-age=604800; samesite=lax';
    return safeState;
  }

  function getRemainingDraws(state) {
    return Math.max(0, 1 + state.bonusCount - state.drawCount);
  }

  function canDraw(state) {
    return getRemainingDraws(state) > 0;
  }

  function resolveFeedUrl(feedUrl) {
    try {
      return new URL(feedUrl, window.location.href).toString();
    } catch (error) {
      return feedUrl;
    }
  }

  function isSameOriginUrl(url) {
    try {
      return new URL(url).origin === window.location.origin;
    } catch (error) {
      return false;
    }
  }

  function fetchTextWithTimeout(url, timeoutMs) {
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timeoutId = window.setTimeout(function () {
      if (controller) {
        controller.abort();
      }
    }, timeoutMs);

    return fetch(url, {
      cache: 'no-store',
      signal: controller ? controller.signal : undefined
    }).then(function (response) {
      if (!response.ok) {
        throw new Error('http_' + response.status);
      }

      return response.text();
    }).finally(function () {
      window.clearTimeout(timeoutId);
    });
  }

  function firstSuccessful(requests) {
    return new Promise(function (resolve, reject) {
      var errors = [];
      var settledCount = 0;

      for (var i = 0; i < requests.length; i += 1) {
        requests[i].then(resolve).catch(function (error) {
          errors.push(error);
          settledCount += 1;
          if (settledCount === requests.length) {
            reject(errors[0] || new Error('feed_unavailable'));
          }
        });
      }
    });
  }

  function fetchFeedText(feedUrl) {
    var resolvedFeedUrl = resolveFeedUrl(feedUrl);

    if (isSameOriginUrl(resolvedFeedUrl)) {
      return fetchTextWithTimeout(resolvedFeedUrl, 4000);
    }

    return firstSuccessful([
      fetchTextWithTimeout('https://api.allorigins.win/raw?url=' + encodeURIComponent(resolvedFeedUrl), 5000),
      fetchTextWithTimeout(resolvedFeedUrl, 2500)
    ]);
  }

  function parseFeedItems(xmlText, feedUrl) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xmlText, 'application/xml');
    if (doc.querySelector('parsererror')) {
      throw new Error('invalid_feed');
    }

    return Array.prototype.slice.call(doc.querySelectorAll('item')).map(function (item) {
      var titleNode = item.querySelector('title');
      var linkNode = item.querySelector('link');
      var pubDateNode = item.querySelector('pubDate');
      var descriptionNode = item.querySelector('description');

      var title = titleNode ? decodeEntities(titleNode.textContent.trim()) : '';
      var link = linkNode ? linkNode.textContent.trim() : '';
      var description = descriptionNode ? clipText(stripHtml(descriptionNode.textContent), 100) : '';

      return {
        title: title || 'やしおんの記事',
        link: link || feedUrl,
        pubDate: pubDateNode ? pubDateNode.textContent.trim() : '',
        description: description
      };
    }).filter(function (item) {
      return item.link;
    });
  }

  function getFeedState(feedUrl) {
    return feedCache[feedUrl] || null;
  }

  function getFeedItems(feedUrl) {
    var state = feedCache[feedUrl];
    if (!state) {
      state = {
        status: 'pending',
        items: null,
        promise: null
      };

      state.promise = fetchFeedText(feedUrl).then(function (xmlText) {
        var items = parseFeedItems(xmlText, feedUrl);
        if (!items.length) {
          throw new Error('empty_feed');
        }

        state.status = 'resolved';
        state.items = items;
        return items;
      }).catch(function (error) {
        delete feedCache[feedUrl];
        throw error;
      });

      feedCache[feedUrl] = state;
    }

    return state.promise;
  }

  function prefetchFeed(feedUrl) {
    return getFeedItems(feedUrl).catch(function () {
      return null;
    });
  }

  function pickRandomArticle(feedUrl) {
    var state = getFeedState(feedUrl);
    if (state && state.status === 'resolved' && state.items && state.items.length) {
      return Promise.resolve(state.items[randomInt(state.items.length)]);
    }

    return getFeedItems(feedUrl).then(function (items) {
      return items[randomInt(items.length)];
    });
  }

  function setImageSource(image, src, fallbackSrc, alt, fallbackAlt) {
    image.dataset.fallbackApplied = 'false';
    image.onerror = function () {
      if (image.dataset.fallbackApplied === 'true') {
        return;
      }

      image.dataset.fallbackApplied = 'true';
      image.src = fallbackSrc;
      image.alt = fallbackAlt;
    };
    image.onload = function () {
      image.dataset.fallbackApplied = 'false';
    };
    image.src = src;
    image.alt = alt;
  }

  function createMarkup(options) {
    return (
      '<section class="omikuji-widget__panel">' +
      '<h2 class="omikuji-widget__heading">' + escapeHtml(options.title) + '</h2>' +
      '<p class="omikuji-widget__subheading">' + escapeHtml(options.description) + '</p>' +
      '<button type="button" class="omikuji-widget__button">' + escapeHtml(options.buttonLabel) + '</button>' +
      '<p class="omikuji-widget__notice">' + escapeHtml(options.noticeLine1) + '<br />' + escapeHtml(options.noticeLine2) + '</p>' +
      '<p class="omikuji-widget__status" aria-live="polite"></p>' +
      '<button type="button" class="omikuji-widget__debug-reset" hidden>デバッグ: 制限をリセット</button>' +
      '<div class="omikuji-widget__result" data-state="initial">' +
      '<span class="omikuji-widget__badge"></span>' +
      '<img class="omikuji-widget__image" alt="" loading="lazy" />' +
      '<p class="omikuji-widget__message"></p>' +
      '</div>' +
      '<section class="omikuji-widget__article" data-state="idle">' +
      '<p class="omikuji-widget__article-eyebrow">' + escapeHtml(options.preArticleHeading) + '</p>' +
      '<a class="omikuji-widget__article-link" href="#" target="_blank" rel="noopener noreferrer"></a>' +
      '<p class="omikuji-widget__article-meta"></p>' +
      '<p class="omikuji-widget__article-summary">' + escapeHtml(options.preArticleSummary) + '</p>' +
      '</section>' +
      '<p class="omikuji-widget__hint">' + escapeHtml(options.hint) + '</p>' +
      '</section>'
    );
  }

  function normalizeOptions(options) {
    return {
      title: (options && options.title) || 'おみくじ',
      description: (options && options.description) || 'ボタンを押して今日の運勢を占ってみましょう。',
      buttonLabel: (options && options.buttonLabel) || 'おみくじを引く',
      lockedButtonLabel: (options && options.lockedButtonLabel) || '今日はもう引きました',
      hint: (options && options.hint) || '',
      articleHeading: (options && options.articleHeading) || '本日の開運記事はこちら',
      preArticleHeading: (options && options.preArticleHeading) || 'おみくじを引くと開運記事が読めるよ',
      preArticleSummary: (options && options.preArticleSummary) || '',
      debug: !!(options && options.debug),
      feedUrl: (options && options.feedUrl) || 'https://yashion.jp/feed/',
      noticeLine1: (options && options.noticeLine1) || 'おみくじは一日一回ひけるよ！',
      noticeLine2: (options && options.noticeLine2) || '…本当はヒミツなんだけど、開運記事を読むとまた引けるよ！',
      messages: (options && options.messages) || DEFAULT_MESSAGES,
      weights: (options && options.weights) || DEFAULT_WEIGHTS,
      images: (options && options.images) || null,
      imageResolver: (options && options.imageResolver) || null,
      imageDirectory: (options && options.imageDirectory) || './assets/omikuji-images'
    };
  }

  function showArticleLoading(articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, options) {
    articleBox.dataset.state = 'loading';
    articleEyebrow.textContent = options.articleHeading;
    articleLink.textContent = '記事を選んでいます…';
    articleLink.removeAttribute('href');
    articleMeta.textContent = 'RSS を読み込み中です';
    articleSummary.textContent = '';
  }

  function renderArticle(articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, article, feedUrl, options) {
    articleBox.dataset.state = 'ready';
    articleEyebrow.textContent = options.articleHeading;

    if (!article) {
      articleLink.textContent = 'やしおんの記事一覧を見る';
      articleLink.href = feedUrl;
      articleMeta.textContent = 'RSS から記事を取得できなかったため、一覧ページを開きます。';
      articleSummary.textContent = '';
      return;
    }

    articleLink.textContent = article.title;
    articleLink.href = article.link;
    articleMeta.textContent = formatArticleDate(article.pubDate);
    articleSummary.textContent = article.description || '気になる記事を開いてチェックしてみてください。';
  }

  function scheduleFeedPrefetch(feedUrl) {
    // Start immediately so the article is usually ready by the time the user draws.
    prefetchFeed(feedUrl);
  }

  function isDebugEnabled(root, options) {
    if (options.debug) {
      return true;
    }

    return !!(root && root.getAttribute('data-omikuji-debug') === 'true');
  }

  function renderInitialState(result, badge, image, message, articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, options) {
    result.dataset.state = 'initial';
    result.removeAttribute('data-luck');
    badge.textContent = '';
    message.textContent = '';

    setImageSource(
      image,
      buildTitleImagePath(options),
      createTitlePlaceholderSvg(),
      'おみくじタイトル画像',
      'おみくじタイトルのプレースホルダ画像'
    );

    articleBox.dataset.state = 'idle';
    articleEyebrow.textContent = options.preArticleHeading;
    articleLink.textContent = '';
    articleLink.removeAttribute('href');
    articleMeta.textContent = '';
    articleSummary.textContent = options.preArticleSummary;
  }

  function updateDrawControls(button, status, options) {
    var state = loadDrawState();
    var remaining = getRemainingDraws(state);

    if (remaining > 0) {
      button.disabled = false;
      button.textContent = options.buttonLabel;
      if (state.drawCount === 0) {
        status.textContent = '今日の運勢をどうぞ。';
      } else if (remaining === 1) {
        status.textContent = '開運記事を読んだので、もう一度引けます。';
      } else {
        status.textContent = '開運記事を読んだ分だけ、まだ引けます。';
      }
      return state;
    }

    button.disabled = true;
    button.textContent = options.lockedButtonLabel;
    status.textContent = '今日は一度引きました。表示された開運記事を読むと、また引けます。';
    return state;
  }

  function mount(target, options) {
    var root = typeof target === 'string' ? document.querySelector(target) : target;
    if (!root) {
      return null;
    }

    var settings = normalizeOptions(options);
    scheduleFeedPrefetch(settings.feedUrl);
    root.classList.add('omikuji-widget');
    root.innerHTML = createMarkup(settings);

    var button = root.querySelector('.omikuji-widget__button');
    var status = root.querySelector('.omikuji-widget__status');
    var debugResetButton = root.querySelector('.omikuji-widget__debug-reset');
    var result = root.querySelector('.omikuji-widget__result');
    var badge = root.querySelector('.omikuji-widget__badge');
    var image = root.querySelector('.omikuji-widget__image');
    var message = root.querySelector('.omikuji-widget__message');
    var articleBox = root.querySelector('.omikuji-widget__article');
    var articleEyebrow = root.querySelector('.omikuji-widget__article-eyebrow');
    var articleLink = root.querySelector('.omikuji-widget__article-link');
    var articleMeta = root.querySelector('.omikuji-widget__article-meta');
    var articleSummary = root.querySelector('.omikuji-widget__article-summary');
    var articleRewardGranted = false;
    var debugEnabled = isDebugEnabled(root, settings);

    renderInitialState(result, badge, image, message, articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, settings);

    if (debugEnabled) {
      debugResetButton.hidden = false;
    }

    updateDrawControls(button, status, settings);

    if (debugEnabled) {
      debugResetButton.addEventListener('click', function () {
        clearDrawState();
        articleRewardGranted = false;
        renderInitialState(result, badge, image, message, articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, settings);
        updateDrawControls(button, status, settings);
      });
    }

    articleLink.addEventListener('click', function () {
      var href = articleLink.getAttribute('href');
      if (!href || href === '#' || articleRewardGranted) {
        return;
      }

      articleRewardGranted = true;
      var state = loadDrawState();
      state.bonusCount += 1;
      saveDrawState(state);
      updateDrawControls(button, status, settings);

      if (articleMeta.textContent.indexOf('もう一度引けます') === -1) {
        articleMeta.textContent = articleMeta.textContent
          ? articleMeta.textContent + ' / 記事を読んだので、もう一度引けます。'
          : '記事を読んだので、もう一度引けます。';
      }
    });


    button.addEventListener('click', function () {
      var currentState = loadDrawState();
      if (!canDraw(currentState)) {
        updateDrawControls(button, status, settings);
        return;
      }

      currentState.drawCount += 1;
      saveDrawState(currentState);

      button.disabled = true;
      button.textContent = '占い中...';
      status.textContent = '結果を準備しています。';

      window.setTimeout(function () {
        var fortune = pickFortune(settings.messages, settings.weights, settings);
        articleRewardGranted = false;

        result.dataset.state = 'drawn';
        result.dataset.luck = fortune.luck;
        badge.textContent = fortune.luck;
        message.textContent = fortune.message;

        setImageSource(
          image,
          fortune.image,
          fortune.fallbackImage,
          fortune.luck + ' の画像',
          fortune.luck + ' のプレースホルダ画像'
        );

        var feedState = getFeedState(settings.feedUrl);
        if (!(feedState && feedState.status === 'resolved')) {
          showArticleLoading(articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, settings);
        }

        pickRandomArticle(settings.feedUrl).then(function (article) {
          renderArticle(articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, article, settings.feedUrl, settings);
        }).catch(function () {
          renderArticle(articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, null, settings.feedUrl, settings);
        }).finally(function () {
          updateDrawControls(button, status, settings);
        });
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
    createFortunePlaceholderSvg: createFortunePlaceholderSvg,
    createTitlePlaceholderSvg: createTitlePlaceholderSvg
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount);
  } else {
    autoMount();
  }
})();










