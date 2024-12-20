<script lang="ts">
    import { Event } from "$lib/models/event";
    export let event: Event;
</script>

<div class="card p-4 w-72 max-w-72 md:w-96 md:max-w-96 h-fit snap-center">
    <div class="md:flex md:justify-between mb-4">
        <h3>{event.event_headline}</h3>
        <h3>{new Date(event.date_created).toLocaleDateString()}</h3>
    </div>
    <div class="max-h-6 *:truncate overflow-hidden">
        {@html event.event_content}
    </div>
    <a>View details &#8594;</a>
</div>