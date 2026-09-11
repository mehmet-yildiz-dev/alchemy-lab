import { Badge } from "@/src/ui/react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-border/30 pb-7">
      <Badge variant="outline">{eyebrow}</Badge>
      <h1 className="mt-4 max-w-4xl text-4xl tracking-tight tablet:text-5xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{description}</p>
    </header>
  );
}

export { PageHeader };
