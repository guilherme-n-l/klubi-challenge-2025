import React, {useState, useEffect, FormEvent} from "react"
import {Bot, CornerDownLeft, RefreshCw} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import {ChatInput} from "@/components/ui/chat-input"
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
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const reconnectWebSocket = () => {
        setError(null)
        const socket = new WebSocket("ws://localhost:8000/ws")
        setWs(socket)

        socket.onopen = () => {
            console.log("WebSocket connected")
        }

        socket.onmessage = (event) => {
            const message = event.data
            console.log("Received from WebSocket:", message)

            setIsLoading(false)

            if (message.includes("<END>")) {
                const cleanMessage = message.replace("<END>", "")
                setMessages((prev) => {
                    const lastMessage = prev[prev.length - 1]
                    return [
                        ...prev.slice(0, prev.length - 1),
                        {
                            ...lastMessage,
                            content: lastMessage.content + cleanMessage,
                        },
                    ]
                })
                setIsButtonDisabled(false)
            } else {
                setMessages((prev) => {
                    const lastMessage = prev[prev.length - 1]

                    if (lastMessage && lastMessage.sender === "ai") {
                        return [
                            ...prev.slice(0, prev.length - 1),
                            {
                                ...lastMessage,
                                content: lastMessage.content + message,
                            },
                        ]
                    } else {
                        return [
                            ...prev,
                            {
                                id: prev.length + 1,
                                content: message,
                                sender: "ai",
                            },
                        ]
                    }
                })
            }
        }

        socket.onerror = (error) => {
            console.error("WebSocket error", error)
            setError("Não foi possível conectar com o servidor.")
            setIsButtonDisabled(false)
            setIsLoading(false)
        }

        socket.onclose = () => {
            console.log("WebSocket disconnected")
            setError("Não foi possível conectar com o servidor.")
            setIsButtonDisabled(false)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        reconnectWebSocket()
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        setMessages((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                content: input,
                sender: "user",
            },
        ])

        setIsLoading(true)
        setIsButtonDisabled(true)
        setInput("")

        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(input)
        } else {
            setError("Failed to send message. Server is not connected.")
            setIsButtonDisabled(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit(e)
        }
    }

    return (
        <div className="h-[0px] relative">
            <ExpandableChat size="lg" position="bottom-right" icon={<Bot className="h-6 w-6"/>}>
                <ExpandableChatHeader className="flex-col text-center justify-center">
                    <h1 className="!text-[3rem] font-semibold">Klubi AI 🤖</h1>
                    <p className="text-sm text-muted-foreground">
                        Vamos encontrar o carro certo pra você!
                    </p>
                </ExpandableChatHeader>

                <ExpandableChatBody className="p-3">
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
                                            ? "/assets/user.png"
                                            : "/assets/bot.png"
                                    }
                                    fallback={message.sender === "user" ? "US" : "AI"}
                                />
                                <ChatBubbleMessage
                                    variant={message.sender === "user" ? "sent" : "received"}
                                    className={`${(message.sender === "user" ? "mr-1 ml-3 text-right" : "ml-1 mr-3 text-left")} inline-flex max-w-3/4 px-3`}
                                >
                                    {message.content}
                                </ChatBubbleMessage>
                            </ChatBubble>
                        ))}
                    </div>

                    {isLoading && (
                        <ChatBubble variant="received">
                            <ChatBubbleAvatar
                                className="h-8 w-8 shrink-0"
                                src="/assets/bot.png"
                                fallback="AI"
                            />
                            <ChatBubbleMessage isLoading/>
                        </ChatBubble>
                    )}

                    {error && (
                        <div className="m-5 flex p-3 bg-red-700 text-white rounded-lg shadow-sm gap-2 justify-center items-center">
                            <span>{error}</span>
                            <Button
                                onClick={reconnectWebSocket}
                                size="sm"
                                variant="outline"
                            >
                                <RefreshCw className="w-4 h-4" color="white"/></Button>
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
                            onKeyDown={handleKeyDown}
                        />
                        <div className="flex items-center p-3 pt-0 justify-between">
                            <Button
                                type="submit"
                                size="sm"
                                className="ml-auto gap-1.5"
                                disabled={isButtonDisabled}
                            >
                                Enviar
                                <CornerDownLeft className="size-3.5"/>
                            </Button>
                        </div>
                    </form>
                </ExpandableChatFooter>
            </ExpandableChat>
        </div>
    )
}

export default Chat
