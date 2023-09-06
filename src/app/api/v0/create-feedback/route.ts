import { createClient } from '@/utils/supabase';

type RequestData = {
    content_id: string,
    key: string,
    score: number,
    user?: string,
    comment?: string,
    id?: string
}

export const runtime = 'edge';

async function createFeedback(
    { content_id, key, score, comment, user, id }: RequestData) {

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
        content_id,
        key,
        score,
        comment,
        user,
        feedback_source: "API",
        ...(id ? { id } : {}), // Include the ID if provided, otherwise leave it undefined so that the database auto-generates it
    };

    const { data, error } = await createClient()
        .from('user_feedback')
        .upsert([dataToInsert], { onConflict: 'content_id,user' })
        .select();

    if (error || !data || data.length === 0) {
        throw new Error(error?.message || "Data is null or empty");
    }

    return data[0].id;
}

export async function OPTIONS(req: Request) {
    return new Response(null, { status: 200 });
}

export async function PUT(req: Request) {
    try {
        const requestData = (await req.json()) as RequestData;
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
