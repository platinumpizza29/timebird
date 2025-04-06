"use client"

import { Label } from "react-aria-components"

import { DateField, DateInput } from "~/components/ui/datefield-rac"

export default function Component() {
  return (
    <DateField className="*:not-first:mt-2" granularity="minute" hourCycle={24}>
      <Label className="text-foreground text-sm font-medium">
        Date and time input
      </Label>
      <DateInput />
      <p
        className="text-muted-foreground mt-2 text-xs"
        role="region"
        aria-live="polite"
      >
        Built with{" "}
        <a
          className="hover:text-foreground underline"
          href="https://react-spectrum.adobe.com/react-aria/DateField.html"
          target="_blank"
          rel="noopener nofollow"
        >
          React Aria
        </a>
      </p>
    </DateField>
  )
}
