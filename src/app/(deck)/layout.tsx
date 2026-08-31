import "./deck.css";

export default function DeckLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="deck-root">{children}</div>;
}
