<template>
  <div class="mx-auto max-w-2xl px-4 py-8">
    <!-- Header -->
    <header class="mb-10">
      <NuxtLink
        to="/blog"
        class="mb-6 inline-flex items-center text-gray-400 transition-colors duration-300 hover:text-purple-400"
      >
        <Icon name="bx:left-arrow-alt" class="mr-2" />
        <span>back to blog</span>
      </NuxtLink>

      <h1 class="mb-4 text-3xl font-bold text-purple-400">{{ post!.title }}</h1>
      <p class="text-gray-300">{{ formatDate(new Date(post!.date)) }}</p>
    </header>

    <!-- Article -->
    <article class="max-w-none">
      <!-- Content -->
      <div class="prose prose-neutral prose-invert">
        <ContentRenderer :value="post!" />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute();
const path = `/blog/${Array.isArray(params.slug) ? params.slug.join('/') : params.slug}`;

const { data: post } = await useAsyncData(`blog-post-${path}`, () =>
  queryCollection('blog').path(path).first(),
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'blog post not found',
  });
}

useSeo({
  title: post.value ? post.value.title : 'post not found',
  description: post.value?.description || 'blog post not found',
  url: `https://amplitudes.me/blog/${Array.isArray(params.slug) ? params.slug.join('/') : params.slug}`,
  type: 'article',
});

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
    .format(date)
    .toLowerCase();
}
</script>
