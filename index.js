
const numbersJson = await fetch('numbers.json').then(res => res.text());
// const numbers = await numbersJson.json();

function qsort(array) {
    var stack = [];

    stack.push({
        start: 0,
        end: array.length - 1,
    });

    while (stack.length > 0) {
        var stackTop = stack.pop();
        var start = stackTop.start;
        var end = stackTop.end;

        if (start >= end) continue;

        var pivotId = end;
        var pivot = array[pivotId];

        var currSwapId = start;
        for (var i = start; i < end; i++) {
            if (array[i] > pivot) continue;
            
            var temp = array[i];
            array[i] = array[currSwapId];
            array[currSwapId] = temp;
            currSwapId++;
        }

        array[pivotId] = array[currSwapId];
        array[currSwapId] = pivot;

        if (currSwapId - 1 > start) {
            stack.push({
                start,
                end: currSwapId - 1,
            });
        }
        
        if (currSwapId + 1 < end) {
            stack.push({
                start: currSwapId + 1,
                end,
            });
        }
        
    }

    return array;
}

async function getAverageTime(repeatTimes) {

    const measures = [];
    for (let i = 0; i < repeatTimes; i++) {
        const numbers = JSON.parse(numbersJson);
        const start = performance.now();
        qsort(numbers);
        const end = performance.now();
        measures.push(end - start);
        await new Promise(res => setTimeout(res, 0));
    }

    measures.sort((a, b) => a - b);

    return measures.at(Math.floor(measures.length / 2));
}

document.getElementById('result').innerText = (`Speed: ${await getAverageTime(10)} ms`);


// Generate a random array of numbers
// const numbers = [];
// for (let i = 0; i < 1e7; i++) {
//     numbers.push(Math.floor(Math.random() * 1e8));
// }

// console.log('New arr: ', numbers);