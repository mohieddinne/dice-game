
const numbersMapping = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6
};

export const getRandomNumber = (numbers) => {
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)]
    return {
        randomNumber,
        convertedNumber: numbersMapping[randomNumber]
    }
}
