import EventForm from "@/components/event_form";

const NewEvent = () => {
  return (
    <main className="mx-auto xl:max-w-[90vw] mt-24 py-5 md:py-12 px-12 md:px-24 lg:px-72">
      <h1 className="text-4xl text-center text-white">
        Create Event
      </h1>
      <EventForm />
    </main>
  );
};

export default NewEvent;
