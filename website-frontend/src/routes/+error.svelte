<script lang="ts">
    import { page } from "$app/state";
</script>



<div class="prose container mt-20">
    <h1>{page.status}</h1>

    <h3>{page.error?.message}</h3>

    <aside><p>"Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill</p></aside>
</div>