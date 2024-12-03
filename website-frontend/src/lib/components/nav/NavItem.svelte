<script lang="ts">
    export let href: string, to: string, dropdown: boolean = false,
               position: string = '', style: string = '';
    let show = false;
</script>

<li 
    class="w-full relative rounded-sm text-sm transition-colors duration-300 ease-in-out hover:bg-accent {style}"
    on:pointerenter={() => {show = true}} 
    on:pointerleave={() => {show = false}}
>
    <a {href} class="px-3 py-1 flex items-center">{to}</a>
    {#if show && dropdown}
        <ul
            class="absolute w-40 p-0.5 bg-background border rounded-lg {position}" 
        >
            <slot />
        </ul>
    {/if}
</li>