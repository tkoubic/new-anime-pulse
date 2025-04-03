
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRecentAnime, fetchUpcomingAnime, Anime } from '@/services/animeApi';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AnimeCard from '@/components/AnimeCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const [featuredAnime, setFeaturedAnime] = useState<Anime | null>(null);
  
  const { data: recentAnimeData, isLoading: isLoadingRecent } = useQuery({
    queryKey: ['recentAnime', 1],
    queryFn: () => fetchRecentAnime(1),
  });

  const { data: upcomingAnimeData, isLoading: isLoadingUpcoming } = useQuery({
    queryKey: ['upcomingAnime', 1],
    queryFn: () => fetchUpcomingAnime(1),
  });

  useEffect(() => {
    if (recentAnimeData?.data && recentAnimeData.data.length > 0) {
      // Find an anime with a good score and image for the hero
      const potentialFeatures = recentAnimeData.data.filter(
        anime => anime.score >= 7.5 && anime.synopsis
      );
      
      if (potentialFeatures.length > 0) {
        const randomIndex = Math.floor(Math.random() * Math.min(3, potentialFeatures.length));
        setFeaturedAnime(potentialFeatures[randomIndex]);
      } else {
        setFeaturedAnime(recentAnimeData.data[0]);
      }
    }
  }, [recentAnimeData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      {isLoadingRecent ? (
        <div className="bg-anime-dark h-[500px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <Hero anime={featuredAnime} />
      )}
      
      {/* Recent Releases Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Recent Releases</h2>
            <Link to="/recent" className="text-anime-primary flex items-center hover:underline">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {isLoadingRecent ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {recentAnimeData?.data.slice(0, 10).map(anime => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Upcoming Releases Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Coming Soon</h2>
            <Link to="/upcoming" className="text-anime-primary flex items-center hover:underline">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {isLoadingUpcoming ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {upcomingAnimeData?.data.slice(0, 8).map(anime => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          )}
        </div>
      </section>
      
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

export default Index;
