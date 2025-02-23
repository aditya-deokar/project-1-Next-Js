import HeroSection from "@/components/Hero";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
   <div>
     <div className="grid-background"></div>

     <HeroSection />

     <section>
        <div>
            <h2>Powerful Features for Your Career Growth</h2>
        </div>
     </section>
   </div>
  );
}
