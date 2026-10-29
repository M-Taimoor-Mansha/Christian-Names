import Ornament from "@/components/Ornament";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl py-4">
      <header className="text-center">
        <h1 className="text-4xl font-semibold text-oxblood sm:text-5xl">
          {title}
        </h1>
        {updated && (
          <p className="mt-2 text-lg italic text-ink-soft">
            Last updated: {updated}
          </p>
        )}
        <Ornament className="my-7" />
      </header>
      <div className="prose-book">{children}</div>
    </main>
  );
}
