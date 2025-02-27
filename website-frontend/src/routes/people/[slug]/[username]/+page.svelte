<script>
	import { PUBLIC_APIURL } from '$env/static/public';
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
							linked_authors: pub.linked_authors
						};
					}
					return {};
				})
		: [];

	const authors = publications.map((publication) => publication.authors);

	const linked_authors = publications.map((publication) => {
		return publication.linked_authors
			? publication.linked_authors
					.filter((linked_author) => typeof linked_author !== 'string')
					.map((linked_author) => {
						const author = linked_author.people_id;
						if (typeof author !== 'string') {
							return {
								username: author.username,
								category: author.category,
								first_name: author.first_name,
								last_name: author.last_name
							};
						}
						return {};
					})
			: [];
	});
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

			{#if publications.length > 0}
				<h2 class="text-2xl font-bold text-primary-foreground">Publications</h2>
				{#each publications as publication, i}
					<div class="space-y-4">
						<div class="space-y-4">
							<div class="flex flex-col">
								<div class="flex items-center space-x-4">
									{#if publication.hero_image}
										<img
											src="{PUBLIC_APIURL}/assets/{publication.hero_image}"
											alt={publication.title}
											class="h-16 w-16 rounded-md"
										/>
									{:else}
										<div class="h-16 w-16 rounded-md bg-gray-300"></div>
									{/if}
									<div class="flex flex-col space-y-1">
										<p class="text-lg font-bold text-primary-foreground">{publication.title}</p>
										<p class="text-sm text-gray-400">{publication.publish_date}</p>
									</div>
								</div>
								<div class="ml-20 flex flex-col">
									{#if authors[i]}
										<p class="text-md text-primary-foreground">Authors:</p>
										<div class="flex flex-col">
											{#each authors[i] as author}
												<p class="text-sm text-gray-400">
													{author.first_name}
													{author.last_name}
												</p>
											{/each}
										</div>
									{/if}
									{#if linked_authors[i]}
										<div class="flex flex-col">
											{#each linked_authors[i] as linked_author}
												<a
													class="text-sm text-blue-400"
													href="/people/{linked_author.category}/{linked_author.username}"
													data-sveltekit-reload
												>
													{linked_author.first_name}
													{linked_author.last_name}
												</a>
											{/each}
										</div>
									{/if}
								</div>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
