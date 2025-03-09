<script lang="ts">
	/** @type {import('./$types').PageData} */
    import Banner from "$lib/components/banners/Banner.svelte";
    import Breadcrumb from "$lib/components/breadcrumbs/PageBreadcrumb.svelte";
    import CardPanel from "$lib/components/panel/CardPanel.svelte";
    import FlexibleContent from "$lib/components/flexible_content/FlexibleContent.svelte";
    import PartnerCard from "$lib/components/cards/PartnerCard.svelte";

    export let data;
    $: ({ partnerships_overview, partners } = data);

    const title = 'Our Partnerships';
</script>

<body>
    <Banner {title} />
    <div class="mx-20">
        <div class="my-5">
            <Breadcrumb page_name={title} />
        </div>

        {#if partnerships_overview.flexible_content}
            <div class="w-full px-40 mb-10">
                <FlexibleContent content={partnerships_overview.flexible_content} />
            </div>
        {/if}

        <p class="font-bold text-2xl">Our Partners</p>
        <CardPanel width={376}>
            {#each partners as partner}
                <PartnerCard {partner} />
            {/each}
        </CardPanel>
    </div>
</body>