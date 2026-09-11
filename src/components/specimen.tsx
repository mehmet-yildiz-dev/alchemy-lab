import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/ui/react";

function Specimen({
  id,
  name,
  description,
  children,
}: {
  id?: string;
  name: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id ?? name.toLowerCase().replaceAll(" ", "-")} className="scroll-mt-24">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}

export { Specimen };
