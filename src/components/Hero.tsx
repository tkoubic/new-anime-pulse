
import React from 'react';
import { Anime } from '@/services/animeApi';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  anime: Anime | null;
}

const Hero: React.FC<HeroProps> = ({ anime }) => {
  if (!anime) return null;
  
  return (
    <div className="relative overflow-hidden bg-anime-dark h-[500px] animate-fade-in">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-anime-dark via-anime-dark/90 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 bg-anime-secondary/90 text-white rounded-full text-sm font-medium mb-4">
            New Release
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{anime.title}</h1>
          <p className="text-gray-200 text-lg mb-6 line-clamp-3">{anime.synopsis}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {anime.genres?.slice(0, 3).map((genre) => (
              <span key={genre.mal_id} className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>
          <Link 
            to={`/anime/${anime.mal_id}`} 
            className="inline-flex items-center px-6 py-3 bg-anime-primary hover:bg-anime-primary/90 text-white rounded-full font-medium transition-colors"
          >
            View Details
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
