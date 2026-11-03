import Image from "next/image";

const iconPaths = {
  home: "/icons/home.svg",
  analytics: "/icons/analytics.svg",
  inbox: "/icons/inbox.svg",
  employees: "/icons/employees.svg",
  integrations: "/icons/integrations.svg",
  billing: "/icons/billing.svg",
  support: "/icons/support.svg",
  settings: "/icons/settings.svg",
} as const;

type IconName = keyof typeof iconPaths;
export function Icon({
  name,
  label = "",
  size = 20,
}: {
  name: IconName;
  label?: string;
  size?: number;
}) {
  return (
    <Image
      src={iconPaths[name]}
      alt={label}
      width={size}
      height={size}
      unoptimized
    />
  );
}
