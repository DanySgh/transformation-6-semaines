"use strict";

const STORAGE_KEY = "t6s_data";
const DAYS_ORDER = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const DAY_LABELS = { lundi: "Lundi", mardi: "Mardi", mercredi: "Mercredi", jeudi: "Jeudi", vendredi: "Vendredi", samedi: "Samedi", dimanche: "Dimanche" };

const TRAINING = {
  lundi: {
    title: "Haut du corps Push + Abdos",
    exercises: [
      "Échauffement 8 min marche inclinée",
      "Développé couché machine ou haltères : 4 x 8-12",
      "Développé incliné machine ou haltères : 4 x 8-12",
      "Pec deck : 3 x 12-15",
      "Développé épaules machine : 3 x 8-12",
      "Élévations latérales : 4 x 12-20",
      "Triceps corde : 4 x 10-15",
      "Gainage : 3 x 45 sec",
      "Crunch machine ou câble : 4 x 12-20",
      "Finisher : 15 min marche inclinée"
    ]
  },
  mardi: {
    title: "Dos + Bras + Cardio",
    exercises: [
      "Échauffement 8 min rameur ou marche",
      "Tirage vertical : 4 x 8-12",
      "Rowing assis : 4 x 8-12",
      "Tirage horizontal prise neutre : 3 x 10-12",
      "Face pull : 3 x 15-20",
      "Curl biceps haltères : 3 x 10-12",
      "Curl pupitre ou machine : 3 x 10-12",
      "Relevés de jambes : 4 x 10-15",
      "Finisher : 20 min marche inclinée"
    ]
  },
  jeudi: {
    title: "Jambes + Ventre",
    exercises: [
      "Échauffement 10 min vélo",
      "Presse à cuisses : 4 x 10-15",
      "Leg extension : 3 x 12-15",
      "Leg curl : 4 x 10-15",
      "Fentes marchées ou guidées : 3 x 10 par jambe",
      "Mollets : 4 x 12-20",
      "Crunch machine : 4 x 12-20",
      "Relevés de jambes : 4 x 10-15",
      "Gainage côté gauche : 3 x 30 sec",
      "Gainage côté droit : 3 x 30 sec",
      "Finisher : 15 min marche inclinée"
    ]
  },
  dimanche: {
    title: "Full Body + Perte de gras",
    exercises: [
      "Échauffement 8 min marche inclinée",
      "Développé incliné : 4 x 8-12",
      "Tirage vertical : 4 x 8-12",
      "Presse à cuisses : 4 x 10-15",
      "Rowing assis : 3 x 10-12",
      "Élévations latérales : 4 x 12-20",
      "Pec deck : 3 x 12-15",
      "Triceps corde : 3 x 12-15",
      "Curl biceps : 3 x 12-15",
      "Abdos au choix : 10 min",
      "Finisher : 20 min marche inclinée"
    ]
  }
};

const REST = {
  mercredi: {
    title: "Mercredi — repos actif",
    items: [
      "8 000 à 10 000 pas",
      "Marche 15 à 20 min après le repas du soir",
      "Alimentation stricte",
      "Eau 2 L minimum",
      "Étirements 10 min",
      "Pas de grignotage"
    ]
  },
  vendredi: {
    title: "Vendredi — repos actif + pesée",
    items: [
      "Pesée matin à jeun",
      "8 000 à 10 000 pas",
      "Alimentation stricte",
      "Marche 20 min le soir",
      "Eau 2 L minimum",
      "Pas de sauce grasse"
    ]
  },
  samedi: {
    title: "Samedi — repos actif",
    items: [
      "10 000 pas si possible",
      "Alimentation stricte",
      "Repas plaisir autorisé uniquement si semaine respectée",
      "Pas de journée cheat",
      "Eau 2 L minimum",
      "Sommeil propre"
    ]
  }
};

const GENERIC_CHECKLIST = [
  { id: "pas", label: "Pas du jour (objectif 8 000, idéal 10 000)" },
  { id: "alimentation", label: "Alimentation respectée" },
  { id: "eau", label: "Eau (2 L minimum)" },
  { id: "seance", label: "Séance réalisée (si prévue)" },
  { id: "cardio", label: "Cardio / marche" },
  { id: "sommeil", label: "Sommeil correct" },
  { id: "grignotage", label: "Aucun grignotage" }
];

