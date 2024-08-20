function Card({
  imgProfile,
  name,
  surname,
  role,
  iconSlack,
  slack,
  iconWhats,
  whats,
  iconMail,
  mail,
  iconHour,
  hour,
  iconSuper,
  supe,
  iconBirthday,
  birthday,
  iconChild,
  child,
}) {
  return (
    <div className="pt-2 pb-6 px-10 bg-card-bg">
      <div className="w-full flex justify-center">
        <img
          src={imgProfile}
          alt="photo profile"
          className="rounded-full w-22 border-2 border-border-color"
        />
      </div>

      <div className="relative w-full flex flex-col justify-center">
        <h1 className="text-3xl font-bold tracking-wider text-nowrap relative w-full flex justify-center">{name}</h1>

        {surname ? <p className="w-full flex justify-center text-tertiary-color text-lg">( {surname} )</p> : <p className="w-full flex justify-center text-transparent text-lg">empty</p>}
      </div>

      <div className="">
        <h2 className="relative top-3 text-xl uppercase font-semibold text-fourthy-color">{role}</h2>
      </div>

      <div className="relative flex flex-col gap-1 top-6 text-fourthy-color text-lg tracking-wide">
        <div className="w-full flex gap-2">
          <div>{iconSlack}</div>
          <p>{slack}</p>
        </div>

        <div className="w-full flex gap-2">
          <div>{iconWhats}</div>
          <p>{whats}</p>
        </div>

        <div className="w-full flex gap-2">
          <div>{iconMail}</div>
          <p>{mail}</p>
        </div>

        <div className="w-full flex gap-2">
          <div>{iconHour}</div>
          <p>{hour}</p>
        </div>

        <div className="w-full flex gap-2">
          <div>{iconSuper}</div>
          <p>{supe}</p>
        </div>

        <div className="w-full flex gap-2">
          <div>{iconBirthday}</div>
          <p>{birthday}</p>
        </div>

        <div className="w-full flex gap-2">
          <div>{iconChild}</div>
          {child && <p>{child}</p>}
        </div>
      </div>
    </div>
  );
}

export default Card;
