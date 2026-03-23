"use client";

import { motion, AnimatePresence } from "motion/react";
import { Attendee } from "@/lib/plan-types";

interface AttendeeFormProps {
  organizerName: string;
  organizerEmail: string;
  attendees: Attendee[];
  onOrganizerChange: (field: "organizerName" | "organizerEmail", value: string) => void;
  onAttendeeChange: (index: number, field: "name" | "email", value: string) => void;
  onAddAttendee: () => void;
  onRemoveAttendee: (index: number) => void;
}

export default function AttendeeForm({
  organizerName,
  organizerEmail,
  attendees,
  onOrganizerChange,
  onAttendeeChange,
  onAddAttendee,
  onRemoveAttendee,
}: AttendeeFormProps) {
  const filledAttendees = attendees.filter((a) => a.name && a.email).length;
  const totalFilled = (organizerName && organizerEmail ? 1 : 0) + filledAttendees;
  const needed = Math.max(0, 8 - totalFilled);

  return (
    <div className="space-y-10">
      {/* Organizer */}
      <div>
        <div className="text-[11px] tracking-[0.15em] uppercase text-[#e85d26] font-body font-medium mb-4">
          You (the organizer)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Your name"
            value={organizerName}
            onChange={(e) => onOrganizerChange("organizerName", e.target.value)}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-5 py-3.5 text-text font-body text-sm placeholder:text-[#5a5550] focus:border-[#e85d26] focus:outline-none transition-colors"
          />
          <input
            type="email"
            placeholder="Your email"
            value={organizerEmail}
            onChange={(e) => onOrganizerChange("organizerEmail", e.target.value)}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-5 py-3.5 text-text font-body text-sm placeholder:text-[#5a5550] focus:border-[#e85d26] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Attendees */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-[11px] tracking-[0.15em] uppercase text-[#e85d26] font-body font-medium">
            Your Crew
          </div>
          <div className="text-[11px] font-body text-[#5a5550]">
            {needed > 0 ? (
              <span>
                <span className="text-[#e85d26] font-medium">{needed} more</span> needed
              </span>
            ) : (
              <span className="text-[#2d5a3f] font-medium">Ready to go</span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {attendees.map((attendee, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-start"
              >
                <input
                  type="text"
                  placeholder={`Name ${i + 1}`}
                  value={attendee.name}
                  onChange={(e) => onAttendeeChange(i, "name", e.target.value)}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-5 py-3.5 text-text font-body text-sm placeholder:text-[#5a5550] focus:border-[#e85d26] focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder={`Email ${i + 1}`}
                  value={attendee.email}
                  onChange={(e) => onAttendeeChange(i, "email", e.target.value)}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-5 py-3.5 text-text font-body text-sm placeholder:text-[#5a5550] focus:border-[#e85d26] focus:outline-none transition-colors"
                />
                {attendees.length > 7 && (
                  <button
                    onClick={() => onRemoveAttendee(i)}
                    className="px-3 py-3.5 text-[#5a5550] hover:text-[#e85d26] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          onClick={onAddAttendee}
          className="mt-5 text-[11px] tracking-[0.15em] uppercase font-body text-[#e85d26] hover:text-[#d14a18] transition-colors flex items-center gap-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m6-6H6" />
          </svg>
          Add another
        </button>
      </div>

      {/* Counter */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 flex items-center justify-between">
        <div className="font-body text-sm text-[#8a8580]">
          Total attendees
        </div>
        <div className="flex items-center gap-3">
          <span className={`font-display text-3xl ${totalFilled >= 8 ? "text-[#2d5a3f]" : "text-[#e85d26]"}`}>
            {totalFilled}
          </span>
          <span className="text-[#5a5550] font-body text-sm">/ 8 min</span>
        </div>
      </div>
    </div>
  );
}
