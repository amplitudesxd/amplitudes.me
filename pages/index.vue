<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <!-- Header -->
    <header class="mb-10">
      <h1 class="text-3xl font-bold text-gray-100">
        hey, i'm <span class="text-purple-400">amplitudes</span>.
      </h1>

      <div class="mt-4 space-y-3 text-gray-300">
        <p>also known as tom, i'm a software developer from london.</p>

        <p>
          want to chat? you can reach me at
          <a
            href="mailto:hey@amplitudes.me"
            class="border-b border-purple-400/30 text-purple-400 transition-all duration-300 hover:border-purple-400 hover:text-purple-300"
          >
            hey@amplitudes.me</a
          >
          :)
        </p>
      </div>
    </header>

    <!-- Projects -->
    <section class="mb-8">
      <div class="mb-4 flex items-center">
        <h2 class="text-lg font-medium text-gray-100">projects</h2>
        <div class="ml-3 h-px flex-grow bg-purple-400/30"></div>
      </div>

      <div class="space-y-4">
        <ProjectCard
          v-for="project in projects"
          :key="project.url"
          :name="project.name"
          :url="project.url"
          :description="project.description"
        />
      </div>
    </section>

    <!-- Spotify -->
    <section class="mb-8">
      <SpotifyStatus />
    </section>

    <!-- Social Links -->
    <footer>
      <div class="flex space-x-4">
        <SocialIcon
          v-for="social in socials"
          :key="social.url"
          :name="social.name"
          :url="social.url"
          :icon="social.icon"
        />
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const projects = [
  {
    name: 'Dropmap',
    url: 'https://dropmap.net',
    description: 'Interactive tool which helps players land faster and earn more in Fortnite',
  },
  {
    name: 'Ember Client',
    url: 'https://emberclient.com',
    description: 'Feature-rich Minecraft client with a focus on performance and user experience',
  },
  {
    name: 'Blog',
    url: '/blog',
    description: 'Thoughts and other things I find interesting',
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
