export type MenuLink = {
  type: "link";
  label: string;
  href: string;
  icon?: string;
  anima: string;
};

export type MenuGroup = {
  type: "group";
  label: string;
  icon?: string;
  anima: string;
  children: MenuLink[];
};

export type MenuItem = MenuLink | MenuGroup;

function parseValue(value: string) {
  const parts = value.split("||").map((s) => s.trim());
  return { href: parts[0], icon: parts[1], anima: parts[2] || "faa-tada" };
}

export function parseMenu(menu: Record<string, unknown> | undefined): MenuItem[] {
  if (!menu) return [];
  return Object.entries(menu).map(([label, value]) => {
    if (typeof value === "string") {
      return { type: "link", label, ...parseValue(value) };
    }
    const parts = label.split("||").map((s) => s.trim());
    const children = Object.entries(value as Record<string, string>).map(([lab, val]) => ({
      type: "link" as const,
      label: lab,
      ...parseValue(val),
    }));
    return {
      type: "group",
      label: parts[0],
      icon: parts[1],
      anima: parts[2] || "faa-tada",
      children,
    };
  });
}

export function iconClass(icon?: string, anima = "faa-tada"): string {
  if (!icon) return "";
  if (icon.startsWith("fa")) return `${icon} ${anima}`;
  if (icon.startsWith("anzhiyu")) return `anzhiyufont ${icon} ${anima}`;
  return icon;
}
