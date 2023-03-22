import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Loading from "../../components/Loading";
function PieChartComponent() {
  const adminCharts = useSelector((state) => state.adminChart);
  const { blogChart } = adminCharts;
  let COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];

  useEffect(() => {
    console.log(blogChart);
  }, [blogChart]);

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
      {blogChart ? (
        <>
          <h2 className="black ">POPULAR BLOGS:</h2>
          <PieChart width={600} height={260}>
            <Pie
              data={blogChart}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              label
            >
              {blogChart.map((entry, index) => (
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
