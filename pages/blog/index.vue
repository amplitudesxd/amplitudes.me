<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <!-- Header -->
    <header class="mb-10">
      <NuxtLink
        to="/"
        class="mb-6 inline-flex items-center text-gray-400 transition-colors duration-300 hover:text-purple-400"
      >
        <Icon name="bx:left-arrow-alt" class="mr-2" />
        <span>back home</span>
      </NuxtLink>

      <h1 class="mb-4 text-3xl font-bold text-purple-400">blog</h1>
      <p class="text-gray-300">thoughts on development, AI, and other stuff I find interesting.</p>
    </header>

    <!-- Loading State -->
    <div v-if="pending" class="py-12 text-center">
      <Icon name="bx:loader-alt" class="mx-auto mb-4 animate-spin text-4xl text-gray-500" />
      <p class="text-gray-400">loading posts...</p>
    </div>

    <!-- Blog Posts -->
    <div v-else-if="posts && posts.length > 0" class="space-y-6">
      <BlogCard
        v-for="post in posts"
        :key="post.path"
        :title="post.title"
        :date="new Date(post.date)"
        :path="post.path"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="py-12 text-center">
      <Icon name="bx:edit" class="mx-auto mb-4 text-4xl text-gray-500" />
      <p class="text-gray-400">no blog posts yet. check back soon!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'blog - amplitudes',
  description: 'thoughts on development, ai, and other things i find interesting.',
});

const { data: posts, pending } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').order('date', 'DESC').all(),
);
</script>
