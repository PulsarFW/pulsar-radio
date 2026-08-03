export const WRAPPER = { width: 360, height: 700 };

export const SCREEN = { width: 204, height: 314, bottom: 85, left: 78 };

export interface HitZone {
	top?: number;
	bottom?: number;
	left: number;
	height: string;
	width: string;
}

export const HIT_ZONES: Record<string, HitZone> = {
	volumeUp: { top: 150, left: 180, height: '10%', width: '7%' },
	volumeDown: { top: 150, left: 155, height: '10%', width: '7%' },
	clickVolumeUp: { top: 170, left: 94, height: '8%', width: '7%' },
	clickVolumeDown: { top: 170, left: 70, height: '8%', width: '7%' },
	power: { bottom: 14, left: 90, height: '5%', width: '50%' },
};
