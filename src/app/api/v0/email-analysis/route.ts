import { createClient } from '@/utils/supabase';

type RequestData = {
  email: string,
  message: string
}

export const runtime = 'edge';

async function get_labels(email: string): Promise<any> {
    let queryBuilder = createClient()
        .from('email_labels')
        .select(`label_name, label_id, label_description`)
        .eq('email', email);
    const { data, error } = await queryBuilder;
    console.log(data);
    return data;
    
}

function format_system_prompt(topic_description: any, email: string): string {
  return `
  You are an email label assistant helping an e-commerce team to label a given email.
  An email contains the main message and the quoted thread (the part begin with \`>\` which can help you understand the context of the email).
  You will be given a list of lable their name, id and descriptions. 
  Please first review and understand the email and the context, compare the main message (not the context) with each label description, and select the most relevant topic(s), minimizing the number of topics selected.
  Your output should be in a list of JSON object of fields: label, label_id, confidence_score (0-1), and reason, sorted by confidence_score DESC, and using markdown.
  \n\nHere is the topic-description list:\n ${JSON.stringify(topic_description, null, 2)}
  \n\nHere is the email:\n ${email}
  `;
}

function needs_processing(email: string): boolean {
  return !email.includes("\n>") && (email.includes("wrote:") || email.includes("From:"));
}

function reformat_email(email_content: string): string {
  if (!needs_processing(email_content)) {
      return email_content;
  }

  const lines = email_content.trim().split("\n");

  // Identify the first message (and its metadata) in the email chain
  let metadata_end = 0;
  for (let idx = 0; idx < lines.length; idx++) {
      if (lines[idx].trim() === "") {
          metadata_end = idx;
          break;
      }
  }

  // Start the reformatted email with the initial metadata and message
  let reformatted = lines.slice(0, metadata_end + 1).join("\n");

  // Handle the email thread content with different indentation levels
  let depth = 0;
  for (let i = metadata_end + 1; i < lines.length; i++) {
      const stripped = lines[i].trim();

      // Identify change of sender
      if (stripped.startsWith("On ") && stripped.includes("wrote:")) {
          depth++;
          reformatted += "\n" + ">".repeat(depth) + " " + stripped;
      }
      // Skip redundant lines and separators
      else if (!stripped || stripped.startsWith("--")) {
          continue;
      } else {
          reformatted += "\n" + ">".repeat(depth) + " " + stripped;
      }
  }

  return reformatted;
}

export async function POST(request: Request) {

  let message: string;  // If you know the type, specify it here. If not, you can use 'any'.
  let email: string;

  let rawBody = '';
  try {
      rawBody = await request.text();  // Get the raw request body as a string.
      const requestData = JSON.parse(rawBody) as RequestData;
      message = requestData.message;
      email = requestData.email;
  } catch (error) {
      console.error("Failed to parse JSON:", error);
      console.error("Raw request body:", rawBody);  // Log the raw request body to see what it contains.
      return new Response("{}", { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  console.log(message);


  if (!message || !email) {
    console.log("message or email empty");
    return new Response('No message in the request', { status: 400 })
  }

  const labels = await get_labels(email);


  const systemSetting = { 
    role: "system", 
    content: format_system_prompt(labels, "")
  }

  const messages = [
    systemSetting,
    { role: "user", content: reformat_email(message) },
  ]


  const temperature = 0
  const model = "gpt-4-0613"

  const configName = "Email_Classification_20230928"

  const payload = {
    model,
    messages,
    temperature,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: false,
    n: 1,
  }

  console.log(payload)

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const responseJson = await res.json();
    const jsonResponse = responseJson.choices[0].message.content;
    
    return new Response(jsonResponse, { status: 200, headers: { 'Content-Type': 'application/json' } });
}