<script lang="ts">
	import DetailsBanner from '$lib/components/events/DetailsBanner.svelte';
	import FeaturedEventCard from '$lib/components/events/FeaturedEventCard.svelte';
</script>

<body class="bg-white">
	<div class="relative">
		<DetailsBanner
			title="CSI Event with a long long long long long long title"
			background_image=""
			location="Online"
			start_date="January 18"
			end_date="January 20"
		/>
	</div>

	<div class="px-4 py-12 text-gray-800 md:px-64 md:py-14">
		This is the event_content. Lorem Ipsum is simply dummy text of the printing and typesetting
		industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
		unknown printer took a galley of type and scrambled it to make a type specimen book.
	</div>

	<h1 class="mb-8 px-4 text-2xl font-bold text-gray-900 md:px-32">Related Events</h1>
</body>
