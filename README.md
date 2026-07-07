# MediBot

MediBot is a school project prototype for the topic:

**Development of a Medical Chatbot for Rural Healthcare**

It is built with:

- `Next.js` App Router
- `Vercel AI SDK`
- `Groq`
- `AI Elements`
- `shadcn/ui`

## What the app does

- accepts health-related questions in a chat interface
- gives simple, safety-first medical guidance
- focuses on rural healthcare use cases
- highlights danger signs and clinic referral advice
- includes sample prompts for presentation/demo use

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file from `.env.example`.

3. Add:

- `GROQ_API_KEY`

4. Start the app:

```bash
npm run dev
```

5. Open `http://localhost:3000`

## Build checks

These checks already pass:

```bash
npm run build
npm run lint
```

## Suggested presentation points

- The chatbot improves access to first-level health information.
- It is useful for communities where doctors are far away.
- It does not replace hospitals or clinicians.
- It can support early triage, health education, and prevention awareness.

## Demo prompts

- `A child has had diarrhea since yesterday. What should the parent do first?`
- `What are the warning signs of malaria in a rural community?`
- `A pregnant woman has swollen feet and headache. When should she go to a clinic?`
- `How do I clean and dress a minor wound safely at home?`
