# AI Arena

AI Arena is an interactive web application that lets you **pit different LLMs against each other** in a battle-style interface. It is built with **Next.js 14**, **React 18**, **TypeScript**, **Tailwind CSS v4**, and a collection of modern UI components from Radix UI.



## ✨ Features

* Battle two language models  on the same prompt
* Live code editor to craft custom prompts or instructions
* Real-time visualisation of model output and battle statistics
* Leaderboard that keeps track of winning models & user scores
* Responsive layout with a collapsible sidebar and top navigation
* Wallet connect hooks (Metamask & Ethers.js) for potential on-chain extensions

## 🗂️ Project Structure

```
/aiarena
├── app/                 # Next.js App Router pages & API routes
│   ├── api/             # Serverless functions (e.g. /gemini-battle, /openai-battle)
│   ├── battle/          # Battle arena page
│   ├── fighters/        # Model list / selection page
│   ├── leaderboard/     # Rankings page
│   └── ...              # Other routes
├── components/          # Reusable UI & domain components
├── hooks/               # Custom React hooks
├── lib/                 # Shared utilities & business logic
├── styles/              # Global styles (Tailwind)
├── public/              # Static assets (images, icons)
├── .env.local           # Local environment variables (NOT committed)
└── ...
```

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

# Optional: OpenAI
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

## 🧪 Testing

(Currently no automated tests.) Feel free to contribute unit/integration tests using Jest, Vitest or Playwright.

## 🖌️ Styling & Components

The UI is built with Tailwind CSS and Radix primitives. Utility classes are composed using **tailwind-merge** and **class-variance-authority** for variant support.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch `git checkout -b feat/awesome-feature`
3. Commit your changes `git commit -m "feat: add awesome feature"`
4. Push to the branch `git push origin feat/awesome-feature`
5. Open a Pull Request

Please follow Conventional Commits and ensure `pnpm eslint` passes.

## 📄 License

This project is licensed under the **MIT License**. See `LICENSE` for more information.

---

> Built with ❤️ and LLMs for web3conf– happy battling!
