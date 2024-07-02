import { convertDataDate } from "./convertDataDate";
export const settingChartData = (setChartData, prices) => {
  setChartData({
    labels: prices.map((price) => convertDataDate(price[0])),
    datasets: [
      {
        data: prices.map((price) => (price[1])),
        borderWidth: 1.5,
        fill: true,
        backgroundColor: "rgba(58, 128, 233,0.1)",
        tension: 0.25,
        borderColor: "#3a80e9",
        pointRadius: 0,
      },
    ],
  });
}