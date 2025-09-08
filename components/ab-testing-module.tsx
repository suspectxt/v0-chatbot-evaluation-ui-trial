"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { GitCompare, TrendingUp, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

const abTestData = {
  promptA: {
    name: "Original Prompt",
    description: "You are a helpful AI assistant. Answer questions accurately and concisely.",
    accuracy: 87.3,
    faithfulness: 92.1,
    safety: 94.5,
    userSatisfaction: 4.2,
    totalTests: 500,
    correct: 437,
    incorrect: 43,
    ambiguous: 20,
  },
  promptB: {
    name: "Enhanced Prompt",
    description:
      "You are a helpful AI assistant. Always verify facts before responding. If uncertain, clearly state your uncertainty. Answer questions accurately and provide context when helpful.",
    accuracy: 91.8,
    faithfulness: 95.3,
    safety: 96.1,
    userSatisfaction: 4.6,
    totalTests: 500,
    correct: 459,
    incorrect: 28,
    ambiguous: 13,
  },
}

const comparisonData = [
  { metric: "Accuracy", promptA: 87.3, promptB: 91.8 },
  { metric: "Faithfulness", promptA: 92.1, promptB: 95.3 },
  { metric: "Safety", promptA: 94.5, promptB: 96.1 },
  { metric: "User Satisfaction", promptA: 4.2, promptB: 4.6 },
]

const radarData = [
  { subject: "Accuracy", promptA: 87.3, promptB: 91.8, fullMark: 100 },
  { subject: "Faithfulness", promptA: 92.1, promptB: 95.3, fullMark: 100 },
  { subject: "Safety", promptA: 94.5, promptB: 96.1, fullMark: 100 },
  { subject: "Coherence", promptA: 89.2, promptB: 93.1, fullMark: 100 },
  { subject: "Helpfulness", promptA: 85.7, promptB: 90.4, fullMark: 100 },
]

const testCaseComparison = [
  {
    testCase: "What is the capital of Australia?",
    promptA: "The capital of Australia is Sydney.",
    promptB: "The capital of Australia is Canberra, not Sydney which is the largest city.",
    resultA: "incorrect",
    resultB: "correct",
  },
  {
    testCase: "How do I reset my password?",
    promptA: "Click on 'Forgot Password' and follow the steps.",
    promptB:
      "I don't have access to your specific account system. Generally, you can click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
    resultA: "ambiguous",
    resultB: "correct",
  },
  {
    testCase: "Calculate 15% of 240",
    promptA: "15% of 240 is 36.",
    promptB: "15% of 240 = 0.15 × 240 = 36",
    resultA: "correct",
    resultB: "correct",
  },
]

export function ABTestingModule() {
  const [viewMode, setViewMode] = useState<"aggregate" | "individual">("aggregate")

  const getResultIcon = (result: string) => {
    switch (result) {
      case "correct":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "incorrect":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "ambiguous":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GitCompare className="h-5 w-5" />
            <span>A/B Testing Results</span>
          </CardTitle>
          <CardDescription>Compare performance between different prompt configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "aggregate" ? "default" : "outline"}
                onClick={() => setViewMode("aggregate")}
              >
                Aggregate View
              </Button>
              <Button
                variant={viewMode === "individual" ? "default" : "outline"}
                onClick={() => setViewMode("individual")}
              >
                Individual Cases
              </Button>
            </div>
            <Badge variant="outline" className="text-sm">
              1,000 total test cases
            </Badge>
          </div>

          {viewMode === "aggregate" ? (
            <div className="space-y-6">
              {/* Side-by-side comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Prompt A */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600">Prompt A (Control)</CardTitle>
                    <CardDescription className="text-sm">{abTestData.promptA.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{abTestData.promptA.accuracy}%</div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{abTestData.promptA.faithfulness}%</div>
                        <div className="text-sm text-muted-foreground">Faithfulness</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{abTestData.promptA.safety}%</div>
                        <div className="text-sm text-muted-foreground">Safety</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{abTestData.promptA.userSatisfaction}/5</div>
                        <div className="text-sm text-muted-foreground">User Rating</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Correct: {abTestData.promptA.correct}</span>
                        <span className="text-green-600">
                          {((abTestData.promptA.correct / abTestData.promptA.totalTests) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={(abTestData.promptA.correct / abTestData.promptA.totalTests) * 100}
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Prompt B */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">Prompt B (Variant)</CardTitle>
                    <CardDescription className="text-sm">{abTestData.promptB.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{abTestData.promptB.accuracy}%</div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                        <div className="text-xs text-green-600">
                          +{(abTestData.promptB.accuracy - abTestData.promptA.accuracy).toFixed(1)}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{abTestData.promptB.faithfulness}%</div>
                        <div className="text-sm text-muted-foreground">Faithfulness</div>
                        <div className="text-xs text-green-600">
                          +{(abTestData.promptB.faithfulness - abTestData.promptA.faithfulness).toFixed(1)}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{abTestData.promptB.safety}%</div>
                        <div className="text-sm text-muted-foreground">Safety</div>
                        <div className="text-xs text-green-600">
                          +{(abTestData.promptB.safety - abTestData.promptA.safety).toFixed(1)}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{abTestData.promptB.userSatisfaction}/5</div>
                        <div className="text-sm text-muted-foreground">User Rating</div>
                        <div className="text-xs text-green-600">
                          +{(abTestData.promptB.userSatisfaction - abTestData.promptA.userSatisfaction).toFixed(1)}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Correct: {abTestData.promptB.correct}</span>
                        <span className="text-green-600">
                          {((abTestData.promptB.correct / abTestData.promptB.totalTests) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={(abTestData.promptB.correct / abTestData.promptB.totalTests) * 100}
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle>Metrics Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="metric" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="promptA" fill="hsl(var(--primary))" name="Prompt A" />
                        <Bar dataKey="promptB" fill="hsl(var(--chart-3))" name="Prompt B" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Radar Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Radar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar
                          name="Prompt A"
                          dataKey="promptA"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.1}
                        />
                        <Radar
                          name="Prompt B"
                          dataKey="promptB"
                          stroke="hsl(var(--chart-3))"
                          fill="hsl(var(--chart-3))"
                          fillOpacity={0.1}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Statistical Significance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Statistical Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">+4.5%</div>
                      <div className="text-sm text-muted-foreground">Accuracy Improvement</div>
                      <div className="text-xs text-green-600 mt-1">Statistically Significant (p &lt; 0.01)</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">95%</div>
                      <div className="text-sm text-muted-foreground">Confidence Level</div>
                      <div className="text-xs text-green-600 mt-1">Strong Evidence</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">22</div>
                      <div className="text-sm text-muted-foreground">Fewer Errors</div>
                      <div className="text-xs text-blue-600 mt-1">15 incorrect → 28 incorrect</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Individual test cases view */
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Showing individual test case comparisons between prompts
              </div>
              {testCaseComparison.map((test, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{test.testCase}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-blue-600">Prompt A Response</h4>
                          <div className="flex items-center space-x-1">
                            {getResultIcon(test.resultA)}
                            <span className="text-sm capitalize">{test.resultA}</span>
                          </div>
                        </div>
                        <p className="text-sm bg-blue-50 p-3 rounded border">{test.promptA}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-green-600">Prompt B Response</h4>
                          <div className="flex items-center space-x-1">
                            {getResultIcon(test.resultB)}
                            <span className="text-sm capitalize">{test.resultB}</span>
                          </div>
                        </div>
                        <p className="text-sm bg-green-50 p-3 rounded border">{test.promptB}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
