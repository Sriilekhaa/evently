import EventForm from "@/components/event_form";
import { fetchEvent } from "@/actions/actions";

const UpdateEvent = async ({ params }) => {
  const event_id = await params;

  const e = await fetchEvent(event_id.event_id);
  const events = {
    ...e,
    _id: event_id.event_id,
  };

  return (
    <main className="px-12 py-5 mt-24 md:py-12 md:px-24 lg:px-72">
      <h1 className="text-4xl text-center text-white">Update Event</h1>
      <EventForm event={events} />
    </main>
  );
};

export default UpdateEvent;
