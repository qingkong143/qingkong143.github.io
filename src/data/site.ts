export const siteConfig = {
  title: '语焉',
  subtitle: '朝花夕拾，多愁善感',
  author: 'Torch',
  description: '一个从 Hexo clean 主题迁移而来的 Astro 博客主题。',
  nav: [
    { href: '/', label: '首页' },
    { href: '/archive/', label: '归档' },
    { href: '/music/', label: '音乐馆' },
    { href: '/about/', label: '关于' },
    { href: '/friend/', label: '友链' },
    { href: '/bangumi/', label: '追番' }
  ],
  social: [
    { name: 'email', label: 'Email', href: 'mailto:torch@318670.xyz' },
    { name: 'github', label: 'GitHub', href: 'https://github.com/qingkong143' },
    { name: 'bilibili', label: 'Bilibili', href: 'https://space.bilibili.com/1983066952' }
  ],
  postcard: false,
  avatar: '/avatar/avatar.webp',
  banner: '/images/banner.webp',
  bannerSrcset: [
    { src: '/images/banner-600w.webp', media: '(max-width: 479px)' },
    { src: '/images/banner-800w.webp', media: '(max-width: 799px)' },
    { src: '/images/banner.webp', media: '(min-width: 800px)' }
  ],
  globalBackground: {
    enable: true,
    image: '/images/banner.webp',
    opacity: 0.22,
    blur: 0,
    attachment: 'fixed'
  },
  search: {
    enable: true,
    buttonLabel: '搜索',
    label: '搜索文章',
    placeholder: '输入标题、摘要、分类或标签',
    emptyText: '输入关键词开始搜索',
    noResultsText: '没有找到相关文章',
    maxResults: 8
  },
  comments: {
    twikoo: {
      enable: true,
      envId: 'https://twikoo.318670.xyz/',
      region: '',
      src: 'https://cdn.jsdelivr.net/npm/twikoo@1.6.44/dist/twikoo.all.min.js',
      integrity: 'sha384-kwWLC0HjeZZnVPqCJ1AncI8tsk+kQqF9TbAmCclcc9Z0hGkfgHRzeQZxmdmZhE0K'
    }
  },
  player: {
    aplayer: {
      enable: true,
      src: 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js',
      integrity: 'sha384-gdGYZwHnfJM54evoZhpO0s6ZF5BQiybkiyW7VXr+h5UfruuRL/aORyw+5+HZoU6e',
      css: 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css',
      cssIntegrity: 'sha384-tLMkTWh2pfXNWGFlUS0w1TFtRG5xZ9lPWFOooj+vDDLIL+xBGQU/voDBY5XE2lVh'
    },
    meting: {
      enable: true,
      id: '5354878100',
      server: 'netease',
      type: 'playlist',
      src: 'https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js',
      integrity: 'sha384-ASVlpKF80A22OXTK3tfEjZm1EL6uFMKIC4p8+0maanw1S/IyB+Y4JG+ZDU7GpKE8'
    }
  },
  defaultCover: 'https://pic.netbian.com/uploads/allimg/250903/181428-17568944682f66.jpg'
};
