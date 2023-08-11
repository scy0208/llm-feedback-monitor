import { createClient } from '@/utils/supabase';

type RequestData = {
    project_id: string,
    config_id: string,
    content_id: string,
    group_id?: string
    key: string,
    score: number,
    user?: string,
    comment?: string,
    id?: string
}

export const runtime = 'edge';

export async function createFeedback(
    { project_id, config_id, content_id, group_id, key, score, comment, user, id }: RequestData) {

    if (!project_id) {
        throw new Error("project_id is required");
    }
    if (!config_id) {
        throw new Error("config_id is required");
    }
    if (!content_id) {
        throw new Error("content_id is required");
    }
    if (!key) {
        throw new Error("key is required");
    }
    if(!score) {
        throw new Error("score is required");
    }

    const dataToInsert = {
        project_id,
        config_id,
        content_id,
        group_id,
        key,
        score,
        comment,
        user,
        feedback_source: "API",
        ...(id ? { id } : {}), // Include the ID if provided, otherwise leave it undefined so that the database auto-generates it
    };

    const { data, error } = await createClient()
        .from('Feedback')
        .upsert([dataToInsert])
        .select();

    if (error || !data || data.length === 0) {
        throw new Error(error?.message || "Data is null or empty");
    }

    return data[0].id;
}

export async function PUT(req: Request) {
    if(req.method == 'OPTIONS') {
        return new Response(null, { status: 200 });
    }

    try {
        const requestData = (await req.json()) as RequestData;
        if (!requestData.project_id) {
            return new Response(JSON.stringify({ message: 'Project_id is required ' }), { status: 400 });
        }

        if (!requestData.config_id) {
            return new Response(JSON.stringify({ message: 'Config_id is required' }), { status: 400 });
        }

        if (!requestData.content_id) {
            return new Response(JSON.stringify({ message: 'Content_id is required' }), { status: 400 });
        }

        if (!requestData.key) {
            return new Response(JSON.stringify({ message: 'Key is required' }), { status: 400 });
        }

        if (!requestData.score) {
            return new Response(JSON.stringify({ message: 'Score is required' }), { status: 400 });
        }

        const id = await createFeedback(requestData);
        return new Response(JSON.stringify({ id }), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
