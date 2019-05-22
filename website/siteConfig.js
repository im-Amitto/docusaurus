const siteConfig = {
  title: 'BigBinary Ebook', // Title for website.
  tagline: 'markdown-book-generator ',
  url: 'https://im-amitto.github.io/', // website URL
  baseUrl: 'https://im-amitto.github.io/docusaurus//website/build/bigbinary-ebook/',

  projectName: 'bigbinary-ebook',
  organizationName: 'bigbinary',

  //Nav bar
  headerLinks: [
    {doc: 'intro', label: 'E-book'}
  ],

  //Logo
  headerIcon: 'img/logo.png',
  footerIcon: 'img/logo.png',
  favicon: 'img/logo.png',

  //Website Color
  colors: {
    primaryColor: '#2979FF',
    secondaryColor: '#00E5FF',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  //copyright in footer
  copyright: `Copyright © ${new Date().getFullYear()} BigBinary`,

  //codeblock highlight
  highlight: {
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '../../js/code-block-buttons.js',
    '../../js/prism.js',
    '../../js/highlighter.js',
  ],
  stylesheets: [
    '../../css/prism.css'
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

};

module.exports = siteConfig;
