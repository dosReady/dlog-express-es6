<template>
    <div class="error-page">
        <h1>404</h1>
        <p>페이지를 찾을 수 없습니다.</p>
    </div>
</template>

<script>
export default {
  name: 'NotFoundComponent'
}
</script>

<style lang="scss" scoped>
.error-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    h1 {
        font-size: 5rem;
        margin-bottom: 0;
    }
}
</style>
