# Developer Type Assessment

A psychological assessment that reveals developer instincts, trade-offs, and natural problem-solving styles.

## 🚀 Live Demo

Visit [https://ehsanpo.github.io/developertype/](https://ehsanpo.github.io/developertype/)

## 🧠 What This Is

This is **not** a skills test. It's a psychological assessment designed to reveal your instincts, default behaviors, and natural tendencies as a developer. Every question forces a trade-off - there are no objectively correct answers.

## ✨ Features

- 20 carefully designed questions
- 12 developer archetypes
- Primary + secondary type results
- Pattern insights and creative tensions
- Beautiful gradient UI
- Fully responsive

## 🛠️ Tech Stack

- React 18
- Vite
- React Router
- Pure CSS (no frameworks)

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Open [http://localhost:5173/developertype/](http://localhost:5173/developertype/)

## 🚢 Build

```bash
npm run build
```

## 🌐 Deploy to GitHub Pages

1. Update `base` in `vite.config.js` to match your repo name
2. Update the homepage URL in `README.md`
3. Run deployment:

```bash
npm run deploy
```

This will build the app and push to the `gh-pages` branch.

## 📂 Project Structure

```
/data
  questions.json      - 20 assessment questions
  archetypes.json     - 12 developer archetype definitions

/src
  /components
    Intro.jsx         - Landing page
    Assessment.jsx    - Question flow
    Results.jsx       - Results page
  /utils
    scoring.js        - Scoring engine
  App.jsx             - Router setup
  main.jsx            - Entry point
```

## 🎯 The 12 Archetypes

1. The Rewrite Everything
2. The Ship It
3. The Detective
4. The Craftsman
5. The Calm Senior
6. The Experimenter
7. The Glue Dev
8. The Grow the Junior
9. The Historian
10. The Architecture Astronaut
11. The AI-First Dev
12. The Comfort Zone Keeper

## 💡 Inspiration

This assessment was inspired by the article [The 12 Developer Mindsets I've Seen in My Career](https://dev.to/notadevbuthere/the-12-developer-mindsets-ive-seen-in-my-career-and-what-they-teach-us-about-building-software-42de) by [@notadevbuthere](https://dev.to/notadevbuthere). The archetypes and core concepts are based on real developer behaviors and patterns observed in software teams.

## 📝 License

MIT
