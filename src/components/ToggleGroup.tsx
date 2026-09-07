"use client";

import { useState } from "react";

export default function ToggleGroup({
  options,
  onChange,
  hiddenFieldName,
}: {
  options: string[];
  onChange?: (value: string) => void;
  hiddenFieldName?: string;
}) {
  const [active, setActive] = useState(options[0]);

  const select = (opt: string) => {
    setActive(opt);
    onChange?.(opt);
  };

  return (
    <div className="donation-amounts mt-10" role="radiogroup">
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          className={`amount-btn${active === opt ? " active" : ""}`}
          onClick={() => select(opt)}
        >
          {opt}
        </button>
      ))}
      {hiddenFieldName && <input type="hidden" name={hiddenFieldName} value={active} />}
    </div>
  );
}
