import { readFile } from 'node:fs/promises';

const filePath = new URL('./input.txt', import.meta.url);
const input = await readFile(filePath, 'utf8');
const file = input.trim().split('\n').map((line) => line.trim().split(''));

function findNumber(line: string[] | undefined, columnNumber: number) {
	if (line === undefined) {
		return 0;
	}

	let number = line[columnNumber] ?? '';

	if ((/[^\d]/iu).test(number)) {
		return 0;
	}

	let currentColumnNumber = columnNumber - 1;

	do {
		const currentColumn = line[currentColumnNumber] ?? '';

		if ((/[^\d]/iu).test(currentColumn)) {
			break;
		}

		number = currentColumn + number;
		currentColumnNumber -= 1;
	} while (currentColumnNumber > 0);

	currentColumnNumber = columnNumber + 1;

	do {
		const currentColumn = line[currentColumnNumber] ?? '';

		if ((/[^\d]/iu).test(currentColumn)) {
			break;
		}

		number += currentColumn;
		currentColumnNumber += 1;
	} while (currentColumnNumber < line.length);

	// eslint-disable-next-line radix
	return Number.parseInt(number, 10);
}

function part1() {
	const partNumbers: number[] = [];

	for (const [lineNumber, line] of file.entries()) {
		for (const [columnNumber, column] of line.entries()) {
			if ((/[^\d.]/iu).test(column)) {
				const leftNumber = findNumber(line, columnNumber - 1);
				const rightNumber = findNumber(line, columnNumber + 1);
				const topNumber = findNumber(file[lineNumber - 1], columnNumber);
				const bottomNumber = findNumber(file[lineNumber + 1], columnNumber);

				let topLeftNumber = 0;
				let topRightNumber = 0;

				if (topNumber === 0) {
					topLeftNumber = findNumber(file[lineNumber - 1], columnNumber - 1);
					topRightNumber = findNumber(file[lineNumber - 1], columnNumber + 1);
				}

				let bottomLeftNumber = 0;
				let bottomRightNumber = 0;

				if (bottomNumber === 0) {
					bottomLeftNumber = findNumber(file[lineNumber + 1], columnNumber - 1);
					bottomRightNumber = findNumber(file[lineNumber + 1], columnNumber + 1);
				}

				partNumbers.push(topLeftNumber);
				partNumbers.push(topNumber);
				partNumbers.push(topRightNumber);
				partNumbers.push(leftNumber);
				partNumbers.push(rightNumber);
				partNumbers.push(bottomLeftNumber);
				partNumbers.push(bottomNumber);
				partNumbers.push(bottomRightNumber);
			}
		}
	}

	return partNumbers.reduce((acc, number) => acc + number, 0);
}

export default function day3() {
	return [part1()];
}
