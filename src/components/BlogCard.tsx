
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    imageUrl: string;
    category: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, readTime, imageUrl, category }) => {
    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600 uppercase tracking-wide shadow-sm">
                    {category}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-slate-500 text-xs mb-3 space-x-2">
                    <span>{date}</span>
                    <span>•</span>
                    <span>{readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-3">
                    {excerpt}
                </p>
                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
