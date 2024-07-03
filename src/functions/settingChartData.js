import { convertDataDate } from "./convertDataDate";

export const settingChartData = (setChartData, prices1, prices2) => {
  console.log("prices1:", prices1);
  console.log("prices2:", prices2);

  if (Array.isArray(prices1) && prices1.length > 0) {
    const labels = prices1.map((price) => convertDataDate(price[0])); // use prices1 for labels as they should be the same
    const datasets = [
      {
        data: prices1.map((price) => price[1]),
        borderWidth: 1.5,
        borderColor: "#3a80e9",
        fill: false,
        tension: 0.25,
        pointRadius: 0,
      },
    ];

    if (Array.isArray(prices2) && prices2.length > 0) {
      datasets.push({
        data: prices2.map((price) => price[1]),
        borderWidth: 1.5,
        borderColor: "#61c96f",
        fill: false,
        tension: 0.25,
        pointRadius: 0,
      });
    } else {
      datasets[0].fill = true;
      datasets[0].backgroundColor = "rgba(58, 128, 233,0.1)";
    }

    setChartData({
      labels: labels,
      datasets: datasets,
    });
  } else {
    setChartData(null); // or set an empty chart data object
  }
};
