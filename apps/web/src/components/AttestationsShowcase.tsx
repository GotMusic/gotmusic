"use client";

import { useState } from "react";
import { Button } from "@gotmusic/ui";
import { Card } from "@gotmusic/ui";
import { Input } from "@gotmusic/ui";
import { 
  ExternalLinkIcon, 
  CopyIcon, 
  CheckIcon,
  ShieldIcon,
  FileTextIcon,
  UsersIcon,
  FlagIcon,
  CheckCircleIcon
} from "lucide-react";

// EAS Schema data from our deployment
const EAS_SCHEMAS = {
  base: {
    network: "Base Mainnet",
    chainId: 8453,
    easContract: "0x4200000000000000000000000000000000000021",
    schemas: [
      {
        name: "License Receipt",
        uid: "0xa6bedff8a7aeff07860da391aaed576f47982f35e9119f5e3c2facbb07417728",
        resolver: "0x2de43c7d4C4F5602EF538E85C0d8D78e50A41D18",
        description: "Verifiable music licensing receipts with payment proof",
        fields: ["assetId", "buyer", "seller", "price", "currency", "licenseType", "timestamp"],
        explorer: "https://base.easscan.org/schema/view/0xa6bedff8a7aeff07860da391aaed576f47982f35e9119f5e3c2facbb07417728"
      },
      {
        name: "Vendor Status",
        uid: "0x96c49253f6c997eca8dcf8798f22ad9e22f465b6f2e58aaf810f835c582b2164",
        resolver: "0xD64BA17E7a25E8F5b8da04AB5e64Ac7e5C0bef23",
        description: "Producer reputation and status verification",
        fields: ["vendor", "status", "reputation", "sales", "revenue", "verifiedAt"],
        explorer: "https://base.easscan.org/schema/view/0x96c49253f6c997eca8dcf8798f22ad9e22f465b6f2e58aaf810f835c582b2164"
      },
      {
        name: "Content Flag",
        uid: "0x59354c5ee8315da7dadc048be90d60ad31412284213fcb3b4c807fcbdb24b6c9",
        resolver: "0xC994f36B9de94Fc751122b196BeBC27D7e9A90f4",
        description: "Community-driven content moderation flags",
        fields: ["contentId", "flagger", "reason", "severity", "timestamp", "resolved"],
        explorer: "https://base.easscan.org/schema/view/0x59354c5ee8315da7dadc048be90d60ad31412284213fcb3b4c807fcbdb24b6c9"
      },
      {
        name: "Wallet Verification",
        uid: "0x9ba441e691610a3ee33b88d78410a208dbcbaae9affed65b9eb546efaa5a497b",
        resolver: "0xd8FFCfB067F0b4EeeFC06ac74598e537b421a9A4",
        description: "Multi-factor wallet verification and trust scores",
        fields: ["wallet", "verifier", "verificationType", "level", "timestamp", "expiresAt"],
        explorer: "https://base.easscan.org/schema/view/0x9ba441e691610a3ee33b88d78410a208dbcbaae9affed65b9eb546efaa5a497b"
      }
    ]
  },
  sepolia: {
    network: "Ethereum Sepolia",
    chainId: 11155111,
    easContract: "0xC2679fBD37d54383Ce7D2eD1aBc0c2e2298EAD921",
    schemas: [
      {
        name: "License Receipt",
        uid: "0x4105eecaf493c39d23fa278b68de90a86737e8e07c859c476de85fb26f368ae3",
        resolver: "0x166782ffD3D0Cf4A48b2bf4FC9929ED5374e2052",
        description: "Development environment for testing attestations",
        fields: ["assetId", "buyer", "seller", "price", "currency", "licenseType", "timestamp"],
        explorer: "https://sepolia.easscan.org/schema/view/0x4105eecaf493c39d23fa278b68de90a86737e8e07c859c476de85fb26f368ae3"
      },
      {
        name: "Vendor Status",
        uid: "0xf32cebb0383b3dd13cc2650b509de9f2877118fc80306fc2141738e35d16f699",
        resolver: "0x8D3AdcA883898C9711B0fe362114a1f0e80b1249",
        description: "Development environment for testing vendor verification",
        fields: ["vendor", "status", "reputation", "sales", "revenue", "verifiedAt"],
        explorer: "https://sepolia.easscan.org/schema/view/0xf32cebb0383b3dd13cc2650b509de9f2877118fc80306fc2141738e35d16f699"
      },
      {
        name: "Content Flag",
        uid: "0xd8e44942dd0d014470b289443a8e2ce49efed6b57957f538443eab9682e79e02",
        resolver: "0x9d66c8761c2d8dD638E05543De58181862Ce3060",
        description: "Development environment for testing content moderation",
        fields: ["contentId", "flagger", "reason", "severity", "timestamp", "resolved"],
        explorer: "https://sepolia.easscan.org/schema/view/0xd8e44942dd0d014470b289443a8e2ce49efed6b57957f538443eab9682e79e02"
      },
      {
        name: "Wallet Verification",
        uid: "0xa48289c7a68ea97ad6486586e9972ef7d569b39944b8c7f148bbf126491adc51",
        resolver: "0x784469EbfF53FA78f65114aEb0783b1D974a8DB7",
        description: "Development environment for testing wallet verification",
        fields: ["wallet", "verifier", "verificationType", "level", "timestamp", "expiresAt"],
        explorer: "https://sepolia.easscan.org/schema/view/0xa48289c7a68ea97ad6486586e9972ef7d569b39944b8c7f148bbf126491adc51"
      }
    ]
  }
};

