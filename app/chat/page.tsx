'use client'

import React, { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { PlusCircle, Send, Bot } from "lucide-react"
import { DynamicWidget } from "@dynamic-labs/sdk-react-core"
import Link from "next/link"
// import { useXmtp } from "../xmtp/useXmtp"

type Chat = {
  id: string
  name: string
  address: string
  lastMessage: string
}

type Message = {
  id: string
  sender: string
  content: string
  timestamp: string
}

const dummyChats: Chat[] = [
  { id: '1', name: 'Alice.eth', address: '0x1234...5678', lastMessage: 'Hey, how are you?' },
  { id: '2', name: 'Bob', address: '0x9876...5432', lastMessage: 'Did you see the latest block?' },
  { id: '3', name: 'Charlie.eth', address: '0xabcd...efgh', lastMessage: 'I\'m working on a new dApp!' },
]

const botChat: Chat = {
  id: 'bot',
  name: 'MyBot',
  address: '0x88577f57Afe120f003E4Ad52B7E0F37400f3240E',
  lastMessage: 'How can I assist you today?'
}

const dummyMessages: Record<string, Message[]> = {
  '1': [
    { id: '1', sender: '0x1234...5678', content: 'Hey, how are you?', timestamp: '10:30 AM' },
    { id: '2', sender: 'me', content: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
    { id: '2', sender: 'me', content: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
    { id: '2', sender: 'me', content: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
    { id: '2', sender: 'me', content: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
    { id: '2', sender: 'me', content: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
    { id: '2', sender: 'me', content: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
    { id: '2', sender: 'me', content: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
    { id: '2', sender: 'me', content: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
    { id: '2', sender: 'me', content: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
    { id: '2', sender: 'me', content: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
    { id: '2', sender: 'me', content: 'I\'m good, thanks! How about you?', timestamp: '10:32 AM' },
  ],
  '2': [
    { id: '1', sender: '0x9876...5432', content: 'Did you see the latest block?', timestamp: '11:45 AM' },
    { id: '2', sender: 'me', content: 'Not yet, anything interesting?', timestamp: '11:47 AM' },
  ],
  '3': [
    { id: '1', sender: '0xabcd...efgh', content: 'I\'m working on a new dApp!', timestamp: '2:15 PM' },
    { id: '2', sender: 'me', content: 'That sounds exciting! What\'s it about?', timestamp: '2:18 PM' },
  ],
  'bot': [
    { id: '1', sender: '0x88577f57Afe120f003E4Ad52B7E0F37400f3240E', content: 'How can I assist you today?', timestamp: '3:00 AM' },
    { id: '2', sender: 'me', content: 'I have a question about smart contracts.', timestamp: '3:02 AM' },
  ],
}

export default function Component() {
  // const {isXmtpReady, conversations} = useXmtp();
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isBotSubscribed, setIsBotSubscribed] = useState(false)

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId)
  }

  const handleNewChat = () => {
    console.log("Starting a new chat")
  }

  const handleOpenBotChat = () => {
    setSelectedChat('bot')
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      console.log(`Sending message to ${selectedChat}: ${newMessage}`)
      setNewMessage("")
    }
  }

  const handleBotSubscribe = () => {
    setIsBotSubscribed(!isBotSubscribed)
  }

  // useEffect(() => {
  //     if (isXmtpReady) {
  //         console.log(`************************`);
  //         console.log(`READY`, conversations);
  //         console.log(`************************`);
  //     } else {
  //         console.log(`************************`);
  //         console.log(`NOT READY`, conversations);
  //         console.log(`************************`);
  //     }
  // }, [isXmtpReady, conversations]);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-800"> {/* Updated className */}
        <div className="flex justify-between items-center">
          <DynamicWidget />
          <div className="flex justify-between items-center">
            <Link href="/" className="mr-4 relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Go Back
              </span>
            </Link>
            <button onClick={() => {}} className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Subscribe to TheBot
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 border-r border-gray-800 overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Chats</h2>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={handleOpenBotChat}>
                  <Bot className="h-6 w-6" />
                  <span className="sr-only">Open Bot Chat</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleNewChat}>
                  <PlusCircle className="h-6 w-6" />
                  <span className="sr-only">New Chat</span>
                </Button>
              </div>
            </div>
            <Card
              className={`mb-2 cursor-pointer ${
                selectedChat === 'bot' ? 'bg-gray-800' : 'bg-gray-900'
              }`}
              onClick={() => handleChatSelect('bot')}
            >
              <CardHeader title="">
                <CardTitle className="text-sm font-medium">MyBot</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-400">{botChat.address}</p>
                <p className="text-sm truncate">{botChat.lastMessage}</p>
              </CardContent>
            </Card>
            {dummyChats.map((chat) => (
              <Card
                key={chat.id}
                className={`mb-2 cursor-pointer ${
                  selectedChat === chat.id ? 'bg-gray-800' : 'bg-gray-900'
                }`}
                onClick={() => handleChatSelect(chat.id)}
              >
                <CardHeader title="">
                  <CardTitle className="text-sm font-medium">{chat.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-400">{chat.address}</p>
                  <p className="text-sm truncate">{chat.lastMessage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">
                  {selectedChat === 'bot' ? 'MyBot' : dummyChats.find((chat) => chat.id === selectedChat)?.name}
                </h2>
                <p className="text-sm text-gray-400">
                  {selectedChat === 'bot' ? botChat.address : dummyChats.find((chat) => chat.id === selectedChat)?.address}
                </p>
                {selectedChat === 'bot' && (
                  <Button onClick={handleBotSubscribe} className="mt-2">
                    {isBotSubscribed ? 'Unsubscribe' : 'Subscribe'}
                  </Button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {dummyMessages[selectedChat]?.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.sender === 'me' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block p-2 rounded-lg ${
                        message.sender === 'me'
                          ? 'bg-blue-600'
                          : 'bg-gray-800'
                      }`}
                    >
                      <p className="text-white">{message.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-800">
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 mr-2 bg-gray-800 border-gray-700 text-white"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
