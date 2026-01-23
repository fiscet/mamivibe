'use server';

import { client as sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { revalidatePath } from "next/cache";

export async function createAppointment(prevState: unknown, formData: FormData) {
  const serviceId = formData.get("service") as string;
  const clientName = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const date = formData.get("date") as string; // This will now be ISO string or YYYY-MM-DDTHH:mm
  const meetingType = formData.get("meetingType") as string;
  const notes = formData.get("notes") as string;

  if (!serviceId || !clientName || !email || !date || !meetingType) {
    return { message: "Kérlek töltsd ki az összes kötelező mezőt." };
  }

  try {
    // Check if we have a token, otherwise we can't write
    const token = process.env.SANITY_API_TOKEN;

    if (!token) {
      console.error("Missing SANITY_API_TOKEN");
      return { message: "Rendszerhiba: Hiányzó API Token." };
    }

    const clientWithToken = sanityClient.withConfig({ token });

    await clientWithToken.create({
      _type: "appointment",
      clientName,
      email,
      phone,
      service: {
        _type: "reference",
        _ref: serviceId
      },
      preferredDate: new Date(date).toISOString(),
      meetingType,
      status: "pending",
      notes
    });

    revalidatePath("/booking");
    return { message: "A foglalási igényedet sikeresen elküldted! Hamarosan kereslek.", success: true };
  } catch (e) {
    console.error("Failed to create appointment:", e);
    return { message: "Failed to create appointment. Please try again." };
  }
}

export async function getServices() {
  return sanityClient.fetch(groq`*[_type == "service"] | order(position asc){
        _id,
        title,
        duration,
        price,
        description,
        position
    }`);
}

export async function getAvailability(start: string, end: string) {
  return sanityClient.fetch(groq`*[_type == "slot" && date >= $start && date <= $end]{
        date,
        isFullyBooked
    }`, { start, end });
}

export async function getSlotsForDate(date: string) {
  return sanityClient.fetch(groq`*[_type == "slot" && date == $date][0]{
        availableTimes
    }`, { date });
}
