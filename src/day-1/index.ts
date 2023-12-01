import { readFile } from 'node:fs/promises';

const filePath = new URL('./input.txt', import.meta.url);
const input = await readFile(filePath, 'utf8');
const lines = input.split('\n');

function part1() {
	const numbers = [];

	for (const [lineNumber, line] of lines.entries()) {
		try {
			if (!line) {
				continue;
			}

			const numberMatcher = /^(?:.*?(?<first>\d).*(?<last>\d).*)|(?:.*(?<single>\d).*)$/iu;

			const { first, last, single } = (numberMatcher.exec(line))?.groups ?? {};

			if (single) {
				numbers.push(Number.parseInt(`${single}${single}`));
			} else if (first && last) {
				numbers.push(Number.parseInt(`${first}${last}`));
			} else {
				throw new Error(`Invalid line #${lineNumber}: ${line}`);
			}
		} catch (error) {
			console.error(error.message);
		}
	}

	const sum = numbers.reduce((accumulator, currentNumber) => accumulator + currentNumber, 0);

	return sum;
}

function part2() {
	const numberMap = {
		one: '1',
		two: '2',
		three: '3',
		four: '4',
		five: '5',
		six: '6',
		seven: '7',
		eight: '8',
		nine: '9'
	};

	const numbers = [];

	for (const [lineNumber, line] of lines.entries()) {
		try {
			if (!line) {
				continue;
			}

			const stringNumberMatcher = Object.keys(numberMap).join('|');
			const numberMatcher = new RegExp(`^(?:.*?(?<first>(?:${stringNumberMatcher}|\\d)).*(?<last>(?:${stringNumberMatcher}|\\d)).*)|(?:.*(?<single>(?:${stringNumberMatcher}|\\d)).*)$`, 'iu');

			const { first, last, single } = (numberMatcher.exec(line))?.groups ?? {};

			if (single) {
				const normalizedSingle = numberMap[single as keyof typeof numberMap] ?? single;

				numbers.push(Number.parseInt(`${normalizedSingle}${normalizedSingle}`));
			} else if (first && last) {
				const normalizedFirst = numberMap[first as keyof typeof numberMap] ?? first;
				const normalizedLast = numberMap[last as keyof typeof numberMap] ?? last;

				numbers.push(Number.parseInt(`${normalizedFirst}${normalizedLast}`));
			} else {
				throw new Error(`Invalid line #${lineNumber}: ${line}`);
			}
		} catch (error) {
			console.error(error.message);
		}
	}

	const sum = numbers.reduce((accumulator, currentNumber) => accumulator + currentNumber, 0);

	return sum;
}

export default function day1() {
	return [part1(), part2()];
}
