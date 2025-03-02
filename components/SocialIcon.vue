<template>
  <a
    :href="url"
    :aria-label="name"
    class="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-700/50 bg-neutral-800/70 p-2 text-gray-300 transition-all duration-300 hover:border-purple-500/40 hover:text-purple-400"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon :name="icon" class="text-xl" />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  url: string;
  icon: string;
}>();
</script>
