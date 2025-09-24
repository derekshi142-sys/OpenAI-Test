# Netlify Deployment Guide

This guide will help you deploy your AI assistant to Netlify with proper API key security.

## 🚀 Quick Deployment Steps

### Method 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub** (already done)
   - Your code is at: `https://github.com/derekshi142-sys/OpenAI-Test`

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with your GitHub account
   - Click "New site from Git"
   - Choose "GitHub" and select your repository

3. **Configure Build Settings**
   - Build command: `echo 'No build step required'`
   - Publish directory: `.` (root directory)
   - Click "Deploy site"

4. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add new variable:
     - Key: `OPENAI_API_KEY`
     - Value: `your_openai_api_key_here`

5. **Redeploy**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Deploy site"

### Method 2: Drag & Drop Deployment

1. **Prepare files**
   - Zip all files except `.env` and `.git` folder
   - Include: `index.html`, `ai-assistant.html`, `ai-assistant.js`, `ai-styles.css`, `styles.css`, `config.js`, `netlify.toml`, `netlify-functions/`

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your zip file to the deploy area
   - Wait for deployment to complete

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `OPENAI_API_KEY` with your API key value

## 🔧 Configuration Files Added

### `netlify.toml`
- Configures build settings
- Sets up redirects
- Adds security headers
- Enables CORS for OpenAI API calls

### `netlify-functions/get-api-key.js`
- Serverless function to securely provide API key
- Prevents API key exposure in client-side code
- Handles CORS properly

### Updated `ai-assistant.js`
- Loads API key from Netlify function in production
- Falls back to config for local development
- Better error handling

## 🔒 Security Features

1. **API Key Protection**
   - API key stored as environment variable
   - Never exposed in client-side code
   - Accessed through secure serverless function

2. **CORS Configuration**
   - Proper headers for OpenAI API calls
   - Security headers to prevent XSS attacks

3. **Environment Separation**
   - Different behavior for local vs production
   - Secure fallbacks

## 🧪 Testing Your Deployment

1. **Visit your Netlify URL**
   - Go to `https://your-site-name.netlify.app`
   - Open `ai-assistant.html`

2. **Test the AI Assistant**
   - Ask: "What date is today?"
   - Ask: "Is Monaco in Europe?"
   - Verify responses are working

3. **Check Console**
   - Open browser dev tools
   - Look for "API key loaded from Netlify function" message

## 🐛 Troubleshooting

### Common Issues:

1. **"API key not available" error**
   - Check environment variable is set correctly
   - Redeploy after setting environment variable
   - Check Netlify function logs

2. **CORS errors**
   - Verify `netlify.toml` headers are correct
   - Check browser console for specific errors

3. **Function not found**
   - Ensure `netlify-functions/get-api-key.js` is deployed
   - Check function name matches exactly

### Debug Steps:

1. **Check Environment Variables**
   - Site settings → Environment variables
   - Verify `OPENAI_API_KEY` is set

2. **Check Function Logs**
   - Functions tab → View function logs
   - Look for any error messages

3. **Test Function Directly**
   - Visit `https://your-site.netlify.app/.netlify/functions/get-api-key`
   - Should return JSON with API key

## 📝 Important Notes

- **Never commit API keys** to version control
- **Use environment variables** for all sensitive data
- **Test locally** before deploying
- **Monitor usage** to avoid API limits

## 🎉 Success!

Once deployed, your AI assistant will be available at:
`https://your-site-name.netlify.app/ai-assistant.html`

The assistant will work securely with your OpenAI API key and can answer any general questions!
