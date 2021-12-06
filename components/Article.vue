<template>
  <div
    class="border-b mb-20"
    style="padding-bottom:4.6rem">
    <Song-Card
      :article="article"
      actions
    />
    <nuxt-content
      :document="article"
      class="prose text-justify mt-10 font-body text-body leading-1"
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
