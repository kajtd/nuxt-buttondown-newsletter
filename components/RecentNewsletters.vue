<template>
    <div class="my-8">
      <div v-if="loading" class="text-center py-8 text-slate-500">
        Loading recent newsletters...
      </div>
      <div v-else-if="newsletters.length" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          v-for="newsletter in newsletters"
          :key="newsletter.id"
          :href="newsletter.absolute_url"
          target="_blank"
        >
          <article class="border border-slate-200">
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">{{ newsletter.subject }}</h3>
              <time
                :datetime="newsletter.creation_date"
                class="block text-slate-500"
              >
                {{ formatDate(newsletter.creation_date) }}
              </time>
            </div>
          </article>
        </a>
      </div>
  
      <div v-else class="text-center py-8 text-slate-500">
        No newsletters available yet. Subscribe to be the first to receive them!
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const { newsletters, loading, error, fetchNewsletters } = useNewsletters();
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  onMounted(() => {
    fetchNewsletters();
  });
  </script>
  