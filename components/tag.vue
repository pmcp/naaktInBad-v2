<template>
  <nuxt-link
    :to="`/tags/${tag.slug}`"
    :class="[centered ? 'leading-3' : 'leading-4']"
    class="cursor-pointer font-body hover:underline text-lg"
  >
    {{ id }}
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
        .where({ name: { $contains: [this.id] } })
        .fetch()
    } catch (e) {
      console.log(e)
    }
    const filteredTag = tag.filter(tag => {
      return tag.name === this.id
    })
    this.tag = filteredTag[0]
  }
}
</script>
