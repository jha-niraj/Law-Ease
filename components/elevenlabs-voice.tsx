"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Volume2, Phone, PhoneOff, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Conversation } from "@elevenlabs/client"

type ConversationInstance = Awaited<ReturnType<typeof Conversation.startSession>>

interface ElevenLabsVoiceProps {
  isActive: boolean
  onStart: () => void
  onEnd: () => void
  sessionId?: string | null
  legalAnalysis?: {
    applicableLaws: string[]
    userRights: string[]
    recommendedProcedures: string[]
    importantDeadlines: string[]
    precedentCases?: string[]
  }
  userProblem?: string
}

export function ElevenLabsVoice({ 
  isActive, 
  onStart, 
  onEnd, 
  legalAnalysis,
  userProblem 
}: ElevenLabsVoiceProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const conversationRef = useRef<ConversationInstance | null>(null)

  // Animated audio visualizer
  const generateAudioBars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-blue-500 rounded-full"
        animate={{
          height: isSpeaking ? [4, 20, 8, 16, 12][i] : 4,
        }}
        transition={{
          duration: 0.5,
          repeat: isSpeaking ? Infinity : 0,
          repeatType: "reverse",
          delay: i * 0.1,
        }}
      />
    ))
  }

  const startConversation = async () => {
    if (!process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID) {
      toast.error("ElevenLabs agent ID not configured")
      return
    }

    setIsConnecting(true)
    try {
      // Start ElevenLabs conversation
      const conversation = await Conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
        connectionType: 'webrtc'
      })

      // Send initial context message to the agent
      if (legalAnalysis && userProblem) {
        const contextMessage = `Legal Analysis Context:
Problem: ${userProblem}
Applicable Laws: ${legalAnalysis.applicableLaws?.join(', ') || 'None specified'}
User Rights: ${legalAnalysis.userRights?.join(', ') || 'None specified'}
Recommended Procedures: ${legalAnalysis.recommendedProcedures?.join(', ') || 'None specified'}
Important Deadlines: ${legalAnalysis.importantDeadlines?.join(', ') || 'None specified'}
Precedent Cases: ${legalAnalysis.precedentCases?.join(', ') || 'None specified'}`
        
        conversation.sendContextualUpdate(contextMessage)
      }

      conversationRef.current = conversation
      setIsConnected(true)
      setIsConnecting(false)
      onStart()

      // Note: Event listeners would be set up here in a real implementation
      // The ElevenLabs SDK API might be different than documented
      console.log('Conversation started with ElevenLabs agent')

      toast.success("Connected to AI Legal Mentor!")
    } catch (error) {
      console.error('Failed to start conversation:', error)
      toast.error("Failed to connect to AI Legal Mentor")
      setIsConnecting(false)
    }
  }

  const endConversation = async () => {
    try {
      if (conversationRef.current) {
        await conversationRef.current.endSession()
        conversationRef.current = null
      }
      setIsConnected(false)
      setIsSpeaking(false)
      onEnd()
      toast.success("Conversation ended")
    } catch (error) {
      console.error('Failed to end conversation:', error)
      toast.error("Failed to end conversation properly")
    }
  }

  const toggleMute = () => {
    if (conversationRef.current) {
      const newMutedState = !isMuted
      conversationRef.current.setMicMuted(newMutedState)
      setIsMuted(newMutedState)
      toast.success(newMutedState ? "Microphone muted" : "Microphone unmuted")
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (conversationRef.current) {
        conversationRef.current.endSession()
      }
    }
  }, [])

  if (!isActive) {
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <Phone className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              AI Legal Mentor Ready
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start a voice conversation with your AI legal mentor for personalized guidance
            </p>
            <Button 
              onClick={startConversation}
              disabled={isConnecting}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-5 w-5" />
                  Start Voice Session
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {/* Speaking Animation */}
              <motion.div
                className="relative mx-auto w-32 h-32"
                animate={{ 
                  scale: isSpeaking ? [1, 1.05, 1] : 1,
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: isSpeaking ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                  isSpeaking 
                    ? 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/25' 
                    : 'bg-gradient-to-br from-gray-400 to-gray-500'
                }`}>
                  <Volume2 className={`h-12 w-12 ${isSpeaking ? 'text-white' : 'text-gray-200'}`} />
                </div>
                
                {/* Pulse rings when speaking */}
                {isSpeaking && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-blue-400"
                      animate={{ scale: [1, 1.4], opacity: [0.8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-indigo-400"
                      animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    />
                  </>
                )}
              </motion.div>

              {/* Status Text */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {isSpeaking ? "AI Mentor is Speaking..." : "Listening..."}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {isConnected ? "Voice session active" : "Connecting to AI mentor..."}
                </p>
              </div>

              {/* Audio Visualizer */}
              <div className="flex items-center justify-center space-x-1 h-8">
                {generateAudioBars()}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant={isMuted ? "destructive" : "outline"}
                  size="lg"
                  onClick={toggleMute}
                  className="rounded-full w-14 h-14"
                >
                  {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </Button>
                
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={endConversation}
                  className="rounded-full w-16 h-16 bg-red-500 hover:bg-red-600"
                >
                  <PhoneOff className="h-7 w-7" />
                </Button>
              </div>

              {/* Tips */}
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p>💡 Speak naturally - the AI understands legal terminology</p>
                <p>🎯 Ask specific questions about your legal situation</p>
                <p>⚖️ Remember: This is educational guidance, not legal advice</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
