<template>
  <svg class="app-icon" aria-hidden="true">
    <use :xlink:href="'#icon-' + iconName" />
  </svg>
</template>

<script>
export default {
  name: 'AppSvgIcon',
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
}
</script>
