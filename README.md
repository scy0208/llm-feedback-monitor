
# Introduction
LLM-feedback is a tool designed for LLM app developers to collect and monitor feedback on AI-generated content. Utilizing this tool, you can:

- Monitor feedback on AI-generated content, staying informed about how users are impacted by changes in the LLM configuration, be it prompts, models, or other settings.
- Track every modification to your LLM configuration and aggregate feedback for each version, enabling efficient LLM A/B testing.
- Gain deeper insights into user-AI interactions and the context surrounding specific feedback.

With the help of the client SDK, integration will be easy. Client SDK: https://github.com/scy0208/llm-feedback-client 

# Getting Started (Cloud Host Solution)

## Register and create project
Go to https://www.llmfeedback.com/register, connect your github account, and create a new project in the dashboard

## Install llm-feedback-client NodeJS SDK
````mdx
npm install llm-feedback-client@latest

````
## Create a client in your app:
```ts showLineNumbers {3}
import { Client } from "llm-feedback-client"

const feedbackClient = new Client({
    projectId: 'YOUR_PROJECT_ID',
    apiKey: 'YOUR_API_KEY'
});
```

## Register your LLM config:
```ts showLineNumbers

export default async function callLLM(request: Request) {
    const systemSetting = { 
        role: "system", 
        content: "You are a knowledgable assistant helping Intellectual Property Practitioners understand other domain knowledges." +  
        "Follow the user\'s instructions carefully. Respond using markdown." + 
        "at the end of your response highlight that please ask user to click feedback button"
    }
    const temperature = 0.7
    const model = process.env.OPENAI_GPT_MODEL

    const configName = "VERSION_DOMAIN_08-20"

    await feedbackClient.registerConfig({
        configName, 
        config: {
            // put whatever you want here
            model,
            systemSetting,
            temperature
        } 
    })
    ...
}
```

## Store user input and AI generated content:
`id` can be used in link a feedback to a specific content.
`groupId` can help group together the user-AI interation (e.g. a conversation).  
```ts showLineNumbers {3}
const handleSubmit = async (user: string, userInput: string, conversationId: string) => {
    const userMessageId = uuidv4()
    await feedbackClient.storeContent({
        content: userInput,
        configName: "YOUR_LLM_CONFIG_VERSION_NAME",
        id: userMessageId,
        groupId: conversationId,
        createdBy: user,
    })

    const aiGeneratedContent: String = await callLLMandHandleAIResponse(userInput)

    const aiContendId = uuidv4() // this aiContendId will be used in the feedback
    await feedbackClient.storeContent({
        content: aiGeneratedContent,
        configName: "YOUR_LLM_CONFIG_VERSION_NAME",
        id: aiContendId,
        groupId: conversationId,
        createdBy: 'assistant',
    })
    ...
}
```

## Create feedback on specific content
```ts showLineNumbers {3}
  const createFeedback = async (contentId: string, key: string, score: number, comment?: string) => {
    await feedebackClient.createFeedback({
      contentId,
      key,
      score,
      user,
      comment
    })
  }

```
In your UI component:
```html
<button type="button" onClick={() => createFeedback(aiContendId, "thumb_up", 1)}
    <ThumbUpIcon />
</button>
```
