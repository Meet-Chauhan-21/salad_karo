# Setting up Vercel Secrets (Alternative Approach)

If you want to use Vercel secrets instead of environment variables in vercel.json, run these commands:

```bash
# Navigate to backend directory
cd backend

# Add MongoDB URL as a secret
vercel secrets add mongodb_url "mongodb+srv://meetchauhan9915_db_user:saladkaro_123@cluster0.tp8heca.mongodb.net/saladkaro"

# Add JWT Secret as a secret
vercel secrets add jwt_secret "saladkaro@9915"
```

After adding secrets, you can revert vercel.json to use:
```json
"env": {
  "MONGODB_URL": "@mongodb_url",
  "JWT_SECRET": "@jwt_secret",
  "PORT": "3030"
}
```

## Why Use Secrets?
- More secure (not visible in repository)
- Better for production environments
- Encrypted at rest

## Current Approach
I've updated vercel.json to use direct environment variables for easier deployment.