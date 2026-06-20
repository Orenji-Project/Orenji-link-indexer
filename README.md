# Orenji Apps

Pagina estatica para GitHub Pages com uma montra simples das apps do projecto Orenji.

O site apresenta apenas as apps:

- Orenji Fitness
- Orenji Study
- Orenji Recipes
- Orenji Focus
- Orenji Habit

Repositorios de suporte como Core, Styles, docs, assets e perfil da organizacao nao aparecem na pagina.

## Design

O visual foi simplificado e inspirado no logo da laranja do Orenji:

- fundo claro;
- laranja como cor principal;
- folha verde como acento;
- cards grandes com banner e logo da app;
- expansao ao clicar no card para revelar descricao e link.

Os logos usados pela pagina vivem em `assets/`.

## Atualizar apps

As apps estao definidas em `script.js`, no array `apps`.

Cada entrada segue este formato:

```js
{
  name: "Orenji Fitness",
  tagline: "Treinos e progresso",
  bannerTitle: "Fitness",
  logo: "assets/fitness-logo.png",
  url: "https://fallenmster19.github.io/fitnessapp/",
  accent: "#f59a23",
  accentSoft: "#fff1df",
  description: "Descricao curta da app."
}
```

`links.json` fica como inventario simples dos URLs principais, mas a interface e renderizada a partir de `script.js`.

## Publicar no GitHub Pages

1. Faz push deste repo para o GitHub.
2. Abre `Settings` > `Pages`.
3. Em `Build and deployment`, escolhe `Deploy from a branch`.
4. Seleciona a branch `main` e a pasta `/root`.
5. Guarda.

URL previsto:

```text
https://orenji-project.github.io/Orenji-link-indexer/
```

## Testar localmente

```powershell
python -m http.server 8000
```

Depois abre:

```text
http://localhost:8000
```
