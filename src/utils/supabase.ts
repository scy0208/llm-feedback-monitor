import { RequestCookies } from "@edge-runtime/cookies";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'


export function createClient() {
    const cookies = new RequestCookies(new Headers()) as any;
    return createRouteHandlerClient<any>(
        { cookies: () => cookies },
        {
            supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
        }
    )
}