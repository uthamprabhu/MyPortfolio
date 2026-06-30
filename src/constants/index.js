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
  warpdrive,
  freelance,
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
    id: "resume",
    title: "Resume",
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
    title: "React Developer",
    icon: mobile,
  },
  {
    title: "Backend Engineer",
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
    title: "Freelance Full Stack Developer",
    company_name: "Self-Employed",
    icon: freelance,
    iconBg: "#0a1628",
    date: "January 2026 – Present",
    points: [
      "Built and launched focuzonemedia.com — a full-stack event-based media website — using Next.js, Node.js backend, deployed on Vercel with AWS S3 for media asset storage.",
      "Currently developing CineArtery, a scalable web application for actors and producers to discover, connect, and collaborate — built with Next.js, Node.js, Django REST Framework, and PostgreSQL.",
      "Architecting multi-service backend systems, managing database schema design, and handling end-to-end deployment across both projects independently.",
      "Managing the full product lifecycle solo: client requirements, UI/UX design, development, deployment, and ongoing maintenance.",
    ],
  },
  {
    title: "Technical Specialist",
    company_name: "WarpDrive Tech Works — Scotty (B2B SaaS)",
    icon: warpdrive,
    iconBg: "#0f0f1a",
    date: "October 2025 – January 2026",
    points: [
      "Developed multiple responsive UI modules using Next.js and Tailwind CSS, translating complex Figma designs into production-ready interfaces across multiple user flows.",
      "Built the UI for a real-time chat system handling message updates, typing indicators, and channel switching — ensuring a smooth and consistent user experience at scale.",
      "Implemented role-based access control (RBAC) across the application, enforcing route guards and permission-based UI rendering, eliminating unauthorized deep-link navigation issues.",
      "Developed a face recognition login flow using FaceAPI.js, covering onboarding, biometric setup, and account management for a seamless and secure authentication experience.",
      "Built geofencing and geotagging UI systems using Google Maps APIs, enabling real-time field tracking and location-based validation workflows.",
      "Optimized UI for responsiveness and PWA support, ensuring consistent performance, faster load times, and reliable behavior across devices and network conditions.",
    ],
  },
  {
    title: "Assistant System Engineer",
    company_name: "Tata Consultancy Services (TCS)",
    icon: tcs,
    iconBg: "#383E56",
    date: "July 2022 – September 2025",
    points: [
      "Developed responsive frontend modules using React.js for a defense application (DRDO), building data-intensive tables and workflows with seamless API integration — reducing development time by 50% and improving data accuracy by 50%.",
      "Built a product discovery module with infinite scroll and advanced filtering, replacing the legacy search system and improving performance and usability by 45%.",
      "Led the development of a cart and tracking module using React.js, integrating backend APIs for real-time inventory updates and budget-based workflows — driving a 30% improvement in resource management.",
      "Implemented role-based authentication flows (login/signup) from Figma to production using React and form validation — resulting in an 80% increase in user logins and significantly improved onboarding.",
      "Built a real-time chat feature using React, Node.js, and Socket.io, supporting one-to-one and group communication with consistent message synchronization.",
      "Contributed to a microservice-based application serving 600,000+ users, implementing secure authentication with Node.js, Express, and JWT — reducing login-related support tickets by 40%.",
      "Gained hands-on experience with GCP (Cloud SQL, Firebase Auth, Google Maps APIs) and AWS (EC2, S3, DynamoDB) for backend integration and location-based features.",
      "Led a team of 5 to build a VR-based Biology Lab for Oculus (Meta), delivering 50% ahead of schedule with full knowledge transfer on 3D model design and functionality.",
    ],
  },
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
    name: "Olive Oil Selling",
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
      "A web application where you can list items and buy items from other people who have listed on the site, just like OLX.",
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
      "A full stack and fully authenticated blog site where you can read, upvote and comment just like any other blog site.",
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
