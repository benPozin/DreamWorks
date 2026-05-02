import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { Process } from "@/components/home/process";
import { VipTeaser } from "@/components/home/vip-teaser";
import { Trust } from "@/components/home/trust";
import { CTA } from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <VipTeaser />
      <Trust />
      <CTA />
    </>
  );
}
