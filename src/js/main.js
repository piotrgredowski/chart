"use strict";
exports.__esModule = true;
var moment = require("../js/moment.min");
// import * as d3 from '../js/d3.min';
// import * as c3 from '../js/c3.min';
function generateData(name, probes, divider) {
    if (divider === void 0) { divider = 5; }
    var x = [];
    var y = [];
    x[0] = 'x';
    y[0] = name;
    for (var i = 1; i <= probes; i++) {
        y[i] = divider + Math.sin(i / divider) + Math.floor(Math.random() * divider);
        // x[i] = 2000 + i;
        // x[i] = x[i].toString();
        // x[i] = moment().add(i, 'd').format();
        x[i] = moment().add(i, 'd');
    }
    var result = [x, y];
    return result;
}
var chart = c3.generate({
    bindto: '#chart',
    size: {
        width: 800,
        height: 480
    },
    padding: {
        right: 20
    },
    data: {
        x: 'x',
        columns: generateData('sin1', 100)
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                fit: false,
                format: '%Y/%m/%d',
                rotate: 30
            }
        },
        y: {
            show: true,
            tick: {
                format: d3.format("$.2f")
            }
        }
    },
    zoom: {
        enabled: true
    },
    point: {
        show: false,
        focus: {
            expand: {
                enabled: true,
                r: 3
            }
        }
    },
    subchart: {
        show: false,
        size: {
            height: 150
        }
    }
});
chart.load({
    columns: generateData('sin2', 100, 10)
});
setTimeout(function () {
    chart.transform('spline', 'sin2');
}, 3000);
