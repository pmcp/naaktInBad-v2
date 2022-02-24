<template>
  <div
    class="border-b mb-10 md:mb-20 pb-8 md:pb-specific2 ">
    <Song-Card
      :article="article"
      class="mx-7 md:mx-0"
      actions
    />
    <nuxt-content
      :document="article"
      class="mx-7 md:mx-0 prose text-justify mt-4 md:mt-10 font-body text-mobileSize1 md:text-body leading-1"
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