const NUTRITION = {
  matin: {
    title: "Matin",
    items: [
      { id: "cafe", label: "Café" },
      { id: "proteine", label: "Skyr / fromage blanc 0% ou whey si faim" },
      { id: "grignotage", label: "Pas de grignotage" }
    ]
  },
  midi: {
    title: "Midi",
    items: [
      { id: "proteine", label: "150 à 200 g protéine (poulet, steak 5%, thon, œufs, poisson)" },
      { id: "feculent", label: "120 à 180 g riz/pâtes cuits, ou 250 g pommes de terre" },
      { id: "sauce", label: "Sauce légère uniquement (tomate, moutarde, épices, soja light, fromage blanc 0%)" },
      { id: "pas_creme", label: "Pas de crème" },
      { id: "pas_mayo", label: "Pas de mayo" },
      { id: "pas_fromage", label: "Pas de fromage fondu" },
      { id: "eau", label: "Eau" }
    ]
  },
  collation: {
    title: "Collation si faim",
    optional: true,
    items: [
      { id: "skyr", label: "Skyr / fromage blanc 0%" },
      { id: "whey", label: "Whey dans l'eau" },
      { id: "oeufs", label: "2 œufs durs" },
      { id: "thon", label: "Thon nature" },
      { id: "pas_biscuits", label: "Pas de biscuits" },
      { id: "pas_chocolat", label: "Pas de chocolat" },
      { id: "pas_chips", label: "Pas de chips" }
    ]
  },
  soir: {
    title: "Soir",
    items: [
      { id: "proteine", label: "180 à 220 g protéine" },
      { id: "feculent", label: "Petite portion féculent si entraînement (80-120 g), sinon peu/pas de féculents" },
      { id: "sauce", label: "Sauce légère uniquement" },
      { id: "eau", label: "Eau" }
    ]
  },
  regles: {
    title: "Règles quotidiennes",
    items: [
      { id: "zero_soda", label: "Zéro soda" },
      { id: "zero_jus", label: "Zéro jus" },
      { id: "zero_alcool", label: "Zéro alcool" },
      { id: "pas_grignotage", label: "Pas de grignotage" },
      { id: "eau_2l", label: "2 L d'eau minimum" },
      { id: "proteines_repas", label: "Protéines à chaque repas" }
    ]
  }
};

const NUTRITION_ORDER = ["matin", "midi", "collation", "soir", "regles"];

const QUOTES = [
  "Ne cherche pas la perfection, coche le maximum aujourd'hui.",
  "Un repas raté ne ruine pas la semaine.",
  "8 000 pas minimum : c'est ton accélérateur de perte de gras.",
  "La régularité bat la motivation.",
  "Photo dimanche : juge l'évolution, pas seulement la balance."
];

