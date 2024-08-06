export default function ButtonSubmit({ text, submit }){
    return (
        <div className="flex justify-end">
            <button type="button" onClick={submit} className="bg-button-register p-2 px-6 font-semibold uppercase text-lg rounded-lg">{text}</button>
        </div>
    )
}