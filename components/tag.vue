<template>
  <nuxt-link
    :to="`/tags/${tag.slug}`"
    :class="[centered ? 'leading-3' : 'leading-4']"
    class="cursor-pointer font-body italic hover:underline text-lg"
  >
    #{{ id }}
  </nuxt-link>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    centered: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tag: ''
    }
  },
  async created() {
    let tag
    try {
      tag = await this.$content('tags')
        .where({ name: { $contains: this.id } })
        .fetch()
    } catch (e) {
      console.log(e)
    }
    this.tag = tag[0]
  }
}
</script>