interface AttestationsShowcaseProps {
  className?: string;
}

export function AttestationsShowcase({ className }: AttestationsShowcaseProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<"base" | "sepolia">("base");
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const currentData = EAS_SCHEMAS[selectedNetwork];

  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="glass-neumorphic-card text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <ShieldIcon className="w-8 h-8 text-brand-primary" />
          <h2 className="text-display-md font-semibold text-fg-default">
            EAS Attestations Infrastructure
          </h2>
        </div>
        <p className="text-lg text-fg-muted max-w-2xl mx-auto">
          Verifiable, on-chain attestations for music licensing, vendor verification, 
          content moderation, and wallet trust. Built on Ethereum Attestation Service (EAS).
        </p>
      </div>

      {/* Network Selector */}
      <div className="flex justify-center">
        <div className="glass-neumorphic rounded-lg p-1">
          <button
            onClick={() => setSelectedNetwork("base")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedNetwork === "base"
                ? "bg-brand-primary text-fg-inverse"
                : "text-fg-muted hover:text-fg-default"
            }`}
          >
            Base Mainnet (Production)
          </button>
          <button
            onClick={() => setSelectedNetwork("sepolia")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedNetwork === "sepolia"
                ? "bg-brand-primary text-fg-inverse"
                : "text-fg-muted hover:text-fg-default"
            }`}
          >
            Ethereum Sepolia (Development)
          </button>
        </div>
      </div>

      {/* Network Info */}
      <div className="glass-neumorphic-card">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
            <h3 className="text-xl font-semibold text-fg-default">
              {currentData.network}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-fg-muted">Chain ID:</span>
              <span className="ml-2 font-mono text-fg-default">{currentData.chainId}</span>
            </div>
            <div>
              <span className="text-fg-muted">EAS Contract:</span>
              <span className="ml-2 font-mono text-fg-default">
                {formatAddress(currentData.easContract)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Schema Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentData.schemas.map((schema, index) => (
          <div key={schema.uid} className="glass-neumorphic-card hover:glass-neumorphic-elevated transition-all">
            <div className="p-6">
              {/* Schema Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                    {index === 0 && <FileTextIcon className="w-5 h-5 text-brand-primary" />}
                    {index === 1 && <UsersIcon className="w-5 h-5 text-brand-primary" />}
                    {index === 2 && <FlagIcon className="w-5 h-5 text-brand-primary" />}
                    {index === 3 && <CheckCircleIcon className="w-5 h-5 text-brand-primary" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-fg-default">{schema.name}</h4>
                    <p className="text-sm text-fg-muted">{schema.description}</p>
                  </div>
                </div>
              </div>

              {/* Schema UID */}
              <div className="mb-4">
                <label className="text-xs font-medium text-fg-muted uppercase tracking-wide">
                  Schema UID
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    value={schema.uid}
                    readOnly
                    className="font-mono text-sm bg-bg-muted border-border-subtle"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(schema.uid, `uid-${index}`)}
                    className="p-2"
                  >
                    {copiedItem === `uid-${index}` ? (
                      <CheckIcon className="w-4 h-4 text-brand-primary" />
                    ) : (
                      <CopyIcon className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Resolver Address */}
              <div className="mb-4">
                <label className="text-xs font-medium text-fg-muted uppercase tracking-wide">
                  Resolver Contract
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    value={schema.resolver}
                    readOnly
                    className="font-mono text-sm bg-bg-muted border-border-subtle"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(schema.resolver, `resolver-${index}`)}
                    className="p-2"
                  >
                    {copiedItem === `resolver-${index}` ? (
                      <CheckIcon className="w-4 h-4 text-brand-primary" />
                    ) : (
                      <CopyIcon className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Schema Fields */}
              <div className="mb-4">
                <label className="text-xs font-medium text-fg-muted uppercase tracking-wide">
                  Schema Fields
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {schema.fields.map((field) => (
                    <span
                      key={field}
                      className="px-2 py-1 bg-bg-muted border border-border-subtle rounded-md text-xs font-mono text-fg-default"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Explorer Link */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(schema.explorer, "_blank")}
                className="w-full justify-center gap-2 text-brand-primary hover:bg-brand-primary/10"
              >
                <ExternalLinkIcon className="w-4 h-4" />
                View on EAS Explorer
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="glass-neumorphic-card">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-fg-default mb-4">
            Why EAS Attestations?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center mx-auto mb-3">
                <ShieldIcon className="w-6 h-6 text-brand-primary" />
              </div>
              <h4 className="font-semibold text-fg-default mb-2">Verifiable</h4>
              <p className="text-sm text-fg-muted">
                Cryptographically signed attestations that can be verified by anyone
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center mx-auto mb-3">
                <FileTextIcon className="w-6 h-6 text-brand-primary" />
              </div>
              <h4 className="font-semibold text-fg-default mb-2">Immutable</h4>
              <p className="text-sm text-fg-muted">
                Once created, attestations cannot be modified or deleted
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center mx-auto mb-3">
                <UsersIcon className="w-6 h-6 text-brand-primary" />
              </div>
              <h4 className="font-semibold text-fg-default mb-2">Decentralized</h4>
              <p className="text-sm text-fg-muted">
                No central authority controls the attestation system
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center mx-auto mb-3">
                <CheckCircleIcon className="w-6 h-6 text-brand-primary" />
              </div>
              <h4 className="font-semibold text-fg-default mb-2">Composable</h4>
              <p className="text-sm text-fg-muted">
                Attestations can reference and build upon each other
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
