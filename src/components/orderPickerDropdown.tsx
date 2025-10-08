
type orderPickerDropdownProps = {
    order: number;
    setOrder: (base: number) => void;
};

export default function OrderPickerDropdown({order, setOrder}: orderPickerDropdownProps){
    return (
        <div id="picker-container">
        <select
            id="selector"
            value={order}
            onChange={e => setOrder(parseInt(e.target.value))}
        >
            <option value = {1}> d/dx </option>
            <option value = {2}> d/dx² </option>
            <option value = {3}> d/dx³ </option>
            <option value = {4}> d/dx⁴ </option> 
            <option value = {5}> d/dx⁵ </option>
            <option value = {6}> d/dx⁶ </option>
            <option value = {7}> d/dx⁷ </option>  
            <option value = {8}> d/dx⁸ </option>
            <option value = {9}> d/dx⁹ </option> 
      </select>
    </div>
    )
}