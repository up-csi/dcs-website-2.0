<script>
	/** @type {import('./$types').PageData} */
	import Banner from '$lib/components/banners/PeopleBanner.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';
	import PublicationCard from '$lib/components/cards/PublicationCard.svelte';

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

	const publications = person.publications
		? person.publications
				.filter((publication) => typeof publication !== 'string')
				.map((publication) => {
					const pub = publication.publications_id;
					if (typeof pub !== 'string') {
						return {
							id: pub.id,
							title: pub.title,
							authors: pub.authors,
							publish_date: pub.publish_date,
							hero_image: pub.hero_image,
							abstract: pub.abstract,
							access_links: pub.access_links,
							laboratory: '', // not needed
							publication_tag: [] // not needed
						};
					}
					return null;
				})
				.filter((item) => item !== null)
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
		/>
	</div>

	<div class="-mt-[1px] bg-[#343541]">
		<div
			class="space-y-9 px-4 pb-16 pt-9 md:max-w-6xl md:space-y-12 md:px-10 md:pb-24 md:pt-12 lg:pl-[369px]"
		>
			<div class="text-lg leading-normal text-primary-foreground">
				{#if person.educational_attainment}
					<ul class="list-disc pl-5 text-primary-foreground">
						{#each person.educational_attainment as education}
							<li>
								{education.degree} from {education.institution}
								{education.start_date
									? ` (${new Date(education.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
									: ''}
								{education.end_date
									? ` - ${new Date(education.end_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })})`
									: education.start_date
										? '- present)'
										: ''}
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			{#if person.location || person.interests}
				<InfoCard office={person.location ?? ''} interests={person.interests ?? ''} />
			{/if}
		</div>
	</div>
	{#if publications.length !== 0}
	<div class="mx-auto px-4 pb-4 md:mt-12 md:px-10 md:pb-10">
		<h2 class="my-6 text-3xl font-bold">Publications</h2>
		<div class="grid grid-cols-1 items-end gap-2 md:my-8 md:grid-cols-4 md:items-end md:gap-4">
				{#each publications as publication}
					<PublicationCard {publication} />
				{/each}
			</div>
		</div>
		{/if}
</div>
