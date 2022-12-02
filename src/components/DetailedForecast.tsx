import { useContext } from "react";
import { ForecastContext } from "../contexts/ForecastContextProvider";
import "../styles/Details.css";

type DetailedForecastProps = {
  dateStr: string;
};

export const DetailedForecast = ({
  dateStr,
}: DetailedForecastProps): JSX.Element => {
  const { getHourlyForecastValues } = useContext(ForecastContext);

  const hourlyForecastValues = getHourlyForecastValues(dateStr);

  return (
    <div className="details">
      <table>
        <tbody>
          {hourlyForecastValues.map(
            ({ time, temp_min, temp_max, description }, index) => {
              return (
                <tr key={`${time}-index`}>
                  <td>{time}</td>
                  <td>{`${temp_min}°C / ${temp_max}°C`}</td>
                  <td>{description}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};
