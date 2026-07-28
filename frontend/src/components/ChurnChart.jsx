import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChurnChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/stats")
      .then((response) => response.json())
      .then((result) => {
        setData([
          {
            name: "Stayed",
            value: result.stayed,
          },
          {
            name: "Churned",
            value: result.churned,
          },
        ]);
      });
  }, []);


  return (
    <div
      style={{
        width: "100%",
        height: 350,
        marginTop: 30,
      }}
    >

      <h2>
        Customer Distribution
      </h2>

      <ResponsiveContainer>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
              />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}