<script lang="ts">
	import { faVolumeUp, faWalkieTalkie, faCircle, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

	const ICONS: Record<string, IconDefinition> = {
		volume: faVolumeUp,
		'walkie-talkie': faWalkieTalkie,
	};

	let { name, size = '1em' }: { name: string; size?: string } = $props();

	const icon = $derived(ICONS[name] ?? faCircle);
	const path = $derived(icon.icon[4] as string);
	const viewBox = $derived(`0 0 ${icon.icon[0]} ${icon.icon[1]}`);
</script>

<svg {viewBox} width={size} height={size} fill="currentColor" aria-hidden="true">
	<path d={path} />
</svg>
