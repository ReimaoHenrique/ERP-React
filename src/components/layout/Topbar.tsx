import { useState } from 'react';
import { FiSun, FiMoon, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-card border-b border-border fixed top-0 right-0 left-0 z-20 flex items-center justify-end px-4">
      <div className="ml-64"></div> {/* Espaço para o sidebar */}
      
      <div className="flex items-center ml-auto space-x-4">
        {/* Botão de tema */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground"
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
        
        {/* Notificações */}
        <button
          className="p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground relative"
          aria-label="Notificações"
        >
          <FiBell />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* Menu do usuário */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <FiUser />
            </div>
            <span className="font-medium hidden md:block">{user?.name || 'Usuário'}</span>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg py-1 z-50">
              <a href="#perfil" className="block px-4 py-2 text-sm hover:bg-accent">
                Perfil
              </a>
              <a href="#configuracoes" className="block px-4 py-2 text-sm hover:bg-accent">
                Configurações
              </a>
              <button 
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-accent"
              >
                <FiLogOut className="mr-2" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
