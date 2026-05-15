import SectionBadge from "./SectionBadge";
import FeatureGrid from "./FeatureGrid";

export default function Features() {
    return (
        <section id="features" className="bg-[#0A0F0D] py-24 px-4">
            <div className="container mx-auto px-0 sm:px-2 lg:px-4 2xl:px-6">

                {/* Header */}
                <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                    <SectionBadge label="Features" />
                    <h2 className="text-3xl font-bold tracking-tight leading-tight text-white sm:text-4xl 2xl:text-5xl mb-4">
                        Everything you need to{" "}
                        <span className="text-[#00C896]">get hired faster</span>
                    </h2>
                    <p className="max-w-xl text-[14px] leading-relaxed text-white/45 lg:text-[15px]">
                        Most tools just tell you what is wrong. We fix it — and show you
                        exactly why 94% of our users pass ATS on the next try.
                    </p>
                </div>

                <FeatureGrid />

            </div>
        </section>
    );
}
