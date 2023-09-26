import { Companion } from "@prisma/client"
import { ChatMessage, ChatMessageProps } from "./chat-message"
import { ElementRef, useEffect, useRef, useState } from "react"

interface ChatMessagesProps {
    isLoading: boolean
    messages: ChatMessageProps[]
    companion: Companion
}

export const ChatMessages = ({ isLoading, messages, companion }: ChatMessagesProps) => {
    const scrollRef = useRef<ElementRef<"div">>(null)
    const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false)
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages.length])

    return (
        <div className="flex-1 overflow-y-auto pr-4">
            <ChatMessage
                isLoading={fakeLoading}
                src={companion.src}
                role="system"
                content={`Hello, I am ${companion.name}, ${companion.description}`}
            />
            {messages.map(messages => (
                <ChatMessage
                    key={messages.content}
                    src={companion.src}
                    role={messages.role}
                    content={messages.content}
                />
            ))}
            {isLoading && (
                <ChatMessage
                    isLoading
                    src={companion.src}
                    role="system"
                />
            )}
            <div ref={scrollRef}></div>
        </div>
    )
}