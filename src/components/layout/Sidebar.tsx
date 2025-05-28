import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiDollarSign, 
  FiShoppingCart, 
  FiPackage, 
  FiUsers, 
  FiMenu, 
  FiX 
} from 'react-icons/fi';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon, label, isActive, isCollapsed }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'hover:bg-primary/10 text-foreground'
      }`}
    >
      <span className="text-xl">{icon}</span>
      {!isCollapsed && (
        <span className="ml-3 font-medium transition-opacity duration-200">
          {label}
        </span>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { to: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { to: '/financeiro', icon: <FiDollarSign />, label: 'Financeiro' },
    { to: '/vendas', icon: <FiShoppingCart />, label: 'Vendas' },
    { to: '/compras', icon: <FiShoppingCart />, label: 'Compras' },
    { to: '/estoque', icon: <FiPackage />, label: 'Estoque' },
    { to: '/cadastros', icon: <FiUsers />, label: 'Cadastros' },
  ];

  return (
    <aside 
      className={`h-screen bg-card border-r border-border transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } fixed left-0 top-0 z-30`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        {!collapsed && (
          <h1 className="text-xl font-bold text-primary">ERP React</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <FiMenu /> : <FiX />}
        </button>
      </div>

      <nav className="p-2 mt-2">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={isActive(item.to)}
            isCollapsed={collapsed}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
