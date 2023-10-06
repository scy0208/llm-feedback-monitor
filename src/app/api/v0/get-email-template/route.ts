import { createClient } from '@/utils/supabase';

type RequestData = {
    email: string,
    labels: string[]
}

async function get_templates(email: string, labelNames: string[]): Promise<any> {
    let queryBuilder = createClient()
        .from('email_templates')
        .select(`template`)
        .eq('email', email)
        .in('label_name', labelNames)
    const { data, error } = await queryBuilder;
    const res = data?.map((d: any) => d.template)
    console.log(res);
    return res;
}

export async function POST(request: Request) {
    const { email, labels } = (await request.json()) as RequestData
    const templates = await get_templates(email, labels)
    if (!templates) {
        return new Response("", { status: 200 })
    }
    return new Response(JSON.stringify(templates), { status: 200 })
}