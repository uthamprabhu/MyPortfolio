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
    title: "Programmer",
    company_name: "Tata Consultancy Services (TCS)",
    icon: tcs,
    iconBg: "#383E56",
    date: "July 2022 - till date",
    points: [
      "Collaborated in a team environment to enhance the frontend code, resulting in a 40% increase in user interaction and improved user experience.",
      "Utilized the MERN stack to create clear, well-documented code for user registration and authentication, contributing significantly to the application's functionality.",
      "Successfully implemented new features that resulted in a 60% reduction in customer support requests, demonstrating an ability to deliver high-impact solutions that enhance user experience.",
      "Collaborated in a team to design and test REST APIs using NodeJS, resulting in a 30% improvement in response times and reduced API latency.",
      "Led a team of 5 in the design and development of an internal microservice application, serving a user base of more than 600,000, showcasing strong leadership and technical skills."
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