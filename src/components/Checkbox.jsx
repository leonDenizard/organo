export default function CheckBox({ title, id, isChecked, onChange, disabled }) {
    return (
        <div>
            <input type="checkbox"  checked={isChecked} onChange={onChange} disabled={disabled} id={id} className="border w-4 h-"/>
            <label htmlFor={id} className={`cursor-pointer ${disabled ? 'text-gray-500' : ''}`}>{title}</label>
            
        </div>

    )
}