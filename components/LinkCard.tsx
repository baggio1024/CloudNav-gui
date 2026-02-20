import React from 'react';
import { LinkItem, SiteSettings, ThemeConfig } from '../types';
import { getThemeConfig } from '../services/themeConfig';

interface LinkCardProps {
  link: LinkItem;
  isSelected: boolean;
  isBatchEditMode: boolean;
  siteSettings: SiteSettings;
  onSelect: (linkId: string) => void;
  onContextMenu: (e: React.MouseEvent, link: LinkItem) => void;
  onEdit: (link: LinkItem) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({
  link,
  isSelected,
  isBatchEditMode,
  siteSettings,
  onSelect,
  onContextMenu,
  onEdit,
}) => {
  const currentTheme = getThemeConfig(siteSettings.displayTheme || 'default');
  const isDetailedView = siteSettings.cardStyle === 'detailed';

  return (
    <div
      className={`group relative transition-all duration-200 hover:shadow-lg ${currentTheme.card.hoverShadow} ${currentTheme.card.darkHoverShadow} ${isSelected
        ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800'
        : `${currentTheme.card.bg} ${currentTheme.card.darkBg} ${currentTheme.card.border} ${currentTheme.card.darkBorder}`
        } ${isBatchEditMode ? 'cursor-pointer' : ''} ${isDetailedView
          ? `flex flex-col rounded-2xl border shadow-sm p-4 min-h-[100px] ${currentTheme.card.hoverBorder} ${currentTheme.card.darkHoverBorder}`
          : `flex items-center justify-between rounded-xl border shadow-sm p-3 ${currentTheme.card.hoverBorder} ${currentTheme.card.darkHoverBorder}`
        }`}
      onClick={() => isBatchEditMode && onSelect(link.id)}
      onContextMenu={(e) => onContextMenu(e, link)}
    >
      {isBatchEditMode ? (
        <div className={`flex flex-1 min-w-0 overflow-hidden h-full ${isDetailedView ? 'flex-col' : 'items-center'}`}>
          <div className="flex items-center gap-3 w-full">
            <div className="relative">
              <div className={`absolute -inset-[1px] bg-gradient-to-tr ${currentTheme.gradient.from}/30 ${currentTheme.gradient.to}/30 rounded-xl blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className={`relative flex items-center justify-center shrink-0 overflow-hidden w-10 h-10 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 ${!link.icon ? `bg-white dark:bg-slate-800 ${currentTheme.iconContainer.textColor} ${currentTheme.iconContainer.darkTextColor} text-lg font-bold uppercase` : ''}`}>
                {link.icon ? (
                  <img src={link.icon} alt="" className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  link.title.charAt(0)
                )}
              </div>
            </div>
            <h3 className={`${currentTheme.text.title} ${currentTheme.text.darkTitle} truncate overflow-hidden text-ellipsis ${isDetailedView ? 'text-base' : 'text-sm font-medium'}`} title={link.title}>
              {link.title}
            </h3>
          </div>
          {isDetailedView && link.description && (
            <p className={`text-sm ${currentTheme.text.description} ${currentTheme.text.darkDescription} leading-relaxed line-clamp-2`}>
              {link.description}
            </p>
          )}
        </div>
      ) : (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-1 min-w-0 overflow-hidden h-full ${isDetailedView ? 'flex-col' : 'items-center'}`}
          title={isDetailedView ? link.url : (link.description || link.url)}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="relative">
              <div className={`absolute -inset-[1px] bg-gradient-to-tr ${currentTheme.gradient.from}/30 ${currentTheme.gradient.to}/30 rounded-xl blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className={`relative flex items-center justify-center shrink-0 overflow-hidden w-10 h-10 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 ${!link.icon ? `bg-white dark:bg-slate-800 ${currentTheme.iconContainer.textColor} ${currentTheme.iconContainer.darkTextColor} text-lg font-bold uppercase` : ''}`}>
                {link.icon ? (
                  <img src={link.icon} alt="" className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  link.title.charAt(0)
                )}
              </div>
            </div>
            <h3 className={`${currentTheme.text.title} ${currentTheme.text.darkTitle} truncate whitespace-nowrap overflow-hidden text-ellipsis ${currentTheme.text.hoverTitle} ${currentTheme.text.darkHoverTitle} transition-colors ${isDetailedView ? 'text-base' : 'text-sm font-medium'}`} title={link.title}>
              {link.title}
            </h3>
          </div>
          {isDetailedView && link.description && (
            <p className={`text-sm ${currentTheme.text.description} ${currentTheme.text.darkDescription} leading-relaxed line-clamp-2`}>
              {link.description}
            </p>
          )}
          {!isDetailedView && link.description && (
            <div className="tooltip-custom absolute left-0 -top-8 w-max max-w-[200px] bg-black text-white text-xs p-2 rounded opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all z-20 pointer-events-none truncate">
              {link.description}
            </div>
          )}
        </a>
      )}

      {!isBatchEditMode && (
        <div className={`flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-md p-0 absolute ${isDetailedView ? 'top-3 right-3' : 'top-1/2 -translate-y-1/2 right-2'}`}>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(link); }}
            className="p-1 text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
            title="编辑"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37 2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.32-.07.64-.07.97c0 .33.03.65.07.97l-2.11 1.63c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.08.49 0 .61-.22l2-3.46c.13-.22.07-.49-.12-.64l-2.11-1.63Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkCard;
