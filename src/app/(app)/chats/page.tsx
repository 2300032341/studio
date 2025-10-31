
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockUsers } from "@/lib/data";
import { Hash, Send, User as UserIcon } from "lucide-react";
import type { User } from "@/lib/types";

type Chat = {
    id: string;
    name: string;
    type: 'channel' | 'dm';
    unread?: number;
    online?: boolean;
    avatarUrl?: string;
};

const channelsData: Chat[] = [
  { id: "channel-1", name: "team-alpha-general", type: 'channel', unread: 0 },
  { id: "channel-2", name: "development", type: 'channel', unread: 3 },
  { id: "channel-3", name: "announcements", type: 'channel', unread: 1 },
];

const teamMembers: Chat[] = mockUsers.slice(0, 4).map((user, i) => ({
    id: user.id,
    name: user.name,
    type: 'dm',
    online: i < 3,
    avatarUrl: user.avatarUrl,
}));

const initialMessages: { [key: string]: { user: Partial<User>; time: string; text: string }[] } = {
    'channel-1': [
        {
            user: { name: 'Priya Sharma', avatarUrl: mockUsers[0].avatarUrl },
            time: '10:45 PM',
            text: 'Great job on the API tests everyone! All endpoints are now fully covered.'
        },
    ],
    'channel-2': [
         {
            user: { name: 'Alex Kumar', avatarUrl: mockUsers[1].avatarUrl },
            time: '10:50 PM',
            text: 'Authentication module is ready for code review. Please check the PR when you get a chance.'
        }
    ],
    'channel-3': [],
    [teamMembers[0].id]: [
        {
            user: { name: teamMembers[0].name, avatarUrl: teamMembers[0].avatarUrl},
            time: "9:00 AM",
            text: "Hey, can you take a look at my latest PR?"
        }
    ],
    [teamMembers[1].id]: [],
    [teamMembers[2].id]: [],
    [teamMembers[3].id]: [],
};


const currentUser = {
    name: "Jane Doe",
    avatarUrl: "https://images.unsplash.com/photo-1695470667338-e7e8608ff048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwZXJzb24lMjBmYWNlfGVufDB8fHx8MTc2MTc1MzE2MHww&ixlib=rb-4.1.0&q=80&w=1080",
};

export default function ChatsPage() {
  const [activeChat, setActiveChat] = useState<Chat>(channelsData[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message = {
      user: currentUser,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newMessage.trim(),
    };

    setMessages(prev => ({
        ...prev,
        [activeChat.id]: [...(prev[activeChat.id] || []), message]
    }));
    setNewMessage("");
  };


  return (
    <div className="flex h-[calc(100vh-theme(spacing.20))]">
      <div className="w-80 flex-shrink-0 border-r bg-card text-card-foreground">
        <div className="flex h-full flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold font-headline">#CorporateIntern</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">CHANNELS</h3>
              <ul className="space-y-1">
                {channelsData.map((channel) => (
                  <li key={channel.id}>
                    <Button
                      variant={activeChat.id === channel.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveChat(channel)}
                    >
                      <Hash className="mr-2 h-4 w-4" />
                      <span className="flex-1 truncate">{channel.name}</span>
                      {channel.unread && channel.unread > 0 && (
                        <Badge className="bg-red-500 text-white">
                          {channel.unread}
                        </Badge>
                      )}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4">
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">TEAM MEMBERS</h3>
                <ul className="space-y-1">
                    {teamMembers.map(member => (
                        <li key={member.id}>
                            <Button
                                variant={activeChat.id === member.id ? "secondary" : "ghost"}
                                className="w-full justify-start h-auto"
                                onClick={() => setActiveChat(member)}
                            >
                                <div className="flex items-center gap-3 py-1">
                                    <Avatar className="h-8 w-8 relative">
                                        {member.avatarUrl && <AvatarImage src={member.avatarUrl} />}
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                        {member.online && <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-card" />}
                                    </Avatar>
                                    <span className="text-sm font-medium">{member.name}</span>
                                </div>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
          </div>
          <div className="p-4 border-t">
              <div className="bg-muted p-3 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Tip: Use the analytics page to monitor progress.</p>
              </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="border-b p-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
                {activeChat.type === 'channel' ? <Hash className="h-5 w-5 text-muted-foreground"/> : <UserIcon className="h-5 w-5 text-muted-foreground"/>}
                {activeChat.name}
            </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
                {(messages[activeChat.id] || []).map((msg, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                            {msg.user.avatarUrl && <AvatarImage src={msg.user.avatarUrl} />}
                            <AvatarFallback>{msg.user.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-baseline gap-2">
                                <p className="font-semibold">{msg.user.name}</p>
                                <p className="text-xs text-muted-foreground">{msg.time}</p>
                            </div>
                            <div className="mt-1 rounded-lg bg-card p-3">
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="relative">
                <Input 
                  placeholder={`Message ${activeChat.type === 'channel' ? '#' : ''}${activeChat.name}`} 
                  className="pr-12"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
      </div>
    </div>
  );
}

