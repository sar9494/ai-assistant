import { FileUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function AdminDashboardPage() {
  
  const dummyQuestions = [
    {
      id: 1,
      question: "HR ийн мэдээлэл байна уу?",
    },
    {
      id: 2,
      question: "Хурлын талаар мэдээлэл байна уу?",
    },
    {
      id: 3,
      question: "Цалин хэзээ ордог вэ?",
    },
    {
      id: 4,
      question: "Өргөдөл хэрхэн бичих вэ?",
    },
    {
      id: 5,
      question: "Захирлын дугаар байна уу?",
    },
    {
      id: 6,
      question: "Миний чөлөөний боломжит цаг хэд байна?",
    },
    {
      id: 7,
      question: "Амралтын цалин хэрхэн бодогддог вэ?",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold">Хариулагдаагүй асуултууд</h1>

      <div className="space-y-4">
        {dummyQuestions.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-slate-100 p-4 rounded-xl"
          >
            <p className="text-base text-gray-800">{item.question}</p>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <FileUp className="w-4 h-4 text-muted-foreground" />
              </Button>

              <Button variant="ghost" size="icon">
                <Trash2 className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}

