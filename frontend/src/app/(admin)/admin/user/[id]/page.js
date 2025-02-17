"use client";
import { useParams } from "next/navigation";
import User from "@/components/Admin/user";
export default function Page() {
  const { id } = useParams();

  return <User id={id} />;
}
