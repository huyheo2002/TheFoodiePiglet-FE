const getRandomListItem = (list, count) => {
    const shuffled = list.slice();
    const result = [];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    for (let i = 0; i < count; i++) {
        result.push(shuffled[i]);
    }

    return result;
}

export default getRandomListItem;