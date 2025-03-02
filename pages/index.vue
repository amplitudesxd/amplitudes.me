<template>
  <div class="mx-auto max-w-2xl px-4 py-16">
    <h1 class="mb-5 text-2xl font-semibold text-gray-100">
      hey, i'm <span class="text-purple-400">amplitudes</span>.
    </h1>

    <div class="mb-10 space-y-3 text-gray-300">
      <p>
        also known as <span class="text-purple-400">tom</span>, i'm a software developer from
        london.
      </p>
      <p>
        want to chat? you can reach me at
        <a
          href="mailto:hey@amplitudes.me"
          class="text-purple-400 underline-offset-2 hover:text-purple-300 hover:underline"
        >
          hey@amplitudes.me</a
        >.
      </p>
    </div>

    <div class="mb-10">
      <div class="mb-4 flex items-center">
        <h2 class="text-lg font-medium text-gray-100">projects</h2>
        <div class="ml-3 h-px flex-grow bg-purple-500/30"></div>
      </div>
      <div class="space-y-5">
        <ProjectCard
          v-for="project in projects"
          :key="project.url"
          :name="project.name"
          :url="project.url"
          :description="project.description"
        />
      </div>
    </div>

    <div class="mb-10">
      <SpotifyStatus />
    </div>

    <div class="flex space-x-4">
      <SocialIcon
        v-for="social in socials"
        :key="social.url"
        :name="social.name"
        :url="social.url"
        :icon="social.icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const projects = [
  {
    name: 'Ember Client',
    url: 'https://emberclient.com',
    description: 'Feature-rich Minecraft client with a focus on performance and user experience',
  },
  {
    name: 'Dropmap',
    url: 'https://dropmap.net',
    description: 'Interactive tool for optimizing Fortnite landing spots and routes',
  },
  {
    name: 'Luna',
    url: 'https://myluna.gg',
    description: "Personal AI friend who's there when you need someone who truly gets it",
  },
];

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/amplitudesxd',
    icon: 'bxl:github',
  },
  {
    name: 'Discord',
    url: 'https://discord.com/users/795466085083906049',
    icon: 'bxl:discord-alt',
  },
];
</script>
