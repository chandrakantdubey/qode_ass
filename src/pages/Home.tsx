import { ExternalLink } from 'lucide-react';

const Home = () => {
    const posts = [
        {
            id: 1,
            date: "Apr 18, 2024",
            title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
            excerpt: "We are increasing the duration of our Fixed Income portfolio to reflect the current macro conditions. We want to take advantage of the current higher rates to further increase the duration of the Gilt funds we hold. Read more...",
            category: "Fixed Income"
        },
        {
            id: 2,
            date: "Apr 05, 2024",
            title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
            excerpt: "Unlock this post by trail. Craftsman Automation excels in making precise parts for cars and machines. Amidst temporary headwinds, looks resilient with a focus on growth and innovation....",
            category: "Stock Analysis"
        },
        {
            id: 3,
            date: "Apr 03, 2024",
            title: "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
            excerpt: "FY24 brought us a 42% gain in our Capitalmind Focused portfolio, gently outperforming the Nifty's 29%. It's been a bit of a rollercoaster, especially these last few months, but that's part of the equity investing. It's like having a compass...",
            category: "Strategy"
        },
        {
            id: 4,
            date: "Mar 27, 2024",
            title: "A Small CAD for India, Yet Again",
            excerpt: "Yet again, India's Current Account Deficit is a mere 10 bn in the quarter (Dec 2023), less than levels more than a decade back, and less than 2017-18 too. Why net of gold? It's not really a current account import...",
            category: "Macro"
        },
        {
            id: 5,
            date: "Mar 25, 2024",
            title: "Poonawalla Fincorp: One right step at a time",
            excerpt: "There are some winning patterns in investing that keep repeating. One such pattern is when a big company buys a struggling company, fixes old problems, and brings in new leaders to grow the business. This way has often led to...",
            category: "Stock Analysis"
        },
        {
            id: 6,
            date: "Mar 18, 2024",
            title: "CM Focused: Reducing our allocation to smallcaps & increasing cash",
            excerpt: "In the last few days, we have seen increased volatility in the mid and small-cap sectors due to regulatory actions, including restrictions on inflows into mid and small-cap mutual funds.",
            category: "Portfolio Update"
        }
    ];

    return (
        <div className="bg-gray-100 min-h-screen pb-20 pt-10 px-4 md:px-12 overflow-x-hidden">
            <div className="max-w-[1200px] mx-auto">
                <h1 className="text-[28px] font-bold text-slate-900 mb-10">Home</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 group cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Get started</h3>
                            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
                        </div>
                        <p className="text-[13px] leading-relaxed text-slate-500">
                            Read our getting started guide to get the most out of your Capitalmind subscription.
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 group cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Community</h3>
                            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
                        </div>
                        <p className="text-[13px] leading-relaxed text-slate-500">
                            Join the conversation on our exclusive community on Slack for Capitalmind Premium subscribers
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 group cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Visit website</h3>
                            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
                        </div>
                        <p className="text-[13px] leading-relaxed text-slate-500">
                            Keep up with our latest content on our website
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-8">Latest Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {posts.map((post) => (
                            <div key={post.id} className="flex flex-col items-start group">
                                <span className="text-xs font-medium text-slate-400 mb-2">{post.date}</span>
                                <h3 className="text-[17px] font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 cursor-pointer transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 text-[14px] leading-relaxed mb-3 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <button className="text-[13px] font-medium text-green-600 hover:text-green-700 transition-colors">
                                    Read full post
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;