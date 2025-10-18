export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Browse & Preview",
      description: "Explore producer-grade samples with encrypted 30-second previews.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Purchase with PYUSD",
      description: "Pay via Avail Nexus. Your payment triggers an on-chain receipt minted via EAS.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Download & Verify",
      description:
        "Decrypt and download via Lit Protocol. Your EAS receipt proves ownership forever.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="my-8 rounded-[var(--radius-lg,16px)] border border-[var(--border-soft)] bg-[var(--color-bg-elevated,#121520)] p-6 sm:p-10">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-fg,#E6EAF2)]">
          How it works
        </h2>
        <p className="mt-2 text-[var(--color-fg-muted,#A9B1C1)]">
          Blockchain-powered music distribution that's fast, secure, and verifiable
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative flex flex-col items-start rounded-[var(--radius-md,12px)] border border-[var(--border-subtle,rgba(255,255,255,0.10))] bg-[var(--color-bg,#0B0D12)] p-6 transition-all duration-200 hover:border-[var(--color-brand-accent,#5BD0FF)]/50 hover:translate-y-[-2px]"
          >
            {/* Step number badge */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-primary,#6AE6A6)]/20 text-[var(--color-brand-primary,#6AE6A6)]">
              {step.icon}
            </div>

            {/* Step number */}
            <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-primary,#6AE6A6)]/10 text-sm font-bold text-[var(--color-brand-primary,#6AE6A6)]">
              {step.number}
            </div>

            <h3 className="mb-2 text-lg font-semibold text-[var(--color-fg,#E6EAF2)]">
              {step.title}
            </h3>
            <p className="text-sm text-[var(--color-fg-muted,#A9B1C1)] leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Tech badges */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-[var(--color-fg-muted,#A9B1C1)]">
        <div className="flex items-center gap-2 rounded-full border border-[var(--border-subtle,rgba(255,255,255,0.10))] bg-[var(--color-bg,#0B0D12)] px-3 py-1.5">
          <div className="h-2 w-2 rounded-full bg-[var(--color-brand-accent,#5BD0FF)]" />
          <span>Ethereum Attestation Service</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[var(--border-subtle,rgba(255,255,255,0.10))] bg-[var(--color-bg,#0B0D12)] px-3 py-1.5">
          <div className="h-2 w-2 rounded-full bg-[var(--color-brand-accent,#5BD0FF)]" />
          <span>Lit Protocol</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[var(--border-subtle,rgba(255,255,255,0.10))] bg-[var(--color-bg,#0B0D12)] px-3 py-1.5">
          <div className="h-2 w-2 rounded-full bg-[var(--color-brand-accent,#5BD0FF)]" />
          <span>Avail Nexus</span>
        </div>
      </div>
    </section>
  );
}

