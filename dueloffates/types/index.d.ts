interface Card{
    name: string;
    type: string;
    cooldown: number;
    priority: number;
    multiplier?: string;
    additional_effect?: string;
    effect?: string;
    damage?: number;
    shield_gain?: number;
}