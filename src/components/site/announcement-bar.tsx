"use client";

import { Download, Mail } from "lucide-react";
import { CONTACT } from "@/lib/contact";

/**
 * Black bar at the very top of every page.
 * Left: "Sending a physical model? Download our prescription form here ↓"
 * Right: lab email
 */
export function AnnouncementBar() {
  return (
    <div className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-9 items-center justify-between gap-3 text-[11px] sm:text-xs">
          <a
            href="/Perscription-Form.pdf"
            download
            className="inline-flex items-center gap-2 font-medium text-white/95 hover:text-white transition-colors group min-w-0"
          >
            <span className="truncate">
              Sending a physical model?{" "}
              <span className="hidden sm:inline">Download our prescription form here</span>
              <span className="sm:hidden">Download Rx form</span>
            </span>
            <Download className="size-3.5 shrink-0 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="hidden md:inline-flex items-center gap-1.5 text-white/85 hover:text-white transition-colors"
          >
            <Mail className="size-3.5" />
            {CONTACT.email}
          </a>
        </div>
      </div>
    </div>
  );
}
