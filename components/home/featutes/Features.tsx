import SectionBadge from "./SectionBadge";
import FeatureGrid from "./FeatureGrid";

export default function Features() {
    return (
        <section id="features" className="bg-[#F8FAFC] py-24 px-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">

                {/* Header */}
                <div className="mx-auto flex max-w- flex-col items-center text-center">
                    <SectionBadge label="Features" />
                    <h2 className="text-3xl font-bold tracking-tight leading-tight text-slate-900 sm:text-4xl 2xl:text-5xl mb-4">
                        Everything you need to{" "}
                        <span className="text-[#00C896]">get hired faster</span>
                    </h2>
                    <p className="max-w-xl text-[14px] leading-relaxed text-slate-600 lg:text-[15px]">
                        Most tools just tell you what is wrong. We fix it — and show you
                        exactly why 94% of our users pass ATS on the next try.
                    </p>
                </div>

                <FeatureGrid />

            </div>
        </section>
    );
}
