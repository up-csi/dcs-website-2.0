<script lang="ts">
	/** @type {import('./$types').PageData} */
    import AlumnusCard from "$lib/components/cards/AlumnusCard.svelte";
    import Banner from "$lib/components/banners/Banner.svelte";
    import Breadcrumb from "$lib/components/breadcrumbs/PageBreadcrumb.svelte";
    import CardPanel from "$lib/components/panel/CardPanel.svelte";
    import FlexibleContent from "$lib/components/flexible_content/FlexibleContent.svelte";

    export let data;
    $: ({ alumni_overview, alumni } = data);

    const title = 'Alumni';
</script>

<body>
    <Banner {title} />
    <div class="mx-20">
        <div class="my-5">
            <Breadcrumb />
        </div>

        {#if alumni_overview.flexible_content}
            <div class="w-full px-40 mb-10">
                <FlexibleContent content={alumni_overview.flexible_content} />
            </div>
        {/if}

        <p class="font-bold text-2xl">Notable Alumni</p>
        <CardPanel>
            {#each alumni as alumnus}
                <AlumnusCard {alumnus} />
            {/each}
        </CardPanel>
    </div>
</body>