interface KanaInputAnswerOptions {
  inputValue: string;
  correctChar: string;
  targetChar: string;
  isReverse: boolean;
  altRomanjiMap: Map<string, string[]>;
}

export const isKanaInputAnswerCorrect = ({
  inputValue,
  correctChar,
  targetChar,
  isReverse,
  altRomanjiMap,
}: KanaInputAnswerOptions): boolean => {
  // Normalize Unicode form and strip surrounding whitespace so that input
  // from an IME or copy-paste (which may arrive in a different NFC/NFD form)
  // is compared on equal footing with the stored answer.
  const normalizedInput = inputValue.trim().normalize('NFC');
  if (!normalizedInput) return false;

  if (isReverse) {
    // Reverse mode: user types the kana character itself.
    return normalizedInput === targetChar.normalize('NFC');
  }

  // Normal mode: user types romaji. Compare case- and Unicode-insensitively.
  const lowerInput = normalizedInput.toLowerCase();
  const lowerTarget = targetChar.toLowerCase().normalize('NFC');

  if (lowerInput === lowerTarget) {
    return true;
  }

  const alternatives = altRomanjiMap.get(correctChar);
  return alternatives
    ? alternatives.some(alt => lowerInput === alt.toLowerCase().normalize('NFC'))
    : false;
};
