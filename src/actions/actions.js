"use server";

import { connect } from "@/db";
import { Events } from "@/models/event.model";
import { User } from "@/models/user.model";
import { revalidatePath } from "next/cache";

export const fetchEvent = async (id) => {
  try {
    await connect();
    console.log("event fetching");
    const event = await Events.findById(id).populate({
      path: "registeredUsers",
      model: User,
      select: "name email",
    });
    console.log("event fetxhed", event);
    if (!event) {
      throw new Error("Event not found");
    }

    // Safely serialize the MongoDB document to plain JavaScript object
    const serializedEvent = {
      ...JSON.parse(JSON.stringify(event._doc)),
      _id: event._id.toString(),
      start_date: event.start_date
        ? new Date(event.start_date).toISOString()
        : null,
      end_date: event.end_date ? new Date(event.end_date).toISOString() : null,
      createdAt: event.createdAt
        ? new Date(event.createdAt).toISOString()
        : null,
      updatedAt: event.updatedAt
        ? new Date(event.updatedAt).toISOString()
        : null,
      register_status: Boolean(event.register_status),
      creator: event.creator.toString(),
      registeredUsers: event.registeredUsers
        ? event.registeredUsers.map((user) => user._id.toString())
        : [],
    };

    return serializedEvent;
  } catch (err) {
    console.error("Error fetching event:", err);
    if (err.message === "Event not found") {
      throw new Error("Event not found");
    }
    throw new Error("Failed to fetch event details");
  }
};

export const fetchEvents = async () => {
  try {
    await connect();
    const events = await Events.find().populate({
      path: "registeredUsers",
      model: User,
      select: "name email",
    });

    // Serialize the events array
    const serializedEvents = events.map((event) => ({
      ...JSON.parse(JSON.stringify(event._doc)),
      _id: event._id.toString(),
      start_date: event.start_date
        ? new Date(event.start_date).toISOString()
        : null,
      end_date: event.end_date ? new Date(event.end_date).toISOString() : null,
      createdAt: event.createdAt
        ? new Date(event.createdAt).toISOString()
        : null,
      updatedAt: event.updatedAt
        ? new Date(event.updatedAt).toISOString()
        : null,
      register_status: Boolean(event.register_status),
      creator: event.creator.toString(),
      registeredUsers: event.registeredUsers
        ? event.registeredUsers.map((user) => ({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
          }))
        : [],
    }));

    return serializedEvents;
  } catch (err) {
    throw new Error("Failed to fetch events from the database");
  }
};

export const deleteEvent = async (id) => {
  try {
    await connect();
    await Events.findByIdAndDelete(id);
    revalidatePath("/events");
  } catch (err) {
    throw new Error("Failed to delete the event");
  }
};

export const updateEvent = async (id, newData) => {
  try {
    await connect();
    const event = await Events.findById(id);
    Object.assign(event, newData);
    await event.save();
    revalidatePath("/console/events/");
  } catch (err) {
    throw new Error("Failed to fetch event details");
  }
};

export const addEvent = async (data, userId) => {
  try {
    await connect();
    const newEvent = new Events({
      ...data,
      creator: userId,
      registeredUsers: [],
    });
    await newEvent.save();
    revalidatePath("/console/events/");

    // Serialize the Mongoose document before returning
    const serializedEvent = {
      ...JSON.parse(JSON.stringify(newEvent._doc)),
      _id: newEvent._id.toString(),
      start_date: newEvent.start_date?.toISOString(),
      end_date: newEvent.end_date?.toISOString(),
      createdAt: newEvent.createdAt?.toISOString(),
      updatedAt: newEvent.updatedAt?.toISOString(),
      register_status: Boolean(newEvent.register_status),
      creator: newEvent.creator.toString(),
      registeredUsers: [],
    };

    return serializedEvent;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateRegisterStatus = async (id, status) => {
  try {
    await connect();
    const event = await Events.findById(id);
    event.register_status = status;
    await event.save();
    revalidatePath("/console/events/");
  } catch (err) {
    throw new Error("Failed to update register status");
  }
};

export const registerForEvent = async (eventId, userId) => {
  try {
    await connect();
    const event = await Events.findById(eventId);

    // Check if user is already registered
    if (event.registeredUsers.includes(userId)) {
      // todo: toast for this action instead of throwing error
      throw new Error("User already registered for this event");
    }

    // Add user to registered users
    event.registeredUsers.push(userId);
    await event.save();
    revalidatePath("/console/events");

    return event;
  } catch (err) {
    throw new Error(err.message || "Failed to register for event");
  }
};

export const unregisterFromEvent = async (eventId, userId) => {
  try {
    await connect();
    const event = await Events.findById(eventId);

    // Remove user from registered users
    event.registeredUsers = event.registeredUsers.filter(
      (id) => id.toString() !== userId.toString()
    );
    await event.save();
    revalidatePath("/events");

    return event;
  } catch (err) {
    throw new Error("Failed to unregister from event");
  }
};

export const isEventCreator = async (eventId, userId) => {
  try {
    await connect();
    const event = await Events.findById(eventId);
    return event.creator.toString() === userId.toString();
  } catch (err) {
    return false;
  }
};
