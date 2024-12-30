<script>
  export let data;
  const { people } = data;
</script>

<div>
  <h3 class="text-3xl font-bold py-4">People</h3>
  <ul>
    {#each people as person}
      <li>
        <p class="text-lg font-bold">{person.first_name} {person.last_name}</p>
        <p class="text-md">{person.category}</p>
        <p class="text-md">{person.position}</p>
      </li>
    {/each}
  </ul>
</div>