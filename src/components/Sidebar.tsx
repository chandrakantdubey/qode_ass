import { Link, useLocation } from 'react-router';
import {
    Home,
    Briefcase,
    FlaskConical,
    MessageSquare,
    Users,
    Gift,
    User,
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
            <div className="h-16 flex items-center px-6 mt-2">
                <Link to="/" className="flex items-center gap-3">
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1">
                            <div className="w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xs relative overflow-hidden">
                                <span className="absolute -right-1">c</span>
                            </div>
                            <span className="font-bold text-lg tracking-tight text-slate-900 leading-none">capitalmind</span>
                        </div>
                        <span className="text-sm text-green-600 font-medium leading-none ml-6">premium</span>
                    </div>
                </Link>
            </div>

            <div className="flex-1 py-6 space-y-0.5">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`flex items-center gap-3 px-6 py-3 text-[15px] font-normal transition-colors relative group
                                ${isActive ? 'text-slate-900 bg-slate-50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`
                            }
                        >
                            <Icon className={`h-[18px] w-[18px] stroke-[1.5] ${isActive ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            {link.name}
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-slate-900"></div>
                            )}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-slate-100 mb-2">
                <div className="flex items-center justify-between gap-3 px-2">
                    <div className="h-9 w-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        RN
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-600 uppercase text-right">CMP1Y</span>
                        <span className="text-[11px] text-slate-400 font-medium">Valid till Apr 19, 2025</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;