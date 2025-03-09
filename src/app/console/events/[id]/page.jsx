"use client";

import { use, useEffect, useState } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  ChevronLeft,
  Clock,
  Loader,
  MapPin,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  deleteEvent,
  fetchEvent,
  updateRegisterStatus,
} from "@/actions/actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const EventDetailsPage = ({ params }) => {
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = use(params);
  const { data: session } = useSession();

  useEffect(() => {
    console.log("fetcjhing..");
    const fetchData = async () => {
      try {
        const data = await fetchEvent(id);
        setEvent(data); // Expecting data to be already serialized from the server
        console.log("event is ", data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [id]);

  if (error) return <div>Error: {error}</div>;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const handleRegister = async () => {
    try {
      await updateRegisterStatus(
        id,
        !event.register_status
      );
      setEvent({
        ...event,
        register_status: !event.register_status,
      });
    } catch (err) {
      console.error(
        "Failed to update register status:",
        err
      );
    }
  };

  // Fix the creator check by converting IDs to strings for comparison
  const isCreator =
    session?.user?.id?.toString() ===
    event?.creator.toString();

  const creatorId = event?.creator?.toString();
  const loggedUserId = session?.user?.id;
  console.log("creatorId", creatorId);
  console.log("loggedUserId", loggedUserId);

  return (
    <>
      {!event ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto rounded-lg shadow-lg">
            <div className="p-6">
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() =>
                  router.push("/console/events")
                }
              >
                <ChevronLeft /> Back to Events
              </Button>
              <div className="relative w-full h-[400px] mb-6">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h1 className="text-3xl font-bold">
                {event.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {event.venue}
              </p>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event.start_date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">
                      {event.start_time} - {event.end_time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Venue</p>
                    <p className="text-sm text-muted-foreground">
                      {event.venue}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Description
                </h3>
                <p className="text-muted-foreground">
                  {event.desc}
                </p>
              </div>
            </div>

            <div className="p-6 flex justify-end space-x-4 border-t">
              {isCreator ? (
                // Show Edit and Delete buttons for creator
                <>
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(
                        `/console/events/edit/${event._id}`
                      )
                    }
                  >
                    Edit Event
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-[112px]"
                    onClick={async () => {
                      try {
                        setIsDeleting(true);
                        await deleteEvent(event._id);
                        toast.success(
                          "Event deleted successfully"
                        );
                        router.push("/console/events");
                      } catch (error) {
                        toast.error(
                          "Failed to delete event"
                        );
                      } finally {
                        setIsDeleting(false);
                      }
                    }}
                  >
                    {isDeleting ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Delete Event"
                    )}
                  </Button>
                </>
              ) : (
                // Show Share and Register buttons for non-creators
                <>
                  <Button variant="outline">
                    Share Event
                  </Button>
                  <Button onClick={handleRegister}>
                    {event.register_status
                      ? "Unregister"
                      : "Register"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetailsPage;
