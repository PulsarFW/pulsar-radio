const RESOURCE_NAME = 'pulsar_radio';

async function send(event: string, data: unknown = {}): Promise<void> {
	if (import.meta.env.DEV) {
		window.dispatchEvent(new CustomEvent('nui:send', { detail: { event, data } }));
		return;
	}
	try {
		await fetch(`https://${RESOURCE_NAME}/${event}`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json; charset=UTF-8' },
			body: JSON.stringify(data),
		});
	} catch {
		// expected to fail outside the actual NUI browser
	}
}

export const Nui = {
	close: () => send('Close'),
	togglePower: () => send('TogglePower'),
	volumeUp: () => send('VolumeUp'),
	volumeDown: () => send('VolumeDown'),
	clickVolumeUp: () => send('ClickVolumeUp'),
	clickVolumeDown: () => send('ClickVolumeDown'),
	setChannel: (frequency: number) => send('SetChannel', { frequency: frequency.toFixed(1) }),
};
