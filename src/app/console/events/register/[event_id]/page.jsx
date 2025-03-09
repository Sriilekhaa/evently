import RegForm from "./register_form";
import { fetchEvent } from "@/actions/actions";

const Register = async ({ params }) => {
  const { event_id } = await params;

  const event=await fetchEvent(event_id);

  return (
    <main className="px-12 py-5 mt-24 md:py-12 md:px-24 lg:px-72">
      <h1 className="text-4xl text-center text-white">
        Register for {event.title}
      </h1>
      <RegForm />
    </main>
  );
};

export default Register;
