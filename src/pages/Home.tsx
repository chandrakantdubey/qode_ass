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
        <div className="bg-white min-h-screen pb-20 pt-8 px-10">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Home</h1>

                {/* Top Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1 */}
                    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-slate-900">Get started</h3>
                            <ExternalLink className="h-4 w-4 text-slate-400" />
                        </div>
                        <p className="text-sm text-slate-500">
                            Read our getting started guide to get the most out of your Capitalmind subscription.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-slate-900">Community</h3>
                            <ExternalLink className="h-4 w-4 text-slate-400" />
                        </div>
                        <p className="text-sm text-slate-500">
                            Join the conversation on our exclusive community on Slack for Capitalmind Premium subscribers
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-slate-900">Visit website</h3>
                            <ExternalLink className="h-4 w-4 text-slate-400" />
                        </div>
                        <p className="text-sm text-slate-500">
                            Keep up with our latest content on our website
                        </p>
                    </div>
                </div>

                {/* Latest Posts */}
                <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-6">Latest Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {posts.map((post) => (
                            <div key={post.id} className="flex flex-col items-start">
                                <span className="text-xs text-slate-400 mb-2">{post.date}</span>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug hover:text-green-700 cursor-pointer">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-3">
                                    {post.excerpt}
                                </p>
                                <button className="text-sm font-medium text-green-600 hover:text-green-700">
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