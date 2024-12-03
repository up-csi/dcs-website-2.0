<script lang="ts">
    export let href: string, to: string, position: string = '';
    let show = false;
</script>

<li 
    class="relative rounded-sm text-sm transition-colors duration-300 ease-in-out hover:bg-accent"
    on:pointerenter={() => {show = true}} 
    on:pointerleave={() => {show = false}}
>
    <a {href} class="px-3 py-1 flex items-center">{to}</a>
    {#if show}
        <ul
            class="absolute w-40 p-0.5 bg-background {position}"
        >
            <slot />
        </ul>
    {/if}
</li>