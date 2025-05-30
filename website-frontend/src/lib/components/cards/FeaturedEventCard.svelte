<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Event } from '$lib/models/event';
	import { Calendar, MapPin, Clock, Image } from 'lucide-svelte';
	export let item: Event;

	function formatTimeRange(startTime: string, endTime: string) {
		const start = new Date(startTime);
		const end = new Date(endTime);

		const startHour = start.getHours() % 12 || 12; // Convert to 12-hour format
		const startMinutes = start.getMinutes();
		const endHour = end.getHours() % 12 || 12;
		const endMinutes = end.getMinutes();

		const startPeriod = start.getHours() >= 12 ? 'PM' : 'AM';
		const endPeriod = end.getHours() >= 12 ? 'PM' : 'AM';

		// Case 1: Same period (AM/PM) & flat hour
		if (startPeriod === endPeriod && startMinutes === 0 && endMinutes === 0) {
			return `${startHour} - ${endHour} ${startPeriod}`;
		}

		// Case 2: Different periods (AM/PM)
		if (startPeriod !== endPeriod) {
			return `${startHour}${startMinutes !== 0 ? `:${startMinutes}` : ''} ${startPeriod} - ${endHour}${endMinutes !== 0 ? `:${endMinutes}` : ''} ${endPeriod}`;
		}

		// Case 3: Same period, but different minutes
		if (startMinutes !== 0 || endMinutes !== 0) {
			return `${startHour}${startMinutes !== 0 ? `:${startMinutes}` : ''} - ${endHour}${endMinutes !== 0 ? `:${endMinutes}` : ''} ${startPeriod}`;
		}

		// Default: Full time format
		return `${startHour} ${startPeriod} - ${endHour} ${endPeriod}`;
	}
</script>

<a href="/events/{item.slug}" data-sveltekit-reload>
	<div
		class="group relative mb-2 flex h-[25rem] flex-col rounded-lg bg-white text-gray-800 shadow-md"
	>
		<div
			class="inset-0 h-24 flex-grow overflow-hidden rounded-t-lg md:h-44
			{item.hero_image
				? ''
				: 'flex items-center justify-center bg-gradient-to-b from-[#D1D8DD] to-[#66708076]'}"
		>
			{#if item.hero_image}
				<div class="h-full w-full">
					<img
						class="h-full w-full rounded-t-lg object-cover transition-transform duration-300 ease-out group-hover:scale-105"
						src="{PUBLIC_APIURL}/assets/{item.hero_image}"
						alt="Background"
					/>
				</div>
			{:else}
				<Image class="h-8 w-8 text-white opacity-70" />
			{/if}
		</div>

		<div class="space-y-3 p-4">
			<div class="line-clamp-3 text-[17px] font-bold leading-tight">
				<h1>{item.event_headline}</h1>
			</div>

			<div class="flex items-center space-x-2 text-[13px] font-medium">
				<Calendar class="h-4 w-4" />
				{#if item.start_date}
					<p>
						{#if item.end_date}
							{#if new Date(item.start_date).toDateString() === new Date(item.end_date).toDateString()}
								<!-- Same day event -->
								{new Date(item.start_date).toLocaleDateString('en-GB', {
									day: 'numeric',
									month: 'long',
									year: 'numeric'
								})}
							{:else if new Date(item.start_date).getMonth() === new Date(item.end_date).getMonth()}
								<!-- Same month -->
								{new Date(item.start_date).getDate()}-{new Date(item.end_date).getDate()}
								{new Date(item.end_date).toLocaleDateString('en-GB', {
									month: 'long',
									year: 'numeric'
								})}
							{:else}
								<!-- Different months -->
								{new Date(item.start_date).toLocaleDateString('en-GB', {
									day: 'numeric',
									month: 'long'
								})} -
								{new Date(item.end_date).toLocaleDateString('en-GB', {
									day: 'numeric',
									month: 'long',
									year: 'numeric'
								})}
							{/if}
						{:else}
							<!-- Single date -->
							{new Date(item.start_date).toLocaleDateString('en-GB', {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
						{/if}
					</p>
				{/if}
			</div>

			<div>
				{#if item.display_location}
					<div class="flex items-center space-x-2 text-[13px] opacity-60">
						<MapPin class="h-4 w-4" />
						<p class="line-clamp-1">{item.display_location}</p>
					</div>
				{/if}

				{#if item.start_date && item.end_date && new Date(item.start_date).toDateString() === new Date(item.end_date).toDateString()}
					<div class="flex items-center space-x-2 text-[13px] opacity-60">
						<Clock class="mx-[1px] h-[14px] w-[14px]" />
						<p>{formatTimeRange(item.start_date, item.end_date)}</p>
					</div>
				{:else if item.start_date && item.end_date && new Date(item.start_date).toDateString() !== new Date(item.end_date).toDateString()}
					<div class="flex items-center space-x-2 text-[13px] opacity-60">
						<Clock class="mx-[1px] h-[14px] w-[14px]" />
						<p>Multi-day event</p>
					</div>
				{:else}
					<div class="flex items-center space-x-2 text-[13px] opacity-60">
						<Clock class="mx-[1px] h-[14px] w-[14px]" />
						<p>Whole day event</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</a>
