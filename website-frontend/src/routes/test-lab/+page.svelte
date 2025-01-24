<script>
	/** @type {import('./$types').PageData} */
	import { PUBLIC_APIURL } from '$env/static/public';
    import Hero from '$lib/components/carousels/LabHero.svelte';
</script>

<Hero />

<div>
	<h1 class="py-4 text-3xl font-bold">name slug ID</h1>
	<img
		src="{PUBLIC_APIURL}/assets/lab_logo"
		alt="slug logo"
	/>
	<p>description</p>
	<p>location</p>
	<p>contact_email</p>
</div>
