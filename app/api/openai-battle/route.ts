import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, modelId } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const isPremiumModel = modelId === "vertex"
    const modelName = modelId === "vertex" ? "VERTEX AI" : modelId === "orion" ? "ORION AI" : "ATLAS AI"

    // Check if OpenAI API key is available
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      // Return demo response when API key is not available
      return NextResponse.json({
        code: `// ${modelName} Demo Solution\n// Prompt: ${prompt}\n\nfunction solution() {\n  // This is a demo response\n  // Add your OPENAI_API_KEY to enable real GPT-4 responses\n  console.log("${modelName} solving: ${prompt}");\n  \n  // Demo implementation\n  return "Demo solution from ${modelName}";\n}\n\nsolution();`,
        tokens: Math.floor(Math.random() * 500) + 200,
        model: "gpt-4-demo",
      })
    }

    let systemPrompt = `You are ${modelName}, a coding expert. Provide clean, efficient code solutions. Return only the code with minimal comments.\n\nWrite code for: ${prompt}`

    if (isPremiumModel) {
      systemPrompt = `You are ${modelName}, an elite premium AI with advanced capabilities. You excel at creating highly optimized, scalable, and innovative code solutions. Use cutting-edge algorithms, best practices, and performance optimizations. Include sophisticated error handling and modern JavaScript/TypeScript patterns.\n\nChallenge: ${prompt}\n\nDeliver a premium-quality solution that showcases advanced programming techniques.`
    }

    const { text, usage } = await generateText({
      model: openai(isPremiumModel ? "gpt-4o" : "gpt-4o-mini", { apiKey }),
      prompt: systemPrompt,
      maxOutputTokens: isPremiumModel ? 1500 : 1000,
      temperature: isPremiumModel ? 0.8 : 0.7,
    })

    return NextResponse.json({
      code: text,
      tokens: usage?.totalTokens || 0,
      model: isPremiumModel ? "gpt-4o-premium" : "gpt-4o-mini",
    })
  } catch (error) {
    console.error("OpenAI Battle API Error:", error)

    const errorMessage = error instanceof Error ? error.message : String(error)
    const { modelId } = await request.json().catch(() => ({ modelId: "atlas" }))
    const modelName = modelId === "vertex" ? "VERTEX AI" : modelId === "orion" ? "ORION AI" : "ATLAS AI"

    // Check for quota exceeded or rate limit errors
    if (errorMessage.includes("quota") || errorMessage.includes("rate limit") || errorMessage.includes("exceeded")) {
      return NextResponse.json({
        code: `// ${modelName} - Quota Exceeded Demo\n// API quota reached, showing demo response\n\nfunction quotaDemo() {\n  console.log("🚀 ${modelName} - Demo Mode Active");\n  console.log("⚡ Quota exceeded, but ${modelName} keeps fighting!");\n  \n  // Advanced demo implementation\n  const solution = {\n    status: "demo",\n    message: "${modelName} would optimize this perfectly",\n    technique: "Clean, efficient code architecture"\n  };\n  \n  return solution;\n}\n\nquotaDemo();`,
        tokens: 210,
        model: "gpt-4o-mini-quota-demo",
      })
    }

    // Return fallback demo response for other errors
    return NextResponse.json({
      code: `// ${modelName} Fallback Solution\n// Error occurred, showing demo response\n\nfunction fallbackSolution() {\n  console.log("${modelName} encountered an error");\n  console.log("Please check your OPENAI_API_KEY configuration");\n  return "Fallback solution";\n}\n\nfallbackSolution();`,
      tokens: 150,
      model: "gpt-4o-mini-fallback",
    })
  }
}
