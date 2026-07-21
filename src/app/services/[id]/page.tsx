import { notFound } from "next/navigation";
import { Metadata } from "next";
import servicesData from "@/lib/servicesData.json";
import { EditorialServicePage } from "@/components/sections/EditorialServicePage";
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    return {
      title: "Service Not Found | NMC",
    };
  }

  return {
    title: `${service.title} | بروتوكولات النخبة الطبية | NMC`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen relative">
      <EditorialServicePage serviceId={service.id} />
    </main>
  );
}

