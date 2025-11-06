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

interface DemoReelCardProps {
  production: Production;
}

export default function DemoReelCard({ production }: DemoReelCardProps) {
  return (
    <Card className="aquarelle-card overflow-hidden hover:scale-[1.02] transition-transform duration-300 border-2 border-[var(--accent)] shadow-lg">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-light rounded-full border border-white/30">
            Nouveau
          </span>
        </div>
      </div>
      <CardHeader className="bg-gradient-to-b from-[var(--accent-light)] to-transparent">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[var(--text-dark)]/70 font-light">
            {production.type}
          </span>
        </div>
        <CardTitle className="text-3xl font-light text-[var(--text-dark)]">
          {production.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-[var(--text-dark)]/80 leading-relaxed whitespace-pre-line text-base">
          {production.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="w-full bg-[var(--text-dark)] text-white hover:bg-[var(--text-dark)]/90 aquarelle-border"
        >
          <a href={production.link} target="_blank" rel="noopener noreferrer">
            Voir le démo-reel
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

