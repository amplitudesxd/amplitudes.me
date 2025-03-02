<template>
  <a
    :href="url"
    :aria-label="name"
    class="flex items-center justify-center rounded border border-neutral-700/50 bg-neutral-800/70 p-2 text-gray-300 transition-all hover:border-purple-500/30 hover:text-purple-400"
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
