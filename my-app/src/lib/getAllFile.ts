import axios from "axios";

export const getAllFile = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/file/allFiles`
    );
    return res.data.files;
  } catch (error) {
    console.log(error);
  }
};
