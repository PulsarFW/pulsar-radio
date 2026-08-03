<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { radioState } from './store/radio.svelte';
	import { Nui } from './nui';
	import Icon from './Icon.svelte';
	import { WRAPPER, SCREEN, HIT_ZONES } from '../config';
	import frame from '../assets/radio_frame.webp';

	let freq = $state(radioState.frequency);

	$effect(() => {
		freq = radioState.frequency;
	});

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		Nui.setChannel(+freq);
	}

	function stepFreq(direction: 1 | -1) {
		freq = Math.min(Math.max(+(freq + direction * 0.1).toFixed(1), 0), 999);
	}

	const channelText = $derived(
		radioState.frequency > 0 ? radioState.frequencyName || `Channel #${radioState.frequency}` : 'No Active Channel'
	);
</script>

{#if !radioState.hidden}
	<div
		class="wrapper"
		transition:fly={{ y: 200, duration: 300 }}
		style:width="{WRAPPER.width}px"
		style:height="{WRAPPER.height}px"
		style:background-image="url({frame})"
	>
		<button
			class="zone"
			title="Volume Up"
			style:top="{HIT_ZONES.volumeUp.top}px"
			style:left="{HIT_ZONES.volumeUp.left}px"
			style:height={HIT_ZONES.volumeUp.height}
			style:width={HIT_ZONES.volumeUp.width}
			onclick={() => Nui.volumeUp()}
		></button>
		<button
			class="zone"
			title="Volume Down"
			style:top="{HIT_ZONES.volumeDown.top}px"
			style:left="{HIT_ZONES.volumeDown.left}px"
			style:height={HIT_ZONES.volumeDown.height}
			style:width={HIT_ZONES.volumeDown.width}
			onclick={() => Nui.volumeDown()}
		></button>
		<button
			class="zone"
			title="Clicks Volume Up"
			style:top="{HIT_ZONES.clickVolumeUp.top}px"
			style:left="{HIT_ZONES.clickVolumeUp.left}px"
			style:height={HIT_ZONES.clickVolumeUp.height}
			style:width={HIT_ZONES.clickVolumeUp.width}
			onclick={() => Nui.clickVolumeUp()}
		></button>
		<button
			class="zone"
			title="Clicks Volume Down"
			style:top="{HIT_ZONES.clickVolumeDown.top}px"
			style:left="{HIT_ZONES.clickVolumeDown.left}px"
			style:height={HIT_ZONES.clickVolumeDown.height}
			style:width={HIT_ZONES.clickVolumeDown.width}
			onclick={() => Nui.clickVolumeDown()}
		></button>
		<button
			class="zone"
			title="Power"
			style:bottom="{HIT_ZONES.power.bottom}px"
			style:left="{HIT_ZONES.power.left}px"
			style:height={HIT_ZONES.power.height}
			style:width={HIT_ZONES.power.width}
			onclick={() => Nui.togglePower()}
		></button>

		<div
			class="screen"
			class:on={radioState.power}
			style:width="{SCREEN.width}px"
			style:height="{SCREEN.height}px"
			style:bottom="{SCREEN.bottom}px"
			style:left="{SCREEN.left}px"
		>
			{#if radioState.power}
				<div class="screen-content" transition:fade>
					<div class="status-bar">
						<span class="radio-type">{radioState.typeName}</span>
						<span class="volume-readout"><Icon name="volume" size="0.85em" />{radioState.volume}%</span>
					</div>
					<div class="channel-block">
						<span class="channel-label">Channel</span>
						<span class="channel-number">{channelText}</span>
					</div>
					<form class="input-row" onsubmit={onSubmit}>
						<input type="number" step="0.1" min="0" max="999" bind:value={freq} aria-label="Frequency" placeholder="Frequency" />
						<div class="stepper">
							<button type="button" class="chevron up" title="Increase" onclick={() => stepFreq(1)}></button>
							<button type="button" class="chevron down" title="Decrease" onclick={() => stepFreq(-1)}></button>
						</div>
						<button type="submit" class="send" title="Set Channel"><Icon name="walkie-talkie" size="0.9em" /></button>
					</form>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.wrapper {
		position: absolute;
		bottom: 0;
		right: 2%;
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.zone {
		position: absolute;
		cursor: pointer;
		background: transparent;
		border: none;
		padding: 0;
	}
	.screen {
		position: absolute;
		overflow: hidden;
		border: 4px solid #000;
		background: #000;
	}
	.screen.on {
		background: linear-gradient(180deg, #120e1c 0%, #07060a 100%);
	}
	.screen-content {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		font-family: var(--font-display);
	}
	.status-bar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 10px;
		border-bottom: 1px solid var(--color-accent-border);
		font-size: 10px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}
	.radio-type {
		color: var(--color-accent-light);
	}
	.volume-readout {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		color: var(--color-text);
	}
	.channel-block {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		text-align: center;
		padding: 0 10px;
	}
	.channel-label {
		font-size: 10px;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}
	.channel-number {
		font-size: 18px;
		font-weight: 600;
		letter-spacing: 0.03em;
		color: var(--color-accent-light);
	}
	.input-row {
		position: relative;
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 0 10px 10px;
		padding-bottom: 4px;
		border-bottom: 1px solid var(--color-accent-border);
	}
	.input-row input {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: none;
		color: var(--color-text);
		font-family: inherit;
		font-size: 13px;
		appearance: textfield;
		-moz-appearance: textfield;
	}
	.input-row input::-webkit-outer-spin-button,
	.input-row input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.input-row input:focus {
		outline: none;
	}
	.input-row input::placeholder {
		color: var(--color-text-muted);
	}
	.stepper {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
	}
	.chevron {
		width: 14px;
		height: 9px;
		padding: 0;
		border: none;
		background: transparent;
		cursor: pointer;
		position: relative;
		opacity: 0.7;
	}
	.chevron:hover {
		opacity: 1;
	}
	.chevron::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		border-left: 3px solid transparent;
		border-right: 3px solid transparent;
	}
	.chevron.up::before {
		border-bottom: 4px solid var(--color-accent-light);
		transform: translate(-50%, -50%);
	}
	.chevron.down::before {
		border-top: 4px solid var(--color-accent-light);
		transform: translate(-50%, -50%);
	}
	.send {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2px;
		background: transparent;
		border: none;
		color: var(--color-accent-light);
		cursor: pointer;
		opacity: 0.85;
	}
	.send:hover {
		opacity: 1;
	}
</style>
