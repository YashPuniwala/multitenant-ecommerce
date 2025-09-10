import { getPayload } from "payload";
import config from "@payload-config";
import { CustomCategory } from "@/app/(app)/(home)/types";
import { Category } from "@/payload-types";

export const getCategories = async (): Promise<CustomCategory[]> => {
  const payload = await getPayload({ config });
  
  const data = await payload.find({
    collection: "categories",
    depth: 1,
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
    })),
  }));
  
  return formattedData;
};