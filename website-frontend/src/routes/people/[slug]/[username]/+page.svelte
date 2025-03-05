<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/PeopleBanner.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';

	export let data;
	const { person } = data;

	const affiliations = person.affiliations
		? person.affiliations
				.filter((affiliation) => typeof affiliation !== 'string')
				.map((affiliation) => {
					if (typeof affiliation.laboratories_id !== 'string') {
						return {
							role: affiliation.role,
							laboratory: affiliation.laboratories_id.name
						};
					}
					return {};
				})
		: [];
</script>

<div>
	<div class="relative z-0">
		<Banner
			background_image={person.background_image ?? ''}
			profile_image={person.profile_image ?? ''}
			first_name={person.first_name}
			last_name={person.last_name}
			position={person.position}
			email={person.email ?? ''}
			laboratory={affiliations[0]?.laboratory ?? ''}
			category={person.category}
		/>
	</div>

	<div class="bg-[#343541] -mt-[1px]">
		<div
			class="space-y-9 px-4 pb-16 pt-9 md:max-w-6xl md:space-y-12 md:px-10 md:pb-24 md:pt-12 lg:pl-[369px]"
		>
			<div class="text-lg leading-normal text-primary-foreground">
				{#if person.educational_attainment}
					<ul class="list-disc pl-5 text-primary-foreground">
					{#each person.educational_attainment as education}
						<li>
							{education.degree} from {education.institution}
							{education.start_date ? ` (${new Date(education.start_date).getFullYear()}` : ''}
							{education.end_date
								? ` - ${new Date(education.end_date).getFullYear()})`
								: education.start_date
									? ')'
									: ''}
						</li>
					{/each}
					</ul>
				{/if}
			</div>

			<InfoCard office={person.location ?? ''} interests={person.interests ?? ''} />
		</div>
	</div>
</div>
