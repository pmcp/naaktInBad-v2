<template>
  <div
    :class="[last ? '' : 'border-b']"
    class="mb-10 md:mb-20 pb-8 md:pb-specific2 ">
    <Song-Card
      :article="article"
      class="mx-7 md:mx-0"
      actions
    />
    <nuxt-content
      :document="article"
      class="mx-7 md:mx-0 prose mt-4 md:mt-10 font-body text-mobileSize1 md:text-body"
    />
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    },
    last: {
      type: Boolean,
      default: false
    }
  }
}
</script>
