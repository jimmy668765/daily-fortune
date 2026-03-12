# 🔮 Daily Fortune — BaZi-Personalized Daily Horoscope

> Your birth chart, your daily calendar. Ancient Chinese astrology meets modern iCal.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)

## What is this?

**Daily Fortune** generates a personalized daily horoscope based on your [BaZi (八字)](https://en.wikipedia.org/wiki/Four_Pillars_of_Destiny) birth chart — the Chinese astrological system used for over 2,000 years. Instead of generic "Aries/Scorpio" predictions, it calculates the **Ten Gods (十神)** and **Life Stages (十二长生)** interaction between your Day Master and each calendar day, delivering actionable advice for business, health, and relationships.

The output? An **iCal subscription** that drops a personalized fortune into your Apple Calendar, Google Calendar, or Outlook — every single day.

## ✨ Features

- 🧮 **Real BaZi calculations** — powered by `lunar-javascript` for accurate Heavenly Stems & Earthly Branches
- 📅 **iCal/WebCal subscription** — one-click subscribe, auto-refreshes daily
- 🎯 **Three-dimensional advice** — each day covers: 💼 Business, ❤️ Health, 🤝 Social
- 🎨 **Energy-level mapping** — Ten Gods × Life Stages → High/Mid/Low energy copywriting
- 📱 **Mobile-first UI** — WeChat in-app browser detection with graceful fallback
- 🌏 **Cultural computing** — probably the only open-source BaZi calendar engine

## How it works

```
Birth date → Day Master (日主) extraction
                ↓
        For each calendar day:
          1. Calculate day's Heavenly Stem & Earthly Branch
          2. Derive Ten God (十神) relationship to your Day Master
          3. Map Earthly Branch to Life Stage (十二长生)
          4. Select copywriting by [Ten God × Energy Level]
                ↓
        Generate .ics feed → WebCal subscription
```

### The Ten Gods (十神) System

| Ten God | Energy | Theme |
|---------|--------|-------|
| 正官 (Direct Officer) | Structure | Compliance, authority, contracts |
| 正印 (Direct Resource) | Support | Learning, mentors, rest |
| 偏印 (Indirect Resource) | Intuition | Innovation, solitude, unconventional paths |
| 正财 (Direct Wealth) | Stability | Cash flow, savings, routine |
| 偏财 (Indirect Wealth) | Opportunity | Speculation, networking, windfalls |
| 食神 (Eating God) | Creation | Art, expression, leisure |
| 伤官 (Hurting Officer) | Disruption | Breaking rules, bold moves, risk |
| 比肩 (Friend) | Competition | Independence, rivalry, self-reliance |
| 劫财 (Rob Wealth) | Aggression | Hustle, spending, social pressure |
| 七杀 (Seven Killings) | Intensity | Pressure, breakthroughs, danger |

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/jimmy668765/daily-fortune.git
cd daily-fortune

# Install
npm install

# Run
npm run dev
```

Open `http://localhost:3000`, enter your birth date, and hit subscribe.

## 📡 API

### `GET /api/calendar/subscribe?birth=YYYY-MM-DD`

Returns an `.ics` calendar file with 365 days of personalized fortunes.

**Parameters:**
- `birth` (required): Your birth date in `YYYY-MM-DD` format

**Response:** `text/calendar` — compatible with any iCal client

**Example:**
```
webcal://your-domain.com/api/calendar/subscribe?birth=1990-07-15
```

## 🏗 Architecture

```
daily-fortune/
├── app/
│   ├── page.tsx              # Landing page (birth date input + subscribe button)
│   └── api/calendar/subscribe/
│       └── route.ts          # BaZi engine + iCal generator
├── data/
│   └── copywriting.json      # 50+ fortune templates per Ten God
└── package.json
```

**Core dependencies:**
- `lunar-javascript` — Chinese calendar / BaZi calculations
- `next` — API routes + SSR
- `uuid` — iCal event UID generation

## 🗺 Roadmap

- [ ] Multi-year support (currently 2026 only)
- [ ] Hour pillar (时柱) for more precise readings
- [ ] English copywriting templates
- [ ] REST API for headless integrations
- [ ] Monthly/yearly fortune summaries
- [ ] Compatibility analysis (合婚) endpoint
- [ ] Docker deployment

## 🤝 Contributing

PRs welcome! Areas where help is especially appreciated:

- **English translations** of fortune copywriting
- **Additional Ten God × Life Stage** copywriting variants
- **Localization** (Japanese, Korean, Vietnamese astrology systems share similar roots)
- **Testing** — BaZi calculation edge cases

## 📜 License

[MIT](LICENSE) — Use it, fork it, build on it.

## 🌟 Why This Matters

Chinese metaphysics (命理学) has influenced decision-making across East Asia for millennia — from business timing to relationship compatibility. Yet almost no open-source tooling exists for these systems. This project aims to make BaZi accessible, computable, and composable for the modern developer.

---

*Built with 🔮 and TypeScript. Your destiny, delivered daily.*
