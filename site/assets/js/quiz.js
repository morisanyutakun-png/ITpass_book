// ==============================================
// クライアントサイド確認テスト
// - data/quiz.json を読み込み、4 択で出題
// - 回答後に正誤と解説を表示し、次の問題へ
// - スコアをローカル集計
// ==============================================

const state = {
  questions: [],
  order: [],
  index: 0,
  answered: false,
  score: 0,
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
  const q = state.questions[state.order[state.index]];
  if (!q) return renderResult();

  state.answered = false;

  el("#quiz-root").innerHTML = `
    <div class="quiz">
      <div class="quiz__meta">
        <span>問題 ${state.index + 1} / ${state.order.length}</span>
        <span>分野: ${q.category || "総合"}</span>
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
  const q = state.questions[state.order[state.index]];
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
  exp.innerHTML = `<strong>解説</strong><br>${escapeHTML(q.explanation || "")}${
    q.source ? `<br><small style="color:var(--color-muted)">出典: ${escapeHTML(q.source)}</small>` : ""
  }`;

  el("#quiz-next").removeAttribute("disabled");
}

function renderResult() {
  const total = state.order.length;
  const rate = total === 0 ? 0 : Math.round((state.score / total) * 100);
  const comment =
    rate >= 80
      ? "合格ラインに十分手が届きそうです。"
      : rate >= 60
      ? "もう一歩。弱い分野を章末まとめで復習しましょう。"
      : "基礎にひと通り戻って、各章の「1 枚まとめ」を先に読み直しましょう。";
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

function startQuiz() {
  state.order = shuffle([...Array(state.questions.length).keys()]);
  state.index = 0;
  state.score = 0;
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

document.addEventListener("DOMContentLoaded", async () => {
  const mount = el("#quiz-root");
  if (!mount) return;
  try {
    const data = await fetchJSON("data/quiz.json");
    state.questions = Array.isArray(data.questions) ? data.questions : [];
    if (state.questions.length === 0) {
      mount.innerHTML = '<p style="color:var(--color-muted)">確認テストの問題データがまだ用意されていません。</p>';
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
