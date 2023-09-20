import { createClient } from '@/utils/supabase';


export const runtime = 'edge';

const prompt = `Please act as an impartial judge and evaluate the quality 
of the provided answer which attempts to answer the provided question based on a provided context.

For each provided context, question and answer, give your score and reasoning (5 to 30 words) for the correctness, helpfulness,
comprehensiveness and readability of the answer. 

Your response should give in json format {
    correctness: {
        score: number,
        reason: string
    },
    helpfulness: {
        score: number,
        reason: string
    },
    comprehensiveness: {
        score: number,
        reason: string
    }
}
`

const grading_instruction_scale_4_no_example = `
Below is your grading rubric: 

- Correctness: If the answer correctly answer the question, below are the details for different scores:
  - Score 0: the answer is completely incorrect, doesn’t mention anything about the question or is completely contrary to the correct answer.
  - Score 1: the answer provides some relevance to the question and answer one aspect of the question correctly.
  - Score 2: the answer mostly answer the question but is missing or hallucinating on one critical aspect.
  - Score 3: the answer correctly answer the question and not missing any major aspect
- Helpfulness: Evaluate the directness, completeness, and relevancy of the answer to the given question without. Consider the following scoring criteria:
  - Score 0: The answer is completely off-topic or irrelevant to the question, providing no useful information.
  - Score 1: The answer leaves gaps that would require the user to seek information elsewhere for a complete answer.
  - Score 2: The answer directly resolve most part the question. But didn't resolve all details of the question.
  - Score 3: The answer fully and directly addresses every part of the question, providing a complete solution or recommendation without the need for further inquiry. 
  - Score 3: If an answer involves asking for more details or follow-up questions, it should not be scored a 3, as it is not a complete solution in itself.)
- Comprehensiveness: How comprehensive is the answer, does it fully answer all aspects of the question and provide comprehensive explanation and other necessary information. Below are the details for different scores:
  - Score 0: typically if the answer is completely incorrect, then the comprehensiveness is also zero score.
  - Score 1: if the answer is correct but too short to fully answer the question, then we can give score 1 for comprehensiveness.
  - Score 2: the answer is correct and roughly answer the main aspects of the question, but it’s missing description about details. Or is completely missing details about one minor aspect.
  - Score 3: the answer is correct, and covers all the main aspects of the question
`

const openai_evaluator_function_scale_3 =    {
    'name': 'grading_function',
    'description': 'Call this function to submit the grading for the answer',
    'parameters': {
        'type': 'object',
        'properties': {
            'reasoning_for_correctness': {
                'type': 'string',
                'description': 'Your reasoning for giving the grading for the correctness of the answer. Provide 5 to 30 words explanation.'
            },
            'correctness': {
                'type': 'integer',
                'description': 'Your integer grading between 0 to 3 for the correctness of the answer.'
            },
            'reasoning_for_comprehensiveness': {
                'type': 'string',
                'description': 'Your reasoning for giving the grading for the comprehensiveness of the answer. Provide 5 to 30 words explanation.'
            },
            'comprehensiveness': {
                'type': 'integer',
                'description': 'Your integer grading between 0 to 3 for the comprehensiveness of the answer.'
            },
            'reasoning_for_readability': {
                'type': 'string',
                'description': 'Your reasoning for giving the grading for the readability of the answer. Provide 5 to 30 words explanation.'
            },
            'readability': {
                'type': 'integer',
                'description': 'Your integer grading between 0 to 3 for the readability of the answer.'
            },
        },
        'required': ['reasoning_for_correctness', 'correctness', 'reasoning_for_comprehensiveness', 'comprehensiveness', 'reasoning_for_readability', 'readability']
    }
}

type RequestData = {
    projectId: string,
    question: string,
    context: string,
    answer: string,
}

const systemSetting = {
    role: "system",
    content: prompt + grading_instruction_scale_4_no_example + openai_evaluator_function_scale_3}

const temperature = 0
const model = "gpt-4-0613"

async function checkProject(projectId: string) {
    const { data, error } = await createClient()
        .from('project')
        .select('*')
        .eq('id', projectId);
    return { data, error };
}

async function storeContent(instruction: string, response: string, result: string, context: string) {
    
    const dataToInsert = {
        instruction,
        response,
        result,
        context // Include the ID if provided, otherwise leave it undefined so that the database auto-generates it
    };
    
    await createClient()
        .from('evaluate')
        .insert([dataToInsert])
        .select();
}

export async function OPTIONS(req: Request) {
    return new Response(null, { status: 200 });
}

export async function POST(request: Request) {
    const { projectId, question, context, answer } = (await request.json()) as RequestData
    const { data, error } = await checkProject(projectId);

    if (error || !data) {
        return new Response(JSON.stringify({ error: 'project not exist' }), { status: 400 });
    }

    const userMessage = {
        role: "user",
        content: `Question:\n ${question} \n\n Answer:\n ${answer} \n\n Context:\n ${context}`
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
        storeContent(question, answer, parsedContent, context);
        return new Response(JSON.stringify(parsedContent), { status: 200 });
    } catch (error) {
        console.error('Content is not in JSON format:', error);
        return new Response(JSON.stringify({"error":"response is not in JSON format"}), { status: 500 });
    }
}
