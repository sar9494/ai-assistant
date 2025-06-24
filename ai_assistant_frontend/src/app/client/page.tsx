"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Sidebar from "./components/SideBar";
import Assistant from "./components/AI-Assistant/Assistant";

type InfoItem={
  id: string;
  title: string;
  content: string;
}

const mockData: InfoItem[] = [
  {
    id: "1",
    title: "Ажлын цаг",
    content: "Манай байгууллагын ажил эхлэх цаг 09:00, тарах цаг 18:00.",
  },
  {
    id: "2",
    title: "Амралтын журам",
    content: "Жил бүрийн 7 сард нийт ажилтнууд амарч болно.",
  },
  {
    id: "3",
    title: "Ажлын хувцасны дүрэм",
    content: "Ажлын өдрүүдэд ажилтнууд албан ёсны хувцастай байх ёстой.",
  },
  {
    id: "4",
    title: "Амралтын хувиар",
    content: "Манай байгууллагын ажилчид 80/20 хэмээх дүрмийг ашиглах дуртай.",
  },
];

export default function ClientPage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [tab, setTab] = useState("dashboard");

  const handleAsk = async () => {
    if (!query.trim()) return;

    const defaultAnswer =
      "Энэ асуултад одоогоор хариулт бэлэн биш байна. Backend дуусмагц AI хариу өгнө.";

    setTimeout(() => {
      setResponse(defaultAnswer);
    }, 600);
  };

  return (
    <div className="flex min-h-screen">
       <div className="flex min-h-screen">
    <Sidebar value={tab} onChange={setTab} />
 
  </div>

      {/* Main content */}
      <main className="flex-1 px-6 py-10">
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
              <p className="text-muted-foreground mt-2">Энэ хэсэгт багийн гишүүдийн жагсаалт байрлана.</p>
            </section>
          </TabsContent>

          {/* Calendar */}
          <TabsContent value="calendar">
            <section>
              <h2 className="text-xl font-semibold">Calendar</h2>
              <p className="text-muted-foreground mt-2">Хуваарь болон үйл явдлын товууд энд байрлана.</p>
            </section>
          </TabsContent>

          {/* To-Do */}
          <TabsContent value="todo">
            <section>
              <h2 className="text-xl font-semibold">To-Do</h2>
              <p className="text-muted-foreground mt-2">Хийх ажлуудын жагсаалт.</p>
            </section>
          </TabsContent>

          {/* Time Tracker */}
          <TabsContent value="time">
            <section>
              <h2 className="text-xl font-semibold">Time Tracker</h2>
              <p className="text-muted-foreground mt-2">Ажиллах цаг бүртгэгч систем.</p>
            </section>
          </TabsContent>

          {/* AI Assistant */}
          <TabsContent value="assistant">
           <Assistant/>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
