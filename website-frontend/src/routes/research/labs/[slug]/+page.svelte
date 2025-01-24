<script>
	/** @type {import('./$types').PageData} */
	import { PUBLIC_APIURL } from '$env/static/public';
	export let data;
	const { laboratory } = data;
</script>

<div>
	<h1 class="py-4 text-3xl font-bold">{laboratory.name} {laboratory.slug} {laboratory.id}</h1>
	<img
		src="{PUBLIC_APIURL}/assets/{laboratory.logo}"
		alt="{laboratory.slug} logo"
	/>
	<p>{laboratory.description}</p>
	<p>{laboratory.location}</p>
	<p>{laboratory.contact_email}</p>
</div>
