import SectionBadge from "./SectionBadge";
import FeatureGrid from "./FeatureGrid";

export default function Features() {
    return (
        <section id="features" className="bg-[#0A0F0D] py-24 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center text-center max-w-xl mx-auto">
                    <SectionBadge label="Features" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
                        Everything you need to{" "}
                        <span className="text-[#00C896]">get hired faster</span>
                    </h2>
                    <p className="text-[14px] text-white/45 leading-relaxed">
                        Most tools just tell you what is wrong. We fix it — and show you
                        exactly why 94% of our users pass ATS on the next try.
                    </p>
                </div>

                <FeatureGrid />

            </div>
        </section>
    );
}