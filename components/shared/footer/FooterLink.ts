import { Github, Twitter, Linkedin } from "lucide-react";



export const LINKS = {
    Product: [
        { label: "Features", href: "#features" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "Live users", href: "#map" },
    ],
    Resources: [
        { label: "Blog", href: "/blog" },
        { label: "Case studies", href: "/case-studies" },
        { label: "Dashboard", href: "/ai" },
        { label: "Sign in", href: "/sign-in" },
    ],
    Legal: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms of service", href: "/terms" },
        // { label: "Cookie policy", href: "/cookies" },
    ],
};

export const SOCIALS = [
    { icon: Twitter, href: "https://x.com/engwaliullah", label: "Twitter" },
    { icon: Github, href: "https://github.com/codisim", label: "GitHub" },
    { icon: Linkedin, href: "http://linkedin.com/in/engwaliullah", label: "LinkedIn" },
];
