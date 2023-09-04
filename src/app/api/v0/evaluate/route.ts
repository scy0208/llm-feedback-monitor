import { createClient } from '@/utils/supabase';


export const runtime = 'edge';

type RequestData = {
    projectId: string,
    instruction: string,
    response: string,
}

const systemSetting = {
    role: "system",
    content: "You are a instruction-response quality evaluator. With the following instruction and response, evaluate  whether the instruction is fully followed. Your response should in json format {result: boolean, reason: string}, reason should be concise."
}

const temperature = 0
const model = "gpt-3.5-turbo-0613"

async function checkProject(projectId: string) {
    const { data, error } = await createClient()
        .from('project')
        .select('*')
        .eq('id', projectId);
    return { data, error };
}

export async function OPTIONS(req: Request) {
    return new Response(null, { status: 200 });
}

export async function POST(request: Request) {
    const { projectId, instruction, response } = (await request.json()) as RequestData
    const { data, error } = await checkProject(projectId);

    if (error || !data) {
        return new Response(JSON.stringify({ error: 'project not exist' }), { status: 400 });
    }

    const userMessage = {
        role: "user",
        content: `Instruction:\n ${instruction} \n\n Response:\n ${response}`
    }

    const payload = {
        model,
        messages: [systemSetting, userMessage],
        temperature,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 1000,
        n: 1,
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
        },
        method: 'POST',
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const resData = await res.json();
        return new Response(JSON.stringify({ error: resData }), { status: 500 });
    }

    const resData = await res.json();
    const content = resData.choices[0]['message']['content'];
    console.log(content);
    let parsedContent;
    try {
        parsedContent = JSON.parse(content);
        console.log(parsedContent);
        return new Response(JSON.stringify(parsedContent), { status: 200 });
    } catch (error) {
        console.error('Content is not in JSON format:', error);
        return new Response(JSON.stringify({"result":"false", "reason": "Check model did response in JSON"}), { status: 500 });
    }
}
