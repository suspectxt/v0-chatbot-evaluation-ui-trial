"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Trash2,
  Edit3,
  Plus,
  Wand2,
  Save,
  X,
  Upload,
  Search,
  AlertTriangle,
  Circle,
  CheckCircle,
  Eye,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface TestCase {
  id: string
  name: string
  input: string
  expectedOutput: string
  category: string
  priority: "low" | "medium" | "high"
  status: "draft" | "ready" | "needs_review"
  createdAt: Date
}

export function TestCaseManager() {
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: "1",
      name: "Customer Support Query",
      input: "I need help with my order #12345. It hasn't arrived yet.",
      expectedOutput:
        "I understand you're concerned about order #12345. Let me check the status for you. Can you please provide your email address associated with the order?",
      category: "Customer Support",
      priority: "high",
      status: "ready",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      name: "Technical Question",
      input: "How do I reset my password?",
      expectedOutput:
        "To reset your password: 1) Go to the login page 2) Click 'Forgot Password' 3) Enter your email 4) Check your inbox for reset instructions 5) Follow the link to create a new password",
      category: "Technical",
      priority: "medium",
      status: "ready",
      createdAt: new Date("2024-01-14"),
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingOutput, setEditingOutput] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [importFile, setImportFile] = useState<File | null>(null)
  const [isImporting, setIsImporting] = useState(false)
  const [newTestCase, setNewTestCase] = useState({
    name: "",
    input: "",
    expectedOutput: "",
    category: "",
    priority: "medium" as const,
  })

  const filteredTestCases = testCases.filter((testCase) => {
    const matchesSearch =
      testCase.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testCase.input.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testCase.expectedOutput.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testCase.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || testCase.category === categoryFilter
    const matchesPriority = priorityFilter === "all" || testCase.priority === priorityFilter
    const matchesStatus = statusFilter === "all" || testCase.status === statusFilter

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  const getUniqueCategories = () => {
    const categories = [...new Set(testCases.map((tc) => tc.category))]
    return categories.sort()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv",
      ]

      if (
        validTypes.includes(file.type) ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls") ||
        file.name.endsWith(".csv")
      ) {
        setImportFile(file)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an Excel file (.xlsx, .xls) or CSV file",
          variant: "destructive",
        })
      }
    }
  }

  const handleImportExcel = async () => {
    if (!importFile) {
      toast({
        title: "No file selected",
        description: "Please select an Excel or CSV file to import",
        variant: "destructive",
      })
      return
    }

    setIsImporting(true)

    try {
      // Simulate file processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock imported data - in real implementation, you'd parse the Excel file
      const importedTestCases: TestCase[] = [
        {
          id: Date.now().toString(),
          name: "Imported: Product Inquiry",
          input: "What are the features of your premium plan?",
          expectedOutput: "Our premium plan includes advanced analytics, priority support, and unlimited integrations.",
          category: "Sales",
          priority: "medium",
          status: "draft",
          createdAt: new Date(),
        },
        {
          id: (Date.now() + 1).toString(),
          name: "Imported: Billing Question",
          input: "How do I update my payment method?",
          expectedOutput: "You can update your payment method in Account Settings > Billing > Payment Methods.",
          category: "Billing",
          priority: "high",
          status: "draft",
          createdAt: new Date(),
        },
        {
          id: (Date.now() + 2).toString(),
          name: "Imported: Feature Request",
          input: "Can you add dark mode to the app?",
          expectedOutput: "Thank you for the suggestion! Dark mode is on our roadmap for the next quarter.",
          category: "Feature Request",
          priority: "low",
          status: "draft",
          createdAt: new Date(),
        },
      ]

      setTestCases((prev) => [...prev, ...importedTestCases])
      setIsImportDialogOpen(false)
      setImportFile(null)

      toast({
        title: "Import successful",
        description: `Successfully imported ${importedTestCases.length} test cases from ${importFile.name}`,
      })
    } catch (error) {
      toast({
        title: "Import failed",
        description: "There was an error processing the file. Please check the format and try again.",
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
    }
  }

  const handleAddTestCase = () => {
    if (!newTestCase.name || !newTestCase.input || !newTestCase.category) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const testCase: TestCase = {
      id: Date.now().toString(),
      ...newTestCase,
      status: "draft",
      createdAt: new Date(),
    }

    setTestCases([...testCases, testCase])
    setNewTestCase({
      name: "",
      input: "",
      expectedOutput: "",
      category: "",
      priority: "medium",
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Test case added",
      description: "New test case has been created successfully",
    })
  }

  const handleGenerateOutput = async (testCase: TestCase) => {
    // Simulate AI generation
    const generatingToast = toast({
      title: "Generating output...",
      description: "AI is creating expected output for this test case",
    })

    // Simulate API call delay
    setTimeout(() => {
      const generatedOutput = `Generated response for: "${testCase.input}". This is a simulated AI-generated expected output that would be contextually appropriate for the input provided.`

      setTestCases((cases) =>
        cases.map((tc) =>
          tc.id === testCase.id ? { ...tc, expectedOutput: generatedOutput, status: "needs_review" as const } : tc,
        ),
      )

      toast({
        title: "Output generated",
        description: "AI has generated an expected output for review",
      })
    }, 2000)
  }

  const handleStartEdit = (testCase: TestCase) => {
    setEditingId(testCase.id)
    setEditingOutput(testCase.expectedOutput)
  }

  const handleSaveEdit = () => {
    if (editingId) {
      setTestCases((cases) =>
        cases.map((tc) =>
          tc.id === editingId ? { ...tc, expectedOutput: editingOutput, status: "needs_review" as const } : tc,
        ),
      )
      setEditingId(null)
      setEditingOutput("")
      toast({
        title: "Output updated",
        description: "Expected output has been saved",
      })
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingOutput("")
  }

  const handleDeleteTestCase = (id: string) => {
    setTestCases((cases) => cases.filter((tc) => tc.id !== id))
    toast({
      title: "Test case deleted",
      description: "Test case has been removed",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "default"
      case "draft":
        return "secondary"
      case "needs_review":
        return "outline"
      default:
        return "default"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Circle className="h-4 w-4 text-yellow-500" />
      case "low":
        return <Circle className="h-4 w-4 text-green-500" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "draft":
        return <Circle className="h-4 w-4 text-gray-400" />
      case "needs_review":
        return <Eye className="h-4 w-4 text-blue-500" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Test Case Manager</h2>
          <p className="text-muted-foreground">Create and manage test cases with AI-generated expected outputs</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import Excel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Import Test Cases from Excel</DialogTitle>
                <DialogDescription>
                  Upload an Excel file (.xlsx, .xls) or CSV file with test cases. Expected columns: Name, Category,
                  Priority, Input, Expected Output
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="excel-file">Select File</Label>
                  <Input
                    id="excel-file"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
                  {importFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {importFile.name} ({(importFile.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <h4 className="text-sm font-medium mb-2">Expected Excel Format:</h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Column A: Name (required)</p>
                    <p>• Column B: Category (required)</p>
                    <p>• Column C: Priority (low/medium/high)</p>
                    <p>• Column D: Input (required)</p>
                    <p>• Column E: Expected Output (optional)</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportDialogOpen(false)} disabled={isImporting}>
                  Cancel
                </Button>
                <Button onClick={handleImportExcel} disabled={!importFile || isImporting}>
                  {isImporting ? "Importing..." : "Import Test Cases"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Test Case
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Test Case</DialogTitle>
                <DialogDescription>Create a new test case for chatbot evaluation</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Test Case Name *</Label>
                  <Input
                    id="name"
                    value={newTestCase.name}
                    onChange={(e) => setNewTestCase({ ...newTestCase, name: e.target.value })}
                    placeholder="e.g., Customer Support Query"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={newTestCase.category}
                    onChange={(e) => setNewTestCase({ ...newTestCase, category: e.target.value })}
                    placeholder="e.g., Customer Support, Technical, Sales"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTestCase.priority}
                    onValueChange={(value: any) => setNewTestCase({ ...newTestCase, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="input">Input Text *</Label>
                  <Textarea
                    id="input"
                    value={newTestCase.input}
                    onChange={(e) => setNewTestCase({ ...newTestCase, input: e.target.value })}
                    placeholder="Enter the input that will be sent to the chatbot..."
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expectedOutput">Expected Output (Optional)</Label>
                  <Textarea
                    id="expectedOutput"
                    value={newTestCase.expectedOutput}
                    onChange={(e) => setNewTestCase({ ...newTestCase, expectedOutput: e.target.value })}
                    placeholder="Leave empty to generate with AI later..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTestCase}>Add Test Case</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <Label htmlFor="search">Search Test Cases</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, input, output, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 md:flex md:gap-2">
              <div>
                <Label htmlFor="category-filter">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category-filter" className="w-full md:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {getUniqueCategories().map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority-filter">Priority</Label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger id="priority-filter" className="w-full md:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status-filter">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter" className="w-full md:w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="needs_review">Needs Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Test Cases ({filteredTestCases.length} of {testCases.length})
          </CardTitle>
          <CardDescription>Manage your test cases and their expected outputs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Name</TableHead>
                  <TableHead className="min-w-[120px]">Category</TableHead>
                  <TableHead className="w-16 text-center">Priority</TableHead>
                  <TableHead className="w-16 text-center">Status</TableHead>
                  <TableHead className="min-w-[200px] max-w-[300px]">Input</TableHead>
                  <TableHead className="min-w-[200px] max-w-[400px]">Expected Output</TableHead>
                  <TableHead className="w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestCases.map((testCase) => (
                  <TableRow key={testCase.id}>
                    <TableCell className="font-medium">
                      <div className="break-words">{testCase.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="break-words">{testCase.category}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center" title={`Priority: ${testCase.priority}`}>
                        {getPriorityIcon(testCase.priority)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center" title={`Status: ${testCase.status.replace("_", " ")}`}>
                        {getStatusIcon(testCase.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[300px]">
                        <div className="text-sm leading-relaxed break-words line-clamp-3" title={testCase.input}>
                          {testCase.input}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {editingId === testCase.id ? (
                        <div className="space-y-2 max-w-[400px]">
                          <Textarea
                            value={editingOutput}
                            onChange={(e) => setEditingOutput(e.target.value)}
                            rows={3}
                            className="text-sm resize-none"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleSaveEdit}>
                              <Save className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                              <X className="h-3 w-3 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="max-w-[400px]">
                          <div
                            className="text-sm leading-relaxed break-words line-clamp-3"
                            title={testCase.expectedOutput}
                          >
                            {testCase.expectedOutput || (
                              <span className="text-muted-foreground italic">No expected output</span>
                            )}
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {!testCase.expectedOutput && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleGenerateOutput(testCase)}
                            title="Generate output"
                          >
                            <Wand2 className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStartEdit(testCase)}
                          disabled={editingId === testCase.id}
                          title="Edit output"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteTestCase(testCase.id)}
                          title="Delete test case"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
