// UC San Diego Acronym Glossary — page logic.
// The data lives in data/*.js; this file only searches and renders it.

(function () {
  // GitHub repository URL (no trailing "/"). When empty, the "edit" and
  // "suggest" links are hidden.
  var REPO_URL = "https://github.com/md-ap/ucsd-acronym-glossary";
  var REPO_BRANCH = "main";

  var G = window.GLOSSARY;
  var state = {
    view: readPref("view") || "sections",
    query: new URLSearchParams(location.search).get("q") || ""
  };

  var searchEl = document.getElementById("search");
  var countEl = document.getElementById("count");
  var tocEl = document.getElementById("toc");
  var resultsEl = document.getElementById("results");
  var toTopEl = document.getElementById("to-top");

  function readPref(key) {
    try { return localStorage.getItem("glossary-" + key); } catch (e) { return null; }
  }

  function writePref(key, value) {
    try { localStorage.setItem("glossary-" + key, value); } catch (e) { /* storage unavailable */ }
  }

  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function slug(s) {
    return norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function externalLink(cls, text, href) {
    var a = el("a", cls, text + " ↗");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    return a;
  }

  // ---------- Data preparation ----------

  var sectionById = {};
  G.sections.forEach(function (s, i) {
    s.index = i + 1;
    sectionById[s.id] = s;
  });

  var usedIds = {};
  G.entries.forEach(function (e) {
    var base = "e-" + e.section + "-" + slug(e.acronym);
    var id = base, n = 2;
    while (usedIds[id]) id = base + "-" + n++;
    usedIds[id] = true;
    e.id = id;
    e._acr = norm(e.acronym);
    e._name = norm(e.name);
    e._text = norm([e.parent, e.description, e.note].join(" "));
  });

  function score(e, q) {
    if (e._acr === q) return 0;
    if (e._acr.indexOf(q) === 0) return 1;
    if (e._acr.indexOf(q) > 0) return 2;
    // 1–2 letter queries: acronyms and word starts in the name only, so "TA"
    // does not return half the glossary.
    if (q.length < 3) return (" " + e._name).indexOf(" " + q) >= 0 ? 3 : -1;
    if (e._name.indexOf(q) >= 0) return 3;
    if (e._text.indexOf(q) >= 0) return 4;
    return -1;
  }

  function byAcronym(a, b) {
    return a.acronym.localeCompare(b.acronym, "en", { sensitivity: "base", numeric: true });
  }

  // ---------- Rendering ----------

  function highlight(node, text, q) {
    if (!q) { node.textContent = text; return; }
    var plain = norm(text);
    // norm() can change the length (e.g. "ı"); skip highlighting in that case.
    var i = plain.length === text.length ? plain.indexOf(q) : -1;
    if (i < 0) { node.textContent = text; return; }
    node.appendChild(document.createTextNode(text.slice(0, i)));
    node.appendChild(el("mark", null, text.slice(i, i + q.length)));
    node.appendChild(document.createTextNode(text.slice(i + q.length)));
  }

  function entryNode(e, q, showSection) {
    var art = el("article", "entry");
    art.id = e.id;

    var acr = el("a", "acr");
    acr.href = "#" + e.id;
    highlight(acr, e.acronym, q);
    art.appendChild(acr);

    var body = el("div", "body");
    var name = el("h4", "name");
    highlight(name, e.name, q);
    if (e.parent) name.appendChild(el("span", "parent", " · " + e.parent));
    body.appendChild(name);

    if (e.description) body.appendChild(el("p", "desc", e.description));

    var meta = el("p", "meta");
    if (showSection) meta.appendChild(el("span", "where", sectionById[e.section].title));
    if (e.note) meta.appendChild(el("span", "note", "Note: " + e.note));
    if (e.url) meta.appendChild(externalLink("src", "Source", e.url));
    if (e.verified === false) {
      var badge = el("span", "badge", "unverified");
      badge.title = "Could not be confirmed on an official page; double-check before relying on it.";
      meta.appendChild(badge);
    }
    if (meta.childNodes.length) body.appendChild(meta);

    art.appendChild(body);
    return art;
  }

  function tocList(items, letters) {
    tocEl.textContent = "";
    tocEl.className = letters ? "toc letters" : "toc";
    var ol = el("ol");
    items.forEach(function (item) {
      var li = el("li");
      var a = el("a");
      a.href = "#" + item.id;
      a.appendChild(el("span", null, item.label));
      if (item.count != null) a.appendChild(el("span", "n", String(item.count)));
      li.appendChild(a);
      ol.appendChild(li);
    });
    tocEl.appendChild(ol);
  }

  function renderSections() {
    var toc = [];
    G.sections.forEach(function (s) {
      var entries = G.entries.filter(function (e) { return e.section === s.id; });
      if (!entries.length) return;
      toc.push({ id: "s-" + s.id, label: s.title, count: entries.length });

      var sec = el("section", "section");
      sec.id = "s-" + s.id;
      var h2 = el("h2");
      h2.appendChild(el("span", "num", String(s.index).padStart(2, "0")));
      h2.appendChild(document.createTextNode(s.title));
      sec.appendChild(h2);
      if (s.intro) sec.appendChild(el("p", "section-intro", s.intro));
      if (REPO_URL && s.file) {
        sec.appendChild(externalLink("section-edit", "Edit this section on GitHub",
          REPO_URL + "/edit/" + REPO_BRANCH + "/data/" + s.file));
      }

      var groups = (s.groups || []).slice();
      var known = {};
      groups.forEach(function (g) { known[g.id] = true; });
      if (entries.some(function (e) { return !known[e.group]; })) {
        groups.push({ id: null, title: "Other" });
      }
      groups.forEach(function (g) {
        var list = entries.filter(function (e) {
          return g.id === null ? !known[e.group] : e.group === g.id;
        }).sort(byAcronym);
        if (!list.length) return;
        if (groups.length > 1) sec.appendChild(el("h3", "group-title", g.title));
        list.forEach(function (e) { sec.appendChild(entryNode(e, "", false)); });
      });
      resultsEl.appendChild(sec);
    });
    tocList(toc, false);
  }

  function renderAZ() {
    var buckets = {};
    G.entries.slice().sort(byAcronym).forEach(function (e) {
      var c = e._acr.charAt(0).toUpperCase();
      if (!/[A-Z]/.test(c)) c = "#";
      (buckets[c] = buckets[c] || []).push(e);
    });
    var letters = Object.keys(buckets).sort();
    letters.forEach(function (c) {
      var sec = el("section", "section");
      sec.id = "l-" + (c === "#" ? "num" : c);
      sec.appendChild(el("h2", null, c));
      buckets[c].forEach(function (e) { sec.appendChild(entryNode(e, "", true)); });
      resultsEl.appendChild(sec);
    });
    tocList(letters.map(function (c) {
      return { id: "l-" + (c === "#" ? "num" : c), label: c };
    }), true);
  }

  function renderSearch(q) {
    var hits = [];
    G.entries.forEach(function (e) {
      var s = score(e, q);
      if (s >= 0) hits.push({ e: e, s: s });
    });
    hits.sort(function (a, b) { return a.s - b.s || byAcronym(a.e, b.e); });

    tocEl.textContent = "";
    tocEl.className = "toc";
    if (!hits.length) {
      resultsEl.appendChild(el("p", "empty", "No results. Missing an acronym? Help add it."));
      return 0;
    }
    var sec = el("section", "section");
    sec.appendChild(el("h2", null, "Results"));
    hits.forEach(function (h) { sec.appendChild(entryNode(h.e, q, true)); });
    resultsEl.appendChild(sec);
    return hits.length;
  }

  function render() {
    document.querySelectorAll("[data-view]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-view") === state.view));
    });

    resultsEl.textContent = "";
    var q = norm(state.query.trim());
    var total = G.entries.length;
    var shown = total;
    if (q) shown = renderSearch(q);
    else if (state.view === "az") renderAZ();
    else renderSections();
    countEl.textContent = shown === total ? total + " entries" : shown + " of " + total + " entries";
  }

  function goToHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var target = document.getElementById(id);
    if (!target && state.query) {
      // The link points to an entry hidden by the current search.
      state.query = "";
      searchEl.value = "";
      render();
      target = document.getElementById(id);
    }
    if (target) target.scrollIntoView();
  }

  // ---------- Events ----------

  if (REPO_URL) {
    document.getElementById("contribute").appendChild(
      externalLink(null, "Suggest an acronym or a correction on GitHub", REPO_URL + "/issues/new"));
  }

  searchEl.value = state.query;
  searchEl.addEventListener("input", function () {
    state.query = searchEl.value;
    var url = new URL(location.href);
    if (state.query.trim()) url.searchParams.set("q", state.query.trim());
    else url.searchParams.delete("q");
    url.hash = "";
    history.replaceState(null, "", url);
    render();
  });

  document.addEventListener("click", function (ev) {
    var btn = ev.target.closest("[data-view]");
    if (!btn) return;
    state.view = btn.getAttribute("data-view");
    writePref("view", state.view);
    render();
  });

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "/" && document.activeElement !== searchEl) {
      ev.preventDefault();
      searchEl.focus();
    } else if (ev.key === "Escape" && document.activeElement === searchEl && searchEl.value) {
      searchEl.value = "";
      searchEl.dispatchEvent(new Event("input"));
    }
  });

  function updateToTop() {
    toTopEl.hidden = window.scrollY < 600;
  }

  toTopEl.addEventListener("click", function () {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
  window.addEventListener("scroll", updateToTop, { passive: true });
  window.addEventListener("hashchange", goToHash);

  render();
  goToHash();
  updateToTop();
})();
