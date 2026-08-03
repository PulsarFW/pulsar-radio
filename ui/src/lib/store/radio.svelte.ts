import type { RadioData } from '../types';

export const radioState = $state({
	hidden: true,
	power: false,
	frequency: 0,
	frequencyName: '',
	volume: 100,
	type: 0 as number | false,
	typeName: 'Radio',
});

export function handleRadioMessage(type: string, data: Record<string, unknown>) {
	switch (type) {
		case 'APP_SHOW':
			radioState.hidden = false;
			break;
		case 'APP_HIDE':
			radioState.hidden = true;
			break;
		case 'UPDATE_DATA': {
			const payload = data as Partial<RadioData>;
			if (payload.frequency !== undefined) radioState.frequency = payload.frequency;
			if (payload.frequencyName !== undefined) radioState.frequencyName = payload.frequencyName;
			if (payload.power !== undefined) radioState.power = payload.power;
			if (payload.volume !== undefined) radioState.volume = payload.volume;
			if (payload.type !== undefined) radioState.type = payload.type;
			if (payload.typeName !== undefined) radioState.typeName = payload.typeName;
			break;
		}
	}
}
