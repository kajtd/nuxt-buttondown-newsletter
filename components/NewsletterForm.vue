<template>
    <form @submit.prevent="subscribeToNewsletter">
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        :disabled="loading"
        class="w-full text-base px-3 py-2 mb-2 border border-gray-200 focus:ring-1 focus:ring-green-500/80 focus:border-green-500/80 outline-none transition-colors"
      />
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 bg-green-500/80 text-white font-medium hover:bg-green-600/80 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {{ loading ? "Subscribing..." : "Subscribe" }}
      </button>
  
      <div
        v-if="alert"
        :class="[
          'mt-4 p-4',
          alert === 'success'
            ? 'bg-green-100 text-green-600/90'
            : 'bg-red-100 text-red-800/90',
        ]"
      >
        <h4 class="font-medium">{{ alertTitle }}</h4>
        <p class="mt-1">{{ alertDescription }}</p>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  const {
    email,
    loading,
    alert,
    alertTitle,
    alertDescription,
    subscribeToNewsletter,
  } = useNewsletterSubscription();
  </script>
  