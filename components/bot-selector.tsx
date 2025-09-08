"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BotSelectorProps {
  selectedBot?: any
  onBotChange: (bot: any) => void
}

export function BotSelector({ selectedBot, onBotChange }: BotSelectorProps) {
  const [bots, setBots] = useState([
    {
      id: "cashrich-bot",
      name: "CashRich bot",
      status: "active",
      description: "Financial advisory chatbot for investment guidance",
    },
    {
      id: "ifta-bot",
      name: "IFTA bot",
      status: "active",
      description: "India FinTech Forum bot",
    },
    {
      id: "peace-bot",
      name: "Peace bot",
      status: "testing",
      description: "Peace Academy assistant",
    },
  ])

  const [selectedModel, setSelectedModel] = useState("gpt-4o")
  const [models] = useState([
    { id: "gpt-4o", name: "GPT 4o", provider: "OpenAI" },
    { id: "claude-opus", name: "Claude Opus", provider: "Anthropic" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [newBot, setNewBot] = useState({
    name: "",
    description: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    if (!selectedBot && bots.length > 0) {
      // Default to CashRich bot (first bot in the array)
      onBotChange(bots[0])
    }
  }, [selectedBot, onBotChange, bots])

  const handleAddBot = () => {
    if (!newBot.name) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const bot = {
      id: newBot.name.toLowerCase().replace(/\s+/g, "-"),
      name: newBot.name,
      status: "testing",
      description: newBot.description,
    }

    setBots((prev) => [...prev, bot])
    setNewBot({ name: "", description: "" })
    setIsAddDialogOpen(false)

    toast({
      title: "Bot Added",
      description: `${bot.name} has been added successfully`,
    })
  }

  const getStatusColor = (status: any) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "testing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Label htmlFor="bot-select" className="text-sm font-medium whitespace-nowrap">
          Select AI Bot:
        </Label>
        <Select
          value={selectedBot?.id || "cashrich-bot"}
          onValueChange={(value) => {
            const bot = bots.find((b) => b.id === value)
            if (bot) onBotChange(bot)
          }}
        >
          <SelectTrigger className="w-48" id="bot-select">
            <SelectValue placeholder="Choose a bot">
              {(selectedBot || bots[0]) && (
                <div className="flex items-center space-x-2">
                  <span>{(selectedBot || bots[0]).name}</span>
                  <Badge className={getStatusColor((selectedBot || bots[0]).status)} variant="secondary">
                    {(selectedBot || bots[0]).status}
                  </Badge>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {bots.map((bot) => (
              <SelectItem key={bot.id} value={bot.id}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <span className="font-medium">{bot.name}</span>
                  </div>
                  <Badge className={getStatusColor(bot.status)} variant="secondary">
                    {bot.status}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Label htmlFor="model-select" className="text-sm font-medium whitespace-nowrap">
          Select Model:
        </Label>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-44" id="model-select">
            <SelectValue>{models.find((m) => m.id === selectedModel)?.name}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{model.name}</span>
                  <span className="text-xs text-muted-foreground">{model.provider}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bot and Model Settings</DialogTitle>
            <DialogDescription>Manage your bots and models configuration.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Current Bots</h3>
              <div className="space-y-2">
                {bots.map((bot) => (
                  <div key={bot.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{bot.name}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(bot.status)} variant="secondary">
                        {bot.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Available Models</h3>
              <div className="space-y-2">
                {models.map((model) => (
                  <div key={model.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{model.name}</div>
                      <div className="text-sm text-muted-foreground">{model.provider}</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Configure
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Add New Bot</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Bot</DialogTitle>
                  <DialogDescription>Configure a new chatbot for testing and evaluation.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bot-name">Bot Name *</Label>
                    <Input
                      id="bot-name"
                      placeholder="e.g., Support bot"
                      value={newBot.name}
                      onChange={(e) => setNewBot((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bot-description">Description</Label>
                    <Textarea
                      id="bot-description"
                      placeholder="Brief description of the bot's capabilities..."
                      value={newBot.description}
                      onChange={(e) => setNewBot((prev) => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddBot}>Add Bot</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={() => setIsSettingsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
