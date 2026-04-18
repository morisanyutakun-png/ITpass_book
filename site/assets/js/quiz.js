// ==============================================
// テーマ別練習問題エンジン
// - data/quiz.json を読み込み、4 択で出題
// - 分野フィルタ対応（QRコードのパラメータにも対応）
// - 回答後に正誤・解説・誤答分析を表示
// - スコアをローカル集計
// ==============================================

const state = {
  questions: [],
  filtered: [],
  order: [],
  index: 0,
  answered: false,
  score: 0,
  category: "all",
};

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function el(sel) {
  return document.querySelector(sel);
}

function renderQuestion() {
  const q = state.filtered[state.order[state.index]];
  if (!q) return renderResult();

  state.answered = false;

  const levelLabel = q.level === "basic" ? "基礎"
    : q.level === "trick" ? "ひっかけ"
    : "標準";
  const levelClass = q.level === "basic" ? "is-correct"
    : q.level === "trick" ? "is-wrong"
    : "";

  el("#quiz-root").innerHTML = `
    <div class="quiz">
      <div class="quiz__meta">
        <span>問題 ${state.index + 1} / ${state.order.length}</span>
        <span>分野: ${q.category || "総合"}</span>
        ${q.level ? `<span class="${levelClass}" style="font-size:0.82rem;padding:2px 6px;border-radius:4px;">${levelLabel}</span>` : ""}
      </div>
      <p class="quiz__question">${escapeHTML(q.question)}</p>
      <ul class="quiz__choices" id="quiz-choices">
        ${q.choices
          .map(
            (c, i) => `
          <li>
            <button class="quiz__choice" data-idx="${i}">${String.fromCharCode(65 + i)}. ${escapeHTML(c)}</button>
          </li>`,
          )
          .join("")}
      </ul>
      <div class="quiz__explanation" id="quiz-explanation"></div>
      <div class="quiz__wrong-analysis" id="quiz-wrong-analysis"></div>
      <div class="quiz__controls">
        <span id="quiz-status" style="color:var(--color-muted);font-size:0.9rem;">選択肢を選んでください。</span>
        <button class="btn" id="quiz-next" disabled>次の問題へ</button>
      </div>
    </div>
  `;

  document.querySelectorAll(".quiz__choice").forEach((btn) => {
    btn.addEventListener("click", onAnswer);
  });
  el("#quiz-next").addEventListener("click", () => {
    state.index += 1;
    if (state.index >= state.order.length) {
      renderResult();
    } else {
      renderQuestion();
    }
  });
}

function onAnswer(e) {
  if (state.answered) return;
  state.answered = true;
  const q = state.filtered[state.order[state.index]];
  const chosen = Number(e.currentTarget.dataset.idx);
  const correct = q.answer;

  document.querySelectorAll(".quiz__choice").forEach((btn, i) => {
    btn.setAttribute("disabled", "true");
    if (i === correct) btn.classList.add("is-correct");
    else if (i === chosen) btn.classList.add("is-wrong");
  });

  const isCorrect = chosen === correct;
  if (isCorrect) state.score += 1;

  el("#quiz-status").textContent = isCorrect
    ? "正解！ 解説も確認しましょう。"
    : "残念、正解は " + String.fromCharCode(65 + correct) + " です。";

  const exp = el("#quiz-explanation");
  exp.classList.add("is-visible");
  exp.innerHTML = `<strong>解説</strong><br>${escapeHTML(q.explanation || "")}`;

  // 誤答分析があれば表示
  if (q.wrong_analysis) {
    const wa = el("#quiz-wrong-analysis");
    wa.classList.add("is-visible");
    wa.innerHTML = `<strong>なぜ他の選択肢はダメ？</strong><br>${escapeHTML(q.wrong_analysis)}`;
  }

  el("#quiz-next").removeAttribute("disabled");
}

function renderResult() {
  const total = state.order.length;
  const rate = total === 0 ? 0 : Math.round((state.score / total) * 100);
  const comment =
    rate >= 80
      ? "合格ラインに十分手が届きそうです。"
      : rate >= 60
      ? "もう一歩。間違えたテーマに戻って復習しましょう。"
      : "基礎を固め直しましょう。本書の左ページを先に読み直すのがおすすめです。";
  el("#quiz-root").innerHTML = `
    <div class="quiz quiz__result">
      <h3>お疲れさまでした</h3>
      <div class="quiz__score">${state.score} / ${total}</div>
      <p>正答率: ${rate}%</p>
      <p style="color:var(--color-muted)">${comment}</p>
      <div style="margin-top:16px;display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
        <button class="btn" id="quiz-restart">もう一度挑戦する</button>
        <a class="btn btn--ghost" href="index.html">トップに戻る</a>
      </div>
    </div>
  `;
  el("#quiz-restart").addEventListener("click", () => {
    startQuiz();
  });
}

function applyFilter(category) {
  state.category = category;
  if (category === "all") {
    state.filtered = state.questions;
  } else {
    state.filtered = state.questions.filter(q => q.category === category);
  }
}

function startQuiz() {
  applyFilter(state.category);
  state.order = shuffle([...Array(state.filtered.length).keys()]);
  state.index = 0;
  state.score = 0;
  if (state.filtered.length === 0) {
    el("#quiz-root").innerHTML = '<p style="color:var(--color-muted)">この分野の問題はまだ用意されていません。</p>';
    return;
  }
  renderQuestion();
}

function escapeHTML(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function setupFilters() {
  const filterContainer = el("#quiz-filter");
  if (!filterContainer) return;

  filterContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;

    filterContainer.querySelectorAll(".quiz-filter__btn").forEach(b => {
      b.classList.remove("is-active");
      b.classList.add("btn--ghost");
    });
    btn.classList.add("is-active");
    btn.classList.remove("btn--ghost");

    state.category = btn.dataset.category;
    startQuiz();
  });
}

function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const ch = params.get("ch");
  if (ch) {
    const categoryMap = {
      "1": "all",
      "2": "ストラテジ",
      "3": "マネジメント",
      "4": "テクノロジ",
      "5": "横断",
      "6": "all",
    };
    state.category = categoryMap[ch] || "all";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const mount = el("#quiz-root");
  if (!mount) return;

  parseUrlParams();
  setupFilters();

  try {
    const data = await fetchJSON("data/quiz.json");
    state.questions = Array.isArray(data.questions) ? data.questions : [];
    if (state.questions.length === 0) {
      mount.innerHTML = '<p style="color:var(--color-muted)">練習問題がまだ用意されていません。</p>';
      return;
    }
    startQuiz();
  } catch (err) {
    console.error(err);
    mount.innerHTML = `<p style="color:var(--color-alert)">問題データの読み込みに失敗しました: ${escapeHTML(
      err.message,
    )}</p>`;
  }
});
