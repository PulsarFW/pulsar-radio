import { handleRadioMessage } from './store/radio.svelte';

interface InboundMessage {
	type?: string;
	data?: unknown;
}

export function applyMessage(type: string, data: unknown) {
	handleRadioMessage(type, (data ?? {}) as Record<string, unknown>);
}

export function attachMessageListener(): () => void {
	const handler = (event: MessageEvent<InboundMessage>) => {
		if (!event.isTrusted) return;
		if (event.data?.type) applyMessage(event.data.type, event.data.data);
	};
	window.addEventListener('message', handler);
	return () => window.removeEventListener('message', handler);
}
