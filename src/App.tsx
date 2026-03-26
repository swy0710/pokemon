import { type JSX } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { Battle } from '@/presentation/pages/Battle';
import { Favorites } from '@/presentation/pages/Favorites';
import { Pokemon } from '@/presentation/pages/Pokemon';
import { Pokemons } from '@/presentation/pages/Pokemons';

const Nav = (): JSX.Element => (
  <nav className="sticky top-0 z-50 flex items-center gap-4 border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
    <span className="text-lg font-bold text-gray-800">Pokédex</span>
    <div className="flex gap-3 ml-4">
      <NavLink
        to="/"
        end
        className={({ isActive }): string =>
          `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`
        }
      >
        목록
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }): string =>
          `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${isActive ? 'bg-yellow-50 text-yellow-600' : 'text-gray-600 hover:bg-gray-100'}`
        }
      >
        ★ 즐겨찾기
      </NavLink>
      <NavLink
        to="/battle"
        className={({ isActive }): string =>
          `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${isActive ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-100'}`
        }
      >
        ⚔️ 배틀
      </NavLink>
    </div>
  </nav>
);

export const App = (): JSX.Element => (
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<Pokemons />} />
      <Route path="/pokemon/:id" element={<Pokemon />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/battle" element={<Battle />} />
    </Routes>
  </BrowserRouter>
);
