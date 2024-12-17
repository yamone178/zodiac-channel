

 export const useLimitedWords = (inputText, limit) => {
        const words = inputText.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return inputText;
    };
