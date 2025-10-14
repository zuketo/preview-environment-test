# Preview Environment Test

A minimal Next.js project designed for testing Render deployments with three different service types: a web service, a static site, and a background worker.

## 🚀 Services Overview

This project demonstrates three different ways to deploy applications on Render:

### 1. Web Service
- **Type**: Next.js development/production server
- **Use Case**: Full-stack applications with server-side rendering
- **Features**: Hot reloading, API routes, dynamic content
- **Command**: `npm run dev` (dev) or `npm run build && npm run start` (production)

### 2. Static Site
- **Type**: Static HTML/CSS/JS export
- **Use Case**: Static websites, documentation, marketing sites
- **Features**: Pre-rendered pages, CDN-friendly, fast loading
- **Command**: `npm run export` (generates files in `out/` directory)

### 3. Background Worker
- **Type**: Long-running Node.js process
- **Use Case**: Background tasks, scheduled jobs, data processing
- **Features**: Continuous execution, console logging, process management
- **Command**: `npm run worker`

## 📁 Project Structure

```
preview-test/
├── pages/
│   └── index.js          # Homepage component
├── public/
│   └── data.json         # Static data file
├── tests/
│   ├── web-service.spec.js    # Web service tests
│   ├── static-site.spec.js    # Static site tests
│   └── worker.spec.js         # Worker tests
├── worker.js             # Background worker script
├── next.config.js        # Next.js configuration
├── render.yaml           # Render deployment config
└── package.json          # Dependencies and scripts
```

## 🛠️ Local Development

### Web Service
```bash
# Start development server
npm run dev
# Visit http://localhost:3000
```

### Static Site
```bash
# Build static site
npm run export

# Serve static files
cd out && python3 -m http.server 8000
# Visit http://localhost:8000
```

### Background Worker
```bash
# Start worker process
npm run worker
# Check console for "Preview test" messages
```

## 🧪 Testing

The project includes comprehensive Playwright tests for all three services:

### Test Configuration

- **Web Service Tests** - Tests the Next.js development/production server
- **Static Site Tests** - Tests the static export
- **Worker Tests** - Tests the background worker process

### Running Tests

#### 1. Web Service Tests

**Local Development Server:**
```bash
# Start the dev server
npm run dev

# Run web service tests (in another terminal)
npm run test:web
```

**Production Server:**
```bash
# Build and start production server
npm run build
npm run start

# Run web service tests (in another terminal)
npm run test:web
```

**Against Render Web Service:**
```bash
# Replace with your actual Render URL
BASE_URL=https://your-web-service.onrender.com npm run test:web
```

#### 2. Static Site Tests

**Local Static Server:**
```bash
# Build static site
npm run export

# Serve static files locally
cd out && python3 -m http.server 8000

# Run static site tests (in another terminal)
npm run test:static-local
```

**Against Render Static Site:**
```bash
# Replace with your actual Render URL
BASE_URL=https://your-static-site.onrender.com npm run test:static
```

#### 3. Worker Tests

**Local Worker:**
```bash
# Run worker tests (starts worker automatically)
npm run test:worker
```

**Against Render Worker:**
```bash
# Worker tests can't run against remote workers directly
# They test the worker process locally
npm run test:worker
```

### Test Commands Summary

| Command | Purpose | Target |
|---------|---------|--------|
| `npm run test` | Run all tests | All services |
| `npm run test:web` | Web service tests | Next.js server |
| `npm run test:static` | Static site tests | Static export |
| `npm run test:worker` | Worker tests | Background worker |
| `npm run test:local` | All tests against localhost:3000 | Local dev server |
| `npm run test:static-local` | Static tests against localhost:8000 | Local static server |

### Environment Variables

- `BASE_URL` - Override the base URL for tests (default: http://localhost:3000)
- `START_SERVER` - Set to true to start a server before running tests
- `START_COMMAND` - Command to start the server (default: npm run dev)
- `PORT` - Port for the test server (default: 3000)

## 🚀 Render Deployment

### Web Service
```yaml
- type: web
  runtime: node
  buildCommand: npm install && npm run build
  startCommand: npm run start
```

### Static Site
```yaml
- type: static
  buildCommand: npm install && npm run export
  staticPublishPath: ./out
```

### Background Worker
```yaml
- type: worker
  runtime: node
  buildCommand: npm install
  startCommand: npm run worker
```

## 🔧 CI/CD Integration

For Render deployment, you can add test commands to your build process:

```yaml
# In render.yaml
buildCommand: npm install && npm run export && npm run test:static
```

Or run tests after deployment:
```bash
# After deployment
BASE_URL=https://your-app.onrender.com npm run test:web
```

## 📋 Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build production server |
| `npm run start` | Start production server |
| `npm run export` | Build static site |
| `npm run worker` | Start background worker |
| `npm run test` | Run all tests |
| `npm run test:web` | Run web service tests |
| `npm run test:static` | Run static site tests |
| `npm run test:worker` | Run worker tests |

## 🎯 Purpose

This project serves as a minimal example for testing Render's three main service types:
- **Web Service**: For full-stack applications
- **Static Site**: For static websites and documentation
- **Background Worker**: For background processing tasks

Each service type includes comprehensive tests to ensure proper functionality both locally and when deployed to Render.
