
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAnimeById } from '@/services/animeApi';
import Navbar from '@/components/Navbar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Star, Calendar, Clock, ArrowLeft } from 'lucide-react';

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['anime', id],
    queryFn: () => fetchAnimeById(Number(id)),
    enabled: !!id,
  });

  const anime = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  
  if (error || !anime) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Error loading anime details</h2>
          <p className="mb-8">Sorry, we couldn't load the information for this anime.</p>
          <Link to="/" className="inline-flex items-center text-anime-primary hover:underline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative bg-anime-dark h-[400px]">
        {anime.images.jpg.large_image_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-anime-dark to-transparent"></div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Back button */}
          <div className="p-6 border-b">
            <Link to="/" className="inline-flex items-center text-anime-primary hover:underline">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
          </div>
          
          {/* Anime info */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-full md:w-1/4 lg:w-1/5">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={anime.images.jpg.large_image_url} 
                  alt={anime.title} 
                  className="w-full"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/225x318?text=No+Image";
                  }}
                />
              </div>
              
              {/* Stats */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4 space-y-3">
                {anime.score && (
                  <div className="flex items-center">
                    <Star size={18} className="fill-yellow-400 stroke-yellow-400 mr-2" />
                    <span className="font-semibold">{anime.score.toFixed(1)} / 10</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Calendar size={18} className="text-anime-gray mr-2" />
                  <span>Aired: {formatDate(anime.aired.from)}</span>
                </div>
                
                {anime.episodes && (
                  <div className="flex items-center">
                    <Clock size={18} className="text-anime-gray mr-2" />
                    <span>Episodes: {anime.episodes}</span>
                  </div>
                )}
                
                <div className="pt-2">
                  <div className="text-sm font-semibold mb-2">Status</div>
                  <div className="bg-anime-primary/10 text-anime-primary px-3 py-1 rounded-full text-sm inline-block">
                    {anime.status}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Details */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{anime.title}</h1>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genres?.map((genre) => (
                  <span key={genre.mal_id} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
              
              {/* Synopsis */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
                <p className="text-gray-700 leading-relaxed">
                  {anime.synopsis || "No synopsis available for this title."}
                </p>
              </div>
              
              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Studios */}
                {anime.studios && anime.studios.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Studios</h3>
                    <div className="space-y-1">
                      {anime.studios.map(studio => (
                        <div key={studio.mal_id} className="text-gray-700">{studio.name}</div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Themes */}
                {anime.themes && anime.themes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Themes</h3>
                    <div className="flex flex-wrap gap-2">
                      {anime.themes.map(theme => (
                        <span key={theme.mal_id} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {theme.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-anime-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Anime<span className="text-anime-secondary">Pulse</span></h3>
              <p className="text-gray-400 text-sm mt-1">Stay updated with the latest anime releases</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-anime-secondary transition-colors">About</a>
              <a href="#" className="hover:text-anime-secondary transition-colors">Contact</a>
              <a href="#" className="hover:text-anime-secondary transition-colors">Privacy</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} AnimePulse. Data provided by Jikan API.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnimeDetail;
