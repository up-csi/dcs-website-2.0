<script lang="ts">
	import { Button } from '$lib/@shadcn-svelte/ui/button';
	import { Card } from '$lib/@shadcn-svelte/ui/card';
	import { ChevronLeft, ChevronRight, MapPin, Image } from 'lucide-svelte';
	import type { Events } from '$lib/models/event';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let events: Events;

	let currentMonth = new Date().getMonth();
	let currentYear = new Date().getFullYear();

	function previousMonth() {
		if (currentMonth === 0) {
			currentMonth = 11;
			currentYear--;
		} else {
			currentMonth--;
		}
	}

	function nextMonth() {
		if (currentMonth === 11) {
			currentMonth = 0;
			currentYear++;
		} else {
			currentMonth++;
		}
	}

	function isAllDayEvent(start: string, end?: string): boolean {
		if (!end) return false;
		const startDate = new Date(start);
		const endDate = new Date(end);
		return (
			startDate.getHours() === 0 &&
			startDate.getMinutes() === 0 &&
			endDate.getHours() === 0 &&
			endDate.getMinutes() === 0 &&
			Math.abs(endDate.getTime() - startDate.getTime()) >= 86400000
		);
	}

	function formatEventTime(dateString: string): string {
		return new Date(dateString).toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function formatEventDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString([], {
			month: 'short',
			day: 'numeric'
		});
	}

	$: filteredEvents = events.filter((event) => {
		const eventDate = new Date(event.start_date ?? 0);
		return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
	});

	$: eventsByDate = filteredEvents.reduce<Record<string, typeof events>>((acc, event) => {
		const dateString = new Date(event.start_date ?? 0).toDateString();
		if (!acc[dateString]) {
			acc[dateString] = [];
		}
		acc[dateString].push(event);
		return acc;
	}, {});

	$: dates = [
		...new Set(filteredEvents.map((event) => new Date(event.start_date ?? 0).toDateString()))
	]
		.map((dateStr) => new Date(dateStr))
		.sort((a, b) => a.getTime() - b.getTime());

	$: monthYear = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
		new Date(currentYear, currentMonth)
	);
</script>

