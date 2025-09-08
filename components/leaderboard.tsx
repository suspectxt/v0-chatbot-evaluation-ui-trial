"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { Trophy, Medal, Award, TrendingUp, TrendingDown } from "lucide-react"

const leaderboardData = [
  {
    rank: 1,
    model: "GPT-4",
    version: "gpt-4-1106-preview",
    accuracy: 94.2,
    safety: 97.8,
    coherence: 96.1,
    helpfulness: 93.7,
    hallucination: 2.1,
    overall: 95.8,
    change: "+2.3",
    trend: "up",
  },
  {
    rank: 2,
    model: "Claude 3 Opus",
    version: "claude-3-opus-20240229",
    accuracy: 92.8,
    safety: 98.2,
    coherence: 94.9,
    helpfulness: 91.4,
    hallucination: 1.8,
    overall: 94.1,
    change: "+1.7",
    trend: "up",
  },
  {
    rank: 3,
    model: "GPT-4",
    version: "gpt-4-0613",
    accuracy: 91.5,
    safety: 96.4,
    coherence: 93.2,
    helpfulness: 90.8,
    hallucination: 3.2,
    overall: 92.7,
    change: "-0.8",
    trend: "down",
  },
  {
    rank: 4,
    model: "Claude 3 Sonnet",
    version: "claude-3-sonnet-20240229",
    accuracy: 89.7,
    safety: 97.1,
    coherence: 91.8,
    helpfulness: 88.9,
    hallucination: 2.9,
    overall: 91.2,
    change: "+0.4",
    trend: "up",
  },
  {
    rank: 5,
    model: "Gemini Pro",
    version: "gemini-pro-1.0",
    accuracy: 87.3,
    safety: 94.6,
    coherence: 89.4,
    helpfulness: 86.2,
    hallucination: 4.1,
    overall: 88.8,
    change: "-1.2",
    trend: "down",
  },
]

const radarData = leaderboardData.slice(0, 3).map((model) => ({
  model: model.model,
  accuracy: model.accuracy,
  safety: model.safety,
  coherence: model.coherence,
  helpfulness: model.helpfulness,
}))

const categoryComparison = [
  { category: "Math/Logic", gpt4: 96.2, claude: 94.8, gemini: 89.1 },
  { category: "Factual", gpt4: 93.7, claude: 95.2, gemini: 87.4 },
  { category: "Safety", gpt4: 97.8, claude: 98.2, gemini: 94.6 },
  { category: "Creative", gpt4: 91.4, claude: 89.7, gemini: 88.9 },
  { category: "Code", gpt4: 95.1, claude: 92.3, gemini: 85.7 },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />
    default:
      return (
        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{rank}</div>
      )
  }
}

const getTrendIcon = (trend: string) => {
  return trend === "up" ? (
    <TrendingUp className="h-4 w-4 text-green-600" />
  ) : (
    <TrendingDown className="h-4 w-4 text-red-600" />
  )
}

export function Leaderboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>Model Performance Leaderboard</span>
          </CardTitle>
          <CardDescription>Comprehensive ranking of AI models across multiple evaluation criteria</CardDescription>
        </CardHeader>
      </Card>

      {/* Main Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Rankings</CardTitle>
          <CardDescription>Based on comprehensive evaluation across all test categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((model) => (
              <div
                key={model.rank}
                className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {getRankIcon(model.rank)}
                  <div>
                    <h3 className="font-semibold">{model.model}</h3>
                    <p className="text-sm text-muted-foreground">{model.version}</p>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">{model.accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{model.safety}%</div>
                    <div className="text-xs text-muted-foreground">Safety</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{model.coherence}%</div>
                    <div className="text-xs text-muted-foreground">Coherence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{model.helpfulness}%</div>
                    <div className="text-xs text-muted-foreground">Helpfulness</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{model.hallucination}%</div>
                    <div className="text-xs text-muted-foreground">Hallucination</div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="text-lg font-bold">{model.overall}%</div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(model.trend)}
                    <span className={`text-xs ${model.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {model.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top 3 Models Comparison</CardTitle>
            <CardDescription>Multi-dimensional performance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart
                data={[
                  { subject: "Accuracy", "GPT-4": 94.2, "Claude 3 Opus": 92.8, "GPT-4": 91.5, fullMark: 100 },
                  { subject: "Safety", "GPT-4": 97.8, "Claude 3 Opus": 98.2, "GPT-4": 96.4, fullMark: 100 },
                  { subject: "Coherence", "GPT-4": 96.1, "Claude 3 Opus": 94.9, "GPT-4": 93.2, fullMark: 100 },
                  { subject: "Helpfulness", "GPT-4": 93.7, "Claude 3 Opus": 91.4, "GPT-4": 90.8, fullMark: 100 },
                ]}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[80, 100]} />
                <Radar
                  name="GPT-4"
                  dataKey="GPT-4"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Claude 3 Opus"
                  dataKey="Claude 3 Opus"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.1}
                />
                <Radar
                  name="GPT-4"
                  dataKey="GPT-4"
                  stroke="hsl(var(--chart-3))"
                  fill="hsl(var(--chart-3))"
                  fillOpacity={0.1}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Category</CardTitle>
            <CardDescription>Detailed breakdown across test types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Bar dataKey="gpt4" fill="hsl(var(--chart-1))" name="GPT-4" />
                <Bar dataKey="claude" fill="hsl(var(--chart-2))" name="Claude 3 Opus" />
                <Bar dataKey="gemini" fill="hsl(var(--chart-3))" name="Gemini Pro" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🏆 Best Overall</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">GPT-4</span>
                <Badge variant="default">95.8%</Badge>
              </div>
              <Progress value={95.8} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Leading in accuracy and coherence with strong safety scores
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🛡️ Safest Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Claude 3 Opus</span>
                <Badge variant="default">98.2%</Badge>
              </div>
              <Progress value={98.2} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Highest safety score with excellent harmful content detection
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🎯 Most Accurate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">GPT-4</span>
                <Badge variant="default">94.2%</Badge>
              </div>
              <Progress value={94.2} className="h-2" />
              <p className="text-sm text-muted-foreground">Best factual accuracy across all test categories</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
