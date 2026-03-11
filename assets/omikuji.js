(function () {
  var FALLBACK_MESSAGES = {
    "大吉": ["今日は運気が高まっています。前向きに進むと吉です。"],
    "中吉": ["落ち着いた流れの日です。丁寧に進めると良い結果につながります。"],
    "吉": ["肩の力を抜いて過ごすと、穏やかな追い風を感じられます。"],
    "凶": ["急がず慎重に進めば、今日は十分に乗り切れます。"],
    "大凶": ["無理をせず整えることを優先すると、流れを立て直せます。"]
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

  function createEmptyState(today) {
    return {
      date: today || getTodayKey(),
      drawCount: 0,
      bonusCount: 0,
      fortune: null,
      article: null
    };
  }

  function normalizeStoredFortune(fortune) {
    if (!fortune || typeof fortune !== 'object') {
      return null;
    }

    if (!fortune.luck || !fortune.message) {
      return null;
    }

    return {
      luck: String(fortune.luck),
      message: String(fortune.message),
      image: fortune.image ? String(fortune.image) : '',
      fallbackImage: fortune.fallbackImage ? String(fortune.fallbackImage) : createFortunePlaceholderSvg(String(fortune.luck))
    };
  }

  function normalizeStoredArticle(article) {
    if (!article || typeof article !== 'object') {
      return null;
    }

    if (!article.title || !article.link) {
      return null;
    }

    return {
      title: String(article.title),
      link: String(article.link),
      pubDate: article.pubDate ? String(article.pubDate) : '',
      description: article.description ? String(article.description) : ''
    };
  }

  function parseStoredState(rawValue) {
    var today = getTodayKey();
    if (!rawValue) {
      return createEmptyState(today);
    }

    try {
      var parsed = JSON.parse(rawValue);
      if (!parsed || parsed.date !== today) {
        return createEmptyState(today);
      }

      return {
        date: today,
        drawCount: Math.max(0, Number(parsed.drawCount) || 0),
        bonusCount: Math.max(0, Number(parsed.bonusCount) || 0),
        fortune: normalizeStoredFortune(parsed.fortune),
        article: normalizeStoredArticle(parsed.article)
      };
    } catch (error) {
      return createEmptyState(today);
    }
  }

  function storeDisplayedResult(state, fortune, article) {
    var nextState = state || loadDrawState();
    nextState.fortune = normalizeStoredFortune(fortune);
    nextState.article = normalizeStoredArticle(article);
    return saveDrawState(nextState);
  }

  function clearDisplayedResult(state) {
    var nextState = state || loadDrawState();
    nextState.fortune = null;
    nextState.article = null;
    return saveDrawState(nextState);
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

  function restoreDraw(state) {
    var nextState = state || loadDrawState();
    nextState.drawCount = Math.max(0, nextState.drawCount - 1);
    return saveDrawState(nextState);
  }

  function createMessageGroups() {
    return {
      "大吉": [],
      "中吉": [],
      "吉": [],
      "凶": [],
      "大凶": []
    };
  }

  function parseMessagesText(text) {
    var groups = createMessageGroups();
    var lines = String(text || '').split(/\r?\n/);

    for (var i = 0; i < lines.length; i += 1) {
      var line = lines[i].trim();
      if (!line || line.charAt(0) === '#') {
        continue;
      }

      var commaIndex = line.indexOf(',');
      if (commaIndex === -1) {
        continue;
      }

      var luck = line.slice(0, commaIndex).trim();
      var message = line.slice(commaIndex + 1).trim();
      if (!groups[luck] || !message) {
        continue;
      }

      groups[luck].push(message);
    }

    return groups;
  }

  function hasEnoughMessages(groups) {
    return !!(
      groups &&
      groups["大吉"] && groups["大吉"].length &&
      groups["中吉"] && groups["中吉"].length &&
      groups["吉"] && groups["吉"].length &&
      groups["凶"] && groups["凶"].length &&
      groups["大凶"] && groups["大凶"].length
    );
  }

  function fetchMessagesText(url) {
    return fetch(url, {
      cache: 'no-store'
    }).then(function (response) {
      if (!response.ok) {
        throw new Error('http_' + response.status);
      }

      return response.text();
    });
  }

  function fetchFeedText(url) {
    return fetch(url, {
      cache: 'no-store',
      mode: 'cors'
    }).then(function (response) {
      if (!response.ok) {
        throw new Error('http_' + response.status);
      }

      return response.text();
    });
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

  function fetchRemoteFeedItems(feedUrl) {
    return fetchFeedText(feedUrl).then(function (xmlText) {
      var items = parseFeedItems(xmlText, feedUrl);
      if (!items.length) {
        throw new Error('empty_feed');
      }
      return items;
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
      '<p class="omikuji-widget__footer"><a class="omikuji-widget__footer-link" href="https://yashion.jp" target="_blank" rel="noopener noreferrer">やしおんトップへ</a></p>' +
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
      feedUrl: (options && options.feedUrl) || 'https://al3-q10d3e.yashion.jp/feed/',
      noticeLine1: (options && options.noticeLine1) || 'おみくじは一日一回ひけるよ！',
      noticeLine2: (options && options.noticeLine2) || '…本当はヒミツなんだけど、開運記事を読むとまた引けるよ！',
      messages: (options && options.messages) || null,
      messageFile: (options && options.messageFile) || './assets/omikuji-messages.txt',
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

  function renderArticle(articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, article, options) {
    articleBox.dataset.state = 'ready';
    articleEyebrow.textContent = options.articleHeading;

    if (!article) {
      articleLink.textContent = '';
      articleLink.removeAttribute('href');
      articleMeta.textContent = '開運記事の取得に失敗しちゃった…💦';
      articleSummary.textContent = '';
      return;
    }

    articleLink.textContent = article.title;
    articleLink.href = article.link;
    articleMeta.textContent = formatArticleDate(article.pubDate);
    articleSummary.textContent = article.description || '気になる記事を開いてチェックしてみてください。';
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
    var loadedMessages = settings.messages;
    var messagesRequest = null;
    var prefetchedArticles = null;
    var feedError = null;
    var feedRequest = null;

    function ensureMessages() {
      if (loadedMessages && hasEnoughMessages(loadedMessages)) {
        return Promise.resolve(loadedMessages);
      }

      if (messagesRequest) {
        return messagesRequest;
      }

      messagesRequest = fetchMessagesText(settings.messageFile).then(function (messageText) {
        var parsed = parseMessagesText(messageText);
        if (!hasEnoughMessages(parsed)) {
          throw new Error('invalid_messages');
        }

        loadedMessages = parsed;
        return loadedMessages;
      }).catch(function (error) {
        if (window.console && typeof window.console.warn === 'function') {
          window.console.warn('[OmikujiWidget] Message file fetch failed:', error);
        }

        loadedMessages = FALLBACK_MESSAGES;
        return loadedMessages;
      });

      return messagesRequest;
    }

    function ensureFeedItems(forceRetry) {
      if (prefetchedArticles && !forceRetry) {
        return Promise.resolve(prefetchedArticles);
      }

      if (feedRequest && !forceRetry) {
        return feedRequest;
      }

      feedError = null;
      feedRequest = fetchRemoteFeedItems(settings.feedUrl).then(function (items) {
        prefetchedArticles = items;
        return items;
      }).catch(function (error) {
        feedError = error;
        if (window.console && typeof window.console.warn === 'function') {
          window.console.warn('[OmikujiWidget] RSS fetch failed:', error);
        }
        throw error;
      });

      return feedRequest;
    }

    ensureMessages();
    ensureFeedItems(false).catch(function () {
      return null;
    });

    restoreSavedDisplay(loadDrawState(), result, badge, image, message, articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, settings);

    if (debugEnabled) {
      debugResetButton.hidden = false;
      debugResetButton.addEventListener('click', function () {
        clearDrawState();
        articleRewardGranted = false;
        renderInitialState(result, badge, image, message, articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, settings);
        updateDrawControls(button, status, settings);
      });
    }

    updateDrawControls(button, status, settings);

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
      currentState = saveDrawState(currentState);

      button.disabled = true;
      button.textContent = '占い中...';
      status.textContent = '結果を準備しています。';

      ensureMessages().then(function (messages) {
        window.setTimeout(function () {
          var fortune = pickFortune(messages, settings.weights, settings);
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

          if (!prefetchedArticles && !feedError) {
            showArticleLoading(articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, settings);
          }

          ensureFeedItems().then(function (items) {
          if (items && items.length) {
            var article = items[randomInt(items.length)];
            renderArticle(
              articleBox,
              articleEyebrow,
              articleLink,
              articleMeta,
              articleSummary,
              article,
              settings
            );
            currentState = storeDisplayedResult(currentState, fortune, article);
            return;
          }

          currentState = clearDisplayedResult(currentState);
          currentState = restoreDraw(currentState);
          renderArticle(articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, null, settings);
          }).catch(function () {
            currentState = clearDisplayedResult(currentState);
            currentState = restoreDraw(currentState);
            renderArticle(articleBox, articleEyebrow, articleLink, articleMeta, articleSummary, null, settings);
          }).finally(function () {
            updateDrawControls(button, status, settings);
          });
        }, 260);
      });
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
    fallbackMessages: FALLBACK_MESSAGES,
    parseMessagesText: parseMessagesText,
    createFortunePlaceholderSvg: createFortunePlaceholderSvg,
    createTitlePlaceholderSvg: createTitlePlaceholderSvg
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount);
  } else {
    autoMount();
  }
})();






