export default function Loading() {
  return (
    <div className="stack" aria-busy="true" aria-live="polite">
      <div className="skeleton title" />
      <div className="skeleton" />
      <div className="skeleton" />
    </div>
  );
}
