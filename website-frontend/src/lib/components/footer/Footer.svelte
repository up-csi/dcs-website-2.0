<script>
	import FacebookIcon from '$lib/assets/FacebookIcon.svelte';
	import XIcon from '$lib/assets/XIcon.svelte';

	export let address;
	export let contact_number;
	export let contact_email;
	export let quick_links;
	export let facebook_link;
	export let x_link;
</script>

<div class="bg-secondary p-10 text-secondary-foreground lg:grid lg:grid-cols-3 lg:gap-4">
	<div class="my-4 lg:mx-2 lg:my-0">
		<p class="py-2 text-2xl font-bold text-foreground lg:text-xl">Department of Computer Science</p>
		{#each address as { address_line }}
			<p>{address_line}</p>
		{/each}
		<p>
			{contact_number} |
			<a href="mailto:{contact_email}" class="transition-colors duration-300 hover:text-primary"
				>{contact_email}</a
			>
		</p>
	</div>
	<div class="my-4 lg:mx-2 lg:my-0">
		<p class="py-2 text-xl font-bold text-foreground">Quick Links</p>
		{#each quick_links as { name, link }}
			<a href={link} class="transition-colors duration-300 hover:text-primary">{name}</a>
			<br />
		{/each}
	</div>
	<div class="my-4 lg:mx-2 lg:my-0">
		<p class="py-2 text-xl font-bold text-foreground">Follow Us On</p>
		<div class="flex items-center">
			<a
				href={facebook_link}
				target="_blank"
				rel="noopener noreferrer"
				class="mr-3 h-10 pb-[2px] transition-colors duration-300 hover:text-primary"
			>
				<FacebookIcon />
			</a>
			<a
				href={x_link}
				target="_blank"
				rel="noopener noreferrer"
				class="h-8 transition-colors duration-300 hover:text-primary"
			>
				<XIcon />
			</a>
		</div>
	</div>
</div>
<div class="flex justify-center bg-primary text-primary-foreground">
	<p class="my-6 text-sm">&copy;2024 UP Department of Computer Science</p>
</div>
