<script lang="ts">
	export let width: number = 279;
</script>

<div
	class="mx-auto my-3 grid
    max-w-[94vw] justify-center gap-2
    pb-20 md:my-8
    md:max-w-[80vw] lg:gap-3"
	style="grid-template-columns: repeat(auto-fit, {width}px);"
>
	<slot />
</div>
