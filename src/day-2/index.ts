import { readFile } from 'node:fs/promises';

const filePath = new URL('./input.txt', import.meta.url);
const input = await readFile(filePath, 'utf8');
const lines = input.split('\n');

function part1() {
	const maximumCubes = {
		red: 12,
		green: 13,
		blue: 14
	};

	let total = 0;

	for (const game of lines) {
		if (!game) {
			continue;
		}

		const [gameIdString, drawsString] = game.split(': ') as [string, string];
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		const gameId = Number.parseInt(gameIdString.substring(4));
		const draws = drawsString.split('; ');

		const cubes = {
			red: 0,
			green: 0,
			blue: 0
		};

		for (const draw of draws) {
			const cubeAmounts = draw.split(', ');

			for (const cubeAmount of cubeAmounts) {
				const [amountString, color] = cubeAmount.split(' ') as [string, keyof typeof cubes];
				const amount = Number.parseInt(amountString);

				if (amount > cubes[color]) {
					cubes[color] = amount;
				}
			}
		}

		if (cubes.red <= maximumCubes.red && cubes.green <= maximumCubes.green && cubes.blue <= maximumCubes.blue) {
			total += gameId;
		}
	}

	return total;
}

function part2() {
	let total = 0n;

	for (const game of lines) {
		if (!game) {
			continue;
		}

		const [, drawsString] = game.split(': ') as [string, string];
		const draws = drawsString.split('; ');

		const cubes = {
			red: 0n,
			green: 0n,
			blue: 0n
		};

		for (const draw of draws) {
			const cubeAmounts = draw.split(', ');

			for (const cubeAmount of cubeAmounts) {
				const [amountString, color] = cubeAmount.split(' ') as [string, keyof typeof cubes];
				const amount = BigInt(amountString);

				if (amount > cubes[color]) {
					cubes[color] = amount;
				}
			}
		}

		total += cubes.red * cubes.green * cubes.blue;
	}

	return total;
}

export default function day2() {
	return [part1(), part2()];
}
