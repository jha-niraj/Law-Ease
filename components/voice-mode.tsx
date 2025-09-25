"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, VolumeX, Mic, MicOff, StopCircle } from "lucide-react"

interface VoiceModeProps {
  isActive: boolean
  onStart: () => void
  onEnd: () => void
  sessionId?: string | null
}

export function VoiceMode({ isActive, onStart, onEnd, sessionId }: VoiceModeProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isMicActive, setIsMicActive] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1)
        // Simulate audio level for visual feedback
        setAudioLevel(Math.random() * 100)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // In a real implementation, this would control audio output
  }

  const toggleMic = () => {
    setIsMicActive(!isMicActive)
    // In a real implementation, this would control microphone input
  }

  if (!isActive) {
    return (
      <Card className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 border-teal-200 dark:border-teal-700">
        <CardContent className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Volume2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-teal-800 dark:text-teal-200 mb-2">
            Your Legal Advisor is Ready!
          </h3>
          <p className="text-teal-600 dark:text-teal-300 mb-6">
            Click below to start your voice conversation about your legal issue
          </p>
          <Button 
            onClick={onStart}
            size="lg" 
            className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Volume2 className="mr-2 w-5 h-5" />
            Start Voice Conversation
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border-emerald-200 dark:border-emerald-700">
      <CardContent className="py-8">
        {/* Voice Visualizer */}
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full animate-pulse">
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <Volume2 className="w-16 h-16 text-white" />
              </div>
            </div>
            
            {/* Audio level indicator */}
            <div 
              className="absolute inset-0 border-4 border-emerald-300 rounded-full opacity-60"
              style={{
                transform: `scale(${1 + (audioLevel / 200)})`,
                transition: 'transform 0.1s ease-out'
              }}
            />
          </div>
          
          <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
            Conversation in Progress
          </h3>
          <p className="text-emerald-600 dark:text-emerald-300 mb-2">
            Your AI legal advisor is discussing your case
          </p>
          <div className="text-lg font-mono text-emerald-700 dark:text-emerald-300">
            {formatDuration(duration)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
            className={`rounded-full w-12 h-12 ${
              isMuted 
                ? 'bg-red-100 border-red-300 text-red-600 hover:bg-red-200' 
                : 'bg-white border-emerald-300 text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleMic}
            className={`rounded-full w-12 h-12 ${
              isMicActive 
                ? 'bg-emerald-100 border-emerald-300 text-emerald-600 hover:bg-emerald-200' 
                : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isMicActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={onEnd}
            className="rounded-full w-12 h-12 bg-red-100 border-red-300 text-red-600 hover:bg-red-200"
          >
            <StopCircle className="w-5 h-5" />
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="bg-emerald-100 dark:bg-emerald-900/50 p-4 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-700 dark:text-emerald-300">AI is listening</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-emerald-600 dark:text-emerald-400">Session ID:</span>
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
                {sessionId?.slice(-8) || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Conversation Tips */}
        <div className="mt-6 text-center">
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-2">
            💡 <strong>Tips:</strong>
          </p>
          <ul className="text-xs text-emerald-600 dark:text-emerald-400 space-y-1">
            <li>• Speak clearly and ask specific questions</li>
            <li>• The AI can explain legal terms and procedures</li>
            <li>• Ask for clarification if needed</li>
            <li>• Remember: This is educational, not legal advice</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