function todayISO() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function mostRecentMondayISO() {
  const d = new Date();
  const dow = d.getDay();
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  d.setDate(d.getDate() + diffToMonday);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function defaultState() {
  return {
    settings: { startMonday: mostRecentMondayISO(), poidsDepart: null, poidsObjectif: null },
    days: {},
    weight: [],
    photos: {}
  };
}

let state = loadState();
let ui = { view: "home", selectedWeek: 1, selectedDay: "lundi" };

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed, {
      settings: Object.assign(defaultState().settings, parsed.settings || {})
    });
  } catch (e) {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function dayKey(week, dayName) {
  return "S" + week + "_" + dayName;
}

function getDay(week, dayName) {
  const key = dayKey(week, dayName);
  if (!state.days[key]) {
    state.days[key] = {
      generic: {},
      training: {},
      rest: {},
      nutrition: { matin: {}, midi: {}, collation: {}, soir: {}, regles: {} },
      notes: { energie: "", faim: "", difficulte: "", observation: "", libre: "" }
    };
  }
  const day = state.days[key];
  if (!day.nutrition) day.nutrition = { matin: {}, midi: {}, collation: {}, soir: {}, regles: {} };
  NUTRITION_ORDER.forEach((g) => { if (!day.nutrition[g]) day.nutrition[g] = {}; });
  if (!day.notes) day.notes = { energie: "", faim: "", difficulte: "", observation: "", libre: "" };
  return day;
}

function isTrainingDay(dayName) {
  return Object.prototype.hasOwnProperty.call(TRAINING, dayName);
}

function dayTotalItems(dayName) {
  const sportCount = isTrainingDay(dayName) ? TRAINING[dayName].exercises.length : REST[dayName].items.length;
  let nutritionCount = 0;
  NUTRITION_ORDER.forEach((g) => { if (!NUTRITION[g].optional) nutritionCount += NUTRITION[g].items.length; });
  return GENERIC_CHECKLIST.length + sportCount + nutritionCount;
}

function dayCheckedItems(week, dayName) {
  const day = getDay(week, dayName);
  let checked = 0;
  GENERIC_CHECKLIST.forEach((it) => { if (day.generic[it.id]) checked++; });
  const sportState = isTrainingDay(dayName) ? day.training : day.rest;
  Object.values(sportState).forEach((v) => { if (v) checked++; });
  NUTRITION_ORDER.forEach((g) => {
    if (NUTRITION[g].optional) return;
    NUTRITION[g].items.forEach((it) => { if (day.nutrition[g][it.id]) checked++; });
  });
  return checked;
}

function weekStats(week) {
  let checked = 0, total = 0;
  DAYS_ORDER.forEach((d) => {
    checked += dayCheckedItems(week, d);
    total += dayTotalItems(d);
  });
  return { checked, total, pct: total ? Math.round((checked / total) * 100) : 0 };
}

function globalStats() {
  let checked = 0, total = 0;
  for (let w = 1; w <= 6; w++) {
    const s = weekStats(w);
    checked += s.checked;
    total += s.total;
  }
  return { checked, total, pct: total ? Math.round((checked / total) * 100) : 0 };
}

function scoreClass(pct) {
  if (pct >= 85) return "score-green";
  if (pct >= 60) return "score-orange";
  return "score-red";
}

function getProgressInfo() {
  const start = new Date(state.settings.startMonday + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  const diffDays = Math.round((today - start) / 86400000);
  let week = Math.floor(diffDays / 7) + 1;
  let dayIdx = ((diffDays % 7) + 7) % 7;
  const outOfRange = week < 1 || week > 6;
  if (week < 1) { week = 1; dayIdx = 0; }
  if (week > 6) { week = 6; dayIdx = 6; }
  return { week, dayName: DAYS_ORDER[dayIdx], outOfRange, diffDays };
}

function navigateTo(view) {
  ui.view = view;
  document.querySelectorAll(".view").forEach((v) => v.classList.add("hidden"));
  document.getElementById("view-" + view).classList.remove("hidden");
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.nav === view));
  if (view === "home") renderHome();
  if (view === "day") renderDayView();
  if (view === "weeks") renderWeeksView();
  if (view === "weight") renderWeightView();
  if (view === "photos") renderPhotosView();
}

function renderHome() {
  document.getElementById("home-quote").textContent = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  const prog = getProgressInfo();
  document.getElementById("home-week").textContent = prog.week + " / 6";
  document.getElementById("home-day").textContent = DAY_LABELS[prog.dayName];
  const g = globalStats();
  document.getElementById("home-progress-fill").style.width = g.pct + "%";
  document.getElementById("home-progress-pct").textContent = g.pct + "%";
  document.getElementById("home-progress-count").textContent = g.checked + " / " + g.total + " cases";

  const depart = state.settings.poidsDepart;
  const objectif = state.settings.poidsObjectif;
  const actuel = currentWeight();
  document.getElementById("home-poids-depart").textContent = depart != null ? depart + " kg" : "–";
  document.getElementById("home-poids-actuel").textContent = actuel != null ? actuel + " kg" : "–";
  document.getElementById("home-poids-objectif").textContent = objectif != null ? objectif + " kg" : "–";

  document.getElementById("setting-start-date").value = state.settings.startMonday;
  document.getElementById("setting-poids-depart").value = depart != null ? depart : "";
  document.getElementById("setting-poids-objectif").value = objectif != null ? objectif : "";
}

function currentWeight() {
  if (!state.weight.length) return state.settings.poidsDepart;
  const sorted = [...state.weight].sort((a, b) => a.date.localeCompare(b.date));
  return sorted[sorted.length - 1].value;
}

