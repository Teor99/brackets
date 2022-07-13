module.exports = function check(str, bracketsConfig) {
    const bracketsConfigAsLine = bracketsConfig.flat().join('');
    const bracketsStack = [];

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const charIndex = bracketsConfigAsLine.indexOf(char);
        if (charIndex !== -1) {
            const bracketsConfigIndex = Math.floor(charIndex / 2);
            const openBracket = bracketsConfig[bracketsConfigIndex][0];
            const closeBracket = bracketsConfig[bracketsConfigIndex][1];
            const lastStackBracket = bracketsStack[bracketsStack.length - 1];

            const isPush = (bracketsStack.length === 0 ||
                (openBracket === closeBracket && lastStackBracket !== openBracket) ||
                (openBracket !== closeBracket && char === openBracket));

            const isPop = ((openBracket !== closeBracket && char === closeBracket &&
                    lastStackBracket === openBracket) ||
                (openBracket === closeBracket && lastStackBracket === openBracket));

            if (isPush) {
                bracketsStack.push(char);
            } else if (isPop) {
                bracketsStack.pop();
            } else {
                return false;
            }
        }
    }

    return bracketsStack.length === 0;
}
