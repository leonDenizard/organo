import Input from "../../components/Input";

export default function Register() {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="border-2 border-border-color w-[90%] h-[600px] m-auto">
        
        <h1 className="text-2xl">Informações pessoais</h1>
        <div className="flex flex-col gap-3">
          <Input title="Digite seu nome" />
          <Input title="WhatsApp: (DD) + Número" />
          <Input title="@slack" />
        </div>

        <h1 className="text-2xl">Horário de expediente</h1>
      </div>
    </div>
  );
}
