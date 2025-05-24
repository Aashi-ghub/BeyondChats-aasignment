"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface TextEditorProps {
  text: string
  onClose: () => void
  onApply: (newText: string) => void
}

export function TextEditor({ text, onClose, onApply }: TextEditorProps) {
  const [editedText, setEditedText] = useState(text)

  const rephraseOptions = ["My tone of voice", "More friendly", "More formal", "Fix grammar & spelling", "Translate..."]

  const handleRephrase = (option: string) => {
    // Simulate AI rephrasing
    let newText = editedText

    switch (option) {
      case "More friendly":
        newText = editedText.replace(/\./g, "! 😊")
        break
      case "More formal":
        newText = editedText.replace(/!/g, ".").replace(/😊/g, "")
        break
      case "Fix grammar & spelling":
        newText = editedText.charAt(0).toUpperCase() + editedText.slice(1)
        break
      default:
        newText = editedText
    }

    setEditedText(newText)
  }

  return (
    <div className="absolute inset-0 bg-white z-10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Rephrase</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Rephrase Options */}
      <div className="p-4 border-b">
        <div className="space-y-2">
          {rephraseOptions.map((option) => (
            <Button
              key={option}
              variant="outline"
              size="sm"
              onClick={() => handleRephrase(option)}
              className="w-full justify-start"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {/* Text Editor */}
      <div className="flex-1 p-4">
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full h-full p-3 border rounded-md resize-none focus:outline-none focus:border-blue-500"
          placeholder="Edit your text..."
        />
      </div>

      {/* Actions */}
      <div className="p-4 border-t flex gap-2 justify-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => onApply(editedText)} className="bg-blue-500 hover:bg-blue-600">
          Apply
        </Button>
      </div>
    </div>
  )
}