<div class="mx-auto w-full overflow-hidden rounded-lg border border-slate-200 shadow-inner">
	<div
		class="flex items-center justify-between rounded-t-lg border border-slate-200 bg-slate-100 px-4 py-5"
	>
		<Button
			variant="ghost"
			on:click={previousMonth}
			class="transition-colors hover:bg-slate-200 active:bg-slate-300"
		>
			<ChevronLeft class="h-5 w-5 md:h-6 md:w-6" />
		</Button>
		<h2 class="text-center text-xl font-bold text-slate-800 md:text-2xl">{monthYear}</h2>
		<Button
			variant="ghost"
			on:click={nextMonth}
			class="transition-colors hover:bg-slate-200 active:bg-slate-300"
		>
			<ChevronRight class="h-5 w-5 md:h-6 md:w-6" />
		</Button>
	</div>

	<div
		class="flex h-[75vh] flex-col divide-y divide-slate-200 overflow-y-auto bg-white shadow-inner {dates.length ===
		0
			? 'justify-center'
			: ''}"
	>
		{#if dates.length > 0}
			{#each dates as date}
				<div class="border border-slate-200 bg-slate-100 py-3">
					<div class="flex flex-col gap-1 px-5 py-3 md:flex-row md:items-center md:justify-between">
						<div class="flex items-center gap-1">
							<span class="text-lg font-semibold text-slate-800 md:text-xl"
								>{date.getDate()}
								{new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)}
								{date.getFullYear()}</span
							>
						</div>
						<div class="text-sm text-slate-600 md:text-base">
							{new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)}
						</div>
					</div>
					<div class="space-y-3 px-3">
						{#each eventsByDate[date.toDateString()] || [] as event}
							<a
								href={`/events/${event.slug}`}
								class="block transition-all duration-200 hover:scale-[1.01] hover:shadow-md"
							>
								<Card class="p-3">
									<div class="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
										{#if event.hero_image}
											<div class="h-48 w-full overflow-hidden rounded-lg md:h-36 md:w-52">
												<img
													src="{PUBLIC_APIURL}/assets/{event.hero_image}"
													alt={event.event_headline}
													class="h-full w-full object-cover"
												/>
											</div>
										{:else}
											<div
												class="flex h-48 w-full items-center justify-center rounded-lg border border-slate-300 bg-slate-200 md:h-36 md:w-52"
											>
												<div class="text-slate-400">
													<Image class="h-8 w-8" />
												</div>
											</div>
										{/if}

										<div class="flex-1">
											<div class="mb-1 flex flex-wrap gap-1">
												{#if event.event_tags}
													{#each event.event_tags as tag}
														{#if typeof tag !== 'string' && typeof tag.events_tags_id !== 'string'}
															<span
																class="inline-block rounded bg-slate-700 px-3 py-0.5 text-sm text-white"
																>{tag.events_tags_id?.name}</span
															>
														{/if}
													{/each}
												{/if}
											</div>

											<div class="my-2">
												<h3 class="text-lg font-medium text-slate-800">{event.event_headline}</h3>
											</div>

											{#if event.display_location}
												<div class="mb-2 flex items-center gap-1.5 text-sm text-slate-600">
													<MapPin class="h-4 w-4" />
													<span>{event.display_location}</span>
												</div>
											{/if}

											<div class="mt-2">
												{#if event.event_content}
													<div
														class="text-base text-slate-600 {event.display_location
															? 'line-clamp-1'
															: 'line-clamp-2'}"
													>
														{@html event.event_content}
													</div>
												{:else}
													<div class="text-base italic text-slate-400">No description provided</div>
												{/if}
											</div>

											<div class="mt-4 md:hidden">
												{#if event.start_date}
													{#if !event.end_date}
														<div class="text-base font-bold text-slate-700">
															{formatEventTime(event.start_date)} - TBD
														</div>
													{:else if isAllDayEvent(event.start_date, event.end_date)}
														<div class="text-base font-bold text-slate-700">All-Day</div>
													{:else}
														<div class="text-base font-bold text-slate-700">
															{#if new Date(event.start_date).toDateString() !== new Date(event.end_date).toDateString()}
																{new Date(event.start_date).toLocaleDateString([], {
																	month: 'short',
																	day: 'numeric',
																	year: 'numeric'
																})}
															{/if}
															{formatEventTime(event.start_date)} -
															{#if new Date(event.start_date).toDateString() !== new Date(event.end_date).toDateString()}
																{new Date(event.end_date).toLocaleDateString([], {
																	month: 'short',
																	day: 'numeric',
																	year: 'numeric'
																})}
															{/if}
															{formatEventTime(event.end_date)}
														</div>
													{/if}
												{/if}
											</div>
										</div>

										<div class="hidden max-w-64 whitespace-nowrap p-3 text-right md:block">
											{#if event.start_date}
												{#if !event.end_date}
													<div class="text-lg font-bold text-slate-700">
														{formatEventTime(event.start_date)} - TBD
													</div>
												{:else if isAllDayEvent(event.start_date, event.end_date)}
													<div class="text-lg font-bold text-slate-700">All-Day</div>
												{:else}
													<div class="text-lg font-bold text-slate-700">
														<div class="flex items-center justify-between gap-4">
															<span class="flex flex-col items-center justify-start">
																{formatEventTime(event.start_date)}
																{#if new Date(event.start_date).toDateString() !== new Date(event.end_date).toDateString()}
																	<span class="text-xs text-slate-400">
																		{formatEventDate(event.start_date)}
																	</span>
																{/if}
															</span>
															<span>-</span>
															<span class="flex flex-col items-center justify-start">
																{formatEventTime(event.end_date)}
																{#if new Date(event.start_date).toDateString() !== new Date(event.end_date).toDateString()}
																	<span class="text-xs text-slate-400">
																		{formatEventDate(event.end_date)}
																	</span>
																{/if}
															</span>
														</div>
													</div>
												{/if}
											{/if}
										</div>
									</div>
								</Card>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		{:else}
			<div class="p-8 text-center">
				<p class="text-lg italic text-slate-600">No events scheduled for {monthYear}</p>
			</div>
		{/if}
	</div>
</div>
