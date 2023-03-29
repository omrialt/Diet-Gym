import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "../styles/slider.scss";

const FilterSlider = ({
  label,
  minValue,
  maxValue,
  onInputFn,
  rangeArray,
  type,
}) => {
  return (
    <div className="slider">
      <label className="label-range" htmlFor={type}>
        {label}
      </label>
      <RangeSlider
        min={minValue}
        max={maxValue}
        defaultValue={[minValue, maxValue]}
        onInput={(e) => onInputFn(e, type)}
      />
      <div className="d-flex">
        <span>{rangeArray.min}</span>
        <span>{rangeArray.max}</span>
      </div>
    </div>
  );
};
export default FilterSlider;
