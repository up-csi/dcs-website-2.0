<script>
	import FacebookIcon from '$lib/assets/FacebookIcon.svelte';
	import XIcon from '$lib/assets/XIcon.svelte';
	import { page } from '$app/stores';

	export let address;
	export let contact_number;
	export let contact_email;
	export let quick_links;
	export let facebook_link;
	export let x_link;

	$: homePage = $page.url.pathname === '/';
</script>

<div class="flex justify-center bg-background-dark px-4 text-primary-foreground">
	<div
		class="flex w-full flex-col space-y-10 py-10 md:flex-row md:items-baseline md:space-x-16 md:space-y-0 md:pl-1"
		class:md:mx-14={homePage}
		class:max-w-6xl={!homePage}
	>
		<div>
			<p class="pb-5 text-xl font-bold">Department of Computer Science</p>
			{#each address as { address_line }}
				<p>{address_line}</p>
			{/each}
			<p>
				{contact_number} |
				<a href="mailto:{contact_email}" class="transition-colors duration-300 hover:text-secondary"
					>{contact_email}</a
				>
			</p>
		</div>
		<div>
			<p class="pb-5 text-xl font-bold">Quick Links</p>
			{#each quick_links as { name, link }}
				<a href={link} class="transition-colors duration-300 hover:text-secondary">{name}</a>
				<br />
			{/each}
		</div>
		<div>
			<p class="pb-5 text-xl font-bold">Follow Us On</p>
			<div class="flex items-center">
				<a
					href={facebook_link}
					target="_blank"
					rel="noopener noreferrer"
					class="mr-3 h-10 pb-[2px] transition-colors duration-300 hover:text-secondary"
				>
					<FacebookIcon />
				</a>
				<a
					href={x_link}
					target="_blank"
					rel="noopener noreferrer"
					class="h-8 transition-colors duration-300 hover:text-secondary"
				>
					<XIcon />
				</a>
			</div>
		</div>
	</div>
</div>
<div class="flex justify-center bg-background-dark text-primary-foreground">
	<p class="my-6 text-sm">&copy; 2024 UP Department of Computer Science</p>
</div>
