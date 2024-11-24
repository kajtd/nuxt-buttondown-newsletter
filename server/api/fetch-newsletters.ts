import type { Newsletter, NewsletterResponse } from "~/types/Newsletter";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch<NewsletterResponse>(
      "https://api.buttondown.email/v1/emails",
      {
        query: {
          status: "sent",
          excluded_fields: "body", // Optimize response size, we don't need the body in our case
        },
        headers: {
          Authorization: `Token ${config.private.apiKey}`,
        },
      }
    );

    // Get only the latest 3 filtered newsletters

    const filteredNewsletters: Newsletter[] = response.results
      .slice(-3)
      .map((email: Newsletter) => ({
        id: email.id,
        subject: email.subject,
        creation_date: email.creation_date,
        absolute_url: email.absolute_url,
        image: email.image,
        secondary_id: email.secondary_id,
      }));

    return filteredNewsletters;
  } catch (error) {
    console.error("Failed to fetch newsletters:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch newsletters",
    });
  }
});
