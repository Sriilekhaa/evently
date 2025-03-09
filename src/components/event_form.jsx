"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addEvent, updateEvent } from "@/actions/actions"; // Adjust the import path as needed
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  title: z.string(),
  venue: z.string(),
  start_date: z
    .date()
    .min(new Date(), "Start date must be in the future"),
  end_date: z.date(),
  start_time: z.string(),
  end_time: z.string(),
  desc: z.string(),
  image: z.any(),
});

import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Field from "./field_input";
import DatePicker from "./datepicker_field";
import { Loader } from "lucide-react";

const EventForm = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState(props.event || null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.event?.title || "",
      venue: props.event?.venue || "",
      start_date: props.event?.start_date
        ? new Date(props.event.start_date)
        : new Date(),
      end_date: props.event?.end_date
        ? new Date(props.event.end_date)
        : new Date(),
      start_time: props.event?.start_time || "",
      end_time: props.event?.end_time || "",
      desc: props.event?.desc || "",
      image: props.event?.image || "",
    },
  });
  const [image, setImage] = useState(props.event?.image);

  useEffect(() => {
    console.log("the session is", session);
  }, [session]);

  useEffect(() => {
    form.setValue(fields.image.name, image);
  }, [image]);

  const onSubmit = async (values) => {
    if (!session) {
      toast.error("Please login to create events");
      router.push("/login");
      return;
    }

    setIsLoading(true);
    // const uploadedImageUrl = await uploadImageToCloudinary(values.image[0]);

    const eventData = {
      ...values,
      // image: uploadedImageUrl,
    };

    if (!props.event) {
      try {
        const newEvent = await addEvent(
          eventData,
          session.user.id
        );
        console.log("Event created successfully", newEvent);
        setEvent(newEvent);
        console.log("newEvent", newEvent);
        router.push(`/console/events/${newEvent._id}`);
      } catch (error) {
        console.error("Error creating event:", error);
        toast.error(
          error.message || "Failed to create event"
        );
      }
    } else {
      try {
        await updateEvent(props.event._id, eventData);
        setEvent(eventData);
        console.log("Event updated successfully");
        router.push(`/console/events/${props.event._id}`);
      } catch (error) {
        console.error("Error updating event:", error);
        toast.error(
          error.message || "Failed to update event"
        );
      }
    }

    setIsLoading(false);
  };

  // Function to handle image upload to Cloudinary
  // const uploadImageToCloudinary = async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "YOUR_CLOUDINARY_UPLOAD_PRESET"); // Replace with your Cloudinary preset
  //   const cloudinaryUrl =
  //     "https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_CLOUD_NAME/image/upload"; // Replace with your Cloudinary URL

  //   const response = await fetch(cloudinaryUrl, {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const data = await response.json();
  //   return data.secure_url; // Returns the image URL from Cloudinary
  // };

  return (
    <>
      {session ? (
        <Form {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
            method="post"
          >
            {/* Title field */}
            <Field form={form} {...fields.title} />

            {/* Venue field */}
            <Field form={form} {...fields.venue} />

            {/* Date fields */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <DatePicker
                form={form}
                {...fields.startDate}
              />
              <DatePicker
                form={form}
                min={form.getValues(fields.startDate.name)}
                {...fields.endDate}
              />
            </div>

            {/* Time fields */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <Field form={form} {...fields.startTime} />
              <Field form={form} {...fields.endTime} />
            </div>

            {/* Event Description */}
            <h2 className="my-8 text-3xl text-center text-white">
              Event Description
            </h2>

            {/* Image field */}
            <Field form={form} {...fields.image}>
              <Input
                onChange={(event) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setImage(reader.result);
                  };
                  reader.readAsDataURL(
                    event.target.files[0]
                  );
                }}
                {...fields.image}
                accept="image/jpeg,image/jpg,image/png,image/webp"
              />
            </Field>

            {/* Image preview */}
            {image ? (
              <img
                src={image}
                alt="Event Image"
                className="w-full h-[250px] object-cover rounded-lg"
                width={500}
                height={500}
              />
            ) : (
              <div className="w-full h-[250px] bg-teal-800 rounded-lg"></div>
            )}

            {/* Description field */}
            <Field
              type={props.event}
              form={form}
              {...fields.desc}
              textarea
            />

            {/* Hidden input for event ID (if updating an existing event) */}
            <input
              type="hidden"
              name="event_id"
              value={props.event?.id ?? ""}
            />

            {/* Submit button */}
            <Button
              className="w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                `${props.event ? "Update" : "Create"} Event`
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin" />
        </div>
      )}
    </>
  );
};

const fields = {
  title: {
    name: "title",
    label: "Event Title",
    type: "text",
  },
  venue: {
    name: "venue",
    label: "Event Venue",
    type: "text",
  },
  startDate: {
    name: "start_date",
    label: "Start Date",
    type: "date",
  },
  endDate: {
    name: "end_date",
    label: "End Date",
    type: "date",
  },
  startTime: {
    name: "start_time",
    label: "Start Time",
    type: "time",
  },
  endTime: {
    name: "end_time",
    label: "End Time",
    type: "time",
  },
  desc: {
    name: "desc",
    label: "Event Description",
    type: "textarea",
  },
  image: {
    name: "image",
    label: "Event Image",
    type: "file",
  },
};

export default EventForm;
