
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUpcomingAnime } from '@/services/animeApi';
import Navbar from '@/components/Navbar';
import AnimeCard from '@/components/AnimeCard';
import LoadingSpinner from '@/components/LoadingSpinner';

const Upcoming: React.FC = () => {
  const [page, setPage] = useState(1);
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['upcomingAnime', page],
    queryFn: () => fetchUpcomingAnime(page),
    keepPreviousData: true,
  });

  const handleLoadMore = () => {
    if (data?.pagination.has_next_page) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Upcoming Anime</h1>
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data?.data.map(anime => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
            
            {data?.pagination.has_next_page && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  className="px-6 py-2 bg-anime-primary text-white rounded-full hover:bg-anime-primary/90 disabled:opacity-50"
                >
                  {isFetching ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-anime-dark text-white py-8 mt-auto">
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

export default Upcoming;
