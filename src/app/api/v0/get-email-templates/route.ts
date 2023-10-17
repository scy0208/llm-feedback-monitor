import { createClient } from '@/utils/supabase';

type RequestData = {
    email: string,
    labels: string[]
}

export const runtime = 'edge';

async function get_templates(email: string, labelNames: string[]): Promise<any> {
    let queryBuilder = createClient()
        .from('email_templates')
        .select('label_name, template') // Added 'label_name' to the selection.
        .eq('email', email)
        .in('label_name', labelNames)
    const { data, error } = await queryBuilder;
    
    if (!data) return {};

    // Aggregating results by 'label_name'
    let groupedTemplates: { [labelName: string]: string[] } = {};
    for (const entry of data) {
        if (entry.template !== null) { // This line filters out the null templates
            if (!groupedTemplates[entry.label_name]) {
                groupedTemplates[entry.label_name] = [];
            }
            groupedTemplates[entry.label_name].push(entry.template);
        }
    }
    console.log(groupedTemplates);
    return groupedTemplates;
}

export async function POST(request: Request) {
    const { email, labels } = (await request.json()) as RequestData
    const templates = await get_templates(email, labels)
    if (!templates || Object.keys(templates).length === 0) {
        return new Response("", { status: 200 })
    }
    return new Response(JSON.stringify(templates), { status: 200 })
}
