import { DisplayTheme } from '../types';

/**
 * 显示风格主题配置
 * 每个主题包含亮色和暗色模式的完整色彩定义
 */
export interface ThemeConfig {
    id: DisplayTheme;
    name: string;
    description: string;
    // 页面主背景
    mainBg: string;
    darkMainBg: string;
    // 装饰性元素样式
    decor: {
        blob1: string;
        blob2: string;
        blob3: string;
        darkBlob1: string;
        darkBlob2: string;
        darkBlob3: string;
        pattern: string; // Tailwind class for background pattern
    };
    // 卡片样式
    card: {
        bg: string;
        darkBg: string;
        border: string;
        darkBorder: string;
        hoverBorder: string;
        darkHoverBorder: string;
        hoverShadow: string;
        darkHoverShadow: string;
    };
    // 图标容器样式
    iconContainer: {
        bg: string;
        darkBg: string;
        textColor: string;
        darkTextColor: string;
    };
    // 文字样式
    text: {
        title: string;
        darkTitle: string;
        description: string;
        darkDescription: string;
        hoverTitle: string;
        darkHoverTitle: string;
    };
    // 侧边栏高亮
    sidebar: {
        activeBg: string;
        darkActiveBg: string;
        activeText: string;
        darkActiveText: string;
        activeIndicator: string;
        activeIconBg: string;
        darkActiveIconBg: string;
    };
    // 渐变色（用于按钮、徽标等）
    gradient: {
        from: string;
        to: string;
    };
    // 预览色块
    previewColors: string[];
}

// 辅助函数：生成网格背景样式
const getGridPattern = (color: string) => `radial-gradient(${color} 1px, transparent 1px)`;

