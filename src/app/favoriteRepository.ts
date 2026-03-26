import { favoriteRepositoryImpl } from '@/data/repositories/FavoriteRepositoryImpl';
import type { FavoriteRepository } from '@/domain/repositories/FavoriteRepository';

export const favoriteRepository: FavoriteRepository = favoriteRepositoryImpl;
