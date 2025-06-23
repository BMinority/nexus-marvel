type HeroCardProps = {
  hero: {
    id: number;
    name: string;
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  };
};

export function HeroeCard({ hero }: HeroCardProps) {
  const imageUrl = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;

  return (
    <div className="bc-hero-card">
      <img src={imageUrl} alt={hero.name} />
      <h2>{hero.name}</h2>
    </div>
  );
}