function renderChecklistGroup(container, items, stateObj, onChange, optionalTag) {
  container.innerHTML = "";
  items.forEach((it) => {
    const row = document.createElement("div");
    row.className = "check-item" + (optionalTag ? " optional" : "");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = "chk-" + Math.random().toString(36).slice(2);
    cb.checked = !!stateObj[it.id];
    cb.addEventListener("change", () => { stateObj[it.id] = cb.checked; saveState(); onChange && onChange(); });
    const label = document.createElement("label");
    label.htmlFor = cb.id;
    label.textContent = it.label || it;
    if (optionalTag) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = "(facultatif)";
      label.appendChild(tag);
    }
    row.appendChild(cb);
    row.appendChild(label);
    container.appendChild(row);
  });
}

function renderDayView() {
  const prog = getProgressInfo();
  if (!ui.dayInitialized) {
    ui.selectedWeek = prog.week;
    ui.selectedDay = prog.dayName;
    ui.dayInitialized = true;
  }
  const week = ui.selectedWeek, dayName = ui.selectedDay;
  const day = getDay(week, dayName);

  document.getElementById("day-title").textContent = "Semaine " + week + " — " + DAY_LABELS[dayName];
  const isCurrent = week === prog.week && dayName === prog.dayName;
  document.getElementById("day-subtitle").textContent = isCurrent ? "Aujourd'hui" : "";

  const checked = dayCheckedItems(week, dayName);
  const total = dayTotalItems(dayName);
  const pct = total ? Math.round((checked / total) * 100) : 0;
  const badge = document.getElementById("day-score-badge");
  badge.textContent = pct + "%";
  badge.className = "score-badge " + scoreClass(pct);

  renderChecklistGroup(document.getElementById("day-generic-checklist"), GENERIC_CHECKLIST, day.generic, () => renderDayView());

  const trainingCard = document.getElementById("day-training-card");
  const restCard = document.getElementById("day-rest-card");
  if (isTrainingDay(dayName)) {
    trainingCard.classList.remove("hidden");
    restCard.classList.add("hidden");
    document.getElementById("day-training-title").textContent = "Séance — " + TRAINING[dayName].title;
    renderChecklistGroup(document.getElementById("day-training-checklist"),
      TRAINING[dayName].exercises.map((label, idx) => ({ id: "ex" + idx, label })),
      day.training, () => renderDayView());
  } else {
    restCard.classList.remove("hidden");
    trainingCard.classList.add("hidden");
    document.getElementById("day-rest-title").textContent = REST[dayName].title;
    renderChecklistGroup(document.getElementById("day-rest-checklist"),
      REST[dayName].items.map((label, idx) => ({ id: "r" + idx, label })),
      day.rest, () => renderDayView());
  }

  const nutritionContainer = document.getElementById("day-nutrition");
  nutritionContainer.innerHTML = "";
  NUTRITION_ORDER.forEach((g) => {
    const group = document.createElement("div");
    group.className = "nutrition-group";
    const h4 = document.createElement("h4");
    h4.textContent = NUTRITION[g].title + (NUTRITION[g].optional ? " (facultatif)" : "");
    group.appendChild(h4);
    const list = document.createElement("div");
    list.className = "checklist";
    group.appendChild(list);
    nutritionContainer.appendChild(group);
    renderChecklistGroup(list, NUTRITION[g].items, day.nutrition[g], () => renderDayView(), NUTRITION[g].optional);
  });

  document.getElementById("note-energie").value = day.notes.energie;
  document.getElementById("note-faim").value = day.notes.faim;
  document.getElementById("note-difficulte").value = day.notes.difficulte;
  document.getElementById("note-observation").value = day.notes.observation;
  document.getElementById("note-libre").value = day.notes.libre;
}

function shiftDay(delta) {
  let idx = DAYS_ORDER.indexOf(ui.selectedDay);
  let week = ui.selectedWeek;
  idx += delta;
  if (idx < 0) { idx = 6; week -= 1; }
  if (idx > 6) { idx = 0; week += 1; }
  if (week < 1) week = 1;
  if (week > 6) week = 6;
  ui.selectedWeek = week;
  ui.selectedDay = DAYS_ORDER[idx];
  renderDayView();
}

