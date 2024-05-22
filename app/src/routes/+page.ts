export async function load({ fetch }) {
	const res = await fetch('./all_4digits.json');
	const codesPerGroup = await res.json();

	return {
		both: codesPerGroup['both'],
		epsg: codesPerGroup['epsg'],
		jpx: codesPerGroup['jpx']
	};
}
