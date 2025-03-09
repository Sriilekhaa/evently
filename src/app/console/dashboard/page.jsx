"use client";

import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const events = [
  {
    _id: "1",
    title: "Web3 Innovation Summit 2024",
    desc: "Join industry leaders for a deep dive into the future of Web3, featuring keynote speakers from major blockchain platforms and interactive workshops.",
    image: "https://images.unsplash.com/photo-1591994843349-f415893b3a6b?q=80&w=1470&fit=crop",
    creator: "user_id_here",
    registeredUsers: [],
  },
  {
    _id: "2",
    title: "AI & Blockchain Convergence Forum",
    desc: "Explore how AI and blockchain technologies are merging to create revolutionary solutions. Network with experts and participate in hands-on demonstrations.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1332&fit=crop",
    creator: "user_id_here",
    registeredUsers: [],
  },
  {
    _id: "3",
    title: "DeFi Development Workshop",
    desc: "A hands-on workshop covering the latest in DeFi development. Learn about smart contracts, yield farming, and liquidity protocols.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1470&fit=crop",
    creator: "user_id_here",
    registeredUsers: [],
  },
  {
    _id: "4",
    title: "Metaverse Gaming Conference",
    desc: "Discover the intersection of gaming and blockchain. Experience live demos of upcoming Web3 games and meet leading gaming studios.",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=1512&fit=crop",
    creator: "user_id_here",
    registeredUsers: [],
  }
];

const Dashboard = () => {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Dashboard" />
        <Button onClick={() => router.push("/console/events/new")}>
          <Plus className="mr-2" /> Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="relative w-full h-40">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.desc}</p>
              <Button
                className="mt-4 w-full"
                onClick={() => router.push(`/console/events/${event._id}`)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
