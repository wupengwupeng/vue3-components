export default function barChartOptions(source: any = [], series: any = []) {
  return {
    legend: {},
    tooltip: {},
    dataZoom: {
      type: 'inside',
      start: 0,
      end: 100,
    },
    dataset: {
      source: source,
    },
    xAxis: { type: "category", },
    yAxis: {}, //{ gridIndex: 1 }
    grid: {},
    series: series,
    // { type: "bar", },
    // { type: "bar", },
    // { type: "bar", },
    // { type: "bar", },
  };
}