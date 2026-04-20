import React from "react";

export default function ReportsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-6 md:min-h-min">
        <h2 className="text-2xl font-semibold tracking-tight">Reports</h2>
        <p className="text-sm text-zinc-500 mt-2">Manage Reports settings and data records.</p>
      </div>
    </div>
  );
}
