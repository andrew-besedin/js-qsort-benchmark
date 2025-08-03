
const numbersJson = await fetch('numbers.json').then(res => res.text());
// const numbers = await numbersJson.json();

function qsort(array) {
    const stack = new Array(array.length * 6); 
    let sp = 0; // stack pointer

    // Push initial bounds
    stack[sp++] = 0;
    stack[sp++] = array.length - 1;


    while (sp > 0) {
        const end = stack[--sp];
        const start = stack[--sp];

        if (start < end) {
            const pivotId = end;
            const pivot = array[pivotId];

            let currSwapId = start;
            for (let i = start; i < end; i++) {
                if (array[i] <= pivot) {
                    const temp = array[i];
                    array[i] = array[currSwapId];
                    array[currSwapId] = temp;
                    currSwapId++;
                }
            }

            array[pivotId] = array[currSwapId];
            array[currSwapId] = pivot;

            if (currSwapId - 1 > start) {
                // Push left
                stack[sp++] = start;
                stack[sp++] = currSwapId - 1;
            }

            if (currSwapId + 1 < end) {
                // Push right
                stack[sp++] = currSwapId + 1;
                stack[sp++] = end;
            }
        }
    }
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