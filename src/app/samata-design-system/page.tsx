import type { Metadata } from "next";
import { DesignSystemHub } from "../../../design-system/DesignSystemHub";

export const metadata: Metadata = {
  title: "Samata Design System",
  description:
    "Live component specimens, tokens, architecture ownership rules, and engineering audit.",
};

export default function SamataDesignSystemPage() {
  return <DesignSystemHub />;
}
