import axios from "axios";
import { toast } from "sonner";

export const getUnansweredQues = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/message/unanswered`
    );
    return res.data.messages;
  } catch (error) {
    toast("Хариулагдаагүй асуултуудыг харахад алдаа гарлаа.");
  }
};
