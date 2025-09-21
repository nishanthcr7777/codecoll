import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, modelId } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const isPremiumModel = ["lumina", "nexa"].includes(modelId)
    const modelName = modelId === "lumina" ? "LUMINA AI" : modelId === "nexa" ? "NEXA AI" : "AXIOM AI"

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        code: `// ${modelName} Demo Solution\n// Prompt: ${prompt}\n\nconst solution = () => {\n  // This is a demo response\n  // Add your GEMINI_API_KEY to enable real Gemini responses\n  console.log("${modelName} solving: ${prompt}");\n  \n  // Demo implementation with modern syntax\n  const result = "Demo solution from ${modelName}";\n  return result;\n};\n\nconsole.log(solution());`,
        tokens: Math.floor(Math.random() * 500) + 200,
        model: "gemini-pro-demo",
      })
    }

    let systemPrompt = `You are ${modelName}, an elite coding expert competing in the AI Code Battle Arena. Write clean, efficient, and modern code solutions that showcase advanced programming techniques.\n\nIMPORTANT: Return ONLY executable code with minimal but insightful comments. No explanations outside the code.\n\nChallenge: ${prompt}\n\nShow your coding prowess with:\n- Modern JavaScript/TypeScript syntax\n- Optimal algorithms and data structures  \n- Clean, readable code structure\n- Performance-conscious implementation`

    if (isPremiumModel) {
      systemPrompt = `You are ${modelName}, a premium elite AI with cutting-edge capabilities. You represent the pinnacle of AI coding excellence, delivering revolutionary solutions that push the boundaries of what's possible.\n\nIMPORTANT: Return ONLY executable code with sophisticated comments. No explanations outside the code.\n\nChallenge: ${prompt}\n\nDeliver a premium solution featuring:\n- Innovative algorithms and advanced data structures\n- State-of-the-art performance optimizations\n- Elegant, maintainable architecture\n- Advanced error handling and edge case management\n- Modern ES2024+ features and best practices\n- Scalable, production-ready implementation\n\nShowcase why premium AI models deliver superior results.`
    }

    const { text, usage } = await generateText({
      model: google(isPremiumModel ? "gemini-1.5-pro" : "gemini-1.5-flash", {
        apiKey,
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE",
          },
        ],
      }),
      prompt: systemPrompt,
      maxOutputTokens: isPremiumModel ? 2000 : 1500,
      temperature: isPremiumModel ? 0.9 : 0.8,
    })

    return NextResponse.json({
      code: text,
      tokens: usage?.totalTokens || Math.floor(text.length / 4),
      model: isPremiumModel ? "gemini-1.5-pro-premium" : "gemini-1.5-flash",
    })
  } catch (error) {
    console.error("Gemini Battle API Error:", error)

    const errorMessage = error instanceof Error ? error.message : String(error)
    const { modelId } = await request.json().catch(() => ({ modelId: "axiom" }))
    const modelName = modelId === "lumina" ? "LUMINA AI" : modelId === "nexa" ? "NEXA AI" : "AXIOM AI"

    if (
      errorMessage.includes("quota") ||
      errorMessage.includes("rate limit") ||
      errorMessage.includes("exceeded") ||
      errorMessage.includes("RESOURCE_EXHAUSTED")
    ) {
      return NextResponse.json({
        code: `// ${modelName} - Quota Exceeded Demo\n// API quota reached, showing demo response\n\nconst quotaDemo = () => {\n  console.log("⚡ ${modelName} - Demo Mode Active");\n  console.log("💡 Quota exceeded, but the battle continues!");\n  \n  // Sophisticated demo solution\n  const solution = {\n    status: "demo",\n    message: "${modelName} would solve this efficiently",\n    approach: "Modern JavaScript with optimal performance",\n    note: "Upgrade API quota to see real AI solutions"\n  };\n  \n  return solution;\n};\n\nquotaDemo();`,
        tokens: 250,
        model: "gemini-flash-quota-demo",
      })
    }

    if (
      errorMessage.includes("API key") ||
      errorMessage.includes("authentication") ||
      errorMessage.includes("UNAUTHENTICATED")
    ) {
      return NextResponse.json({
        code: `// ${modelName} - Authentication Error\n// Invalid or missing API key\n\nconst authError = () => {\n  console.log("🔑 ${modelName} - Authentication Required");\n  console.log("Please verify your GEMINI_API_KEY is valid");\n  \n  const errorInfo = {\n    status: "auth_error",\n    message: "Valid API key required for ${modelName}",\n    solution: "Check your environment variables"\n  };\n  \n  return errorInfo;\n};\n\nauthError();`,
        tokens: 200,
        model: "gemini-flash-auth-error",
      })
    }

    // Return fallback demo response for other errors
    return NextResponse.json({
      code: `// ${modelName} Fallback Solution\n// Error occurred, showing demo response\n\nconst fallbackSolution = () => {\n  console.log("${modelName} encountered an unexpected error");\n  console.log("Switching to demo mode for seamless experience");\n  \n  const fallback = {\n    status: "fallback",\n    message: "${modelName} demo solution active",\n    note: "Check console for error details"\n  };\n  \n  return fallback;\n};\n\nconsole.log(fallbackSolution());`,
      tokens: 190,
      model: "gemini-flash-fallback",
    })
  }
}
