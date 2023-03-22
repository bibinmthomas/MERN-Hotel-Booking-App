import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Loading from "../../components/Loading";
function PieChartComponent() {
  const adminCharts = useSelector((state) => state.adminChart);
  const { hotelChart } = adminCharts;
  let COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
  useEffect(() => {
    console.log(hotelChart);
  }, [hotelChart]);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      {hotelChart ? (
        <>
          <h2 className="black">TOP HOTELS:</h2>
          <PieChart width={600} height={250}>
            <Pie
              data={hotelChart}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {hotelChart.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default PieChartComponent;
