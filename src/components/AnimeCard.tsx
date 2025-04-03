
import React from 'react';
import { Anime } from '@/services/animeApi';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.mal_id}`}>
      <div className="anime-card h-full flex flex-col">
        <div className="relative h-64 overflow-hidden bg-anime-gray/20">
          <img 
            src={anime.images.jpg.large_image_url} 
            alt={anime.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/225x318?text=No+Image";
            }} 
          />
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold line-clamp-2 mb-2">{anime.title}</h3>
            <p className="text-sm text-anime-gray line-clamp-3 mb-2">{anime.synopsis || "No description available."}</p>
          </div>
          <div className="flex items-center mt-2">
            {anime.score ? (
              <div className="flex items-center">
                <Star size={16} className="fill-yellow-400 stroke-yellow-400 mr-1" />
                <span className="text-sm font-semibold">{anime.score.toFixed(1)}</span>
              </div>
            ) : (
              <span className="text-xs text-anime-gray">Not rated yet</span>
            )}
            <div className="ml-auto text-xs bg-anime-primary/10 text-anime-primary px-2 py-1 rounded-full">
              {anime.status}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
