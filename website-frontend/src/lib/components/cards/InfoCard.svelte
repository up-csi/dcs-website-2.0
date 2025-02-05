<script lang="ts">
    export let location: string = '';
    export let contact_email: string = '';
    export let founding_date: string = '';
</script>

<div class="space-y-5 rounded-lg bg-background/20 p-6 md:p-10">
    {#if location}
        <div>
            <p class="text-primary-foreground/60">Location</p>
            <p class="-mt-1 text-lg font-semibold text-primary-foreground">{location}</p>
        </div>
	{/if}

    {#if contact_email}
        <div>
            <p class="text-primary-foreground/60">Contact Email</p>
            <a 
                class="-mt-1 text-lg font-semibold text-primary-foreground"
                href="mailto:{contact_email}"
            >{contact_email}</a>
        </div>
	{/if}

    {#if founding_date}
        <div>
            <p class="text-primary-foreground/60">Founded</p>
            <p class="-mt-1 text-lg font-semibold text-primary-foreground">
                {new Date(founding_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                })}
            </p> 
        </div>
	{/if}
</div>