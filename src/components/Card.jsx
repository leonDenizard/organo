import { formatWhatsAppLink } from "../functions/regex";

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
  const link = formatWhatsAppLink(whats);

  const schedules = {
    morning: "10:00 às 19:00",
    afternoon: "13:00 às 22:00",
    night: "15:00 às 00:00",
  };
  const formatSchedules = (value) => {
    //console.log(schedules[value])
    if (schedules[value]) {
      return schedules[value];
    } else {
      return;
    }
  };
  const formatHour = formatSchedules(hour);

  const supers = {
    diogo: "Diogo",
    greice: "Greice",
    teteu: "Matheus Silva",
    duda: "Duda",
    guto: "Augusto Cezar",
    luan: "Luan"
  };
  const formatSuper = (value) => {
    if (supers[value]) {
      return supers[value];
    }
  };
  const formattedSuper = formatSuper(supe);
  //console.log(formattedSuper)
  const childFormat = (child) => {

    if (child === "yes") {
      return (
        <>
          <div>{iconChild}</div>
          <p>Sim</p>
        </>
      );
    } else {
      return <p></p>;
    }
  };

  return (
    <div className="pt-2 pb-12 px-10 bg-card-bg">
      <div className="w-full flex justify-center">
        <img
          src={imgProfile}
          alt="photo profile"
          className="rounded-full w-22 border-2 border-border-color"
          loading="lazy"
        />
      </div>

      <div className="relative w-full flex flex-col justify-center">
        <h1 className="text-3xl font-bold tracking-wider  text-nowrap break-words relative w-full flex justify-center">
          {name}
        </h1>

        {surname ? (
          <p className="w-full flex justify-center text-tertiary-color text-lg">
            ( {surname} )
          </p>
        ) : (
          <p className="w-full flex justify-center text-transparent text-lg">
            empty
          </p>
        )}
      </div>

      <div className="">
        <h2 className="relative top-3 text-xl uppercase font-semibold text-white">
          {role}
        </h2>
      </div>

      <div className="relative flex flex-col gap-1 top-6 text-fourthy-color tracking-wide">
        <div className="w-full flex gap-2 items-center">
          <div>{iconSlack}</div>
          <p>{slack}</p>
        </div>

        <div className="w-full flex gap-2 items-center">
          <div>{iconWhats}</div>
          <a href={`https://wa.me/${link}`} target="_blank">
            <p>{whats}</p>
          </a>
        </div>

        <div className="w-full flex gap-2 items-center">
          <div>{iconMail}</div>
          <p>{mail}</p>
        </div>

        <div className="w-full flex gap-2 items-center">
          <div>{iconHour}</div>
          <p>{formatHour}</p>
        </div>

        <div className="w-full flex gap-2 items-center">
          <div>{iconSuper}</div>
          <p>{formattedSuper}</p>
        </div>

        <div className="w-full flex gap-2 items-center">
          <div>{iconBirthday}</div>
          <p>{birthday}</p>
        </div>

        <div className="w-full flex gap-2 items-center">
          {childFormat(child)}
        </div>
      </div>
    </div>
  );
}

export default Card;
