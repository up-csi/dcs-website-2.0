<script lang="ts">
	import { deslugify } from '$lib/utils';
	import { PUBLIC_APIURL } from '$env/static/public';
	import { Clock, MapPin } from 'lucide-svelte';

	export let title: string;
	export let background_image: string;
	export let display_location: string;
	export let start_date: string;
	export let end_date: string;

	$: deslugify_title = deslugify(title);

	// function to extract date

	function getDateParts(dateString: string): { day: number; month: string } {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = { month: 'long' };
		return {
			day: date.getDate(),
			month: new Intl.DateTimeFormat('en-US', options).format(date)
		};
	}

	const { day: startDay, month: startMonth } = getDateParts(start_date);

	let endDay: number | undefined;
	let endMonth: string | undefined;

	if (end_date) {
		({ day: endDay, month: endMonth } = getDateParts(end_date));
	}

	// function to extract time

	function getTimeParts(dateString: string): { hours: number; minutes: string } {
		const date = new Date(dateString);
		return {
			hours: date.getHours(), // Hours in 24-hour format
			minutes: date.getMinutes().toString().padStart(2, '0') // Padded minutes
		};
	}

	const { hours: startHours, minutes: startMinutes } = getTimeParts(start_date);
	let endHours: number | undefined;
	let endMinutes: string | undefined;

	if (end_date) {
		({ hours: endHours, minutes: endMinutes } = getTimeParts(end_date));
	}
</script>

<div class="relative z-0">
	<div
		class="h-[40vh] bg-cover bg-center md:h-[70vh]"
		style="background-image: linear-gradient(to top, #004420, transparent), url('{PUBLIC_APIURL}/assets/{background_image}')"
	></div>

	<div
		class="-mt-[0.4px] w-full bg-[#004420] pb-10 pt-10 md:absolute md:bottom-10 md:bg-transparent md:pb-0"
	>
		<div
			class="-mt-16 flex w-full
            flex-col items-center px-5 text-center
            md:flex-row md:justify-between md:px-32 md:text-start"
		>
			<div class="text-white md:max-w-[60vw]">
				<h1 class="text-4xl font-bold md:mb-4 md:text-4xl">{deslugify_title}</h1>
				<div class="my-6 space-y-1 text-gray-100 md:my-0 md:flex">
					{#if display_location}
						<div class="flex items-center justify-center space-x-2 md:mr-10 md:justify-start">
							<MapPin class="h-4 w-4" />
							<h4>{@html display_location}</h4>
						</div>
					{/if}

					<div class="flex items-center justify-center space-x-2 md:justify-start">
						<Clock class="h-4 w-4" />
						{#if end_date}
							<h4>{startHours}:{startMinutes} - {endHours}:{endMinutes}</h4>
						{:else}
							<h4>Whole day event</h4>
						{/if}
					</div>
				</div>
			</div>

			<!-- Date Display -->

			<div class="flex flex-row items-center md:pl-12">
				<div
					class="flex h-28 w-28 flex-col items-center justify-center rounded-lg bg-white text-gray-900 shadow-xl md:h-36 md:w-36"
				>
					<h1 class="text-4xl font-bold md:mb-2 md:text-5xl">{startDay}</h1>
					<h3 class="font-medium text-[#004420]">{startMonth}</h3>
				</div>

				{#if end_date}
					<div class="mx-3 h-1 w-3 bg-gray-300"></div>
					<div
						class="flex h-28 w-28 flex-col items-center justify-center rounded-lg bg-white text-gray-900 shadow-xl md:h-36 md:w-36"
					>
						<h1 class="text-4xl font-bold md:mb-2 md:text-5xl">{endDay}</h1>
						<h3 class="font-medium text-[#004420]">{endMonth}</h3>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
