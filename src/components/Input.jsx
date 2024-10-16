export default function Input({ title, onChange, value, max, required }) {
  return (
    <div className="relative top-4">
      <input
        onChange={onChange}
        type="text"
        placeholder={title}
        value={value}
        className="peer bg-button-hover outline-none border-2 border-border-color
        h-9 p-5 lg:w-1/2 rounded-md w-4/6"
        maxLength={max}
        required={required}
      />
      {/* <div className="absolute top-1/2 -translate-y-1/2 left-11 text-lg font-light
      peer-focus:top-0 overflow-hidden transition-all duration-300 w-40 bg-black">
        {title}
      </div> */}
    </div>
  );
}
