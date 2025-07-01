"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Sidebar from "./components/SideBar";
import Assistant from "./components/AI-Assistant/Assistant";

export default function ClientPage() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen h-screen w-screen min-w-full overflow-hidden">
      <div className="flex min-h-screen">
        <Sidebar value={tab} onChange={setTab} />
      </div>
      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <Tabs value={tab} className="w-full">
          {/* Dashboard */}
          <TabsContent value="dashboard">
            <section className="space-y-3">
              <h1 className="text-3xl font-bold">Нүүр хуудас</h1>
              <p className="text-muted-foreground">
                Байгууллагын дотоод мэдээлэлтэй танилцана уу.
              </p>
            </section>
          </TabsContent>

          {/* Team member */}
          <TabsContent value="team">
            <section>
              <h2 className="text-xl font-semibold">Team members</h2>
              <p className="text-muted-foreground mt-2">
                Энэ хэсэгт багийн гишүүдийн жагсаалт байрлана.
              </p>
            </section>
          </TabsContent>

          {/* Calendar */}
          <TabsContent value="calendar">
            <section>
              <h2 className="text-xl font-semibold">Calendar</h2>
              <p className="text-muted-foreground mt-2">
                Хуваарь болон үйл явдлын товууд энд байрлана.
              </p>
            </section>
          </TabsContent>

          {/* To-Do */}
          <TabsContent value="todo">
            <section>
              <h2 className="text-xl font-semibold">To-Do</h2>
              <p className="text-muted-foreground mt-2">
                Хийх ажлуудын жагсаалт.
              </p>
            </section>
          </TabsContent>

          {/* Time Tracker */}
          <TabsContent value="time">
            <section>
              <h2 className="text-xl font-semibold">Time Tracker</h2>
              <p className="text-muted-foreground mt-2">
                Ажиллах цаг бүртгэгч систем.
              </p>
            </section>
          </TabsContent>

          {/* AI Assistant */}
          <TabsContent value="assistant">
            <Assistant />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
