# Netlify Deployment Fix Instructions

## 🚨 **Current Issue**
The AI assistant works locally but fails on Netlify with this error:
```
CONFIG not defined or API key not found: SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

This happens because the Netlify function isn't working properly.

## 🔧 **Step-by-Step Fix**

### 1. **Redeploy to Netlify**
The code has been fixed with the correct Netlify function structure. You need to redeploy:

1. **Go to your Netlify dashboard**
2. **Go to your site's Deploys tab**
3. **Click "Trigger deploy" → "Deploy site"**

### 2. **Set Environment Variable**
Make sure your API key is set as an environment variable:

1. **Go to Site settings → Environment variables**
2. **Add/Edit the variable:**
   - Key: `OPENAI_API_KEY`
   - Value: `your_openai_api_key_here`
3. **Save the variable**

### 3. **Test the Netlify Function**
After deployment, test the function directly:

1. **Visit:** `https://your-site-name.netlify.app/.netlify/functions/get-api-key`
2. **You should see:** `{"apiKey":"your-api-key-here"}`
3. **If you see HTML or error:** The function isn't working

### 4. **Check Function Logs**
If the function still doesn't work:

1. **Go to Functions tab in Netlify dashboard**
2. **Click on "get-api-key" function**
3. **Check the logs for errors**

## 🛠️ **What Was Fixed**

### **File Structure Fix:**
- **Before:** `netlify-functions/get-api-key.js` ❌
- **After:** `netlify/functions/get-api-key.js` ✅

### **Function Improvements:**
- Added proper CORS headers
- Added OPTIONS method handling
- Better error handling
- Improved response format

### **AI Assistant Improvements:**
- Better error handling for Netlify function calls
- Clearer console logging
- Proper fallback to local config

## 🧪 **Testing Steps**

### **1. Test Function Directly**
```bash
curl https://your-site-name.netlify.app/.netlify/functions/get-api-key
```
Should return: `{"apiKey":"your-api-key-here"}`

### **2. Test AI Assistant**
1. Go to your Netlify site
2. Open browser console (F12)
3. Look for: "API key loaded from Netlify function"
4. Try asking: "What date is today?"

### **3. Check Console Messages**
- ✅ **Success:** "API key loaded from Netlify function"
- ❌ **Error:** "Error calling Netlify function" or "No API key in response"

## 🚀 **Deployment Checklist**

- [ ] Code pushed to GitHub with correct file structure
- [ ] Netlify site redeployed
- [ ] Environment variable `OPENAI_API_KEY` set
- [ ] Function accessible at `/.netlify/functions/get-api-key`
- [ ] AI assistant working on live site

## 🆘 **If Still Not Working**

### **Common Issues:**

1. **Function not found (404)**
   - Check file is in `netlify/functions/` directory
   - Redeploy the site

2. **Function returns HTML**
   - Environment variable not set
   - Function has syntax errors

3. **CORS errors**
   - Function headers are correct now
   - Try hard refresh (Ctrl+F5)

4. **API key not in response**
   - Check environment variable is set correctly
   - Check function logs for errors

### **Debug Commands:**
```bash
# Check if function exists
curl -I https://your-site.netlify.app/.netlify/functions/get-api-key

# Test function response
curl https://your-site.netlify.app/.netlify/functions/get-api-key
```

## ✅ **Success Indicators**

When working correctly, you should see:
- Function returns JSON with API key
- Console shows "API key loaded from Netlify function"
- AI assistant responds to questions
- No CORS or JSON parsing errors

The fix is now in the code - just redeploy and set the environment variable!
