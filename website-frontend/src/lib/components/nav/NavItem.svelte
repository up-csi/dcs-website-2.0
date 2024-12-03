<script lang="ts">
    export let href: string, to: string;
    let show = false;
</script>

<li 
    class="relative"
    on:pointerenter={() => {show = true}} 
    on:pointerleave={() => {show = false}}
>
    <a {href}>{to}</a>
    {#if show}
        <ul
            class="absolute w-40" 
        >
            <slot />
        </ul>
    {/if}
</li>