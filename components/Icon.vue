<template>
  <div>
    <button
      v-if="close"
      @click="$emit('clicked')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 200 200"
        xml:space="preserve">
        <g>
          <line
            fill="none"
            stroke="#000000"
            stroke-width="10"
            stroke-miterlimit="10"
            x1="8.591"
            y1="8.598"
            x2="133.14"
            y2="133.133"/>
          <line
            fill="none"
            stroke="#000000"
            stroke-width="10"
            stroke-miterlimit="10"
            x1="133.14"
            y1="8.598"
            x2="8.591"
            y2="133.133"/>
        </g>
      </svg>
    </button>
    <button
      v-if="open"
      @click="$emit('clicked')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          stroke-width="1.14"
          d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <button
      v-if="link"
      @click="$emit('clicked')">
      <svg
        class="w-10 h-10 md:w-8 md:h-8"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24"
        height="24"
        viewBox="0 0 141.73 141.73"
        xml:space="preserve">
        <path
          fill="none"
          stroke="#000000"
          stroke-width="3.8053"
          stroke-miterlimit="10"
          d="M136.495,71.528
	c0,37.097-29.678,67.161-66.271,67.161c-36.6,0-66.273-30.064-66.273-67.161c0-37.1,29.674-67.161,66.273-67.161
	C106.817,4.367,136.495,34.429,136.495,71.528z M103.923,71.528c0-37.1-15.09-67.161-33.698-67.161
	c-18.611,0-33.689,30.062-33.689,67.161c0,37.097,15.078,67.161,33.689,67.161C88.833,138.689,103.923,108.625,103.923,71.528z
	 M70.225,138.689V4.367 M2.054,71.528h136.337 M17.501,30.858c0,0,22.104,12.455,52.724,12.554 M122.947,30.858
	c0,0-22.104,12.455-52.723,12.554 M122.947,109.59c0,0-22.104-12.455-52.723-12.56 M17.501,109.59c0,0,22.104-12.455,52.724-12.56"
        />
      </svg>
    </button>
    <button
      v-if="play"
      @click="$emit('clicked')">
      <svg
        class="w-10 h-10 md:w-8 md:h-8"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24"
        height="24"
        viewBox="0 0 141.73 141.73"
        xml:space="preserve">
        <g>
          <path
            fill="none"
            stroke="#000000"
            stroke-width="3.834"
            stroke-miterlimit="10"
            d="M138.157,71.102
		c0,37.124-30.103,67.217-67.22,67.217c-37.124,0-67.222-30.093-67.222-67.217c0-37.129,30.098-67.218,67.222-67.218
		C108.055,3.885,138.157,33.973,138.157,71.102z"/>
          <polygon points="45.033,37.591 106.994,71.099 45.033,104.613 	"/>
        </g>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    close: {
      type: Boolean,
      default() {
        return false
      }
    },
    open: {
      type: Boolean,
      default() {
        return false
      }
    },
    link: {
      type: Boolean,
      default() {
        return false
      }
    },
    play: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>
