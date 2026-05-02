"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function ToothSelector({
  onChange,
  showSelectAll = false,
  compact = false,
}: {
  onChange?: (selected: number[]) => void;
  showSelectAll?: boolean;
  compact?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [markup, setMarkup] = useState<string>("");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const styleId = "legacy-teeth-selector-css";
    if (!document.getElementById(styleId)) {
      const link = document.createElement("link");
      link.id = styleId;
      link.rel = "stylesheet";
      link.href = "/legacy/teeth-selector.css";
      document.head.appendChild(link);
    }

    let cancelled = false;
    fetch("/legacy/teeth-selector.html")
      .then((res) => res.text())
      .then((html) => {
        if (cancelled) return;
        const normalized = html
          .replace('style="display: none;"', 'style="display: block;"')
          .replace("select-button not-allow-teeth mb-3", "select-button mb-3")
          .replace("tooth-wrapper Mock-up not-allowed not-allow-teeth", "tooth-wrapper Mock-up");
        setMarkup(normalized);
        setLoadError(null);
      })
      .catch(() => {
        if (cancelled) return;
        setLoadError("Could not load legacy tooth selector markup.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!markup) return;
    const root = rootRef.current;
    if (!root) return;

    const menu = root.querySelector<HTMLElement>("#teeth-menu");
    const wrapper = root.querySelector<HTMLElement>(".tooth-wrapper.Mock-up");
    const buttonGroup = root.querySelector<HTMLElement>(".select-button");
    const error = root.querySelector<HTMLElement>(".error.alert-danger.tooth-allowed");
    if (menu) menu.style.display = "block";
    wrapper?.classList.remove("not-allowed", "not-allow-teeth");
    buttonGroup?.classList.remove("not-allow-teeth");
    error?.classList.add("none");

    const syncSelected = () => {
      const values = Array.from(
        root.querySelectorAll<SVGGElement>(".tooth-wrapper g.tooth.active"),
      )
        .map((node) => Number(node.dataset.title))
        .filter((n) => Number.isFinite(n))
        .sort((a, b) => a - b);

      const valueTarget = root.querySelector<HTMLElement>("#modal-value");
      if (valueTarget) valueTarget.textContent = values.length ? values.join(",") : "None";
      setSelected(values);
      onChange?.(values);

      const upperBtn = root.querySelector<HTMLButtonElement>("#upperjaws");
      const lowerBtn = root.querySelector<HTMLButtonElement>("#lowerjaws");
      if (upperBtn) {
        const allUpper = Array.from({ length: 16 }, (_, idx) => idx + 1).every((n) =>
          values.includes(n),
        );
        upperBtn.classList.toggle("active", allUpper);
      }
      if (lowerBtn) {
        const allLower = Array.from({ length: 16 }, (_, idx) => idx + 17).every((n) =>
          values.includes(n),
        );
        lowerBtn.classList.toggle("active", allLower);
      }
    };

    const toggleRange = (start: number, end: number) => {
      const toothNums = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      const allActive = toothNums.every((tooth) =>
        root.querySelector(`g.tooth[data-title="${tooth}"]`)?.classList.contains("active"),
      );
      toothNums.forEach((tooth) => {
        root
          .querySelector(`g.tooth[data-title="${tooth}"]`)
          ?.classList.toggle("active", !allActive);
      });
      syncSelected();
    };

    const upperJaws = root.querySelector<HTMLButtonElement>("#upperjaws");
    const lowerJaws = root.querySelector<HTMLButtonElement>("#lowerjaws");

    (window as Window & { jaws?: (start: number, end: number) => void }).jaws = (
      start,
      end,
    ) => toggleRange(start, end);

    const onRootClick = (event: MouseEvent) => {
      const g = (event.target as Element).closest("g.tooth");
      if (!g) return;
      g.classList.toggle("active");
      syncSelected();
    };

    const onUpperClick = () => toggleRange(1, 16);
    const onLowerClick = () => toggleRange(17, 32);

    root.addEventListener("click", onRootClick);
    upperJaws?.addEventListener("click", onUpperClick);
    lowerJaws?.addEventListener("click", onLowerClick);

    syncSelected();

    return () => {
      root.removeEventListener("click", onRootClick);
      upperJaws?.removeEventListener("click", onUpperClick);
      lowerJaws?.removeEventListener("click", onLowerClick);
    };
  }, [markup, onChange]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !markup) return;
    const selectedSet = new Set(selected);
    const toothNodes = Array.from(root.querySelectorAll<HTMLElement>("g.tooth"));
    toothNodes.forEach((node) => {
      const toothNumber = Number(node.dataset.title);
      node.classList.toggle("active", selectedSet.has(toothNumber));
    });

    const upperBtn = root.querySelector<HTMLButtonElement>("#upperjaws");
    const lowerBtn = root.querySelector<HTMLButtonElement>("#lowerjaws");
    const allUpper = Array.from({ length: 16 }, (_, idx) => idx + 1).every((n) =>
      selectedSet.has(n),
    );
    const allLower = Array.from({ length: 16 }, (_, idx) => idx + 17).every((n) =>
      selectedSet.has(n),
    );
    upperBtn?.classList.toggle("active", allUpper);
    lowerBtn?.classList.toggle("active", allLower);
  }, [markup, selected]);

  return (
    <div
      className={`teeth-selector-root legacy-tooth-selector${showSelectAll ? " show-select-all" : ""}${compact ? " compact-selector" : ""}`}
    >
      {loadError && (
        <p className="text-sm text-red-600 mb-3">{loadError}</p>
      )}
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: markup }} />

      <style jsx global>{`
        .legacy-tooth-selector #modal-container {
          display: none;
        }
        .legacy-tooth-selector .error.alert-danger.tooth-allowed {
          display: none !important;
        }
        .legacy-tooth-selector .select-button {
          display: none;
        }
        .legacy-tooth-selector.show-select-all .select-button {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .legacy-tooth-selector .select-button button.btn.btn-save {
          width: auto;
          min-width: 190px;
          padding: 0.7rem 1rem;
          border-radius: 10px;
          font-size: 0.82rem !important;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.03em;
          background: #014ca9;
          color: #fff;
          border: 1px solid #014ca9;
          transition: background-color 120ms ease, border-color 120ms ease, transform 120ms ease;
        }
        .legacy-tooth-selector .select-button button.btn.btn-save:hover {
          background: #0b5fc9;
          border-color: #0b5fc9;
          transform: translateY(-1px);
        }
        .legacy-tooth-selector .select-button button.btn.btn-save.active {
          background: #014ca9 !important;
          border-color: #014ca9 !important;
          color: #fff !important;
        }
        .legacy-tooth-selector .legacy-selected-summary {
          margin-top: 0.75rem;
          font-size: 0.9rem;
          color: #374852;
        }
        .legacy-tooth-selector.compact-selector .tooth-wrapper {
          transform: scale(0.86);
          transform-origin: top center;
          margin-bottom: -3.25rem;
        }
        @media (max-width: 1023px) {
          .legacy-tooth-selector.compact-selector .tooth-wrapper {
            transform: scale(1);
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
}
