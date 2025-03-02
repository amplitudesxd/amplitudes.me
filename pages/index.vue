<template>
  <div class="mx-auto max-w-2xl px-4 py-12">
    <h1 class="mb-4 text-2xl font-semibold text-gray-200">hey, i'm amplitudes.</h1>

    <div class="mb-8 space-y-2 text-gray-300">
      <p>
        also known as <span class="text-purple-400">tom</span>, i'm a software developer from
        london.
      </p>
      <p>
        want to chat? you can reach me at
        <a href="mailto:hey@amplitudes.me" class="text-purple-400 hover:text-purple-300">
          hey@amplitudes.me</a
        >.
      </p>
    </div>

    <div class="mb-8">
      <h2 class="mb-3 text-lg font-medium text-gray-200">projects</h2>
      <div class="space-y-4">
        <ProjectCard
          v-for="project in projects"
          :key="project.url"
          :name="project.name"
          :url="project.url"
          :description="project.description"
        />
      </div>
    </div>

    <div class="mb-8">
      <SpotifyStatus />
    </div>

    <div class="flex space-x-3">
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
