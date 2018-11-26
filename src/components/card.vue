<template>
  <div>
    <p class="card">
      {{text}}我也是测试的{{text1}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text','text1']
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
