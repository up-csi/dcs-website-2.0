<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container prose my-10 flex flex-col items-center lg:mt-20">
	<h1>{$page.status}: {$page.error?.message}</h1>

	<aside>
		<blockquote>
			"Success is not final, failure is not fatal: it is the courage to continue that counts."
		</blockquote>
		<cite>- Winston Churchill</cite>
	</aside>
</div>
