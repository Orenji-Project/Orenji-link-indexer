const apps = [
  {
    name: "Orenji Fitness",
    tagline: "Treinos e progresso",
    bannerTitle: "Fitness",
    logo: "assets/fitness-logo.png",
    url: "https://orenji-project.github.io/orenji-fitness-app/",
    accent: "#f59a23",
    accentSoft: "#fff1df",
    description:
      "App para organizar treinos, acompanhar progresso semanal, consultar catalogo de exercicios, registar historico e ajustar preferencias visuais.",
  },
  {
    name: "Orenji Study",
    tagline: "Estudo organizado",
    bannerTitle: "Study",
    logo: "assets/study-logo.png",
    url: "https://orenji-project.github.io/Orenji-Study/",
    accent: "#6f9447",
    accentSoft: "#eef6e8",
    description:
      "Espaco de estudo com dashboard, horario, notas, tarefas, calendario e configuracoes para manter a rotina academica mais clara.",
  },
  {
    name: "Orenji Recipes",
    tagline: "Receitas e cozinha",
    bannerTitle: "Recipes",
    logo: "assets/recipes-logo.png",
    url: "https://orenji-project.github.io/Orenji-Recipes/",
    accent: "#e77923",
    accentSoft: "#fff0e4",
    description:
      "App de receitas com pesquisa, favoritos, detalhe de receita e modo cozinha para seguir preparacoes sem perder o ritmo.",
  },
  {
    name: "Orenji Focus",
    tagline: "Foco e tempo",
    bannerTitle: "Focus",
    logo: "assets/focus-logo.png",
    url: "https://orenji-project.github.io/Orenji-Focus/",
    accent: "#4f8f69",
    accentSoft: "#eaf6ef",
    description:
      "Ferramenta de produtividade com timer, metodos de foco, sessoes, tarefas e configuracoes guardadas localmente.",
  },
  {
    name: "Orenji Habit",
    tagline: "Habitos diarios",
    bannerTitle: "Habit",
    logo: "assets/habit-logo.png",
    url: "https://orenji-project.github.io/Orenji-Habit/",
    accent: "#d9822b",
    accentSoft: "#fff3e6",
    description:
      "App para acompanhar habitos, streaks, consistencia diaria, rotinas pessoais e pequenas vitorias ao longo da semana.",
  },
];

const appList = document.querySelector("[data-app-list]");
const template = document.querySelector("#app-card-template");

loadApps();

async function loadApps() {
  renderApps(await getAppsWithConfiguredLinks());
}

async function getAppsWithConfiguredLinks() {
  try {
    const response = await fetch(`links.json?v=${Date.now()}`, { cache: "no-store" });

    if (!response.ok) {
      return apps;
    }

    const data = await response.json();
    const urlsByName = new Map(
      (data.links ?? [])
        .filter(({ name, url }) => typeof name === "string" && typeof url === "string" && url)
        .map(({ name, url }) => [name, url])
    );

    if (!urlsByName.size) {
      return apps;
    }

    return apps.map((app) => ({
      ...app,
      url: urlsByName.get(app.name) ?? app.url,
    }));
  } catch (error) {
    console.warn("Nao foi possivel carregar links.json.", error);
    return apps;
  }
}

function renderApps(appsToRender) {
  appList.replaceChildren(...appsToRender.map(createCard));
}

function createCard(app, index) {
  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector(".app-card");
  const toggle = fragment.querySelector("[data-card-toggle]");
  const banner = fragment.querySelector("[data-banner]");
  const logo = fragment.querySelector("[data-logo]");
  const name = fragment.querySelector("[data-name]");
  const tagline = fragment.querySelector("[data-tagline]");
  const bannerTitle = fragment.querySelector("[data-banner-title]");
  const description = fragment.querySelector("[data-description]");
  const link = fragment.querySelector("[data-url]");
  const details = fragment.querySelector("[data-card-details]");
  const detailsId = `app-details-${index}`;

  card.dataset.expanded = "false";
  banner.style.setProperty("--accent", app.accent);
  banner.style.setProperty("--accent-soft", app.accentSoft);
  logo.src = app.logo;
  logo.alt = `${app.name} logo`;
  name.textContent = app.name;
  tagline.textContent = app.tagline;
  bannerTitle.textContent = app.bannerTitle;
  description.textContent = app.description;
  link.href = app.url;
  details.id = detailsId;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", detailsId);
  toggle.setAttribute("aria-label", `Ver detalhes de ${app.name}`);

  toggle.addEventListener("click", () => {
    const expanded = card.dataset.expanded === "true";
    const nextExpanded = !expanded;

    if (nextExpanded) {
      appList.querySelectorAll(".app-card").forEach((otherCard) => {
        otherCard.dataset.expanded = "false";
        otherCard.querySelector("[data-card-toggle]")?.setAttribute("aria-expanded", "false");
      });
    }

    card.dataset.expanded = String(nextExpanded);
    toggle.setAttribute("aria-expanded", String(nextExpanded));
  });

  return fragment;
}
