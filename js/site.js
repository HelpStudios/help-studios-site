/* ============================================================================
   Help Studios — marketing site behaviour
   No dependencies, no network calls, no trackers.

   ── ONE THING TO CONFIGURE ────────────────────────────────────────────────
   When the demo walkthrough is published, put its embed URL in
   SITE.demoVideo below and the poster frame becomes a real player:

     Vimeo (recommended — no adverts, privacy controls):
       demoVideo: 'https://player.vimeo.com/video/000000000?title=0&byline=0',
     YouTube (unlisted):
       demoVideo: 'https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0',
     Self-hosted file:
       demoVideo: 'assets/media/hr-intelligence-demo.mp4',

   Leave it empty and the player shows the honest "in production" panel rather
   than a broken frame. The brief forbids inventing a demo that does not exist.
   ========================================================================== */

var SITE = {
  demoVideo: '',            // '' until the recording exists
  demoVideoTitle: 'HR Intelligence — four-minute walkthrough',
  narration: ''             // set to e.g. 'assets/media/hr-intelligence-90s.mp3'
};

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Header: solidify once the page has scrolled ───────────────────── */
  var header = document.getElementById('site-header');

  function syncHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  /* ── 2. Mobile navigation ─────────────────────────────────────────────── */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setNav(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080) setNav(false);
    });
  }

  /* ── 3. Demo player ───────────────────────────────────────────────────── */
  var player = document.getElementById('player');
  var playButton = document.getElementById('player-play');
  var stage = player ? player.querySelector('.player-stage') : null;
  var fallback = document.getElementById('player-fallback');

  function buildEmbed(url) {
    var isFile = /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

    if (isFile) {
      var video = document.createElement('video');
      video.className = 'player-embed';
      video.src = url;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.setAttribute('title', SITE.demoVideoTitle);
      return video;
    }

    var frame = document.createElement('iframe');
    frame.className = 'player-embed';
    frame.src = url + (url.indexOf('?') === -1 ? '?autoplay=1' : '&autoplay=1');
    frame.title = SITE.demoVideoTitle;
    frame.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    frame.setAttribute('allowfullscreen', '');
    frame.setAttribute('loading', 'lazy');
    return frame;
  }

  if (player && playButton) {
    playButton.addEventListener('click', function () {
      if (SITE.demoVideo) {
        stage.appendChild(buildEmbed(SITE.demoVideo));
        playButton.remove();
        var tags = stage.querySelector('.player-tags');
        if (tags) tags.remove();
        player.setAttribute('data-state', 'playing');
        return;
      }

      /* No video yet: say so, then offer the real next step. */
      if (stage) stage.hidden = true;
      if (fallback) {
        fallback.hidden = false;
        var target = fallback.querySelector('.btn');
        if (target) target.focus({ preventScroll: true });
      }
      player.setAttribute('data-state', 'unavailable');
    });
  }

  /* ── 4. Reveal sections as they enter the viewport ────────────────────── */
  var revealables = Array.prototype.slice.call(
    document.querySelectorAll('.section-head, .hero-copy, .hero-visual, .area-card, .trust-card, .founder, .demo-anchors, .trace-card, .contact-facts')
  );

  if (revealables.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      revealables.forEach(function (el, index) {
        el.setAttribute('data-reveal', '');
        el.style.transitionDelay = Math.min(index % 3, 2) * 60 + 'ms';
      });

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

      revealables.forEach(function (el) { observer.observe(el); });
    }
  }

  /* ── 5. How it works: swap the source, keep the model ─────────────────────
     Every system's vocabulary, and the names in it, are generated from the
     engine's own field registry into js/field-vocabulary.js by
     tools/build-field-vocabulary.js. This block holds only what the page
     decides: how a cell is rendered and what it says.

     The system list is NOT written here. It used to be — five hand-picked ids
     with the names beside them — and that was worse than a maintenance chore:
     a reader running People XD, iTrent, ResourceLink, ADP or Sage read "five
     systems" as a closed list and concluded the product was not for them. The
     registry holds ten vocabularies, so the picker offers ten, and the
     generator throws rather than ship a platform the page does not name.

     The names were hand-written once too, and drifted: twelve of the
     twenty-five names the page printed existed in no registry the product
     holds ("Active Worker", "Primary Reason", "Assignment Count", "Event
     Reason"), and a thirteenth resolved to the wrong field. */

  var VOCAB = window.HS_FIELD_VOCABULARY || null;
  var VOCAB_COLUMNS = (VOCAB && VOCAB.columns) || [];
  var VOCAB_SOURCES = (VOCAB && VOCAB.sources) || [];

  /* The generated file groups spellings by field, which reads better in a diff
     and repeats each key once instead of once per spelling. The profiler wants
     the other direction, so invert it once, here. The generator settles
     collisions before writing, so a later claim cannot overwrite an earlier
     one. */
  var VOCAB_SPELLINGS = (function (byField) {
    var index = {};
    if (!byField) return index;
    Object.keys(byField).forEach(function (field) {
      (byField[field] || []).forEach(function (spelling) {
        index[spelling] = field;
      });
    });
    return index;
  })(VOCAB && VOCAB.spellingsByField);

  var picker = document.querySelector('.source-picker');
  var mapBody = document.getElementById('field-map-body');
  var mapSource = document.getElementById('field-map-source');
  var mapSourceCol = document.getElementById('field-map-source-col');
  var mapNamed = document.getElementById('field-map-named');
  var mergeStatus = document.getElementById('merge-status');
  var silos = document.querySelectorAll('.silo');

  /* Which systems the diagram itself draws. The picker offers more, so the
     diagram carries one catch-all row that lights up for any of them. */
  var SILO_IDS = {};
  Array.prototype.forEach.call(silos, function (silo) {
    var id = silo.getAttribute('data-source');
    if (id !== '*') SILO_IDS[id] = true;
  });

  function sourceById(id) {
    for (var i = 0; i < VOCAB_SOURCES.length; i += 1) {
      if (VOCAB_SOURCES[i].id === id) return VOCAB_SOURCES[i];
    }
    return null;
  }

  /* Both halves of the claim, in the page's own voice: how many of these
     columns the system's vocabulary actually names, and what the engine does
     with the rest. A reader on People XD should be able to finish this
     sentence without being told they are unsupported. */
  function namedSentence(source, total, named) {
    if (named >= total) {
      return source.label + ' names all ' + total + ' of these columns in its own vocabulary.';
    }
    return source.label + ' names ' + named + ' of these ' + total + ' columns in its own vocabulary. ' +
      'The other ' + (total - named) + ' show the engine\u2019s own column, muted: the engine reads ' +
      'the header your export carries, or you map it once on upload.';
  }

  function selectSource(id) {
    var source = sourceById(id);
    if (!source || !VOCAB_COLUMNS.length) return;

    Array.prototype.forEach.call(picker.querySelectorAll('.source-chip'), function (chip) {
      var on = chip.getAttribute('data-source') === id;
      chip.classList.toggle('is-active', on);
      chip.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    Array.prototype.forEach.call(silos, function (silo) {
      var target = silo.getAttribute('data-source');
      var on = target === id || (target === '*' && !SILO_IDS[id]);
      silo.classList.toggle('is-active', on);
    });

    if (mapSource) mapSource.textContent = source.label;
    if (mapSourceCol) mapSourceCol.textContent = source.label;

    /* Rebuilt rather than patched: the row set belongs to the vocabulary, so a
       source that names a column differently cannot leave a stale name behind
       in a row it no longer fills. With JavaScript off the markup's static rows
       are the Workday state, and rendering Workday reproduces them exactly —
       which is what the harness checks, cell for cell, muted ones included. */
    var named = 0;
    mapBody.textContent = '';
    VOCAB_COLUMNS.forEach(function (column) {
      var name = column.sources && column.sources[id];

      var row = document.createElement('tr');
      row.setAttribute('data-field', column.key);

      var headCell = document.createElement('th');
      headCell.scope = 'row';
      headCell.textContent = column.label;

      var nameCell = document.createElement('td');
      if (name) {
        named += 1;
        nameCell.textContent = name;
      } else {
        /* The engine's own template column, flagged — never a vendor name the
           registry does not hold, which is the whole point of generating this
           table. */
        var fallback = document.createElement('span');
        fallback.className = 'field-map-fallback';
        fallback.textContent = column.column;
        nameCell.appendChild(fallback);
        nameCell.setAttribute('data-engine-column', 'true');
      }

      row.appendChild(headCell);
      row.appendChild(nameCell);
      mapBody.appendChild(row);
    });

    if (mapNamed) mapNamed.textContent = namedSentence(source, VOCAB_COLUMNS.length, named);

    /* Announced rather than silent: the picture changes, so say what changed. */
    if (mergeStatus) mergeStatus.textContent = 'Showing ' + source.label + ' field names.';
  }

  if (picker) {
    picker.addEventListener('click', function (event) {
      var chip = event.target.closest('.source-chip');
      if (!chip) return;
      selectSource(chip.getAttribute('data-source'));
    });
  }

  /* ── 6. What you get: keep the jump row in step with the page ──────────────
     The anchors and the page's own smooth scrolling do the work on their own,
     so this is enhancement only: mark the group currently in view, and flash
     the group a reader has just jumped to. Nothing is hidden or moved, so the
     section reads the same with script off. */
  var jumpNav = document.querySelector('.feature-jump');
  var featureGroups = Array.prototype.slice.call(document.querySelectorAll('.feature-remote'));

  if (jumpNav && featureGroups.length) {
    var jumpLinks = Array.prototype.slice.call(jumpNav.querySelectorAll('a[href^="#"]'));
    var flashTimer = null;
    var jumpLock = 0;

    function markFeatureGroup(id) {
      jumpLinks.forEach(function (link) {
        if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }

    jumpNav.addEventListener('click', function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;

      var target = document.querySelector(link.getAttribute('href'));
      if (!target || !target.classList.contains('feature-remote')) return;

      markFeatureGroup(target.id);

      /* Hold the active state while the smooth scroll travels, so the row does
         not light up every group it passes on the way. */
      jumpLock = Date.now() + 800;

      target.classList.add('is-flash');
      window.clearTimeout(flashTimer);
      flashTimer = window.setTimeout(function () {
        target.classList.remove('is-flash');
      }, 1400);
    });

    var featureTick = false;

    function syncFeatureGroups() {
      featureTick = false;
      if (Date.now() < jumpLock) return;

      /* The active group is the last one whose top has crossed a line below the
         header; before the first group, the first link stays lit. */
      var line = Math.min(window.innerHeight * 0.35, 320);
      var current = featureGroups[0];

      featureGroups.forEach(function (group) {
        if (group.getBoundingClientRect().top <= line) current = group;
      });

      markFeatureGroup(current.id);
    }

    function requestFeatureSync() {
      if (featureTick) return;
      featureTick = true;
      window.requestAnimationFrame(syncFeatureGroups);
    }

    window.addEventListener('scroll', requestFeatureSync, { passive: true });
    window.addEventListener('resize', requestFeatureSync);
    syncFeatureGroups();
  }

  /* ── 7. Footer year ───────────────────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ── 8. Product screenshots: an accessible lightbox ───────────────────────
     Every shot is a button. Activating it opens the same image at full size;
     Escape or a click on the backdrop closes it and returns focus to the button
     that opened it. The dialog ships empty and only receives a src on open, so
     no image is fetched twice and nothing loads that was not asked for. */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  var lightboxClose = document.getElementById('lightbox-close');
  var lightboxOpener = null;

  function openLightbox(button) {
    if (!lightbox || !lightboxImg) return;
    var img = button.querySelector('img');
    if (!img) return;
    lightboxOpener = button;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxImg) lightboxImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (lightboxOpener) lightboxOpener.focus();
  }

  if (lightbox) {
    Array.prototype.forEach.call(document.querySelectorAll('.shot-open'), function (button) {
      button.addEventListener('click', function () { openLightbox(button); });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeLightbox();
    });
  }

  /* ── 9. Optional hero narration ───────────────────────────────────────────
     Set SITE.narration to a self-hosted MP3 (see docs/DEMO_NARRATION_SCRIPT.md)
     and a listen control appears under the hero actions. Nothing is requested
     while the path is empty, so an unpublished narration cannot 404. */
  if (SITE.narration) {
    var actions = document.querySelector('.hero-actions');
    if (actions && actions.parentNode) {
      var listen = document.createElement('div');
      listen.className = 'hero-listen';

      var label = document.createElement('span');
      label.className = 'hero-listen-label';
      label.textContent = 'Prefer to listen? The product in ninety seconds';

      var audio = document.createElement('audio');
      audio.controls = true;
      audio.preload = 'none';
      audio.src = SITE.narration;
      audio.setAttribute('aria-label', 'Narrated overview of HR Intelligence, ninety seconds');

      listen.appendChild(label);
      listen.appendChild(audio);
      actions.parentNode.insertBefore(listen, actions.nextSibling);
    }
  }

  /* ── 10. Profile the sample export, in the browser ────────────────────────
     The first step of the engine, not a picture of it: the same parse → profile
     → match path the product opens a file with, running on this page against a
     CSV held in memory. Nothing is uploaded, stored or requested.

     The page deliberately does not offer a file picker. The brief forbids
     asking for HR file uploads on the marketing site, and a regulated buyer
     should not have to hand an extract to a website to check a claim about it.
     The sample is an inline string, so there is no fixture to fetch and the
     section works from file:// as well as a server. */
  var trySample = document.getElementById('try-sample');
  var tryClear = document.getElementById('try-clear');
  var tryStatusEl = document.getElementById('try-status');
  var tryOutput = document.getElementById('try-output');
  var tryRows = document.getElementById('try-rows');
  var tryVerdict = document.getElementById('try-verdict');
  var tryName = document.getElementById('try-file-name');
  var tryFacts = document.getElementById('try-file-facts');
  var tryPlaceholder = document.getElementById('try-placeholder');

  var TRY_MAX_ROWS = 50000;

  /* The headers this profiler recognises come from the same generated
     vocabulary the field map above uses: the engine's own registry, scoped to
     the headcount, absence and leavers exports. It replaced a hand-written
     list of nine fields whose ~70 spellings left Job Title reading "Unmapped"
     — a field the engine resolves on all ten platforms, and the one column
     every visitor's export contains. */
  var TRY_VOCAB = VOCAB;

  /* Normalisation must stay identical to the generator's, or a spelling the
     vocabulary holds stops matching in the browser: strip everything that is
     not a letter or a digit, which also folds camelCase, snake_case and
     Title Case onto one key. */
  function tryNormalise(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function tryMatchField(header) {
    if (!TRY_VOCAB) return '';
    var key = tryNormalise(header);
    if (!key) return '';
    var field = VOCAB_SPELLINGS[key];
    if (!field) return '';
    return (TRY_VOCAB.labels && TRY_VOCAB.labels[field]) || field;
  }

  var TRY_SAMPLE = [
    'Employee Number,Department,Job Title,FTE,Start Date,Leaving Date,Leaving Reason,Absence Days',
    'MB1001,Operations,HR Analyst,1.0,2019-04-01,,,2',
    'MB1002,Operations,HR Analyst,1.0,2020-09-14,,,11',
    'MB1003,Finance,Financial Controller,1.0,2018-02-05,,,0',
    'MB1004,Finance,Management Accountant,0.8,2021-11-22,2026-09-30,Resignation,4',
    'MB1005,Technology,Data Engineer,1.0,2022-06-13,2026-10-17,Resignation,1',
    'MB1006,Technology,Platform Lead,1.0,2017-03-06,,,3',
    'MB1007,Risk,Compliance Officer,0.6,2023-01-09,2026-10-02,End of contract,6',
    'MB1008,Retail Banking,Branch Manager,1.0,2016-08-15,,,0'
  ].join('\n');

  function trySetStatus(message) {
    if (tryStatusEl) tryStatusEl.textContent = message;
  }

  /* A small RFC-4180 reader: quoted fields, doubled quotes, CRLF, and the
     delimiter sniffed from the header line. It stops at TRY_MAX_ROWS rather
     than pretending a 200,000-row export was profiled in full. */
  function tryParseDelimited(text) {
    var firstBreak = text.indexOf('\n');
    var firstLine = firstBreak === -1 ? text : text.slice(0, firstBreak);
    var counts = { ',': 0, ';': 0, '\t': 0 };
    var quoted = false;

    for (var scan = 0; scan < firstLine.length; scan += 1) {
      var headChar = firstLine.charAt(scan);
      if (headChar === '"') quoted = !quoted;
      else if (!quoted && Object.prototype.hasOwnProperty.call(counts, headChar)) counts[headChar] += 1;
    }

    var delimiter = ',';
    if (counts[';'] > counts[delimiter]) delimiter = ';';
    if (counts['\t'] > counts[delimiter]) delimiter = '\t';

    var rows = [];
    var row = [];
    var field = '';
    var insideQuotes = false;

    for (var index = 0; index < text.length; index += 1) {
      var character = text.charAt(index);

      if (insideQuotes) {
        if (character === '"') {
          if (text.charAt(index + 1) === '"') { field += '"'; index += 1; }
          else insideQuotes = false;
        } else {
          field += character;
        }
        continue;
      }

      if (character === '"') insideQuotes = true;
      else if (character === delimiter) { row.push(field); field = ''; }
      else if (character === '\n') { row.push(field); field = ''; rows.push(row); row = []; }
      else if (character !== '\r') field += character;

      if (rows.length >= TRY_MAX_ROWS) return { rows: rows, delimiter: delimiter, truncated: true };
    }

    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    return { rows: rows, delimiter: delimiter, truncated: false };
  }

  function tryLooksLikeDate(value) {
    return /^\d{4}-\d{2}-\d{2}/.test(value) || /^\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}$/.test(value);
  }

  function tryLooksLikeNumber(value) {
    return /^[-+]?[\d,]*\.?\d+%?$/.test(value.replace(/[\u00a3$\u20ac\s]/g, ''));
  }

  function tryProfile(text, name) {
    var parsed = tryParseDelimited(text.replace(/^\uFEFF/, ''));
    var rows = parsed.rows;

    if (!rows.length || !rows[0].length) {
      trySetStatus('The sample export could not be read \u2014 that is a fault on our side, not yours.');
      return;
    }

    var headers = rows[0].map(function (value) { return String(value).trim(); });
    var body = rows.slice(1).filter(function (row) {
      return row.some(function (cell) { return String(cell).trim() !== ''; });
    });

    if (!body.length) {
      trySetStatus('The sample export has a header row but no data rows \u2014 a fault on our side, not yours.');
      return;
    }

    var mapped = 0;
    var fragment = document.createDocumentFragment();

    headers.forEach(function (header, column) {
      var values = [];
      var distinct = Object.create(null);
      var dateLike = 0;
      var numberLike = 0;

      body.forEach(function (row) {
        var value = String(row[column] == null ? '' : row[column]).trim();
        if (value === '') return;
        values.push(value);
        distinct[value] = true;
        if (tryLooksLikeDate(value)) dateLike += 1;
        else if (tryLooksLikeNumber(value)) numberLike += 1;
      });

      var seen = Object.keys(distinct).length;
      var filled = Math.round((values.length / body.length) * 100);
      var shape = 'Text';

      if (!values.length) shape = 'Empty';
      else if (dateLike / values.length >= 0.8) shape = 'Date';
      else if (numberLike / values.length >= 0.8) shape = 'Number';
      else if (seen < values.length && (seen <= 12 || seen / values.length <= 0.05)) shape = 'Category';
      else if (seen === values.length) shape = 'Unique values';

      var field = tryMatchField(header);
      if (field) mapped += 1;

      var tableRow = document.createElement('tr');

      var headCell = document.createElement('th');
      headCell.scope = 'row';
      headCell.textContent = header || '(no header)';

      var shapeCell = document.createElement('td');
      shapeCell.textContent = shape + ' \u00b7 ' + filled + '% filled';

      var mapCell = document.createElement('td');
      if (field) mapCell.className = 'try-map';
      mapCell.textContent = field || 'Unmapped';

      tableRow.appendChild(headCell);
      tableRow.appendChild(shapeCell);
      tableRow.appendChild(mapCell);
      fragment.appendChild(tableRow);
    });

    if (tryRows) {
      tryRows.textContent = '';
      tryRows.appendChild(fragment);
    }

    if (tryFacts) {
      var separator = parsed.delimiter === '\t' ? 'tab-separated'
        : parsed.delimiter === ';' ? 'semicolon-separated' : 'comma-separated';
      tryFacts.textContent = '';
      [
        body.length.toLocaleString('en-GB') + ' rows',
        headers.length + ' columns',
        separator,
        parsed.truncated ? 'first ' + TRY_MAX_ROWS.toLocaleString('en-GB') + ' rows profiled' : 'profiled in full'
      ].forEach(function (fact) {
        var item = document.createElement('li');
        item.textContent = fact;
        tryFacts.appendChild(item);
      });
    }

    if (tryName) tryName.textContent = name;

    if (tryVerdict) {
      var unmatched = headers.length - mapped;
      var lead = document.createElement('strong');
      lead.textContent = mapped + ' of ' + headers.length;
      tryVerdict.textContent = '';
      tryVerdict.appendChild(lead);
      tryVerdict.appendChild(document.createTextNode(
        ' columns match a field in the unified model' +
        (unmatched ? '; ' + unmatched + ' would become a decision in Client Setup.' : '.')
      ));
    }

    if (tryOutput) tryOutput.hidden = false;
    if (tryPlaceholder) tryPlaceholder.hidden = true;
    if (tryClear) tryClear.hidden = false;
    trySetStatus('Profiled ' + name + ' in this tab. Nothing was uploaded.');
  }

  function tryReset() {
    if (tryOutput) tryOutput.hidden = true;
    if (tryPlaceholder) tryPlaceholder.hidden = false;
    if (tryRows) tryRows.textContent = '';
    if (tryFacts) tryFacts.textContent = '';
    if (tryVerdict) tryVerdict.textContent = '';
    if (tryName) tryName.textContent = '\u2014';
    if (tryClear) tryClear.hidden = true;
    /* Leave the status line empty rather than repeating the placeholder's job:
       the frame coming back is the confirmation, and an empty live region is
       what a screen reader expects between announcements. */
    trySetStatus('');
  }

  if (trySample) {
    trySample.addEventListener('click', function () {
      tryProfile(TRY_SAMPLE, 'meridian-bank-headcount-sample.csv');
    });
  }

  if (tryClear) tryClear.addEventListener('click', tryReset);
})();

