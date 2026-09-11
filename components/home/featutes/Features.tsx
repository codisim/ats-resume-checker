import SectionBadge from "./SectionBadge";
import FeatureGrid from "./FeatureGrid";

export default function Features() {
    return (
        <section id="features" className="bg-background px-4 py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">

                {/* Header */}
                <div className="mx-auto flex max-w- flex-col items-center text-center">
                    <SectionBadge label="Features" />
                    <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl 2xl:text-5xl">
                        Everything you need to{" "}
                        <span className="text-primary">pass that ATS</span>
                    </h2>
                    <p className="max-w-xl text-[14px] leading-relaxed text-muted-foreground lg:text-[15px]">
                        One job at a time: score, skill gap, and a rewrite for
                        that description. No LinkedIn optimizer, cover letters, or GitHub review.
                    </p>
                </div>

                <FeatureGrid />

            </div>
        </section>
    );
}
