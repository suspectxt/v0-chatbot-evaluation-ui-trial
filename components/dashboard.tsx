"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Activity,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Shield,
  Brain,
  Users,
  Play,
  GitCompare,
  Trophy,
  Settings,
  Download,
  RefreshCw,
  FileText,
} from "lucide-react"
import { EvaluationTable } from "@/components/evaluation-table"
import { ABTestingModule } from "@/components/ab-testing-module"
import { PromptImprovement } from "@/components/prompt-improvement"
import { HumanReview } from "@/components/human-review"
import { Leaderboard } from "@/components/leaderboard"
import { BotSelector } from "@/components/bot-selector"
import { TestCaseManager } from "@/components/test-case-manager" // Import TestCaseManager

const overviewData = {
  totalTests: 1247,
  accuracy: 87.3,
  safetyScore: 94.1,
  hallucinations: 12,
  trend: "+5.2%",
}

const errorDistribution = [
  { name: "Correct", value: 1088, color: "hsl(var(--chart-3))" },
  { name: "Incorrect", value: 89, color: "hsl(var(--destructive))" },
  { name: "Ambiguous", value: 58, color: "hsl(var(--chart-2))" },
  { name: "Hallucinated", value: 12, color: "hsl(var(--chart-4))" },
]

const trendData = [
  { date: "Jan", accuracy: 82.1, safety: 91.2 },
  { date: "Feb", accuracy: 84.3, safety: 92.1 },
  { date: "Mar", accuracy: 85.7, safety: 93.4 },
  { date: "Apr", accuracy: 87.3, safety: 94.1 },
]

const categoryBreakdown = [
  { category: "Math/Logic", correct: 95, incorrect: 5, total: 100 },
  { category: "Factual", correct: 88, incorrect: 12, total: 100 },
  { category: "Safety", correct: 94, incorrect: 6, total: 100 },
  { category: "Ambiguity", correct: 76, incorrect: 24, total: 100 },
]

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedBot, setSelectedBot] = useState({
    id: "cashrich-bot",
    name: "CashRich bot",
    model: "gpt-4o",
    version: "1.0",
    status: "active" as const,
    description: "Specialized bot for financial advisory and cash management",
  })

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <header className="border-b bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="gradient-primary p-2 rounded-lg animate-pulse-glow">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Evaluation Platform
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary/10 transition-all duration-200 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary/10 transition-all duration-200 bg-transparent"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 hover:shadow-lg transition-all duration-200 bg-emerald-600 text-white hover:bg-emerald-700">
              <Play className="h-4 w-4 mr-2" />
              Run New Test
            </button>
          </div>
        </div>
      </header>

      <div className="border-b bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="px-6 py-4">
          <BotSelector selectedBot={selectedBot} onBotChange={setSelectedBot} />
        </div>
      </div>

      {/* Tabs wrapper to encompass both navigation and content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b bg-card/50">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-7 max-w-4xl bg-muted/30">
              <TabsTrigger
                value="overview"
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="evaluation"
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <Activity className="h-4 w-4" />
                <span>Evaluation</span>
              </TabsTrigger>
              <TabsTrigger
                value="test-cases"
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <FileText className="h-4 w-4" />
                <span>Test Cases</span>
              </TabsTrigger>
              <TabsTrigger
                value="ab-testing"
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <GitCompare className="h-4 w-4" />
                <span>A/B Testing</span>
              </TabsTrigger>
              <TabsTrigger
                value="improvement"
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <Settings className="h-4 w-4" />
                <span>Improvement</span>
              </TabsTrigger>
              <TabsTrigger
                value="review"
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <Users className="h-4 w-4" />
                <span>Review</span>
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
              >
                <Trophy className="h-4 w-4" />
                <span>AI Models </span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-6">
          <TabsContent value="overview" className="space-y-6 animate-slide-up">
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Currently evaluating:</span>
                <span className="font-medium text-primary">{selectedBot.name}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="gradient-card hover:shadow-lg transition-all duration-300 animate-scale-in border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
                  <CheckCircle className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{overviewData.accuracy}%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-primary font-medium">{overviewData.trend}</span> from last month
                  </p>
                  <Progress value={overviewData.accuracy} className="mt-2" />
                </CardContent>
              </Card>

              <Card
                className="gradient-card hover:shadow-lg transition-all duration-300 animate-scale-in border-secondary/20"
                style={{ animationDelay: "0.1s" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Test Cases Run</CardTitle>
                  <Activity className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">{overviewData.totalTests.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Across all categories</p>
                </CardContent>
              </Card>

              <Card
                className="gradient-card hover:shadow-lg transition-all duration-300 animate-scale-in border-primary/20"
                style={{ animationDelay: "0.2s" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
                  <Shield className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{overviewData.safetyScore}%</div>
                  <p className="text-xs text-muted-foreground">No harmful content detected</p>
                  <Progress value={overviewData.safetyScore} className="mt-2" />
                </CardContent>
              </Card>

              <Card
                className="gradient-card hover:shadow-lg transition-all duration-300 animate-scale-in border-destructive/20"
                style={{ animationDelay: "0.3s" }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hallucinations</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{overviewData.hallucinations}</div>
                  <p className="text-xs text-muted-foreground">0.96% of total responses</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300 animate-slide-up">
                <CardHeader>
                  <CardTitle className="text-primary">Error Distribution</CardTitle>
                  <CardDescription>Breakdown of evaluation results</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={errorDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {errorDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-4 mt-4">
                    {errorDistribution.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">
                          {item.name}: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <CardHeader>
                  <CardTitle className="text-primary">Performance Trends</CardTitle>
                  <CardDescription>Accuracy and safety over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        name="Accuracy %"
                      />
                      <Line
                        type="monotone"
                        dataKey="safety"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={3}
                        name="Safety %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card
              className="hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="text-primary">Performance by Category</CardTitle>
                <CardDescription>Accuracy breakdown across different test types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="correct" fill="hsl(var(--primary))" name="Correct" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="incorrect" fill="hsl(var(--destructive))" name="Incorrect" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="gradient-border animate-scale-in">
                <Card className="gradient-border-inner cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="gradient-primary p-2 rounded-lg">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                      <span>Run New Evaluation</span>
                    </CardTitle>
                    <CardDescription>Start a new test suite with custom prompts</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="gradient-border animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <Card className="gradient-border-inner cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="gradient-primary p-2 rounded-lg">
                        <GitCompare className="h-4 w-4 text-white" />
                      </div>
                      <span>Compare Prompts</span>
                    </CardTitle>
                    <CardDescription>A/B test different prompt variations</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="gradient-border animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <Card className="gradient-border-inner cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="gradient-primary p-2 rounded-lg">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                      <span>View Leaderboard</span>
                    </CardTitle>
                    <CardDescription>Compare model performance rankings</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="evaluation">
            <EvaluationTable />
          </TabsContent>

          <TabsContent value="test-cases">
            <TestCaseManager />
          </TabsContent>

          <TabsContent value="ab-testing">
            <ABTestingModule />
          </TabsContent>

          <TabsContent value="improvement">
            <PromptImprovement />
          </TabsContent>

          <TabsContent value="review">
            <HumanReview />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>
        </main>
      </Tabs>
    </div>
  )
}
