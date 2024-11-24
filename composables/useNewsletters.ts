import type { Newsletter } from "~/types/Newsletter";

export function useNewsletters() {
  const newsletters = ref<Newsletter[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchNewsletters = async () => {
    // Check cache first
    const cached = sessionStorage.getItem("newsletters");
    if (cached) {
      newsletters.value = JSON.parse(cached);
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<Newsletter[]>("/api/fetch-newsletters");
      newsletters.value = response;

      // Cache the response
      sessionStorage.setItem("newsletters", JSON.stringify(response));
    } catch (e) {
      error.value = "Failed to load newsletters";
      console.error("Newsletter fetch error:", e);
    } finally {
      loading.value = false;
    }
  };

  return {
    newsletters,
    loading,
    error,
    fetchNewsletters,
  };
}
