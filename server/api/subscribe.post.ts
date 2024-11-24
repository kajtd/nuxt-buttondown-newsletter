import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  if (!body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email is required",
    });
  }

  try {
    const response = await $fetch(
      "https://api.buttondown.email/v1/subscribers",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${config.private.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: body.email,
          type: "regular",
        }),
      }
    );

    return response;
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to subscribe to the newsletter",
    });
  }
});
