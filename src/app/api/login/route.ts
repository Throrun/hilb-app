import { z } from "zod";

const schema = z.object({
    password: z.string().min(1),
});

export async function POST(request: Request) {
    const formData = await request.json();
    const result = schema.safeParse(formData);
    if (!result.success) {
        return new Response("Invalid form data", { status: 400 });
    }
    const password = result.data.password.trim();

    return new Response("success", {
        status: 200,
        headers: {
            "Set-Cookie": `password=${password}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
    });
}
