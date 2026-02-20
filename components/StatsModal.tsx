import React from 'react';
import { X, TrendingUp, ExternalLink, Clock } from 'lucide-react';
import { LinkItem, SiteSettings } from '../types';
import { getThemeConfig } from '../services/themeConfig';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  links: LinkItem[];
  siteSettings: SiteSettings;
  onLinkClick?: (link: LinkItem) => void;
}

const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  links,
  siteSettings,
  onLinkClick,
}) => {
  if (!isOpen) return null;

  const currentTheme = getThemeConfig(siteSettings.displayTheme || 'default');

  const sortedLinks = [...links].sort((a, b) => (b.visitCount || 0) - (a.visitCount || 0));

  const totalVisits = links.reduce((sum, link) => sum + (link.visitCount || 0), 0);
  const maxCount = sortedLinks.find(l => l.visitCount && l.visitCount > 0)?.visitCount || 1;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return minutes <= 1 ? '刚刚' : `${minutes}分钟前`;
      }
      return `${hours}小时前`;
    } else if (days === 1) {
      return '昨天';
    } else if (days < 7) {
      return `${days}天前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-500" />
            <h3 className="text-lg font-semibold dark:text-white">访问统计</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X className="w-5 h-5 dark:text-slate-400" />
          </button>
        </div>

        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 shrink-0">
          <div className="flex items-center justify-around text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalVisits}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">总访问次数</div>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{links.filter(l => l.visitCount && l.visitCount > 0).length}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">已访问链接</div>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{links.length}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">总链接数</div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {sortedLinks.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 dark:text-slate-400">暂无链接</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedLinks.map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onLinkClick?.(link)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm shrink-0 ${
                    index === 0 && link.visitCount ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                    index === 1 && link.visitCount ? 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400' :
                    index === 2 && link.visitCount ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                    'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                    {link.icon ? (
                      <img src={link.icon} alt="" className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${currentTheme.gradient.from} ${currentTheme.gradient.to} text-white text-sm font-bold`}>
                        {link.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                          {link.title}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-[200px]">
                          {link.url}
                        </span>
                      </div>
                      <span className={`text-sm font-semibold ml-2 shrink-0 ${link.visitCount ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                        {link.visitCount || 0}次
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${currentTheme.gradient.from} ${currentTheme.gradient.to} transition-all duration-300`}
                        style={{ width: `${((link.visitCount || 0) / maxCount) * 100}%` }}
                      />
                    </div>
                    {link.lastVisitedAt && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-400 dark:text-slate-500">
                        <Clock size={10} />
                        <span>最近访问: {formatTime(link.lastVisitedAt)}</span>
                      </div>
                    )}
                  </div>
                  
                  <ExternalLink size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
