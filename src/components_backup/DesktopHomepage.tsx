"use client";

import { motion } from "framer-motion";

import { HeroCinematic } from "@/components/sections/HeroCinematic";
import { DrNajatCinematic } from "@/components/sections/DrNajatCinematic";
import { SystemsNominal } from "@/components/sections/SystemsNominal";
import { ServicesScene1Intro } from "@/components/sections/ServicesScene1Intro";
import { ServicesScene2Carousel } from "@/components/sections/ServicesScene2Carousel";
import { ServicesScene3Outro } from "@/components/sections/ServicesScene3Outro";
import { StaffShowcase } from "@/components/sections/StaffShowcase";
import { MediaGalleryCinematic } from "@/components/sections/MediaGalleryCinematic";
import { CinematicTestimonials } from "@/components/sections/CinematicTestimonials";
import { CinematicFeedbackGallery } from "@/components/sections/CinematicFeedbackGallery";
import { CinematicBlog } from "@/components/sections/CinematicBlog";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { Footer } from "@/components/sections/Footer";
import cinematicData from "@/lib/cinematicData.json";

const staffEntry = cinematicData.find((d) => d.staffData && d.staffData.length > 0);
const allStaff = staffEntry?.staffData?.slice(0, 5) ?? [];

export function DesktopHomepage() {
  return (
    <>
      <main className="relative z-40 bg-[#000814]">
        <motion.div className="snap-center snap-always w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <HeroCinematic />
        </motion.div>
        
        <motion.div className="snap-center snap-always w-full" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <DrNajatCinematic />
        </motion.div>

        <motion.div className="snap-center snap-always w-full" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1 }}>
          <ServicesScene1Intro />
        </motion.div>

        <motion.div className="snap-center snap-always w-full" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1 }}>
          <ServicesScene2Carousel />
        </motion.div>

        <motion.div className="snap-center snap-always w-full" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1 }}>
          <ServicesScene3Outro />
        </motion.div>

        {allStaff.length > 0 && (
          <motion.div className="snap-center snap-always w-full" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <StaffShowcase 
              staffData={allStaff} 
              frameCount={528}
              folderPath="cinematic-1"
              sectionTitle="القيادة الطبية"
              sectionSubtitle="عقولٌ رائدة"
              sectionDescription="منظومة طبية متكاملة تقودها كفاءات استثنائية، تجمع بين الخبرة العميقة والابتكار التكنولوجي لضمان أعلى مستويات الرعاية والدقة."
            />
          </motion.div>
        )}

        <motion.div className="snap-center snap-always w-full" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <MediaGalleryCinematic />
        </motion.div>
        
        <motion.div className="snap-center snap-always w-full" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <CinematicTestimonials />
        </motion.div>

        <motion.div className="snap-center snap-always w-full" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <CinematicFeedbackGallery />
        </motion.div>

        <motion.div className="snap-center snap-always w-full" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <CinematicBlog />
        </motion.div>
        
        <motion.div className="snap-center snap-always w-full" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <SystemsNominal />
        </motion.div>

        <motion.div className="snap-center snap-always w-full" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <ContactCTASection />
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
