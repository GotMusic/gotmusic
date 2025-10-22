"use client";

import { forwardRef, useState } from "react";
import { ChevronDown } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
}

export interface CurrencySelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof currencySelectorVariants> {
  value?: string;
  onChange?: (currency: string) => void;
  options?: CurrencyOption[];
  showFlag?: boolean;
  showName?: boolean;
  disabled?: boolean;
}

const currencySelectorVariants = cva(
  "relative inline-flex items-center justify-between gap-2 px-3 py-2 border rounded-md bg-bg-elevated text-fg-default cursor-pointer hover:bg-bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary",
  {
    variants: {
      variant: {
        default: "border-border-subtle",
        error: "border-semantic-danger focus:ring-semantic-danger/20 focus:border-semantic-danger",
        success:
          "border-semantic-success focus:ring-semantic-success/20 focus:border-semantic-success",
      },
      size: {
        sm: "text-sm px-2 py-1",
        md: "text-base px-3 py-2",
        lg: "text-lg px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const defaultCurrencies: CurrencyOption[] = [
  { code: "PYUSD", name: "PayPal USD", symbol: "$", flag: "🇺🇸" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
];

const CurrencySelector = forwardRef<HTMLDivElement, CurrencySelectorProps>(
  (
    {
      className,
      value = "PYUSD",
      onChange,
      options = defaultCurrencies,
      showFlag = true,
      showName = false,
      disabled = false,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const selectedCurrency = options.find((option) => option.code === value) || options[0];
    const filteredOptions = options.filter(
      (option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.code.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleSelect = (currency: CurrencyOption) => {
      onChange?.(currency.code);
      setIsOpen(false);
      setSearchTerm("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          setIsOpen(!isOpen);
          break;
        case "Escape":
          setIsOpen(false);
          setSearchTerm("");
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (isOpen) {
            setIsOpen(false);
          }
          break;
      }
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div
          className={cn(
            currencySelectorVariants({ variant, size }),
            disabled && "opacity-50 cursor-not-allowed",
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="currency-options"
          aria-label="Select currency"
        >
          <div className="flex items-center gap-2">
            {showFlag && selectedCurrency.flag && (
              <span className="text-lg" role="img" aria-label={selectedCurrency.name}>
                {selectedCurrency.flag}
              </span>
            )}
            <span className="font-medium">{selectedCurrency.code}</span>
            {showName && <span className="text-sm text-fg-muted">{selectedCurrency.name}</span>}
          </div>
          <ChevronDown
            className={cn("h-4 w-4 text-fg-muted transition-transform", isOpen && "rotate-180")}
          />
        </div>

        {isOpen && (
          <div
            id="currency-options"
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-bg-elevated border border-border-subtle rounded-md shadow-lg"
          >
            <div className="p-2 border-b border-border-subtle">
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1 text-sm bg-bg-default border border-border-subtle rounded text-fg-default placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-left text-fg-default hover:bg-bg-muted transition-colors",
                    option.code === value && "bg-brand-primary/10 text-brand-primary",
                  )}
                  role="option"
                  aria-selected={option.code === value}
                >
                  {showFlag && option.flag && (
                    <span className="text-lg" role="img" aria-label={option.name}>
                      {option.flag}
                    </span>
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium">{option.code}</span>
                    {showName && <span className="text-xs text-fg-muted">{option.name}</span>}
                  </div>
                </button>
              ))}
              {filteredOptions.length === 0 && (
                <div className="px-3 py-2 text-sm text-fg-muted text-center">
                  No currencies found
                </div>
              )}
            </div>
          </div>
        )}

        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setIsOpen(false);
              setSearchTerm("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsOpen(false);
                setSearchTerm("");
              }
            }}
            aria-hidden="true"
          />
        )}
      </div>
    );
  },
);

CurrencySelector.displayName = "CurrencySelector";

export { CurrencySelector };
