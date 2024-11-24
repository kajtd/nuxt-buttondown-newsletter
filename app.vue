<template>
  <div
    class="container mx-auto flex items-center justify-center flex-col min-h-screen"
  >
    <div class="border border-gray-200 rounded-md p-6 w-full max-w-3xl">
      <h2 class="text-3xl font-bold">Stay Updated 🔥</h2>
      <p class="text-gray-700/90 mb-6 mt-2 text-base">
        Subscribe to get the latest articles and updates.
      </p>
      <NewsletterForm />
    </div>

    <h2 class="text-3xl font-bold mt-12 mb-4">Recent Newsletters 👇</h2>

    <RecentNewsletters />
  </div>
</template>