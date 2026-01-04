import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/users/:id", ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      username: "testuser",
    });
  }),

  http.post("/api/users", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        id: "123",
        ...body,
      },
      { status: 201 }
    );
  }),
];
