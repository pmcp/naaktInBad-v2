<template>
  <div class="flex justify-between pb-1 md:border-b md:mb-5">
    <div class="font-body"><span class="hidden md:inline text-mobileSize1 md:text-body">columns getagd met </span><span class="font-bold text-mobileSize1 md:text-body">#{{ tag.name.toLowerCase() }}</span></div>
    <nuxt-link
      to="/"
      value="Wis filter"
      class="font-display font-extrabold items-center flex hover:underline"
    >
      wis filter
      <Icon
        close
        class="ml-1 w-4 h-4 items-center relative"
        style="top:1px"/>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true
    }
  }
}
</script>
