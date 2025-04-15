"use client"

import React, { useState, useEffect, FormEvent } from "react"
import { Bot, CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
} from "@/components/ui/expandable-chat"

const Chat: React.FC = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            content:
                "Este chat foi criado para ajudar você a encontrar o carro dos seus sonhos de forma rápida e fácil. Basta me dizer o que você procura — modelo, preço, localização — e eu vou buscar as melhores opções para você. Minha missão é tornar sua busca mais simples e eficiente, ajudando você a encontrar o carro ideal sem complicação.",
            sender: "ai",
        },
    ])
    const [input, setInput] = useState("")
    const [ws, setWs] = useState<WebSocket | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const reconnectWebSocket = () => {
        setError(null)
        setLoading(true)
        const socket = new WebSocket("ws://localhost:8000/ws")
        setWs(socket)

        socket.onopen = () => {
            console.log("WebSocket connected")
            setLoading(false)
        }

        socket.onmessage = (event) => {
            setLoading(false)
            const message = event.data
            console.log("Received from WebSocket:", message)

            setMessages((prev) => [
                ...prev,
                {
                    id: prev.length + 1,
                    content: message,
                    sender: "ai",
                },
            ])
        }

        socket.onerror = (error) => {
            console.error("WebSocket error", error)
            setError("Failed to connect to the server. Try again later.")
            setLoading(false)
        }

        socket.onclose = () => {
            console.log("WebSocket disconnected")
            setError("Connection lost. Please try again later.")
        }
    }

    useEffect(() => {
        reconnectWebSocket()
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        if (ws && ws.readyState === WebSocket.OPEN) {
            setLoading(true)
            ws.send(input)
        } else {
            setError("Failed to send message. Server is not connected.")
        }

        setMessages((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                content: input,
                sender: "user",
            },
        ])
        setInput("")
    }

    return (
        <div className="h-[0px] relative">
            <ExpandableChat size="lg" position="bottom-right" icon={<Bot className="h-6 w-6" />}>
                <ExpandableChatHeader className="flex-col text-center justify-center">
                    <h1 className="!text-[3rem] font-semibold">Klubi AI 🤖</h1>
                    <p className="text-sm text-muted-foreground">
                        Vamos encontrar o carro certo pra você!
                    </p>
                </ExpandableChatHeader>

                <ExpandableChatBody>
                    <div className="mt-2">
                        {messages.map((message) => (
                            <ChatBubble
                                key={message.id}
                                variant={message.sender === "user" ? "sent" : "received"}
                            >
                                <ChatBubbleAvatar
                                    className="h-8 w-8 shrink-0"
                                    src={
                                        message.sender === "user"
                                            ? "src/assets/user.png"
                                            : "src/assets/bot.png"
                                    }
                                    fallback={message.sender === "user" ? "US" : "AI"}
                                />
                                <ChatBubbleMessage
                                    variant={message.sender === "user" ? "sent" : "received"}
                                >
                                    {message.content}
                                </ChatBubbleMessage>
                            </ChatBubble>
                        ))}
                    </div>

                    {loading && (
                        <ChatBubble variant="received">
                            <ChatBubbleAvatar
                                className="h-8 w-8 shrink-0"
                                src="src/assets/bot.png"
                                fallback="AI"
                            />
                            <ChatBubbleMessage isLoading>
                                Carregando...
                            </ChatBubbleMessage>
                        </ChatBubble>
                    )}

                    {error && (
                        <div className="p-3 bg-red-500 text-white rounded-lg shadow-sm">
                            <span>{error}</span>
                            <Button
                                onClick={reconnectWebSocket}
                                className="mt-2"
                                size="sm"
                                variant="outline"
                            >
                                Tentar novamente
                            </Button>
                        </div>
                    )}
                </ExpandableChatBody>

                <ExpandableChatFooter>
                    <form
                        onSubmit={handleSubmit}
                        className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
                    >
                        <ChatInput
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
                        />
                        <div className="flex items-center p-3 pt-0 justify-between">
                            <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                Enviar
                                <CornerDownLeft className="size-3.5" />
                            </Button>
                        </div>
                    </form>
                </ExpandableChatFooter>
            </ExpandableChat>
        </div>
    )
}

export default Chat
