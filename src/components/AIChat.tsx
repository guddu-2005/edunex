"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, CornerDownLeft, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { aiRespondToQueries } from '@/ai/flows/ai-respond-to-queries';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiRespondToQueries({
        query: input,
        // In a real app, this context would be dynamically sourced
        // from the user's current course page, progress, etc.
        courseContext: 'The user is currently viewing a course on React. They have completed the introductory sections on components and JSX.',
      });
      
      const assistantMessage: Message = { role: 'assistant', content: response.answer };
      setMessages((prev) => [...prev, assistantMessage]);

      if (response.needsExpert) {
        toast({
          title: "Expert Help Recommended",
          description: "This seems like a complex question. I've flagged it for a human expert to provide a more detailed answer.",
        });
      }

    } catch (error) {
      console.error("AI chat error:", error);
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I encountered an error. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get a response from the AI assistant.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg z-50"
        onClick={() => setOpen(true)}
        aria-label="Open AI Assistant"
      >
        <Bot className="h-8 w-8" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle className="font-headline">AI Learning Assistant</SheetTitle>
            <SheetDescription>
              Ask me anything about your course content!
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-1 my-4 -mx-6" ref={scrollAreaRef}>
             <div className="px-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground pt-10">
                  <Bot className="mx-auto h-12 w-12" />
                  <p className="mt-2">Ready to help you learn.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
                  {m.role === 'assistant' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot size={20} /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`rounded-lg px-3 py-2 max-w-[80%] ${
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                  </div>
                   {m.role === 'user' && (
                    <Avatar className="h-8 w-8">
                       <AvatarFallback><User size={20} /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot size={20} /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-3 py-2 bg-secondary">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
              )}
            </div>
          </ScrollArea>
          <SheetFooter>
            <form onSubmit={handleSubmit} className="w-full relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="pr-12"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-10" disabled={isLoading}>
                <CornerDownLeft className="h-4 w-4" />
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
