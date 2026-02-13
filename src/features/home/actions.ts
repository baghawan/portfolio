"use server";

import { fetcher } from "@/lib/fetcher";
import { HomepageData } from "@/types/home";

export async function getHomepage() {
  const response = await fetcher<HomepageData>({
    endpoint: "/homepage",
  });

  return response;
}
