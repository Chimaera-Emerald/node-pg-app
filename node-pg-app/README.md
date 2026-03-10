# node-pg-app

A Node.js + Express REST API with PostgreSQL, featuring environment-specific configuration for `dev`, `release`, and `prod`.

---

## Project Structure

```
node-pg-app/
├── src/
│   ├── config/
│   │   ├── env.js          # Dynamic env loader (reads NODE_ENV)
│   │   └── db.js           # PostgreSQL connection pool
│   ├── models/
│   │   └── user.model.js   # Table definition & init
│   ├── services/
│   │   └── user.service.js # CRUD database operations
│   ├── controllers/
│   │   └── user.controller.js  # HTTP request/response handling
│   ├── routes/
│   │   └── user.routes.js  # Express route definitions
│   └── index.js            # App entry point
├── scripts/
│   └── init.sql            # Manual DB setup script
├── .env.dev                # Dev environment variables
├── .env.release            # Release/staging variables (gitignored)
├── .env.prod               # Production variables (gitignored)
├── .gitignore
└── package.json
```

---

## Environment Configuration

The app reads `NODE_ENV` at startup and loads the matching `.env.<NODE_ENV>` file automatically.

| `NODE_ENV` | File loaded    | Database     | Port |
|------------|---------------|--------------|------|
| `dev`      | `.env.dev`    | `app_dev`    | 3000 |
| `release`  | `.env.release`| `app_release`| 3000 |
| `prod`     | `.env.prod`   | `app_prod`   | 8080 |

---

## Setup & Running

### 1. Install dependencies
```bash
npm install
```

### 2. Create databases (once per environment)
```bash
psql -U postgres -f scripts/init.sql
```

### 3. Run in each environment
```bash
npm run dev       # NODE_ENV=dev
npm run release   # NODE_ENV=release
npm run prod      # NODE_ENV=prod
```

---

## API Endpoints

All routes are prefixed with `/api/users`.

| Method | Endpoint         | Description         |
|--------|-----------------|---------------------|
| POST   | `/api/users`    | Create a user       |
| GET    | `/api/users`    | Get all users       |
| GET    | `/api/users/:id`| Get a user by ID    |
| PUT    | `/api/users/:id`| Update a user       |
| DELETE | `/api/users/:id`| Delete a user       |
| GET    | `/health`       | Health check        |

### Example Requests

**Create a user**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com"}'
```

**Get all users**
```bash
curl http://localhost:3000/api/users
```

**Update a user**
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Smith", "email": "alice.smith@example.com"}'
```

**Delete a user**
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

---

## Git Flow & Branching Strategy

This project follows **Git Flow**.

### Branch Structure

```
main          ← production-ready code only
release       ← staging/QA integration branch
develop       ← active development integration
feature/*     ← individual features
hotfix/*      ← emergency production fixes
```

### Initial Setup

```bash
git init
git add .
git commit -m "chore: initial project setup"

# Create long-lived branches
git checkout -b develop
git checkout -b release
git checkout main
```

### Workflow: Adding a Feature

```bash
# 1. Branch off develop
git checkout develop
git checkout -b feature/user-crud

# 2. Do your work, commit often
git add .
git commit -m "feat: add user CRUD service and controller"
git commit -m "feat: add user routes"

# 3. Merge back into develop
git checkout develop
git merge --no-ff feature/user-crud -m "merge: user-crud into develop"
git branch -d feature/user-crud

# 4. When develop is stable, merge into release for QA
git checkout release
git merge --no-ff develop -m "merge: develop into release for QA"

# 5. After QA passes, merge release into main (and tag it)
git checkout main
git merge --no-ff release -m "merge: release into main"
git tag -a v1.0.0 -m "release: v1.0.0"

# 6. Back-merge main into develop to stay in sync
git checkout develop
git merge main
```

### Workflow: Hotfix (urgent production bug)

```bash
# 1. Branch off main
git checkout main
git checkout -b hotfix/fix-email-validation

# 2. Fix and commit
git commit -m "fix: correct email uniqueness error handling"

# 3. Merge into main AND develop
git checkout main
git merge --no-ff hotfix/fix-email-validation -m "hotfix: fix email validation"
git tag -a v1.0.1 -m "hotfix: v1.0.1"

git checkout develop
git merge --no-ff hotfix/fix-email-validation
git branch -d hotfix/fix-email-validation
```

### Commit Message Convention

```
feat:    new feature
fix:     bug fix
chore:   tooling, config, dependencies
refactor: code change with no behaviour change
docs:    documentation only
test:    tests
```
