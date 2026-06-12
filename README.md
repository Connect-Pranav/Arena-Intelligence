# Arena Intelligence

**AI-powered competitive intelligence dashboard for enterprise brands.**

Enter any brand + category → Arena researches the entire competitive landscape in seconds. Global, national, state, and city-level breakdowns. Board-ready output for VP and C-suite.

## Live demo

[**→ Launch Arena Intelligence**](https://your-username.github.io/arena-intelligence)

## What it does

- **Any brand, any category** — Nike/Running shoes, Dell/Laptops, Coca-Cola/Beverages, Samsung/Smartphones, and thousands more
- **8 geographic scopes** — Global, North America, Europe, Asia Pacific, India, USA States, Latin America, MEA
- **AI-generated intelligence** — Competitor share, market size, growth rate, 8-quarter trend charts, geographic momentum signals, strategic insights (threats, opportunities, trends)
- **Board-ready output** — Structured for VP and C-suite consumption. Export to PDF with one click.

## Setup

### 1. Get an Anthropic API key
- Sign up at [console.anthropic.com](https://console.anthropic.com)
- Create an API key under API Keys

### 2. Deploy to GitHub Pages
```bash
# Fork or clone this repo
git clone https://github.com/your-username/arena-intelligence.git
cd arena-intelligence

# Push to GitHub
git add .
git commit -m "Initial deploy"
git push origin main
```

Then go to **Settings → Pages → Source: Deploy from branch → main → / (root)** → Save.

Your dashboard will be live at `https://your-username.github.io/arena-intelligence`

### 3. Use the dashboard
1. Click **Launch your dashboard** or click any example chip (Nike, Dell, Coca-Cola, Samsung)
2. Enter your brand and category
3. Select geographic scope
4. Paste your Anthropic API key (stored locally in your browser, never sent anywhere else)
5. Click **Generate intelligence**

## Files

```
arena-intelligence/
├── index.html     # App shell + landing page + setup modal
├── style.css      # Full design system
├── app.js         # API integration + chart rendering
└── README.md
```

## Tech stack

- Vanilla JS (no framework — works on any static host)
- Chart.js 4.4 — trend lines, donut, bar charts
- Anthropic Claude Sonnet — competitive intelligence generation
- GitHub Pages — free hosting

## Customisation

**Add more geographies:** Edit the `geo-grid` in `index.html` and update the `buildPrompt` function in `app.js`.

**Change the AI model:** Edit `claude-sonnet-4-20250514` in `app.js` → `runAnalysis()`.

**Add more KPIs:** Extend the JSON schema in `buildPrompt()` and add a `kpiCard()` call in `renderDashboard()`.

## License

MIT — use, modify, and deploy freely.
