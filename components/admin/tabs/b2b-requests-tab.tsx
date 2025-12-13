"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { B2BRequestsTable } from "../b2b-requests-table";
import type { AdminB2BRequest } from "@/types/b2b-request";
import type { B2BRequestStatus } from "@/types/b2b-request";
import { Briefcase } from "lucide-react";

interface B2BRequestsTabProps {
  requests: AdminB2BRequest[];
}

export function B2BRequestsTab({ requests: initialRequests }: B2BRequestsTabProps) {
  const router = useRouter();
  const [requests, setRequests] = useState<AdminB2BRequest[]>(initialRequests);

  const handleStatusUpdate = (id: string, newStatus: B2BRequestStatus) => {
    // Update local state optimistically
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: newStatus,
              reviewedAt: newStatus !== "pending" ? new Date().toISOString() : req.reviewedAt,
            }
          : req
      )
    );

    // Refresh data after a short delay to ensure consistency
    setTimeout(() => {
      router.refresh();
    }, 500);
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header - Match Account Dashboard */}
      <div className="pb-4 border-b border-gray-200/50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl"></div>
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 border-2 border-primary/30 shadow-lg">
              <Briefcase className="h-7 w-7 text-primary" strokeWidth={2} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              B2B Requests
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1.5 font-medium">
              Review and manage custom bulk order requests from businesses
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden">
        <B2BRequestsTable
          requests={requests}
          loading={false}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>
    </div>
  );
}