function renderWeeksView() {
  const container = document.getElementById("weeks-list");
  container.innerHTML = "";
  for (let w = 1; w <= 6; w++) {
    const stats = weekStats(w);
    const details = document.createElement("details");
    details.className = "week-card";
    const summary = document.createElement("summary");
    summary.innerHTML = "<span>Semaine " + w + "</span><span class='score-badge " + scoreClass(stats.pct) + "'>" + stats.pct + "%</span>";
    details.appendChild(summary);
    const daysWrap = document.createElement("div");
    daysWrap.className = "week-days";
    DAYS_ORDER.forEach((d) => {
      const checked = dayCheckedItems(w, d);
      const total = dayTotalItems(d);
      const pct = total ? Math.round((checked / total) * 100) : 0;
      const btn = document.createElement("button");
      btn.className = "week-day-row";
      const typeLabel = isTrainingDay(d) ? TRAINING[d].title : REST[d].title;
      btn.innerHTML = "<span>" + DAY_LABELS[d] + " — " + typeLabel + "</span><span class='score-badge " + scoreClass(pct) + "'>" + pct + "%</span>";
      btn.addEventListener("click", () => {
        ui.selectedWeek = w;
        ui.selectedDay = d;
        ui.dayInitialized = true;
        navigateTo("day");
      });
      daysWrap.appendChild(btn);
    });
    details.appendChild(daysWrap);
    container.appendChild(details);
  }
}

function renderWeightView() {
  const depart = state.settings.poidsDepart;
  const actuel = currentWeight();
  document.getElementById("weight-depart").textContent = depart != null ? depart + " kg" : "–";
  document.getElementById("weight-actuel").textContent = actuel != null ? actuel + " kg" : "–";
  let perteText = "–";
  if (depart != null && actuel != null) {
    const perte = Math.round((depart - actuel) * 10) / 10;
    perteText = perte + " kg";
  }
  document.getElementById("weight-perte").textContent = perteText;

  const objectif = state.settings.poidsObjectif;
  let message = "Ajoute ta première pesée pour suivre ta progression.";
  if (depart != null && actuel != null) {
    if (objectif != null && actuel <= objectif) {
      message = "Objectif atteint, bravo pour ta régularité !";
    } else if (actuel < depart) {
      message = "Tu progresses, continue comme ça.";
    } else if (actuel === depart) {
      message = "Stable pour l'instant, reste régulier sur les bases.";
    } else {
      message = "Garde le cap, la régularité bat la motivation.";
    }
  }
  document.getElementById("weight-message").textContent = message;

  document.getElementById("weight-date").value = todayISO();

  drawWeightChart();
  renderWeightHistory();
}

function renderWeightHistory() {
  const container = document.getElementById("weight-history");
  container.innerHTML = "";
  if (!state.weight.length) {
    container.innerHTML = "<p class='dim small'>Aucune pesée enregistrée.</p>";
    return;
  }
  const sorted = [...state.weight].sort((a, b) => b.date.localeCompare(a.date));
  sorted.forEach((entry) => {
    const row = document.createElement("div");
    row.className = "weight-entry";
    row.innerHTML = "<span>" + entry.date + "</span><span>" + entry.value + " kg</span>";
    container.appendChild(row);
  });
}

