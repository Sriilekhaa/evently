import { deleteEvent } from "@/actions/actions";

const DeleteEvent = async ({ params }) => {
  const event = await params;

  return (
    <main className="flex justify-center gap-4 px-12 py-5 mt-24 md:py-12 md:px-24 lg:px-72">
      <h1 className="text-4xl text-center text-white">Confirm deletion</h1>
      <form action={deleteEvent}>
        <input type="hidden" name="id" value={event.event_id} />
        <button
          type="submit"
          className="px-2 py-1 text-2xl text-white bg-red-500 rounded-xl">
          Confirm
        </button>
      </form>
    </main>
  );
};

export default DeleteEvent;
