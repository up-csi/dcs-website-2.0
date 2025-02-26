<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Image, Mail, Globe } from 'lucide-svelte';
    import { Button } from '$lib/@shadcn-svelte/ui/button';

    export let background_image: string = '';
	export let profile_image: string = '';
	export let first_name: string = '';
    export let last_name: string = '';
	export let position: string = '';
    export let email: string = '';
    export let laboratory: string = '';

    const copyToClipboard = async () => {
        if (!email) return; 

        try {
            await navigator.clipboard.writeText(email);
            alert(`Copied: ${email}`);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };
</script>

<div>
	<div
		class="h-[83vh] bg-cover bg-center"
		style="background-image: linear-gradient(to top, #343541, transparent), url('{PUBLIC_APIURL}/assets/{background_image}')"
	></div>

	<div class="absolute bottom-0 lg:-bottom-16 w-full lg:px-32 px-4">

		<div class="text-sm py-4 text-secondary-foreground flex space-x-2">
			<p class="">Home /</p>
			<p class="">People /</p>
			<p class="">Regular Faculty /</p>
			<p class="text-[#D9D9D9]">This Person's Name</p>
		</div>
		<div class="h-[2px] w-full bg-white opacity-40"></div>

		<div
			class="py-10 flex w-full flex-col items-center text-secondary-foreground lg:bottom-10 lg:flex-row"
		>	
			<div
				class="mx-auto flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full md:h-48 md:w-48 bg-gradient-to-t from-[#667080] to-[#D1D8DD]"
			>
				{#if profile_image}
					<img
						class="h-full w-full rounded-full object-cover"
						src="{PUBLIC_APIURL}/assets/{profile_image}"
						alt="{first_name} {last_name}'s profile picture"
					/>
				{:else}
					<Image class="h-10 w-10 text-secondary" />
				{/if}
			</div>

			<div class="mt-4 w-full md:mt-6 lg:mt-0 lg:ml-12">
				<div class="flex w-full justify-center lg:justify-start">
					<h1
						class="max-w-2xl text-center text-4xl font-bold lg:text-start lg:text-[2.85rem] lg:leading-[3.2rem]"
					>
					{first_name} {last_name}
					</h1>
				</div>

				<div
					class="flex flex-col items-center justify-center text-center lg:flex-row lg:justify-between"
				>
					<div class="flex space-x-2 text-[#D9D9D9]">
						<p>{position}</p>
						{#if laboratory}
							<p> · </p>
							<p>{laboratory}</p>
						{/if}
					</div>

					<div class="flex space-x-1 mt-5 lg:mt-0">
						<div class="relative group">
							<Button
								class="max-w-xs rounded-full px-3 bg-background/20 hover:bg-background/30"
								on:click={copyToClipboard}
								aria-label="Copy {first_name} {last_name}'s email to clipboard"
							>
								<Mail class="h-4 w-4" />
							</Button>
							<span
								class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-white text-primary text-xs rounded px-2 py-1"
							>
								{email}
							</span>
						</div>

						<Button
							class="max-w-xs rounded-full px-3 bg-background/20 hover:bg-background/30"
							aria-label="Go to {first_name} {last_name}'s website"
						>
							<Globe class="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>