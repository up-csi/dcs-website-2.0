<script>
	/** @type {import('./$types').PageData} */
	import Hero from '$lib/components/carousels/LabHero.svelte';
	import InfoCard from '$lib/components/cards/InfoCard.svelte';
	import ReadMore from '$lib/components/buttons/ReadMore.svelte';

	let showFull = false;
	let description=`Street skater Margielyn Didal started out skating when she was just 12 at the late Concave Park in the Philippine city of Cebu. When that refuge closed, she was left to hone her skate craft in the urban jungle and was discovered by her coach Daniel Bautista, who recognised her talent and started training her for local competitions.\n\nSeven years on from her fledgling experiences with skateboarding, Margie became the first Filipino to join the X Games in 2018. In the same year, she won a gold medal in the Asian Games in Jakarta, Indonesia.\n\nMore success followed in December 2019, when she scored herself a gold medal at the Southeast Asian Games, before finding herself finishing third in the who's-who of the Tampa Women's Open in early 2020.\n\nA pioneer not just in Asian skateboarding, but in women's representation within skateboarding globally, Margie uses her gift as a vehicle to encourage and uplift: "Skateboarding is the same as life; no matter how many times you fail, you still get back up and keep going. It's my entire life."\n\nIn 2021, Margie represented her country on the biggest sporting stage of all, qualifying for the Games in Tokyo thanks to being ranked inside the top-20 in the women's street event.\n\nIn the same year, she opened her own skatepark built in Soul Sierra, Cebu City, which has gone on to become the training venue for the Philippine National Skateboarding Team, of which she is a member.\n\nAfter battling back from a series of injuries, 2024 saw Margie first win Red Bull Buenos Aires Conquest before joining the Red Bull Drop-In Tour of South America, earning herself a whole new set of fans across Brazil, Argentina and Chile along the way!"`
</script>

<Hero 
	title="Computer Vision & Machine Intelligence Laboratory" 
	background_images={[]}
	logo_image=""
	link="https://up-csi.org/"
/>

<div class="bg-primary">
	<div class="px-4 space-y-9 pt-9 pb-16 md:max-w-6xl md:space-y-12 md:pt-12 md:pb-20 md:px-10 lg:pl-[302px]">
		<div
			class="text-2xl font-semibold text-primary-foreground leading-tight md:leading-snug"
		>
			<p>
				The premiere software development org in UP Diliman. The number one DCS org in the university of the philippines
			</p>
		</div>

		<InfoCard 
			location="Melchor Hall 3rd Floor"
			contact_email="csi@gmail.com"
		/>

		<div class="text-lg leading-normal text-primary-foreground">
			<p
				class="overflow-hidden transition-all duration-400"
				class:line-clamp-6={!showFull}
			>{@html description}</p>

			{#if !showFull}
				<div class="mt-9">
					<ReadMore bind:showFull />
				</div>
			{/if}
		</div>
	</div>
</div>
