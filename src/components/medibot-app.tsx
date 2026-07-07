"use client";

import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { demoPrompts } from "@/lib/medibot";
import {
  AlertTriangle,
  ArrowUp,
  HeartPulse,
  LoaderCircle,
  MessageSquareHeart,
  ShieldAlert,
  Stethoscope,
  Wifi,
} from "lucide-react";
import { useState } from "react";

const highlights = [
  {
    title: "Health education",
    description: "Explains symptoms, home care, and prevention in clear language.",
    icon: HeartPulse,
  },
  {
    title: "Rural context",
    description: "Designed for low-resource settings where clinic access may be delayed.",
    icon: Wifi,
  },
  {
    title: "Safety first",
    description: "Pushes urgent cases toward immediate in-person medical attention.",
    icon: ShieldAlert,
  },
];

export function MediBotApp() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();
  const isBusy = status === "submitted" || status === "streaming";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isBusy) {
      return;
    }

    sendMessage({ text: trimmedInput });
    setInput("");
  }

  function handlePrompt(prompt: string) {
    if (isBusy) {
      return;
    }

    sendMessage({ text: prompt });
  }

  return (
    <main className="relative flex-1 overflow-x-clip">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="grid flex-1 gap-6 xl:grid-cols-[1.05fr_1.2fr]">
          <section className="min-w-0 flex flex-col justify-between rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(33,64,86,0.96),rgba(13,27,42,0.94))] p-5 text-white shadow-2xl shadow-cyan-950/20 sm:p-8">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
                <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 font-medium text-cyan-100">
                  ND Project Presentation
                </span>
                <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-amber-100">
                  Next.js + Vercel AI SDK
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex min-w-0 items-center gap-3 text-cyan-100">
                  <div className="rounded-2xl bg-white/10 p-3">
                    <Stethoscope className="size-6" />
                  </div>
                  <p className="min-w-0 text-sm font-medium tracking-[0.2em] uppercase text-cyan-100/75 sm:tracking-[0.24em]">
                    MediBot
                  </p>
                </div>

                <h1 className="max-w-2xl text-balance font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  Development of a medical chatbot for rural healthcare.
                </h1>

                <p className="max-w-2xl text-sm leading-7 text-slate-200 sm:text-lg sm:leading-8">
                  A presentation-ready chatbot prototype that supports symptom
                  education, prevention advice, and early referral guidance for
                  underserved communities.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                {highlights.map(({ title, description, icon: Icon }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm"
                  >
                    <Icon className="mb-3 size-5 text-cyan-200" />
                    <h2 className="font-medium text-white">{title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-amber-300/20 bg-amber-200/10 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 size-5 text-amber-200" />
                  <div className="space-y-2">
                    <h2 className="font-medium text-amber-50">
                      Important medical disclaimer
                    </h2>
                    <p className="text-sm leading-6 text-amber-100/85">
                      This demo does not replace a doctor, nurse, pharmacist,
                      or community health worker. Emergency symptoms should
                      always be referred for urgent in-person care.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <StatCard label="Core stack" value="AI SDK v6" />
              <StatCard label="UI pattern" value="Streaming chat" />
              <StatCard label="Use case" value="Rural triage education" />
            </div>
          </section>

          <section className="min-w-0 flex min-h-[640px] flex-col rounded-[2rem] border border-white/10 bg-black/35 shadow-2xl shadow-black/20 backdrop-blur-xl sm:min-h-[720px]">
            <div className="border-b border-white/10 px-4 py-4 sm:px-6">
              <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium text-white">Chat with MediBot</p>
                  <p className="text-sm text-slate-300">
                    Ask about symptoms, prevention, first aid, maternal health,
                    or when to visit a clinic.
                  </p>
                </div>
                <div className="inline-flex max-w-full items-center gap-2 self-start rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                  <MessageSquareHeart className="size-4" />
                  Safety-guided responses
                </div>
              </div>
            </div>

            <div className="border-b border-white/10 px-4 py-4 sm:px-6">
              <div className="flex flex-wrap gap-2">
                {demoPrompts.map((prompt) => (
                  <Button
                    key={prompt}
                    className="h-auto max-w-full whitespace-normal rounded-3xl border-white/10 bg-white/5 px-4 py-2 text-left text-xs leading-5 text-slate-200 hover:bg-white/10 sm:rounded-full"
                    disabled={isBusy}
                    onClick={() => handlePrompt(prompt)}
                    size="sm"
                    type="button"
                    variant="outline"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>

            <div className="relative min-w-0 flex-1 px-1.5 pb-1.5 sm:px-3 sm:pb-3">
              <Conversation className="h-full">
                <ConversationContent className="px-3 py-5 sm:px-4">
                  {messages.length === 0 ? (
                    <ConversationEmptyState
                      className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/4"
                      description="Try one of the sample prompts above or ask your own health question."
                      icon={<Stethoscope className="size-8" />}
                      title="Medical guidance for rural communities"
                    >
                      <div className="mx-auto max-w-md space-y-3 text-center">
                        <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-cyan-400/12 text-cyan-200">
                          <Stethoscope className="size-8" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">
                            MediBot is ready to assist
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            Ask about fever, diarrhea, pregnancy warning signs,
                            wound care, child health, or prevention tips.
                          </p>
                        </div>
                      </div>
                    </ConversationEmptyState>
                  ) : null}

                  {messages.map((message) => (
                    <Message from={message.role} key={message.id}>
                      <div
                        className={cn(
                          "mb-1 text-xs font-medium uppercase tracking-[0.24em] text-slate-400",
                          message.role === "user" ? "text-right" : "text-left"
                        )}
                      >
                        {message.role === "user" ? "You" : "MediBot"}
                      </div>
                      <MessageContent
                        className={cn(
                          message.role === "assistant" &&
                            "min-w-0 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 shadow-lg shadow-black/10"
                        )}
                      >
                        {message.parts.map((part, index) =>
                          part.type === "text" ? (
                            <MessageResponse
                              className="prose prose-invert max-w-none break-words prose-p:leading-7 prose-strong:text-white prose-headings:text-white"
                              key={`${message.id}-${index}`}
                            >
                              {part.text}
                            </MessageResponse>
                          ) : null
                        )}
                      </MessageContent>
                    </Message>
                  ))}

                  {error ? (
                    <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-red-100">
                      {error.message}
                    </div>
                  ) : null}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>
            </div>

            <div className="border-t border-white/10 p-3 sm:p-5">
              <form className="space-y-3" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="medical-question">
                  Ask a medical question
                </label>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-3 shadow-inner shadow-black/10">
                  <textarea
                    className="min-h-24 w-full resize-none border-0 bg-transparent px-2 py-2 text-sm leading-7 text-white outline-none placeholder:text-slate-400 sm:min-h-28"
                    disabled={isBusy}
                    id="medical-question"
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Example: A patient has fever, headache, and weakness for two days. What should they do?"
                    value={input}
                  />
                  <div className="flex flex-col gap-3 border-t border-white/10 px-2 pt-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-md text-xs leading-5 text-slate-400">
                      Keep questions clear. Include age group, symptoms, and
                      how long the illness has lasted.
                    </p>
                    <Button
                      className="w-full rounded-full px-4 sm:w-auto"
                      disabled={!input.trim() || isBusy}
                      size="lg"
                      type="submit"
                    >
                      {isBusy ? (
                        <LoaderCircle className="size-4 animate-spin" />
                      ) : (
                        <ArrowUp className="size-4" />
                      )}
                      Send
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-300">
        {label}
      </p>
      <p className="mt-2 font-[family-name:var(--font-mono)] text-sm text-white">
        {value}
      </p>
    </div>
  );
}
