# HubClaw Backend API

A production-ready, high-performance backend API for HubClaw - GitHub-like platform for AI Agents.

## 🚀 Features

- **Node.js + TypeScript** with strict type checking
- **Express.js** modular routing architecture
- **Supabase** PostgreSQL database integration
- **Supabase Auth** JWT verification middleware
- **BYOK (Bring Your Own Key)** model for Google Gemini API
- **Vercel/Render** compatible deployment
- **CORS** configured for secure frontend communication
- **Error handling** middleware

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── environment.ts      # Environment configuration
│   │   └── supabaseClient.ts   # Supabase client setup
│   ├── controllers/
│   │   ├── agentController.ts  # Agent CRUD operations
│   │   ├── runController.ts    # Sandbox engine endpoint
│   │   └── analyticsController.ts # Telemetry analytics
│   ├── middleware/
│   │   └── authMiddleware.ts   # Supabase JWT verification
│   ├── routes/
│   │   ├── agentRoutes.ts      # /api/agents routes
│   │   ├── runRoutes.ts        # /api/run routes
│   │   └── analyticsRoutes.ts  # /api/analytics routes
│   ├── app.ts                  # Express app configuration
│   └── index.ts                # Server entry point
├── .env.example
├── package.json
└── tsconfig.json
```

## 🛠️ Setup & Installation

### 1. Prerequisites

- Node.js 18+ 
- npm or yarn or bun
- Supabase project (with PostgreSQL database)

### 2. Environment Variables

Create a `.env` file in the backend directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 3. Supabase Database Schema

Create the following tables in your Supabase database:

#### Table: `profiles`
```sql
create table profiles (
  id uuid references auth.users not null primary key,
  encrypted_gemini_api_key text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );
```

#### Table: `agents`
```sql
create table agents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users,
  name text not null,
  description text,
  system_prompt text,
  model_engine text default 'gemini-1.5-pro',
  temperature numeric default 0.7,
  max_tokens integer default 8192,
  tools_config jsonb default '{}'::jsonb,
  github_sync_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table agents enable row level security;

create policy "Public profiles are viewable by everyone"
  on agents for select
  using ( true );

create policy "Users can insert their own agents"
  on agents for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own agents"
  on agents for update
  using ( auth.uid() = user_id );

create policy "Users can delete own agents"
  on agents for delete
  using ( auth.uid() = user_id );
```

#### Table: `telemetry_logs`
```sql
create table telemetry_logs (
  id uuid default gen_random_uuid() primary key,
  agent_id uuid references agents,
  user_id uuid references auth.users not null,
  tokens_used integer default 0,
  latency_ms integer default 0,
  status text default 'success',
  executed_tool text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table telemetry_logs enable row level security;

create policy "Users can view own logs"
  on telemetry_logs for select
  using ( auth.uid() = user_id );

create policy "Users can insert own logs"
  on telemetry_logs for insert
  with check ( auth.uid() = user_id );
```

### 4. Install Dependencies

```bash
cd backend
npm install
```

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## 📡 API Endpoints

### Health Check
- `GET /health` - Check server status

### Agents
- `GET /api/agents` - List agents (public or user's own)
- `GET /api/agents/:id` - Get agent by ID
- `POST /api/agents` - Create new agent (requires auth)

### Run Agent (Sandbox Engine)
- `POST /api/run` - Execute an agent with user input (requires auth)
  - Body: `agentId`, `systemPrompt`, `userMessage`, `modelEngine`, `temperature`, `maxTokens`, `toolsConfig`

### Analytics
- `GET /api/analytics/:agentId` - Get telemetry data for an agent (requires auth)

## 🔐 Authentication

All protected endpoints require a valid Supabase JWT token in the Authorization header:

```
Authorization: Bearer YOUR_SUPABASE_JWT_TOKEN
```

## 📦 Deployment

### Vercel Serverless Functions
The project is compatible with Vercel. Configure your vercel.json accordingly.

### Render Free Tier
- Connect your GitHub repo
- Set environment variables in Render dashboard
- Deploy!

## 🚀 Scripts

- `npm run dev` - Start dev server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 💡 Key Concepts

### BYOK (Bring Your Own Key)
Users must configure their own Google Gemini API key in their profile. This keeps server costs at $0!

### Telemetry
Every agent execution is logged with latency, token usage, and status for analytics.

## 📄 License

MIT
