export type PatternInputProps = "all" | "number";

const FC_PatternNumber = (value: string) => {
	return /^(\d+)?$/.test(value);
};

export const FC_ValidatePatterInput = (
	patternInput: PatternInputProps,
	value: string
) => {
	if (patternInput === "all") return true;
	else if (patternInput === "number") return FC_PatternNumber(value);

	return true;
};