export const THEME_CONFIGS: Record<DisplayTheme, ThemeConfig> = {
    'default': {
        id: 'default',
        name: '经典蓝',
        description: '简洁清爽的默认风格',
        mainBg: 'bg-[#f8fafc]',
        darkMainBg: 'dark:bg-[#0f172a]',
        decor: {
            blob1: 'bg-blue-400/20',
            blob2: 'bg-indigo-300/20',
            blob3: 'bg-purple-200/20',
            darkBlob1: 'dark:bg-blue-600/15',
            darkBlob2: 'dark:bg-indigo-600/10',
            darkBlob3: 'dark:bg-blue-400/5',
            pattern: 'opacity-[0.4] dark:opacity-[0.1]',
        },
        card: {
            bg: 'bg-white',
            darkBg: 'dark:bg-slate-700/60',
            border: 'border-slate-200',
            darkBorder: 'dark:border-slate-600/50',
            hoverBorder: 'hover:border-blue-400',
            darkHoverBorder: 'dark:hover:border-blue-400',
            hoverShadow: 'hover:shadow-blue-100/50',
            darkHoverShadow: 'dark:hover:shadow-blue-500/10',
        },
        iconContainer: {
            bg: 'bg-gradient-to-br from-slate-50 to-slate-100',
            darkBg: 'dark:from-slate-600 dark:to-slate-700',
            textColor: 'text-blue-600',
            darkTextColor: 'dark:text-blue-300',
        },
        text: {
            title: 'text-slate-800',
            darkTitle: 'dark:text-slate-100',
            description: 'text-slate-600',
            darkDescription: 'dark:text-slate-300',
            hoverTitle: 'group-hover:text-blue-600',
            darkHoverTitle: 'dark:group-hover:text-blue-300',
        },
        sidebar: {
            activeBg: 'bg-blue-50',
            darkActiveBg: 'dark:bg-blue-900/40',
            activeText: 'text-blue-600',
            darkActiveText: 'dark:text-blue-300',
            activeIndicator: 'bg-blue-500',
            activeIconBg: 'bg-blue-100',
            darkActiveIconBg: 'dark:bg-blue-800',
        },
        gradient: { from: 'from-blue-500', to: 'to-purple-500' },
        previewColors: ['#3b82f6', '#8b5cf6', '#e2e8f0', '#f8fafc'],
    },

    'ocean-depths': {
        id: 'ocean-depths',
        name: '海洋深蓝',
        description: '专业沉稳的海洋风格',
        mainBg: 'bg-[#f0f9ff]',
        darkMainBg: 'dark:bg-[#080c14]',
        decor: {
            blob1: 'bg-cyan-400/20',
            blob2: 'bg-blue-400/20',
            blob3: 'bg-teal-300/10',
            darkBlob1: 'dark:bg-cyan-600/15',
            darkBlob2: 'dark:bg-blue-900/15',
            darkBlob3: 'dark:bg-cyan-400/5',
            pattern: 'opacity-[0.5] dark:opacity-[0.1]',
        },
        card: {
            bg: 'bg-white',
            darkBg: 'dark:bg-slate-700/50',
            border: 'border-[#a8dadc]/30',
            darkBorder: 'dark:border-slate-600/50',
            hoverBorder: 'hover:border-[#2d8b8b]',
            darkHoverBorder: 'dark:hover:border-[#00ffff]/40',
            hoverShadow: 'hover:shadow-[#2d8b8b]/15',
            darkHoverShadow: 'dark:hover:shadow-[#00ffff]/10',
        },
        iconContainer: {
            bg: 'bg-gradient-to-br from-[#a8dadc]/20 to-[#2d8b8b]/10',
            darkBg: 'dark:from-slate-600 dark:to-slate-700',
            textColor: 'text-[#2d8b8b]',
            darkTextColor: 'dark:text-cyan-300',
        },
        text: {
            title: 'text-[#1a2332]',
            darkTitle: 'dark:text-slate-50',
            description: 'text-[#1a2332]/60',
            darkDescription: 'dark:text-slate-300',
            hoverTitle: 'group-hover:text-[#2d8b8b]',
            darkHoverTitle: 'dark:group-hover:text-cyan-300',
        },
        sidebar: {
            activeBg: 'bg-[#a8dadc]/15',
            darkActiveBg: 'dark:bg-cyan-900/30',
            activeText: 'text-[#2d8b8b]',
            darkActiveText: 'dark:text-cyan-300',
            activeIndicator: 'bg-[#2d8b8b]',
            activeIconBg: 'bg-[#a8dadc]/30',
            darkActiveIconBg: 'dark:bg-cyan-800/40',
        },
        gradient: { from: 'from-[#2d8b8b]', to: 'to-[#1a2332]' },
        previewColors: ['#1a2332', '#2d8b8b', '#a8dadc', '#f1faee'],
    },

    'sunset-boulevard': {
        id: 'sunset-boulevard',
        name: '暮光落日',
        description: '温暖活力的日落风格',
        mainBg: 'bg-[#fff7ed]',
        darkMainBg: 'dark:bg-[#1a0f0f]',
        decor: {
            blob1: 'bg-orange-300/20',
            blob2: 'bg-red-200/20',
            blob3: 'bg-amber-100/20',
            darkBlob1: 'dark:bg-orange-600/15',
            darkBlob2: 'dark:bg-red-900/15',
            darkBlob3: 'dark:bg-orange-400/5',
            pattern: 'opacity-[0.6] dark:opacity-[0.1]',
        },
        card: {
            bg: 'bg-white',
            darkBg: 'dark:bg-orange-950/40',
            border: 'border-[#f4a261]/20',
            darkBorder: 'dark:border-orange-900/30',
            hoverBorder: 'hover:border-[#e76f51]',
            darkHoverBorder: 'dark:hover:border-orange-400/50',
            hoverShadow: 'hover:shadow-[#e76f51]/15',
            darkHoverShadow: 'dark:hover:shadow-orange-500/10',
        },
        iconContainer: {
            bg: 'bg-gradient-to-br from-[#e9c46a]/20 to-[#f4a261]/15',
            darkBg: 'dark:from-orange-900/40 dark:to-orange-950/20',
            textColor: 'text-[#e76f51]',
            darkTextColor: 'dark:text-orange-300',
        },
        text: {
            title: 'text-[#264653]',
            darkTitle: 'dark:text-orange-50',
            description: 'text-[#264653]/60',
            darkDescription: 'dark:text-orange-200/60',
            hoverTitle: 'group-hover:text-[#e76f51]',
            darkHoverTitle: 'dark:group-hover:text-orange-300',
        },
        sidebar: {
            activeBg: 'bg-[#f4a261]/15',
            darkActiveBg: 'dark:bg-orange-900/30',
            activeText: 'text-[#e76f51]',
            darkActiveText: 'dark:text-orange-300',
            activeIndicator: 'bg-[#e76f51]',
            activeIconBg: 'bg-[#f4a261]/25',
            darkActiveIconBg: 'dark:bg-orange-800/40',
        },
        gradient: { from: 'from-[#e76f51]', to: 'to-[#f4a261]' },
        previewColors: ['#264653', '#e76f51', '#f4a261', '#e9c46a'],
    },

    'tech-innovation': {
        id: 'tech-innovation',
        name: '科技创新',
        description: '前卫时尚的科技风格',
        mainBg: 'bg-slate-50',
        darkMainBg: 'dark:bg-[#020617]',
        decor: {
            blob1: 'bg-blue-500/15',
            blob2: 'bg-cyan-500/15',
            blob3: 'bg-indigo-400/10',
            darkBlob1: 'dark:bg-blue-600/15',
            darkBlob2: 'dark:bg-cyan-600/15',
            darkBlob3: 'dark:bg-blue-400/5',
            pattern: 'opacity-[0.5] dark:opacity-[0.1]',
        },
        card: {
            bg: 'bg-white',
            darkBg: 'dark:bg-slate-800/60',
            border: 'border-[#0066ff]/15',
            darkBorder: 'dark:border-slate-600/50',
            hoverBorder: 'hover:border-[#0066ff]',
            darkHoverBorder: 'dark:hover:border-blue-400',
            hoverShadow: 'hover:shadow-[#0066ff]/15',
            darkHoverShadow: 'dark:hover:shadow-blue-500/20',
        },
        iconContainer: {
            bg: 'bg-gradient-to-br from-[#0066ff]/10 to-[#00ffff]/5',
            darkBg: 'dark:from-slate-700/60 dark:to-slate-800/40',
            textColor: 'text-[#0066ff]',
            darkTextColor: 'dark:text-blue-300',
        },
        text: {
            title: 'text-[#1e1e1e]',
            darkTitle: 'dark:text-white',
            description: 'text-[#1e1e1e]/55',
            darkDescription: 'dark:text-slate-300',
            hoverTitle: 'group-hover:text-[#0066ff]',
            darkHoverTitle: 'dark:group-hover:text-blue-300',
        },
        sidebar: {
            activeBg: 'bg-[#0066ff]/10',
            darkActiveBg: 'dark:bg-blue-900/30',
            activeText: 'text-[#0066ff]',
            darkActiveText: 'dark:text-blue-300',
            activeIndicator: 'bg-[#0066ff]',
            activeIconBg: 'bg-[#0066ff]/15',
            darkActiveIconBg: 'dark:bg-blue-800/40',
        },
        gradient: { from: 'from-[#0066ff]', to: 'to-[#00ffff]' },
        previewColors: ['#1e1e1e', '#0066ff', '#00ffff', '#ffffff'],
    },

    'midnight-galaxy': {
        id: 'midnight-galaxy',
        name: '午夜星河',
        description: '神秘梦幻的宇宙风格',
        mainBg: 'bg-[#120b2e]',
        darkMainBg: 'dark:bg-[#120b2e]',
        decor: {
            blob1: 'bg-purple-600/30',
            blob2: 'bg-blue-600/30',
            blob3: 'bg-fuchsia-600/20',
            darkBlob1: 'dark:bg-purple-500/25',
            darkBlob2: 'dark:bg-blue-500/25',
            darkBlob3: 'dark:bg-indigo-400/15',
            pattern: 'opacity-[0.4] invert dark:invert-0 brightness-[1.2]',
        },
        card: {
            bg: 'bg-indigo-950/20',
            darkBg: 'dark:bg-indigo-950/40',
            border: 'border-indigo-500/20',
            darkBorder: 'dark:border-indigo-800/30',
            hoverBorder: 'hover:border-indigo-400',
            darkHoverBorder: 'dark:hover:border-indigo-400/50',
            hoverShadow: 'hover:shadow-indigo-500/20',
            darkHoverShadow: 'dark:hover:shadow-indigo-500/20',
        },
        iconContainer: {
            bg: 'bg-gradient-to-br from-[#a490c2]/15 to-[#4a4e8f]/10',
            darkBg: 'dark:from-indigo-900/40 dark:to-indigo-950/20',
            textColor: 'text-indigo-200',
            darkTextColor: 'dark:text-indigo-200',
        },
        text: {
            title: 'text-indigo-50',
            darkTitle: 'dark:text-indigo-50',
            description: 'text-indigo-200/60',
            darkDescription: 'dark:text-indigo-200/60',
            hoverTitle: 'group-hover:text-indigo-200',
            darkHoverTitle: 'dark:group-hover:text-indigo-200',
        },
        sidebar: {
            activeBg: 'bg-[#a490c2]/15',
            darkActiveBg: 'dark:bg-indigo-900/30',
            activeText: 'text-[#a490c2]',
            darkActiveText: 'dark:text-indigo-200',
            activeIndicator: 'bg-[#a490c2]',
            activeIconBg: 'bg-[#a490c2]/20',
            darkActiveIconBg: 'dark:bg-indigo-800/40',
        },
        gradient: { from: 'from-[#4a4e8f]', to: 'to-[#a490c2]' },
        previewColors: ['#2b1e3e', '#4a4e8f', '#a490c2', '#e6e6fa'],
    },

    'forest-canopy': {
        id: 'forest-canopy',
        name: '森林翠影',
        description: '清新自然的森林风格',
        mainBg: 'bg-emerald-50/50',
        darkMainBg: 'dark:bg-[#051005]',
        decor: {
            blob1: 'bg-emerald-400/15',
            blob2: 'bg-green-300/15',
            blob3: 'bg-lime-200/10',
            darkBlob1: 'dark:bg-emerald-900/20',
            darkBlob2: 'dark:bg-green-900/15',
            darkBlob3: 'dark:bg-emerald-800/5',
            pattern: 'opacity-[0.4] dark:opacity-[0.1]',
        },
        card: {
            bg: 'bg-white',
            darkBg: 'dark:bg-emerald-950/30',
            border: 'border-[#a4ac86]/25',
            darkBorder: 'dark:border-emerald-800/30',
            hoverBorder: 'hover:border-[#2d4a2b]',
            darkHoverBorder: 'dark:hover:border-emerald-400/50',
            hoverShadow: 'hover:shadow-[#a4ac86]/15',
            darkHoverShadow: 'dark:hover:shadow-emerald-500/10',
        },
        iconContainer: {
            bg: 'bg-gradient-to-br from-[#a4ac86]/20 to-[#7d8471]/10',
            darkBg: 'dark:from-emerald-900/40 dark:to-emerald-950/20',
            textColor: 'text-[#2d4a2b]',
            darkTextColor: 'dark:text-emerald-300',
        },
        text: {
            title: 'text-[#2d4a2b]',
            darkTitle: 'dark:text-emerald-50',
            description: 'text-[#2d4a2b]/55',
            darkDescription: 'dark:text-emerald-200/60',
            hoverTitle: 'group-hover:text-[#2d4a2b]',
            darkHoverTitle: 'dark:group-hover:text-emerald-300',
        },
        sidebar: {
            activeBg: 'bg-[#a4ac86]/15',
            darkActiveBg: 'dark:bg-emerald-900/30',
            activeText: 'text-[#2d4a2b]',
            darkActiveText: 'dark:text-emerald-300',
            activeIndicator: 'bg-[#2d4a2b]',
            activeIconBg: 'bg-[#a4ac86]/25',
            darkActiveIconBg: 'dark:bg-emerald-800/40',
        },
        gradient: { from: 'from-[#2d4a2b]', to: 'to-[#a4ac86]' },
        previewColors: ['#2d4a2b', '#7d8471', '#a4ac86', '#faf9f6'],
    },

    'desert-rose': {
        id: 'desert-rose',
        name: '玫瑰沙丘',
        description: '柔美优雅的沙漠玫瑰风格',
        mainBg: 'bg-rose-50/50',
        darkMainBg: 'dark:bg-[#1a0a10]',
        decor: {
            blob1: 'bg-rose-400/15',
            blob2: 'bg-pink-300/15',
            blob3: 'bg-orange-200/10',
            darkBlob1: 'dark:bg-rose-900/20',
            darkBlob2: 'dark:bg-pink-900/15',
            darkBlob3: 'dark:bg-rose-800/5',
            pattern: 'opacity-[0.5] dark:opacity-[0.1]',
        },
        card: {
            bg: 'bg-white',
            darkBg: 'dark:bg-rose-950/30',
            border: 'border-[#d4a5a5]/25',
            darkBorder: 'dark:border-rose-800/30',
            hoverBorder: 'hover:border-[#d4a5a5]',
            darkHoverBorder: 'dark:hover:border-rose-400/50',
            hoverShadow: 'hover:shadow-[#d4a5a5]/15',
            darkHoverShadow: 'dark:hover:shadow-rose-500/10',
        },
        iconContainer: {
            bg: 'bg-gradient-to-br from-[#e8d5c4]/30 to-[#d4a5a5]/15',
            darkBg: 'dark:from-rose-900/40 dark:to-rose-950/20',
            textColor: 'text-[#b87d6d]',
            darkTextColor: 'dark:text-rose-200',
        },
        text: {
            title: 'text-[#5d2e46]',
            darkTitle: 'dark:text-rose-50',
            description: 'text-[#5d2e46]/55',
            darkDescription: 'dark:text-rose-200/60',
            hoverTitle: 'group-hover:text-[#b87d6d]',
            darkHoverTitle: 'dark:group-hover:text-rose-200',
        },
        sidebar: {
            activeBg: 'bg-[#d4a5a5]/15',
            darkActiveBg: 'dark:bg-rose-900/30',
            activeText: 'text-[#b87d6d]',
            darkActiveText: 'dark:text-rose-200',
            activeIndicator: 'bg-[#b87d6d]',
            activeIconBg: 'bg-[#d4a5a5]/20',
            darkActiveIconBg: 'dark:bg-rose-800/40',
        },
        gradient: { from: 'from-[#b87d6d]', to: 'to-[#d4a5a5]' },
        previewColors: ['#5d2e46', '#b87d6d', '#d4a5a5', '#e8d5c4'],
    },

    'cyberpunk-neon': {
        id: 'cyberpunk-neon',
        name: '赛博霓虹',
        description: '高饱和度的赛博朋克电竞风格',
        mainBg: 'bg-[#0a0a1f]',
        darkMainBg: 'dark:bg-[#0a0a1f]',
        decor: {
            blob1: 'bg-purple-600/40',
            blob2: 'bg-cyan-600/40',
            blob3: 'bg-pink-600/30',
            darkBlob1: 'dark:bg-purple-500/30',
            darkBlob2: 'dark:bg-cyan-500/30',
            darkBlob3: 'dark:bg-pink-500/25',
            pattern: 'opacity-[0.4] invert dark:invert-0 brightness-[1.8]',
        },
        card: {
            bg: 'bg-slate-900/40',
            darkBg: 'dark:bg-slate-800/40',
            border: 'border-[#ff00ff]/30',
            darkBorder: 'dark:border-[#ff00ff]/40',
            hoverBorder: 'hover:border-[#ff00ff]',
            darkHoverBorder: 'dark:hover:border-[#00ffff]',
            hoverShadow: 'hover:shadow-[#ff00ff]/30',
            darkHoverShadow: 'dark:hover:shadow-[#00ffff]/30',
        },
        iconContainer: {
            bg: 'bg-slate-800',
            darkBg: 'dark:bg-slate-700',
            textColor: 'text-[#ff00ff]',
            darkTextColor: 'dark:text-[#00ffff]',
        },
        text: {
            title: 'text-[#ff00ff]',
            darkTitle: 'dark:text-[#ff00ff]',
            description: 'text-white/60',
            darkDescription: 'dark:text-white/70',
            hoverTitle: 'group-hover:text-white',
            darkHoverTitle: 'dark:group-hover:text-white',
        },
        sidebar: {
            activeBg: 'bg-[#ff00ff]/10',
            darkActiveBg: 'dark:bg-[#00ffff]/10',
            activeText: 'text-[#ff00ff]',
            darkActiveText: 'dark:text-[#00ffff]',
            activeIndicator: 'bg-[#ff00ff]',
            activeIconBg: 'bg-[#ff00ff]/20',
            darkActiveIconBg: 'dark:bg-[#00ffff]/20',
        },
        gradient: { from: 'from-[#ff00ff]', to: 'to-[#00ffff]' },
        previewColors: ['#ffffff', '#ff00ff', '#00ffff', '#fce7f3'],
    },

    'minimalist-white': {
        id: 'minimalist-white',
        name: '极简白雪',
        description: '极致留白的北欧性冷淡风格',
        mainBg: 'bg-[#ffffff]',
        darkMainBg: 'dark:bg-[#0a0a0a]',
        decor: {
            blob1: 'bg-slate-200/30',
            blob2: 'bg-slate-100/30',
            blob3: 'bg-slate-50/20',
            darkBlob1: 'dark:bg-white/5',
            darkBlob2: 'dark:bg-white/2',
            darkBlob3: 'dark:bg-white/1',
            pattern: 'opacity-[0.3] grayscale dark:opacity-[0.05]',
        },
        card: {
            bg: 'bg-white',
            darkBg: 'dark:bg-slate-700/60',
            border: 'border-[#f0f0f0]',
            darkBorder: 'dark:border-slate-500/40',
            hoverBorder: 'hover:border-black',
            darkHoverBorder: 'dark:hover:border-white',
            hoverShadow: 'hover:shadow-none',
            darkHoverShadow: 'dark:hover:shadow-none',
        },
        iconContainer: {
            bg: 'bg-[#f8f8f8]',
            darkBg: 'dark:bg-slate-600',
            textColor: 'text-black',
            darkTextColor: 'dark:text-white',
        },
        text: {
            title: 'text-black',
            darkTitle: 'dark:text-white',
            description: 'text-slate-400',
            darkDescription: 'dark:text-slate-300',
            hoverTitle: 'group-underline',
            darkHoverTitle: 'dark:group-hover:underline',
        },
        sidebar: {
            activeBg: 'bg-black text-white',
            darkActiveBg: 'dark:bg-white dark:text-black',
            activeText: 'text-white',
            darkActiveText: 'dark:text-black',
            activeIndicator: 'bg-black dark:bg-white',
            activeIconBg: 'bg-transparent',
            darkActiveIconBg: 'dark:bg-transparent',
        },
        gradient: { from: 'from-slate-400', to: 'to-black' },
        previewColors: ['#ffffff', '#000000', '#f0f0f0', '#94a3b8'],
    },

    'luxury-gold': {
        id: 'luxury-gold',
        name: '奢华金边',
        description: '高贵典雅的黑金商务风格',
        mainBg: 'bg-[#070604]',
        darkMainBg: 'dark:bg-[#070604]',
        decor: {
            blob1: 'bg-[#c5a059]/20',
            blob2: 'bg-[#8e6d3a]/15',
            blob3: 'bg-[#4a3a1e]/10',
            darkBlob1: 'dark:bg-[#c5a059]/20',
            darkBlob2: 'dark:bg-[#8e6d3a]/15',
            darkBlob3: 'dark:bg-[#4a3a1e]/10',
            pattern: 'opacity-[0.25] sepia dark:opacity-[0.1]',
        },
        card: {
            bg: 'bg-stone-900/60',
            darkBg: 'dark:bg-stone-800/60',
            border: 'border-[#c5a059]/30',
            darkBorder: 'dark:border-[#c5a059]/40',
            hoverBorder: 'hover:border-[#c5a059]',
            darkHoverBorder: 'dark:hover:border-[#c5a059]',
            hoverShadow: 'hover:shadow-[#c5a059]/20',
            darkHoverShadow: 'dark:hover:shadow-[#c5a059]/20',
        },
        iconContainer: {
            bg: 'bg-[#fef3c7]',
            darkBg: 'dark:bg-stone-700',
            textColor: 'text-[#c5a059]',
            darkTextColor: 'dark:text-[#c5a059]',
        },
        text: {
            title: 'text-[#c5a059]',
            darkTitle: 'dark:text-[#c5a059]',
            description: 'text-stone-300',
            darkDescription: 'dark:text-stone-300',
            hoverTitle: 'group-hover:text-white',
            darkHoverTitle: 'dark:group-hover:text-white',
        },
        sidebar: {
            activeBg: 'bg-[#c5a059]/20',
            darkActiveBg: 'dark:bg-[#c5a059]/10',
            activeText: 'text-[#c5a059]',
            darkActiveText: 'dark:text-[#c5a059]',
            activeIndicator: 'bg-[#c5a059]',
            activeIconBg: 'bg-[#c5a059]/20',
            darkActiveIconBg: 'dark:bg-[#c5a059]/30',
        },
        gradient: { from: 'from-[#c5a059]', to: 'to-[#8e6d3a]' },
        previewColors: ['#ffffff', '#c5a059', '#8e6d3a', '#fef3c7'],
    },
};

/**
 * 根据主题ID获取对应主题配置
 * @param themeId 主题标识符
 * @returns 完整的主题配置对象
 */
export const getThemeConfig = (themeId: DisplayTheme): ThemeConfig => {
    return THEME_CONFIGS[themeId] || THEME_CONFIGS['default'];
};

/**
 * 获取所有可用主题列表
 * @returns 主题配置数组
 */
export const getAllThemes = (): ThemeConfig[] => {
    return Object.values(THEME_CONFIGS);
};
