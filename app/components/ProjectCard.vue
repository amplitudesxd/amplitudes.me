<template>
  <NuxtLink
    :href="url"
    class="group block w-full"
    rel="noopener noreferrer"
    :target="isExternal ? '_blank' : undefined"
    :external="isExternal"
  >
    <div
      class="rounded-lg border border-neutral-700/50 bg-neutral-800/70 p-4 transition-all duration-300 hover:border-purple-500/40"
    >
      <div class="flex items-center justify-between">
        <span class="font-medium text-purple-400">{{ name }}</span>
        <Icon
          name="bx:right-arrow-alt"
          class="transform text-gray-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-purple-400"
        />
      </div>
      <p class="mt-2 text-sm text-gray-400">{{ description }}</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const { url } = defineProps<{
  name: string;
  url: string;
  description: string;
}>();

const isExternal = computed(() => url.startsWith('http'));
</script>
