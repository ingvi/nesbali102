import { notFound } from "next/navigation";
import { Listing } from "@/components/Listing";
import { StructuredData } from "@/components/StructuredData";
import { isLang } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <StructuredData lang={lang} />
      <Listing />
    </>
  );
}
