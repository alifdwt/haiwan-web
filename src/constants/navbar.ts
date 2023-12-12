export type NavigationItem = {
  title: string;
  href: string;
  content?: {
    hero: {
      title: string;
      description: string;
      href: string;
    };
    submenu: Submenu[];
  };
};

type Submenu = {
  title: string;
  subcategory: Subcategory[];
};

type Subcategory = {
  title: string;
  href: string;
};

export const components: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export const navigationList: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "/shop",
  },
  {
    title: "Cats",
    href: "/cats",
    content: {
      hero: {
        title: "Bolt Kucing 1 KG",
        description: "Makanan kucing yang enak dan bergizi",
        href: "/cats/bolt-kucing-1-kg",
      },
      submenu: [
        {
          title: "Food",
          subcategory: [
            {
              title: "Dry Food",
              href: "/cats/dry-food",
            },
            {
              title: "Wet Food",
              href: "/cats/wet-food",
            },
            {
              title: "Canned Food",
              href: "/cats/canned-food",
            },
            {
              title: "Cooked Food",
              href: "/cats/cooked-food",
            },
            {
              title: "Snack",
              href: "/cats/snack",
            },
          ],
        },
        {
          title: "Accessories",
          subcategory: [
            {
              title: "Collar",
              href: "/cats/collar",
            },
            {
              title: "Toys",
              href: "/cats/toys",
            },
            {
              title: "Bowl",
              href: "/cats/bowl",
            },
            {
              title: "Treats",
              href: "/cats/treats",
            },
          ],
        },
        {
          title: "Litter",
          subcategory: [
            {
              title: "Dry",
              href: "/cats/dry-litter",
            },
            {
              title: "Wet",
              href: "/cats/wet-litter",
            },
          ],
        },
      ],
    },
  },
  {
    title: "Dogs",
    href: "/dogs",
    content: {
      hero: {
        title: "Bolt Anjing 1 KG",
        description: "Makanan anjing yang enak dan bergizi",
        href: "/dogs/bolt-anjing-1-kg",
      },
      submenu: [
        {
          title: "Food",
          subcategory: [
            {
              title: "Dry Food",
              href: "/dogs/dry-food",
            },
            {
              title: "Wet Food",
              href: "/dogs/wet-food",
            },
            {
              title: "Canned Food",
              href: "/dogs/canned-food",
            },
            {
              title: "Cooked Food",
              href: "/dogs/cooked-food",
            },
            {
              title: "Snack",
              href: "/dogs/snack",
            },
          ],
        },
        {
          title: "Accessories",
          subcategory: [
            {
              title: "Collar",
              href: "/dogs/collar",
            },
            {
              title: "Toys",
              href: "/dogs/toys",
            },
            {
              title: "Bowl",
              href: "/dogs/bowl",
            },
            {
              title: "Treats",
              href: "/dogs/treats",
            },
          ],
        },
        {
          title: "Litter",
          subcategory: [
            {
              title: "Dry",
              href: "/dogs/dry-litter",
            },
            {
              title: "Wet",
              href: "/dogs/wet-litter",
            },
          ],
        },
      ],
    },
  },
  {
    title: "Doctor",
    href: "/doctor",
  },
];
