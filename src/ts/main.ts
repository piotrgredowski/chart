function generateData(name: string, probes: number, divider = 5) {
	let x : (string|number)[] = [];
	let y : (string|number)[] = [];
	x[0] = 'x';
	y[0] = name;
	for (let i = 1; i <= probes; i++) {
		y[i] = Math.sin( i / divider );
		x[i] = i;
	}
	let result = [x, y];
	return result;
}
console.log(5);
let chart: object = c3.generate({
	bindto: '#chart',
	size: {
		width: 640,
		height: 480
	},
	data: {
		x: 'x',
		columns: generateData('sin1', 100)
	},
	axis: {
		x: {
			show: true,
			type: 'indexed',
			tick: {
				// culling: {
				// 	max: 10
				// },
				// fit: true,
				// count: 5,
				rotate: 45,
			}
		}
	},
	zoom: {
		enabled: true,
		// rescale: true
	},
	point: {
		show: true,
		focus: {
			expand: {
				enabled: true,
				r: 3
			}
		}
	},
});

chart.load({
	columns: generateData('sin2', 100, 10)
});
