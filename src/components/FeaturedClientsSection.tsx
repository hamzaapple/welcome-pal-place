import { Users, Building2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { clientCreators, clientCompanies } from "@/data/media";

function ClientCard({ client }: { client: { name: string; url: string; image: string } }) {
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card flex flex-col items-center justify-center p-6 text-center transition-transform hover:scale-105 hover:bg-white/5 group"
    >
      <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-primary/50 bg-primary/10 shadow-[0_0_15px_oklch(0.68_0.21_250/0.2)] transition-shadow group-hover:shadow-[0_0_25px_oklch(0.68_0.21_250/0.4)]">
        <img
          src={client.image}
          alt={client.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback to initial if image fails to load
            e.currentTarget.style.display = 'none';
            const span = document.createElement('span');
            span.className = 'font-display text-2xl font-bold text-glow';
            span.innerText = client.name.charAt(0).toUpperCase();
            e.currentTarget.parentElement?.appendChild(span);
          }}
        />
      </div>
      <h3 className="font-display text-sm font-semibold text-foreground md:text-base line-clamp-2">
        {client.name}
      </h3>
    </a>
  );
}

export function FeaturedClientsSection() {
  return (
    <section id="featured-clients" className="relative py-24">
      <div className="section-divider" />
      <div className="mx-auto max-w-7xl px-6 pt-12">
        <Reveal className="mb-14 text-center">
          <div className="chip mb-4 inline-flex">
            <Users className="h-3.5 w-3.5" />
            <span>Creators & Companies</span>
          </div>
          <h2 className="font-display mb-3 text-3xl font-bold md:text-5xl">
            Featured <span className="gradient-text">Clients</span>
          </h2>
          <p dir="rtl" className="font-arabic text-muted-foreground mx-auto max-w-xl">
            نخبة من صناع المحتوى والشركات الذين أتشرف بالعمل معهم.
          </p>
        </Reveal>

        {/* Creators Section */}
        <div className="mb-16">
          <Reveal className="mb-8">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="font-display text-2xl font-bold">Content Creators</h3>
            </div>
            <div className="mt-2 h-[2px] w-full bg-border/40" />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {clientCreators.map((client, i) => (
              <Reveal key={client.name} delay={i * 100}>
                <ClientCard client={client} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Companies Section */}
        <div>
          <Reveal className="mb-8">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-primary" />
              <h3 className="font-display text-2xl font-bold">Companies & Agencies</h3>
            </div>
            <div className="mt-2 h-[2px] w-full bg-border/40" />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {clientCompanies.map((client, i) => (
              <Reveal key={client.name} delay={i * 100}>
                <ClientCard client={client} />
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
