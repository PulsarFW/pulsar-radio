<script lang="ts">
	import { onMount } from 'svelte';
	import { attachMessageListener } from './lib/messages';
	import { Nui } from './lib/nui';
	import Radio from './lib/Radio.svelte';

	onMount(() => attachMessageListener());

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' || event.key === 'Delete') Nui.close();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<main>
	<Radio />
</main>

<style>
	main {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
</style>
