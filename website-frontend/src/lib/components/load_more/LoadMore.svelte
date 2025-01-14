<script lang="ts">
    import { Plus } from "lucide-svelte";
    export let inc: number;

    export let shown = inc;
    function loadMore() {
        shown += inc;
    }
</script>

<button class="flex items-center shadow-xl rounded-3xl py-2 px-6" on:click={loadMore}>
    <Plus class="h-4 w-4 mr-2" />
    <span>Load More</span>
</button>