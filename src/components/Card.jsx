import { Copy, SquareArrowOutUpRight } from "lucide-react";
import { formatWhatsAppLink } from "../functions/regex";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { toastEmail, toastSlack } from "../services/toastService.jsx";

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
  manager,
  iconBirthday,
  birthday,
  iconChild,
  child,
  iconInterval,
  interval,
  onClick,
}) {
  const link = formatWhatsAppLink(whats);
  const { isAdmin } = useAuth();

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

  const handleCopySlack = async (text) => {
    await navigator.clipboard.writeText(text);
    toastSlack("Slack copiado!");
  };

  const handleCopyEmail = async (text) => {
    await navigator.clipboard.writeText(text);
    toastEmail("E-mail copiado!");
  };

  return (
    <div className="group relative pt-2 pb-12 px-10 bg-card-bg">
      {isAdmin && (
        <div className=" top-3 right-4 absolute cursor-pointer">
          <SquareArrowOutUpRight
            className="stroke-transparent group-hover:stroke-white transition-colors duration-500"
            onClick={onClick}
          />
        </div>
      )}

      <div className="w-full flex justify-center">
        <img
          src={imgProfile}
          alt="photo profile"
          className="rounded-full w-28 h-28 border-2 border-border-color object-cover"
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
        <h2 className="relative truncate max-w-full top-3 text-xl uppercase font-semibold text-white">
          {role}
        </h2>
      </div>

      <div className="relative flex flex-col gap-1 top-6 text-fourthy-color tracking-wide">
        <div
          className="group/slack relative w-full flex gap-2 items-center cursor-pointer"
          onClick={() => handleCopySlack(slack)}
        >
          <div>{iconSlack}</div>
          <p>{slack}</p>
          <Copy
            size={19}
            className="absolute -right-6 stroke-transparent group-hover/slack:stroke-white transition-all duration-200"
          />
        </div>

        <div className="relative w-full flex gap-2 items-center">
          <div>{iconWhats}</div>
          <a href={`https://wa.me/${link}`} target="_blank">
            <p className="hover:underline">{whats}</p>
          </a>
        </div>

        <div
          className="group/mail relative w-full flex gap-2 items-center cursor-pointer"
          onClick={() => handleCopyEmail(mail)}
        >
          <div>{iconMail}</div>
          <p className="truncate">{mail}</p>
          <Copy
            size={19}
            className="absolute -right-6 stroke-transparent group-hover/mail:stroke-white transition-all duration-200"
          />
        </div>

        <div className="w-full flex gap-2 items-center">
          <div>{iconHour}</div>
          <p>{hour}</p>
        </div>

        <div className="w-full flex gap-2 items-center">
          <div>{iconSuper}</div>
          <p className="truncate">{manager}</p>
        </div>
        <div className="w-full flex gap-2 items-center">
          <div className="bg-border-color rounded-full">{iconInterval}</div>
          <p>{interval}</p>
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
