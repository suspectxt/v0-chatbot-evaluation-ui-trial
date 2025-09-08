"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Lightbulb, Download, Copy, ArrowRight, TrendingUp } from "lucide-react"

const improvements = [
  {
    category: "Accuracy Enhancement",
    issue: "AI occasionally provides outdated information",
    suggestion: "Add instruction to verify recency of information and acknowledge when data might be outdated",
    before: "You are a helpful AI assistant. Answer questions accurately and concisely.",
    after:
      "You are a helpful AI assistant. Answer questions accurately and concisely. When providing factual information, consider the recency of your training data and acknowledge if information might be outdated.",
    expectedImprovement: "+3.2% accuracy",
    priority: "high",
  },
  {
    category: "Ambiguity Handling",
    issue: "AI sometimes assumes context not provided by user",
    suggestion: "Explicitly instruct to ask for clarification when questions are ambiguous",
    before: "Answer user questions helpfully.",
    after:
      "Answer user questions helpfully. If a question is ambiguous or lacks necessary context, ask for clarification rather than making assumptions.",
    expectedImprovement: "+15% ambiguity resolution",
    priority: "high",
  },
  {
    category: "Safety Improvement",
    issue: "Inconsistent handling of edge cases in safety scenarios",
    suggestion: "Add explicit safety guidelines and escalation procedures",
    before: "Be helpful and harmless.",
    after:
      "Be helpful and harmless. If asked about potentially dangerous, illegal, or harmful activities, politely decline and suggest safer alternatives when appropriate.",
    expectedImprovement: "+2.1% safety score",
    priority: "medium",
  },
  {
    category: "Calculation Accuracy",
    issue: "Occasional errors in complex mathematical operations",
    suggestion: "Instruct to show work step-by-step for calculations",
    before: "Solve math problems accurately.",
    after:
      "Solve math problems accurately. For calculations, show your work step-by-step to ensure accuracy and help users understand the process.",
    expectedImprovement: "+4.7% math accuracy",
    priority: "high",
  },
]

const optimizedPrompt = `You are a helpful AI assistant designed to provide accurate, safe, and contextually appropriate responses.

Core Guidelines:
1. **Accuracy**: Provide factual, well-reasoned answers. When uncertain, acknowledge limitations and suggest verification methods.
2. **Clarity**: Ask for clarification when questions are ambiguous rather than making assumptions.
3. **Safety**: Decline requests for harmful, dangerous, or illegal content. Offer constructive alternatives when appropriate.
4. **Transparency**: Show your reasoning, especially for calculations or complex topics.
5. **Recency**: Acknowledge when information might be outdated due to training data limitations.

Response Format:
- Be concise but comprehensive
- Use examples when helpful
- Structure complex answers with clear sections
- Cite reasoning for important claims`

export function PromptImprovement() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <span>Prompt Improvement Suggestions</span>
          </CardTitle>
          <CardDescription>
            AI-generated recommendations to enhance your chatbot's performance based on evaluation results
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Improvement Suggestions */}
          <div className="space-y-4">
            {improvements.map((improvement, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{improvement.category}</CardTitle>
                    <Badge variant={improvement.priority === "high" ? "destructive" : "secondary"}>
                      {improvement.priority} priority
                    </Badge>
                  </div>
                  <CardDescription>{improvement.issue}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Suggestion</h4>
                    <p className="text-sm text-yellow-700">{improvement.suggestion}</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-red-600">Before</h4>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(improvement.before)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <Textarea value={improvement.before} readOnly className="min-h-[80px] bg-red-50 border-red-200" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-green-600">After</h4>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(improvement.after)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <Textarea
                        value={improvement.after}
                        readOnly
                        className="min-h-[80px] bg-green-50 border-green-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Expected Improvement</span>
                    </div>
                    <span className="text-sm font-bold text-blue-600">{improvement.expectedImprovement}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimized Complete Prompt */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRight className="h-5 w-5 text-green-600" />
            <span>Complete Optimized Prompt</span>
          </CardTitle>
          <CardDescription>A comprehensive prompt incorporating all improvement suggestions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => copyToClipboard(optimizedPrompt)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Prompt
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export for Testing
            </Button>
          </div>

          <Textarea
            value={optimizedPrompt}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-green-50 border-green-200"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-600">+12.1%</div>
              <div className="text-sm text-green-700">Expected Accuracy Gain</div>
            </div>
            <div className="text-center p-4 bg-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">+18.3%</div>
              <div className="text-sm text-blue-700">Better Ambiguity Handling</div>
            </div>
            <div className="text-center p-4 bg-purple-100 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">+5.8%</div>
              <div className="text-sm text-purple-700">Overall Performance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
