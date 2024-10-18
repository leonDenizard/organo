export default function SearchBar({handleInputName}) {
  return (
    <div className="relative top-8 w-full flex justify-center">
      <div className="relative  lg:w-[60vw]">
        <div className="absolute top-[10px] lg:top-[15px] right-[24px]">
          <svg
            width={25}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            
          >
            <path
              d="M21.44 18.868h-1.354l-.48-.463a11.1 11.1 0 002.692-7.256C22.299 4.991 17.308 0 11.15 0 4.991 0 0 4.991 0 11.15c0 6.157 4.991 11.149 11.15 11.149a11.1 11.1 0 007.255-2.694l.463.48v1.356L27.444 30 30 27.444l-8.56-8.576zm-10.29 0a7.708 7.708 0 01-7.72-7.719 7.708 7.708 0 017.72-7.718 7.708 7.708 0 017.718 7.718 7.708 7.708 0 01-7.719 7.719z"
              fill="#fff"
            />
          </svg>
        </div>
        <input onChange={handleInputName} className="bg-secundary-color lg:h-[60px] p-3 px-8 w-full rounded-full outline-none border-2 border-border-color text-lg leading-none caret-custom
            placeholder:text-white placeholder:font-semibold placeholder:tracking-wider placeholder:text-lg placeholder:px-3" type="text" placeholder="Pesquisa Ai..." />
      </div>
    </div>
  );
}
