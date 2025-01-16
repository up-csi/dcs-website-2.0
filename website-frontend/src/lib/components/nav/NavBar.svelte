<script lang="ts">
	import NavList from '$lib/components/nav/NavList.svelte';
</script>

<div
	class="
    hidden w-full md:absolute md:mt-2 md:flex md:h-fit
	md:justify-center
"
>
	<nav
		class="
        fixed flex h-screen w-full justify-end bg-background/10 md:sticky md:z-50 md:h-fit
        md:w-fit md:justify-between md:rounded-3xl md:border md:border-header md:px-5 md:py-1
    "
	>
		<ul
			class="
            absolute bottom-10 right-0 w-full gap-2
            md:static md:flex md:justify-center
        "
		>
			<NavList />
		</ul>
	</nav>
</div>
