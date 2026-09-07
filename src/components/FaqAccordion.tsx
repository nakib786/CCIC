"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ul className="accordion-box3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <li className={`accordion block${isOpen ? " active-block" : ""}`} key={item.q}>
            <div className={`acc-btn${isOpen ? " active" : ""}`} onClick={() => setOpenIndex(isOpen ? -1 : i)}>
              <span className="number">{String(i + 1).padStart(2, "0")}</span> {item.q}
              <i className="icon fas fa-plus"></i>
            </div>
            <div className={`acc-content${isOpen ? " current" : ""}`}>
              <div className="content"><div className="text">{item.a}</div></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
