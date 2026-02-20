import React from 'react';
import { Settings, Lock, Upload, CloudCog, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Category, SiteSettings, ThemeConfig } from '../types';
import { getThemeConfig } from '../services/themeConfig';
import Icon from './Icon';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  siteSettings: SiteSettings;
  categories: Category[];
  selectedCategory: string;
  unlockedCategoryIds: Set<string>;
  authToken: string | null;
  syncStatus: 'idle' | 'saving' | 'saved' | 'error';
  onCategoryClick: (category: Category) => void;
  onOpenAuth: () => void;
  onOpenCatManager: () => void;
  onOpenImport: () => void;
  onOpenBackup: () => void;
  onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  siteSettings,
  categories,
  selectedCategory,
  unlockedCategoryIds,
  authToken,
  syncStatus,
  onCategoryClick,
  onOpenAuth,
  onOpenCatManager,
  onOpenImport,
  onOpenBackup,
  onOpenSettings,
}) => {
  const currentTheme = getThemeConfig(siteSettings.displayTheme || 'default');

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out
          bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-20 flex items-center gap-4 px-6 border-b border-slate-100 dark:border-slate-700/50 shrink-0">
          {siteSettings.favicon ? (
            <div className="relative group/logo">
              <div className="absolute -inset-[1px] bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-xl blur-[1px] opacity-0 group-hover/logo:opacity-100 transition-opacity" />
              <img src={siteSettings.favicon} alt="" className="relative w-10 h-10 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-600/50 object-cover bg-white dark:bg-slate-700" />
            </div>
          ) : (
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentTheme.gradient.from} ${currentTheme.gradient.to} flex items-center justify-center text-white shadow-lg`}>
              <Icon name="Compass" size={20} />
            </div>
          )}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-xl font-extrabold bg-gradient-to-r ${currentTheme.gradient.from} ${currentTheme.gradient.to} bg-clip-text text-transparent tracking-tight`}>
                {siteSettings.navTitle || 'CloudNav'}
              </span>
              <button
                onClick={() => { if (!authToken) onOpenAuth(); else onOpenCatManager(); }}
                className="p-1 text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                title="管理分类"
              >
                <Settings size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
          {siteSettings.enablePinnedSites && (
            <button
              onClick={() => { 
                onCategoryClick({ id: 'all', name: '置顶网站', icon: 'LayoutGrid' } as Category); 
                setSidebarOpen(false); 
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${selectedCategory === 'all'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
            >
              <div className="p-1"><Icon name="LayoutGrid" size={18} /></div>
              <span>置顶网站</span>
            </button>
          )}

          <div className="pt-2"></div>

          {categories.map(cat => {
            const isLocked = cat.password && !unlockedCategoryIds.has(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => { onCategoryClick(cat); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group ${selectedCategory === cat.id
                  ? `${currentTheme.sidebar.activeBg} ${currentTheme.sidebar.darkActiveBg} ${currentTheme.sidebar.activeText} ${currentTheme.sidebar.darkActiveText} font-medium`
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${selectedCategory === cat.id ? `${currentTheme.sidebar.activeIconBg} ${currentTheme.sidebar.darkActiveIconBg}` : 'bg-slate-100 dark:bg-slate-800'}`}>
                  {isLocked ? <Lock size={16} className="text-amber-500" /> : <Icon name={cat.icon} size={16} />}
                </div>
                <span className="truncate flex-1 text-left">{cat.name}</span>
                {selectedCategory === cat.id && <div className={`w-1.5 h-1.5 rounded-full ${currentTheme.sidebar.activeIndicator}`}></div>}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 shrink-0">
          <div className="grid grid-cols-3 gap-2 mb-2">
            <button
              onClick={() => { if (!authToken) onOpenAuth(); else onOpenImport(); }}
              className="flex flex-col items-center justify-center gap-1 p-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 transition-all"
              title="导入书签"
            >
              <Upload size={14} />
              <span>导入</span>
            </button>

            <button
              onClick={() => { if (!authToken) onOpenAuth(); else onOpenBackup(); }}
              className="flex flex-col items-center justify-center gap-1 p-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 transition-all"
              title="备份与恢复"
            >
              <CloudCog size={14} />
              <span>备份</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="flex flex-col items-center justify-center gap-1 p-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 transition-all"
              title="设置"
            >
              <Settings size={14} />
              <span>设置</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-xs px-2 mt-2">
            <div className="flex items-center gap-1 text-slate-400">
              {syncStatus === 'saving' && <Loader2 className="animate-spin w-3 h-3 text-blue-500" />}
              {syncStatus === 'saved' && <CheckCircle2 className="w-3 h-3 text-green-500" />}
              {syncStatus === 'error' && <AlertCircle className="w-3 h-3 text-red-500" />}
              {authToken ? <span className="text-green-600">已同步</span> : <span className="text-amber-500">离线</span>}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
