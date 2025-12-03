import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    Briefcase,
    FlaskConical,
    MessageSquare,
    Users,
    Gift,
    User,
    Menu
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Portfolios', path: '/portfolio', icon: Briefcase },
        { name: 'Experimentals', path: '/experimentals', icon: FlaskConical },
        { name: 'Slack Archives', path: '/slack', icon: MessageSquare },
        { name: 'Refer a friend', path: '/refer', icon: Users },
        { name: 'Gift a subscription', path: '/gift', icon: Gift },
        { name: 'Account', path: '/account', icon: User },
    ];

    return (
        <div className="h-screen w-64 bg-white text-slate-900 flex flex-col fixed left-0 top-0 border-r border-slate-200 z-50">
            {/* Logo */}
            <div className="h-16 flex items-center px-6">
                <Link to="/" className="flex items-center gap-2">
                    {/* Simple Logo Placeholder to match image */}
                    <div className="flex flex-col">
                        <span className="font-bold text-xl tracking-tight text-slate-900 leading-none">capitalmind</span>
                        <span className="text-sm text-green-600 font-medium leading-none">premium</span>
                    </div>
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-4 space-y-1">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors relative
                                ${isActive ? 'text-green-700 bg-green-50/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
                            }
                        >
                            <Icon className={`h-4 w-4 ${isActive ? 'text-green-600' : 'text-slate-500'}`} />
                            {link.name}
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-600 rounded-r-md"></div>
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* User Profile / Bottom Section */}
            <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">
                        RN
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">CMP1Y</span>
                        <span className="text-[10px] text-slate-400">Valid till Apr 19, 2025</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;