import ApplyPageClient from "./ApplyPageClient";

export default async function ApplyPage({ searchParams }) {
  const params = await searchParams;

  return <ApplyPageClient isSuccess={params?.success === "1"} />;
}
