/**
 * The assistant-presence mark (DESIGN.md section 27): abstract, minimal, understated.
 * A ring with a small solid centre. Not a face, mascot or animated shape.
 * Inherits colour from `currentColor`.
 */
export function AssistantMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  );
}
