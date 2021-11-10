<template>
  <div class="border-b pb-20 mb-20">
    <Song-Card
      :article="article"
      actions
    />
    <nuxt-content
      :document="article"
      class="prose mt-10"
    />
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
