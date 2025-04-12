<template>
  <div
    v-if="spotifyData?.isPlaying"
    class="overflow-hidden rounded-md border border-neutral-700/50 bg-neutral-800/70 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:translate-y-3 starting:scale-95 starting:-rotate-1 starting:opacity-0"
  >
    <div class="flex items-center space-x-2 border-b border-neutral-700/50 px-4 py-3">
      <Icon
        name="bx:bxl-spotify"
        class="text-green-500 transition-transform duration-700 ease-out starting:scale-0 starting:rotate-45"
      />
      <span class="text-sm font-medium text-gray-400">Currently listening to</span>
    </div>

    <div class="flex items-center space-x-4 px-4 py-4">
      <div
        v-if="spotifyData.albumArt"
        class="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md shadow-md transition-all delay-100 duration-700 starting:scale-90 starting:rotate-6 starting:opacity-0"
      >
        <img :src="spotifyData.albumArt" alt="Album cover" class="h-full w-full object-cover" />
      </div>

      <div class="min-w-0 flex-1">
        <a
          :href="spotifyData.songUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center truncate font-medium text-gray-200 transition-all duration-300 hover:text-green-400 starting:translate-x-2 starting:opacity-0"
        >
          <span class="truncate">{{ spotifyData.trackName }}</span>
          <Icon
            name="bx:right-arrow-alt"
            class="ml-1 text-green-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
          />
        </a>

        <div
          class="mt-1 truncate text-sm text-gray-400 transition-all delay-200 duration-300 starting:translate-x-3 starting:opacity-0"
        >
          {{ spotifyData.artist }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useIntervalFn } from '@vueuse/core';

const requestFetch = useRequestFetch();

// can't use $fetch here as it does request emulation which isn't supported by Cloudflare
const { data: spotifyData, refresh } = useAsyncData('spotify-status', () =>
  requestFetch('/api/spotify'),
);
const { pause, resume } = useIntervalFn(() => refresh(), 30000, { immediate: false });

onMounted(() => resume());
onUnmounted(() => pause());
</script>
