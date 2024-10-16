export default function ButtonSubmit({ text, submit }){
    return (
        <div className="flex justify-end">
            <button type="submit" className="w-screen lg:w-56 bg-button-register p-2 px-6 font-semibold uppercase text-lg rounded-lg mb-5">{text}</button>
        </div>
    )
}