/* Contact: builds a draft in the visitor's own email program. Nothing is submitted to a server. */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var TO = 'helpstudios' + '@' + 'outlook.com';
  var status = document.getElementById('cf-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements; var bad = [];
    ['name', 'email'].forEach(function (k) {
      var el = f[k]; var ok = el.value.trim() && (k !== 'email' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim()));
      el.setAttribute('aria-invalid', ok ? 'false' : 'true'); if (!ok) bad.push(k);
    });
    if (bad.length) { status.textContent = 'Please add ' + (bad.length === 2 ? 'your name and a valid email' : bad[0] === 'name' ? 'your name' : 'a valid email') + ' so we can reply.'; (f[bad[0]]).focus(); return; }
    var type = f.type.value;
    var body = 'Enquiry: ' + type + '\r\nName: ' + f.name.value.trim() + '\r\nOrganisation: ' + f.org.value.trim() + '\r\nReply to: ' + f.email.value.trim() + '\r\n\r\n' + f.msg.value.trim();
    window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent('HR Intelligence — ' + type) + '&body=' + encodeURIComponent(body);
    status.textContent = 'A draft has opened in your email program. If nothing opened, your browser has no email program set up.';
  });
})();

/* Guided tour: tabs, back and next, arrow keys, and callout pins that highlight their note. Without JS every step is shown in turn. */
(function () {
  var root = document.getElementById('tour-app');
  if (!root) return;
  var tabs = Array.prototype.slice.call(root.querySelectorAll('.tour-tab'));
  var panels = Array.prototype.slice.call(root.querySelectorAll('.tour-panel'));
  var prev = document.getElementById('tour-prev');
  var next = document.getElementById('tour-next');
  if (!tabs.length || tabs.length !== panels.length) return;
  root.classList.add('tour-js');
  var at = 0;

  function show(i, focusTab) {
    at = Math.max(0, Math.min(tabs.length - 1, i));
    tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === at ? 'true' : 'false'); t.setAttribute('tabindex', k === at ? '0' : '-1'); });
    panels.forEach(function (p, k) { p.hidden = k !== at; });
    if (prev) prev.disabled = at === 0;
    if (next) { next.disabled = at === tabs.length - 1; next.textContent = at === tabs.length - 2 ? 'Last step' : 'Next step'; }
    if (focusTab) tabs[at].focus();
  }

  function light(panel, n, on) {
    Array.prototype.forEach.call(panel.querySelectorAll('[data-pin="' + n + '"]'), function (el) { el.classList.toggle('is-on', on); });
  }

  tabs.forEach(function (t, k) {
    t.addEventListener('click', function () { show(k, false); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(at + 1, true); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); show(at - 1, true); }
      else if (e.key === 'Home') { e.preventDefault(); show(0, true); }
      else if (e.key === 'End') { e.preventDefault(); show(tabs.length - 1, true); }
    });
  });
  if (prev) prev.addEventListener('click', function () { show(at - 1, false); });
  if (next) next.addEventListener('click', function () { show(at + 1, false); });
  panels.forEach(function (p) {
    Array.prototype.forEach.call(p.querySelectorAll('.tour-pin'), function (pin) {
      var n = pin.getAttribute('data-pin');
      ['mouseenter', 'focus'].forEach(function (ev) { pin.addEventListener(ev, function () { light(p, n, true); }); });
      ['mouseleave', 'blur'].forEach(function (ev) { pin.addEventListener(ev, function () { light(p, n, false); }); });
    });
    Array.prototype.forEach.call(p.querySelectorAll('.tour-notes li'), function (li) {
      var n = li.getAttribute('data-pin');
      li.addEventListener('mouseenter', function () { light(p, n, true); });
      li.addEventListener('mouseleave', function () { light(p, n, false); });
    });
  });
  show(0, false);
})();
