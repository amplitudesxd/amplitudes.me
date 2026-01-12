<template>
  <div
    v-if="spotifyData?.isPlaying"
    class="overflow-hidden rounded-lg border border-neutral-700/50 bg-neutral-800/70 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] starting:translate-y-3 starting:scale-95 starting:-rotate-1 starting:opacity-0"
  >
    <div class="flex items-center justify-between border-b border-neutral-700/50 px-4 py-3">
      <div class="flex items-center space-x-2">
        <Icon
          name="bx:bxl-spotify"
          class="text-green-500 transition-transform duration-700 ease-out starting:scale-0 starting:rotate-45"
        />
        <span class="text-sm font-medium text-gray-400">Currently listening to</span>
      </div>

      <div class="text-xs text-gray-400">{{ formatNumber(musicStats.minutes) }} mins this year</div>
    </div>

    <div class="flex items-center space-x-4 px-4 py-4">
      <div
        v-if="spotifyData.track.albumArt"
        class="h-14 w-14 shrink-0 overflow-hidden rounded-lg shadow-md transition-all delay-100 duration-700 starting:scale-90 starting:rotate-6 starting:opacity-0"
      >
        <img
          :src="spotifyData.track.albumArt"
          alt="Album cover"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="min-w-0 flex-1">
        <a
          :href="spotifyData.track.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center truncate font-medium text-gray-200 transition-all duration-300 hover:text-green-400 starting:translate-x-2 starting:opacity-0"
        >
          <span class="truncate">{{ spotifyData.track.name }}</span>
          <Icon
            name="bx:right-arrow-alt"
            class="ml-1 text-green-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
          />
        </a>

        <div
          class="mt-1 truncate text-sm text-gray-400 transition-all delay-200 duration-300 starting:translate-x-3 starting:opacity-0"
        >
          {{ spotifyData.track.artist }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { origin } = useRequestURL();
const { data: spotifyData, refresh } = useFetch(`${origin}/api/spotify`);

const { data: statsData } = await useFetch(
  `https://api.stats.fm/api/v1/users/kooper668/streams/stats?after=${+new Date(new Date().getFullYear(), 0)}`,
);

const musicStats = computed(() => ({
  count: statsData.value?.items?.count || 0,
  minutes: Math.round((statsData.value?.items?.durationMs || 0) / 60000),
}));

const formatNumber = (num) => (num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toLocaleString());

let timeout;

const getNextPoll = () => {
  if (!spotifyData.value?.isPlaying) return 31_000;

  const remaining = spotifyData.value.endsAt - Date.now();
  return Math.min(Math.max(remaining, 0) + 1000, 31_000);
};

const poll = async () => {
  await refresh();
  timeout = setTimeout(poll, getNextPoll());
};

onMounted(() => (timeout = setTimeout(poll, getNextPoll())));
onUnmounted(() => clearTimeout(timeout));
</script>
