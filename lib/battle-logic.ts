import { isPremiumModel } from "./premium-models"

interface CodeAnalysis {
  complexity: number
  readability: number
  efficiency: number
  correctness: number
  lines: number
  functions: number
  comments: number
}

interface BattleMetrics {
  tokens: number
  time: number
  lines: number
  score: number
}

export function analyzeCode(code: string): CodeAnalysis {
  const lines = code.split("\n").filter((line) => line.trim().length > 0)
  const totalLines = lines.length

  // Count functions (simple heuristic)
  const functionCount = (code.match(/function\s+\w+|const\s+\w+\s*=\s*\(|=>\s*{|\w+\s*\(/g) || []).length

  // Count comments
  const commentCount = (code.match(/\/\/.*|\/\*[\s\S]*?\*\//g) || []).length

  // Calculate complexity (based on control structures)
  const complexityKeywords = ["if", "else", "for", "while", "switch", "case", "try", "catch"]
  const complexity = complexityKeywords.reduce((count, keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "g")
    return count + (code.match(regex) || []).length
  }, 0)

  // Calculate readability score (0-100)
  const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / totalLines || 0
  const readabilityScore = Math.max(0, 100 - (avgLineLength - 50) * 2) // Penalize very long lines

  const efficientPatterns = ["map", "filter", "reduce", "memoization", "cache", "optimize", "async", "await", "Promise"]
  const premiumPatterns = ["algorithm", "performance", "optimization", "efficient", "scalable", "robust"]
  const inefficientPatterns = ["nested loop", "O(n²)", "recursive without memo"]

  const efficientCount = efficientPatterns.reduce((count, pattern) => {
    return count + (code.toLowerCase().includes(pattern) ? 1 : 0)
  }, 0)

  const premiumCount = premiumPatterns.reduce((count, pattern) => {
    return count + (code.toLowerCase().includes(pattern) ? 1 : 0)
  }, 0)

  const inefficientCount = inefficientPatterns.reduce((count, pattern) => {
    return count + (code.toLowerCase().includes(pattern) ? 1 : 0)
  }, 0)

  const efficiencyScore = Math.min(100, 60 + efficientCount * 10 + premiumCount * 5 - inefficientCount * 15)

  return {
    complexity: Math.min(complexity, 20), // Cap at 20
    readability: Math.round(readabilityScore),
    efficiency: Math.round(efficiencyScore),
    correctness: calculateCorrectness(code),
    lines: totalLines,
    functions: functionCount,
    comments: commentCount,
  }
}

function calculateCorrectness(code: string): number {
  let score = 70 // Base score

  // Check for syntax patterns that suggest correctness
  const goodPatterns = ["return", "console.log", "function", "const", "let", "if", "else", "for", "while", "=>"]

  const badPatterns = ["undefined", "null", "error", "Error", "throw", "TODO", "FIXME", "BUG"]

  goodPatterns.forEach((pattern) => {
    if (code.includes(pattern)) score += 3
  })

  badPatterns.forEach((pattern) => {
    if (code.toLowerCase().includes(pattern.toLowerCase())) score -= 5
  })

  // Check for balanced brackets
  const openBrackets = (code.match(/[{[(]/g) || []).length
  const closeBrackets = (code.match(/[}\])]/g) || []).length
  if (openBrackets === closeBrackets) score += 10
  else score -= 15

  return Math.max(0, Math.min(100, score))
}

export function calculateBattleScore(
  analysis: CodeAnalysis,
  metrics: { tokens: number; time: number },
  aiName?: string,
): number {
  // Weighted scoring system
  const weights = {
    correctness: 0.4,
    readability: 0.25,
    efficiency: 0.2,
    complexity: 0.1,
    performance: 0.05,
  }

  // Performance score based on tokens and time
  const tokenScore = Math.max(0, 100 - (metrics.tokens - 200) * 0.1) // Penalize high token usage
  const timeScore = Math.max(0, 100 - (metrics.time - 2000) * 0.01) // Penalize slow responses
  const performanceScore = (tokenScore + timeScore) / 2

  // Complexity bonus (moderate complexity is good)
  const complexityScore = analysis.complexity > 0 && analysis.complexity < 10 ? 80 : 60

  let totalScore =
    analysis.correctness * weights.correctness +
    analysis.readability * weights.readability +
    analysis.efficiency * weights.efficiency +
    complexityScore * weights.complexity +
    performanceScore * weights.performance

  if (aiName && isPremiumModel(getModelIdFromName(aiName))) {
    const premiumBonus = Math.floor(Math.random() * 11) + 5 // 5-15 point bonus
    totalScore += premiumBonus
    console.log(`[v0] Premium model ${aiName} received ${premiumBonus} bonus points`)
  }

  return Math.round(Math.min(100, totalScore))
}

function getModelIdFromName(aiName: string): string {
  const nameToId: Record<string, string> = {
    "ATLAS AI": "atlas",
    "AXIOM AI": "axiom",
    "NEXA AI": "nexa",
    "ORION AI": "orion",
    "LUMINA AI": "lumina",
    "VERTEX AI": "vertex",
  }
  return nameToId[aiName] || aiName.toLowerCase().replace(" ai", "")
}

export function determineBattleWinner(
  ai1Code: string,
  ai2Code: string,
  ai1Metrics: { tokens: number; time: number },
  ai2Metrics: { tokens: number; time: number },
  ai1Name?: string,
  ai2Name?: string,
): {
  winner: "atlas" | "axiom" | "tie"
  reason: string
  scores: { atlas: number; axiom: number }
  analysis: { atlas: CodeAnalysis; axiom: CodeAnalysis }
} {
  const ai1Analysis = analyzeCode(ai1Code)
  const ai2Analysis = analyzeCode(ai2Code)

  const ai1Score = calculateBattleScore(ai1Analysis, ai1Metrics, ai1Name)
  const ai2Score = calculateBattleScore(ai2Analysis, ai2Metrics, ai2Name)

  let winner: "atlas" | "axiom" | "tie"
  let reason: string

  const scoreDiff = Math.abs(ai1Score - ai2Score)

  if (scoreDiff < 5) {
    winner = "tie"
    reason = "Both AIs delivered exceptional solutions with nearly identical quality scores"
  } else if (ai1Score > ai2Score) {
    winner = "atlas"
    reason = generateWinnerReason(ai1Name || "AI 1", ai1Analysis, ai2Analysis, ai1Metrics, ai2Metrics)
  } else {
    winner = "axiom"
    reason = generateWinnerReason(ai2Name || "AI 2", ai2Analysis, ai1Analysis, ai2Metrics, ai1Metrics)
  }

  return {
    winner,
    reason,
    scores: { atlas: ai1Score, axiom: ai2Score },
    analysis: { atlas: ai1Analysis, axiom: ai2Analysis },
  }
}

function generateWinnerReason(
  winnerName: string,
  winnerAnalysis: CodeAnalysis,
  loserAnalysis: CodeAnalysis,
  winnerMetrics: { tokens: number; time: number },
  loserMetrics: { tokens: number; time: number },
): string {
  const reasons = []

  if (winnerAnalysis.correctness > loserAnalysis.correctness + 10) {
    reasons.push("superior code correctness")
  }

  if (winnerAnalysis.readability > loserAnalysis.readability + 10) {
    reasons.push("better code readability and structure")
  }

  if (winnerAnalysis.efficiency > loserAnalysis.efficiency + 10) {
    reasons.push("more efficient algorithm implementation")
  }

  if (winnerMetrics.tokens < loserMetrics.tokens * 0.8) {
    reasons.push("optimal token usage")
  }

  if (winnerMetrics.time < loserMetrics.time * 0.8) {
    reasons.push("faster response time")
  }

  if (winnerAnalysis.functions > loserAnalysis.functions) {
    reasons.push("better code modularity")
  }

  if (winnerAnalysis.comments > loserAnalysis.comments) {
    reasons.push("comprehensive code documentation")
  }

  if (isPremiumModel(getModelIdFromName(winnerName))) {
    reasons.push("premium AI capabilities")
  }

  if (reasons.length === 0) {
    reasons.push("overall superior code quality")
  }

  const mainReason = reasons[0]
  const additionalReasons = reasons.slice(1, 3)

  let reasonText = `${winnerName} demonstrated ${mainReason}`

  if (additionalReasons.length > 0) {
    reasonText += ` and ${additionalReasons.join(", ")}`
  }

  return reasonText
}

export function generateBattleStats(
  code: string,
  apiResponse: { tokens?: number; time?: number },
  aiName?: string,
): BattleMetrics {
  const analysis = analyzeCode(code)
  const tokens = apiResponse.tokens || Math.floor(code.length / 4) // Estimate if not provided

  let time = apiResponse.time
  if (!time) {
    const aiTimeRanges: Record<string, { min: number; max: number; baseDelay: number }> = {
      "ATLAS AI": { min: 800, max: 1500, baseDelay: 0 },
      "AXIOM AI": { min: 1200, max: 2000, baseDelay: 100 },
      "NEXA AI": { min: 700, max: 1300, baseDelay: 25 }, // Premium - faster
      "ORION AI": { min: 1100, max: 1800, baseDelay: 150 },
      "LUMINA AI": { min: 750, max: 1400, baseDelay: 50 }, // Premium - faster
      "VERTEX AI": { min: 600, max: 1200, baseDelay: 100 }, // Premium - fastest
    }

    const range = aiTimeRanges[aiName || "default"] || { min: 1000, max: 2000, baseDelay: 0 }

    // Add multiple sources of randomization to ensure unique times
    const baseTime = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
    const jitter = Math.floor(Math.random() * 100) - 50 // Random jitter ±50ms
    const aiSpecificDelay = range.baseDelay + Math.floor(Math.random() * 50) // AI-specific delay with randomness

    time = baseTime + jitter + aiSpecificDelay
  }

  const score = calculateBattleScore(analysis, { tokens, time }, aiName)

  return {
    tokens,
    time,
    lines: analysis.lines,
    score,
  }
}
