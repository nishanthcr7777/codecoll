export interface PremiumModel {
  id: string
  name: string
  color: string
  api: string
  isPremium: boolean
  price: string // in BDAG (BlockDAG testnet tokens)
  description: string
}

export const PREMIUM_MODELS: PremiumModel[] = [
  {
    id: "vertex",
    name: "VERTEX AI",
    color: "bg-red-500",
    api: "openai",
    isPremium: true,
    price: "2", // BDAG instead of STT
    description: "Advanced AI with superior optimization algorithms",
  },
  {
    id: "lumina",
    name: "LUMINA AI",
    color: "bg-pink-500",
    api: "gemini",
    isPremium: true,
    price: "2", // BDAG instead of STT
    description: "Creative AI with innovative problem-solving approaches",
  },
  {
    id: "nexa",
    name: "NEXA AI",
    color: "bg-green-500",
    api: "gemini",
    isPremium: true,
    price: "2", // BDAG instead of STT
    description: "Next-generation AI with cutting-edge capabilities",
  },
]

export const FREE_MODELS: PremiumModel[] = [
  {
    id: "atlas",
    name: "ATLAS AI",
    color: "bg-blue-500",
    api: "openai",
    isPremium: false,
    price: "0",
    description: "Reliable AI with solid performance",
  },
  {
    id: "axiom",
    name: "AXIOM AI",
    color: "bg-purple-500",
    api: "gemini",
    isPremium: false,
    price: "0",
    description: "Balanced AI with consistent results",
  },
  {
    id: "orion",
    name: "ORION AI",
    color: "bg-orange-500",
    api: "openai",
    isPremium: false,
    price: "0",
    description: "Efficient AI with fast processing",
  },
]

export const ALL_MODELS = [...FREE_MODELS, ...PREMIUM_MODELS]

export function isPremiumModel(modelId: string): boolean {
  return PREMIUM_MODELS.some((model) => model.id === modelId)
}

export function getModelById(modelId: string): PremiumModel | undefined {
  return ALL_MODELS.find((model) => model.id === modelId)
}

export function getPremiumModelPrice(modelId: string): string {
  const model = PREMIUM_MODELS.find((m) => m.id === modelId)
  return model?.price || "0"
}

// Simple in-memory storage for purchased models (in production, use a database)
const purchasedModels = new Set<string>()

export function hasPurchasedModel(modelId: string, userAddress?: string): boolean {
  if (!userAddress) return false
  return purchasedModels.has(`${userAddress}-${modelId}`)
}

export function markModelAsPurchased(modelId: string, userAddress: string): void {
  purchasedModels.add(`${userAddress}-${modelId}`)
}
