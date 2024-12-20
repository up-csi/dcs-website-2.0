<script lang="ts">
    import { Event } from "$lib/models/event";
    export let event: Event;
</script>

<div class="card p-4 w-96 h-48">
    <div class="flex justify-between mb-4">
        <h3>{event.event_headline}</h3>
        <h3>{new Date(event.date_created).toLocaleDateString()}</h3>
    </div>
    {@html event.event_content}
</div>