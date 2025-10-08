import "./styles/basePickerDropdown.css"

type BasePickerDropDownProps = {
  fromBase: string;
  toBase: string;
  setFromBase: (base: string) => void;
  setToBase: (base: string) => void;
};

export default function BasePickerDropDown({fromBase, toBase, setFromBase, setToBase}: BasePickerDropDownProps) {
  return (
    <div id="picker-container">
      <select
        id="fromBase"
        value={fromBase}
        onChange={e => setFromBase(e.target.value)}
      >
        {Array.from({ length: 31 }, (_, i) => (
          <option key={i + 2} value={i + 2}>
            {i + 2}
          </option>
        ))}
      </select>
      ➔
      <select
        id="toBase"
        value={toBase}
        onChange={e => setToBase(e.target.value)}
      >
        {Array.from({ length: 31 }, (_, i) => (
          <option key={32 - i} value={32 - i}>
            {32 - i}
          </option>
        ))}
      </select>
    </div>
  );
}