function drawWeightChart() {
  const canvas = document.getElementById("weight-chart");
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  const entries = [...state.weight].sort((a, b) => a.date.localeCompare(b.date));
  if (entries.length < 2) {
    ctx.fillStyle = "#8fa39a";
    ctx.font = "13px -apple-system, sans-serif";
    ctx.fillText("Ajoute au moins 2 pesées pour voir le graphique.", 10, h / 2);
    return;
  }
  const values = entries.map((e) => e.value);
  const min = Math.min(...values) - 1;
  const max = Math.max(...values) + 1;
  const padding = 24;
  const xStep = (w - padding * 2) / (entries.length - 1);
  const yScale = (h - padding * 2) / (max - min || 1);

  ctx.strokeStyle = "#233029";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, h - padding);
  ctx.lineTo(w - padding, h - padding);
  ctx.stroke();

  ctx.strokeStyle = "#2ecc71";
  ctx.lineWidth = 2;
  ctx.beginPath();
  entries.forEach((entry, i) => {
    const x = padding + i * xStep;
    const y = h - padding - (entry.value - min) * yScale;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = "#2ecc71";
  entries.forEach((entry, i) => {
    const x = padding + i * xStep;
    const y = h - padding - (entry.value - min) * yScale;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}

function renderPhotosView() {
  const container = document.getElementById("photos-list");
  container.innerHTML = "";
  for (let w = 1; w <= 6; w++) {
    if (!state.photos[w]) state.photos[w] = { taken: false, note: "" };
    const data = state.photos[w];
    const card = document.createElement("div");
    card.className = "photo-card";
    card.innerHTML = "<h4>Semaine " + w + "</h4>";
    const row = document.createElement("div");
    row.className = "photo-row";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = "photo-taken-" + w;
    cb.checked = !!data.taken;
    cb.addEventListener("change", () => { data.taken = cb.checked; saveState(); });
    const label = document.createElement("label");
    label.htmlFor = cb.id;
    label.textContent = "Photo prise";
    row.appendChild(cb);
    row.appendChild(label);
    card.appendChild(row);
    const note = document.createElement("textarea");
    note.rows = 2;
    note.placeholder = "Note pour cette semaine...";
    note.value = data.note || "";
    note.addEventListener("input", () => { data.note = note.value; saveState(); });
    card.appendChild(note);
    container.appendChild(card);
  }
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "t6s-data-" + todayISO() + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!parsed || typeof parsed !== "object") throw new Error("invalid");
      state = Object.assign(defaultState(), parsed, {
        settings: Object.assign(defaultState().settings, parsed.settings || {})
      });
      saveState();
      navigateTo(ui.view);
      alert("Données importées avec succès.");
    } catch (e) {
      alert("Fichier invalide, import annulé.");
    }
  };
  reader.readAsText(file);
}

function resetData() {
  if (!confirm("Réinitialiser toutes tes données ? Cette action est irréversible.")) return;
  if (!confirm("Confirme une dernière fois : tout sera supprimé définitivement.")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  ui = { view: "home", selectedWeek: 1, selectedDay: "lundi" };
  navigateTo("home");
}

function bindEvents() {
  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", () => navigateTo(el.dataset.nav));
  });

  document.getElementById("btn-reset").addEventListener("click", resetData);
  document.getElementById("day-prev").addEventListener("click", () => shiftDay(-1));
  document.getElementById("day-next").addEventListener("click", () => shiftDay(1));

  ["note-energie", "note-faim", "note-difficulte", "note-observation", "note-libre"].forEach((id) => {
    document.getElementById(id).addEventListener("input", (e) => {
      const day = getDay(ui.selectedWeek, ui.selectedDay);
      const field = id.replace("note-", "");
      day.notes[field] = e.target.value;
      saveState();
    });
  });

  document.getElementById("setting-start-date").addEventListener("change", (e) => {
    state.settings.startMonday = e.target.value;
    saveState();
    renderHome();
  });
  document.getElementById("setting-poids-depart").addEventListener("change", (e) => {
    state.settings.poidsDepart = e.target.value ? parseFloat(e.target.value) : null;
    saveState();
    renderHome();
  });
  document.getElementById("setting-poids-objectif").addEventListener("change", (e) => {
    state.settings.poidsObjectif = e.target.value ? parseFloat(e.target.value) : null;
    saveState();
    renderHome();
  });

  document.getElementById("btn-export").addEventListener("click", exportData);
  document.getElementById("btn-import").addEventListener("click", () => document.getElementById("input-import").click());
  document.getElementById("input-import").addEventListener("change", (e) => {
    if (e.target.files[0]) importData(e.target.files[0]);
    e.target.value = "";
  });

  document.getElementById("btn-add-weight").addEventListener("click", () => {
    const dateInput = document.getElementById("weight-date");
    const valueInput = document.getElementById("weight-value");
    const value = parseFloat(valueInput.value);
    if (!dateInput.value || isNaN(value)) {
      alert("Merci de renseigner une date et un poids valides.");
      return;
    }
    const existingIdx = state.weight.findIndex((w) => w.date === dateInput.value);
    if (existingIdx >= 0) state.weight[existingIdx].value = value;
    else state.weight.push({ date: dateInput.value, value });
    if (state.settings.poidsDepart == null) state.settings.poidsDepart = value;
    saveState();
    valueInput.value = "";
    renderWeightView();
  });

  document.getElementById("btn-settings").addEventListener("click", () => {
    const panel = document.getElementById("settings-panel");
    navigateTo("home");
    panel.open = true;
    panel.scrollIntoView({ behavior: "smooth" });
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  navigateTo("home");
  registerServiceWorker();
});
