<template>
  <div>
    <div class="relative flex justify-center items-center">
      <div class="spinner" />
    </div>
  </div>
</template>

<style scoped>
.spinner {
  @apply duration-100 w-5 h-5
  border-2 border-white rounded-full;
  border-style: none dashed dashed dashed;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
