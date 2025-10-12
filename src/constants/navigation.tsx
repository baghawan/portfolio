import { ReactNode } from "react";
import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

type NavigationItem = {
  label: string | ReactNode;
  href: string;
};

export const MAIN_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Works",
    href: "/works",
  },
  {
    label: "Journals",
    href: "/journals",
  },
];

export const EXTERNAL_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: (
      <LinkedInLogoIcon
        width={18}
        height={18}
      />
    ),
    href: "https://www.linkedin.com/in/dian-baghawan-putera-234b23136/",
  },
  {
    label: (
      <GitHubLogoIcon
        width={18}
        height={18}
      />
    ),
    href: "https://github.com/baghawan",
  },
];
