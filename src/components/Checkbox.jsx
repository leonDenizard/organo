export default function CheckBox({ title, id, isChecked, onChange, disabled }) {
    return (
        <div className="checkbox-wrapper-46">
            <input className="inp-cbx" type="checkbox" checked={isChecked} onChange={onChange} disabled={disabled} id={id} />
            <label htmlFor={id} className="cbx">
                <span>
                    <svg width="18px" height="14px" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg></span><span>{title}</span>
            </label>

        </div>

    )
}