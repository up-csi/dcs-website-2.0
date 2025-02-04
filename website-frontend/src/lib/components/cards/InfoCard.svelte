<script lang="ts">
    export let location: string = '';
    export let contact_email: string = '';

    const infoFields = [
        { label: 'Location', value: location },
        { label: 'Contact Email', value: contact_email }
    ];
</script>

<div class="space-y-5 rounded-lg bg-background/20 p-6 md:p-10">
    {#each infoFields as field}
        {#if field.value}
            <div>
                <p class="text-primary-foreground/60">{field.label}</p>
                <p class="-mt-1 text-lg font-semibold text-primary-foreground">{field.value}</p>
            </div>
        {/if}
    {/each}
</div>