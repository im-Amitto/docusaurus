const siteConfig = {
  title: 'Learn Ruby on Rails', // Title for website.
  tagline: 'markdown-book-generator ',
  url: 'https://your-website-url', // website URL
  baseUrl: '/',

  projectName: 'bigbinary-ebook',
  organizationName: 'bigbinary',

  //Nav bar
  headerLinks: [
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

  // font-family: georgia, "Times New Roman", times, serif;;
    /* Custom fonts for website */
  fonts: {
    myFont: [
      "https://fonts.googleapis.com/css?family=Montserrat&display=swap"
    ],
    myOtherFont: [
      "https://fonts.googleapis.com/css?family=Montserrat&display=swap"
    ]
  },

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
    './../js/prism.js',
    './../js/custom.js',
  ],
  stylesheets: [
    './../css/prism.css'
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
