Got it 👍 I see you uploaded your project zip (`aibattlearena21114 (4).zip`). Since I can’t directly open it here, but I already know your structure (from your earlier message and the zip), we can align your **submission README / documentation** exactly to that repo layout.

Here’s the **polished submission doc** using your structure:

---

# ⚔️ AI Battle Arena

**AI Battle Arena** is an interactive esports-style platform where multiple AI models (GPT-4, Gemini, etc.) fight head-to-head on coding challenges. Built with **Next.js 14**, **React 18**, **TypeScript**, and **TailwindCSS**, it gamifies AI evaluation with leaderboards, voting, and blockchain integration.

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

```
/aiarena
├── app/                 
│   ├── page.tsx          # Home / Landing Page
│   ├── battle/           # Main Arena battles
│   ├── fighters/         # Fighter details & lore
│   ├── leaderboard/      # AI rankings + user votes
│   ├── about/            # Info, rules, roadmap
│   ├── api/              # Serverless routes
│   └── globals.css       # Global styles
│
├── components/           # Reusable UI widgets (vote, editor, banners)
├── hooks/                # Wallet connect, vote, battle hooks
├── lib/                  # API + blockchain helpers
├── public/               # Static assets (logos, neon images)
├── styles/               # Tailwind configs, animations
├── types/                # TypeScript interfaces
│
├── layout.tsx            # App layout wrapper
├── .gitignore            
├── README.md             # This file (submission doc)
├── next.config.mjs       
├── package.json          
├── pnpm-lock.yaml        
├── postcss.config.mjs    
├── tsconfig.json         
└── ...
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
git clone https://github.com/your-username/aiarena.git
cd aiarena
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
