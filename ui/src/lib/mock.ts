import { applyMessage } from './messages';

export function startMock(): void {
	setTimeout(() => {
		applyMessage('UPDATE_DATA', {
			frequency: 155.5,
			frequencyName: 'Dispatch',
			power: true,
			volume: 100,
			type: 1,
			typeName: 'Encrypted Radio',
		});
		applyMessage('APP_SHOW', {});
	}, 300);

	window.addEventListener('nui:send', ((e: CustomEvent<{ event: string; data: unknown }>) => {
		if (e.detail.event === 'TogglePower') {
			applyMessage('UPDATE_DATA', { power: true });
		}
		if (e.detail.event === 'SetChannel') {
			const data = e.detail.data as { frequency: string };
			applyMessage('UPDATE_DATA', { frequency: +data.frequency, frequencyName: '' });
		}
		if (e.detail.event === 'VolumeUp') {
			applyMessage('UPDATE_DATA', {});
		}
		if (e.detail.event === 'Close') {
			applyMessage('APP_HIDE', {});
		}
	}) as EventListener);
}
