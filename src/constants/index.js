import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  tcs,
  netflixClone,
  vuejsOlive,
  nodeMicro,
  zoomClone,
  angularBuySell,
  reactBlog
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full Stack Web Developer",
    icon: web,
  },
  {
    title: "React developer",
    icon: mobile,
  },
  {
    title: "DevOps Engineer",
    icon: backend,
  },
  {
    title: "Cloud Application Development",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Developer",
    company_name: "Tata Consultancy Services (TCS)",
    icon: tcs,
    iconBg: "#383E56",
    date: "July 2022 - September 2025",
    points: [
      "Developed responsive frontend modules, including data-intensive tables using React.js, for a defense application with DRDO for the Indian Army and Navy, reducing development time by 50%. Enhanced user experience by 40% and improved data accuracy by 50% through seamless backend integration.",
      "Developed a new product discovery module in React.js with infinite scroll and advanced filters, replacing the legacy search system and improving performance and user experience by 45% as reported by project metrics.",
      "Led the development of a cart module using React.js, integrating backend APIs for real-time inventory and budget tracking, driving a 30% improvement in resource management and delivering a seamless user experience with efficient data updates. ",
      "Improved global performance consistency by 40% by building a JSON-driven configuration service that integrated smoothly with existing React codebases, enabling effective localization in 7 new countries.",
      "Collaborated in a 3-member team to redesign and develop role-based login/signup flows from Figma to production using React and form validation; the new experience led to an 80% increase in user logins, significantly improving onboarding and engagement. ",
      "Took the lead in building a real-time chat component using React, Node.js (Express), and Socket.io for one-on-one, group, and room-based messaging; proactively initiated the feature to support the larger app vision, easing the workload of senior developers and accelerating final integration by 30%.",
      "Worked with a 10-member team to build a scalable microservice-based app for 600,000+ users, leading the development of login/signup flows using Node.js, Express, JWT, and advanced error handling. Improved auth reliability and helped reduce login-related support tickets by 40%, while ensuring smooth access during peak traffic hours.",
      "Led a team of 5 in creating a 3D Virtual Reality (VR) Biology Lab optimized for Facebook’s (Meta) Oculus, delivering 50% ahead of schedule. Ensured seamless knowledge transfer for 3D model design and functionality."
    ],
  }
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Zoom Clone",
    description:
      "A Full stack highly responsive zoom clone Video chat web application with almost all features of Zoom.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "clerk",
        color: "green-text-gradient",
      },
      {
        name: "stream",
        color: "pink-text-gradient",
      },
      {
        name: "shadcn",
        color: "bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600",
      },
    ],
    image: zoomClone,
    source_code_link: "https://github.com/uthamprabhu/zoom_clone",
  },
  {
    name: "Netflix Clone",
    description:
      "A simple Netflix clone website made from scratch made with pure HTML5, CSS3 and Javascript.",
    tags: [
      {
        name: "html",
        color: "blue-text-gradient",
      },
      {
        name: "css",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
    ],
    image: netflixClone,
    source_code_link: "https://github.com/uthamprabhu/netflix-clone-with-pure-HtmlCssJs",
  },
  {
    name: "Olive Oil selling",
    description:
      "Explore high-quality olive oils on our secure full-stack website, complete with proper authentication for a safe shopping experience.",
    tags: [
      {
        name: "vuejs",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "expressjs",
        color: "pink-text-gradient",
      },
      {
        name: "nodejs",
        color: "bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600",
      },
    ],
    image: vuejsOlive,
    source_code_link: "https://github.com/uthamprabhu/OliveOil_Vuejs_FullStack",
  },
  {
    name: "E-commerce Microservice",
    description:
      "E-commerce application which follows a microservice architecture, which has an admin panel and is fully authenticated.",
    tags: [
      {
        name: "nodejs",
        color: "blue-text-gradient",
      },
      {
        name: "redis",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "pink-text-gradient",
      },
      {
        name: "rabbitmq",
        color: "bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600",
      },
      {
        name: "docker",
        color: "bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600",
      },
    ],
    image: nodeMicro,
    source_code_link: "https://github.com/uthamprabhu/nodejs-microservices-4403064",
  },
  {
    name: "Buy and Sell App",
    description:
      "An web application where you can list items and buy items from other people who have listed on the site, just like OLX.",
    tags: [
      {
        name: "angularjs",
        color: "blue-text-gradient",
      },
      {
        name: "mysql",
        color: "green-text-gradient",
      },
      {
        name: "hapijs",
        color: "pink-text-gradient",
      },
      {
        name: "firebase",
        color: "bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600",
      },
    ],
    image: angularBuySell,
    source_code_link: "https://github.com/uthamprabhu/BuyAndSell_MEAN",
  },
  {
    name: "Blog Website",
    description:
      "A full stack and fully autenticated blog site where you can read, upvote and comment just like any other blog site.",
    tags: [
      {
        name: "mongodb",
        color: "blue-text-gradient",
      },
      {
        name: "expressjs",
        color: "green-text-gradient",
      },
      {
        name: "reactjs",
        color: "pink-text-gradient",
      },
      {
        name: "nodejs",
        color: "bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600",
      },
    ],
    image: reactBlog,
    source_code_link: "https://github.com/uthamprabhu/BlogSite_MERN",
  },
];

export { services, technologies, experiences, testimonials, projects };