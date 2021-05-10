chartIt().catch(() => console.log("shit"));

async function chartIt() {
  const fdata = await getCSV();
  //   console.log("sachin");
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: fdata.xlabel,
      datasets: [
        {
          label:
            "Tables of Global and Hemispheric Monthly Means and Zonal Annual Means",
          data: fdata.ylabel,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
  });
}

async function getCSV() {
  const xlabel = [];
  const ylabel = [];

  const response = await fetch("ZonAnn.Ts+dSST.csv");
  const data = await response.text();

  const table = data.split("\n").slice(2);

  table.forEach((elem) => {
    const row = elem.split(",");
    const year = row[0];
    const global = row[1];
    xlabel.push(year);
    ylabel.push(row);
    console.log(year, global);
  });
  return { xlabel, ylabel };
}
