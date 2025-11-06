import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Production {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
  link: string;
  isDemoReel: boolean;
}

interface ProductionCardProps {
  production: Production;
}

export default function ProductionCard({ production }: ProductionCardProps) {
  return (
    <Card className="aquarelle-card overflow-hidden hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col">
      <div className="relative w-full aspect-video bg-[var(--accent)] overflow-hidden">
        {production.image && (
          <Image
            src={production.image}
            alt={production.title}
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[var(--text-dark)]/70 font-light">
            {production.type}
          </span>
        </div>
        <CardTitle className="text-2xl font-light text-[var(--text-dark)]">
          {production.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-[var(--text-dark)]/80 leading-relaxed whitespace-pre-line">
          {production.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="outline"
          className="w-full aquarelle-border border-[var(--accent)] text-[var(--text-dark)] hover:bg-[var(--accent)] hover:text-[var(--text-dark)]"
        >
          <a href={production.link} target="_blank" rel="noopener noreferrer">
            Voir le projet
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

