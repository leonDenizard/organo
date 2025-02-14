export default function ButtonUpload( {onChange, disabled }) {
    return (
        <label className="block">
            <input onChange={onChange} type="file" disabled={disabled} accept=".png, .jpg, .jpeg, .gif .webp" className="block w-full text-sm text-slate-300 mt-4
                file:mr-4 file:py-3 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-bubble-red file:text-white
                hover:file:bg-bubble-red/85 
                file:shadow-shadow-button-upload                
                file:cursor-pointer
                file:transition-colors file:300ms
                "/>
        </label>

    )
}