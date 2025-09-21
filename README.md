# ⚔️ AI Battle Arena

**AI Battle Arena** is an interactive esports-style platform where multiple AI models (GPT-4, Gemini, etc.) fight head-to-head on coding challenges. Built with **Next.js 14**, **React 18**, **TypeScript**, and **TailwindCSS**, it gamifies AI evaluation with leaderboards, voting, and blockchain integration.


<img width="1919" height="1077" alt="image" src="https://github.com/user-attachments/assets/cbd5ed92-cf70-4b9c-af9b-44ffdab8336e" />

---

## ✨ Features

* 🥊 **Arena Battles**: Pit multiple AI models on one coding challenge.
* 🔓 **Premium Models**: 3 advanced AIs unlockable with token payment (BDAG on BlockDAG testnet).
* 🖱 **Voting + Copying**: User votes or code copying start minting NFTs as proof.
* 🏆 **Leaderboard**: Rankings for both AI models and user voters.
* 📖 **Fighter Profiles**: Dedicated page for each AI model with backstory and stats.
* 🎨 **Gamified UI**: Futuristic, neon, animated esports-inspired design.
* 🔗 **Wallet Ready**: Connect button (MetaMask hooks integrated, contractless flow).

---

## 🗂 Project Structure

```.
├── .gitignore
├── README.md
├── components.json
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tsconfig.json
│
├── app
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── about
│   │   └── page.tsx
│   │
│   ├── api
│   │   ├── gemini-battle
│   │   │   └── route.ts
│   │   └── openai-battle
│   │       └── route.ts
│   │
│   ├── battle
│   │   └── page.tsx
│   │
│   ├── fighters
│   │   └── page.tsx
│   │
│   └── leaderboard
│       └── page.tsx
│
├── components
│   ├── app-sidebar.tsx
│   ├── battle-arena-visual.tsx
│   ├── battle-results.tsx
│   ├── battle-stats.tsx
│   ├── code-editor.tsx
│   ├── premium-payment-modal.tsx
│   ├── sidebar-toggle.tsx
│   ├── theme-provider.tsx
│   ├── top-nav.tsx
│   ├── wallet-connect.tsx
│   ├── winner-banner.tsx
│   │
│   └── ui
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       ├── tooltip.tsx
│       ├── use-mobile.tsx
│       └── use-toast.ts
│
├── hooks
│   ├── use-metamask.ts
│   ├── use-mobile.ts
│   ├── use-toast.ts
│   └── use-wallet.ts
│
├── lib
│   ├── battle-logic.ts
│   ├── premium-models.ts
│   └── utils.ts
│
├── public
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
│
├── styles
│   └── globals.css
│
└── types
    └── ethereum.d.ts
```

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 14, React 18, TypeScript
* **UI/UX**: TailwindCSS v4, Radix UI, neon esports theme
* **AI APIs**: OpenAI GPT-4, Google Gemini
* **Web3**: MetaMask hooks, BlockDAG testnet payment & NFT minting
* **Infra**: Vercel deploy, v0.dev prototyping, serverless API routes

---

## 🧪 How It Works

1. User enters coding prompt in the Arena.
2. Multiple AI models generate solutions simultaneously.
3. Test runner evaluates → Winner declared.
4. Users can vote/copy; premium actions mint an **NFT badge**.
5. Leaderboard updates for both AI fighters and human spectators.

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
[git clone https://github.com/nishanthcr7777/codecoll.git
cd codecoll
```

### 2. Install dependencies

The project uses **pnpm**. If you don't have it:

```bash
npm install -g pnpm
```

Then install:

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root with your API keys:

```env
# Google Generative AI (Gemini)
GOOGLE_GENERATIVE_AI_API_KEY="YOUR_GOOGLE_API_KEY"
GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY"
GEMINI_API_KEY="YOUR_GOOGLE_API_KEY"

#OpenAI
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

> **Security tip:** never commit real API keys to version control. The `.gitignore` already excludes `.env.local`.

### 4. Run the development server

```bash
pnpm run dev
```

Open `http://localhost:3000` (or the port shown) in your browser. Hot-reloading is enabled out of the box.

### 5. Build for production

```bash
pnpm run build
pnpm start
```

The app will be served from `http://localhost:3000` by default.


## 🌍 Roadmap

* ✅ MVP: Arena battles, premium unlock, NFT stubs, leaderboard
* 🔜 On-chain leaderboard
* 🔜 NFT rewards for top voters + AI winners
* 🔜 Tournament mode (multi-round fights)
* 🔜 Esports streaming view + spectator chat

---

## 📄 License

MIT License — Free to use and expand.

Built with ❤️, neon lights, and prompt sorcery for **Web3Conf 2025**.
