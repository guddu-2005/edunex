import type { ImagePlaceholder } from './placeholder-images';
import { placeholderImages } from './placeholder-images';

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  instructor: string;
  duration: string;
  rating: number;
  enrollmentCount: number;
  image: ImagePlaceholder;
  lectures: Lecture[];
}

export interface Lecture {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  notes: string;
  transcript: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  lectureId: string;
  questions: QuizQuestion[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: ImagePlaceholder;
  bio: string;
  enrolledCourses: string[]; // array of course IDs
}

export const lectures: Lecture[] = [
  {
    id: 'lec_001',
    title: 'Introduction to React',
    duration: '15:23',
    videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
    notes: '### Key Concepts\n- What is React?\n- Understanding JSX\n- Components vs. Elements\n- `render()` method and `ReactDOM.render()`',
    transcript: `(0:01) Hello and welcome to Introduction to React! In this video, we'll cover the absolute basics...`,
  },
  {
    id: 'lec_002',
    title: 'State and Props',
    duration: '22:05',
    videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
    notes: '### State vs. Props\n- **Props**: Passed from parent to child. Immutable.\n- **State**: Managed within the component. Can be changed. Use `useState` hook.',
    transcript: `(0:01) In this lesson, we're diving into two fundamental concepts in React: state and props...`,
  },
  {
    id: 'lec_003',
    title: 'Component Lifecycle',
    duration: '18:45',
    videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
    notes: '### Lifecycle with Hooks\n- `useEffect` for mounting, updating, and unmounting.\n- Dependency array is key to controlling side effects.',
    transcript: `(0:01) Understanding the component lifecycle is crucial for building robust React applications...`,
  },
  {
    id: 'lec_004',
    title: 'Introduction to Machine Learning',
    duration: '12:10',
    videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
    notes: '### Core Ideas\n- Supervised vs. Unsupervised Learning\n- What is a model?\n- Training and testing data.',
    transcript: `(0:01) What exactly is machine learning? In this video, we will demystify this powerful technology...`,
  },
  {
    id: 'lec_005',
    title: 'Linear Regression',
    duration: '25:50',
    videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
    notes: '### Linear Regression\n- Predicting continuous values.\n- Cost function and gradient descent.',
    transcript: `(0:01) Let's explore one of the simplest yet most powerful algorithms in machine learning: Linear Regression...`,
  },
];

export const courses: Course[] = [
    {
    id: 'crs_001',
    title: 'React for Beginners',
    description: 'Learn the fundamentals of React and build modern web applications.',
    longDescription: 'This course provides a comprehensive introduction to React, the most popular JavaScript library for building user interfaces. You will learn about components, state, props, hooks, and routing, enabling you to create dynamic and interactive web apps from scratch.',
    category: 'Web Development',
    instructor: 'Jane Doe',
    duration: '8 hours',
    rating: 4.8,
    enrollmentCount: 12543,
    image: placeholderImages.find(p => p.id === 'react-course')!,
    lectures: lectures.slice(0, 3),
  },
  {
    id: 'crs_002',
    title: 'Advanced CSS and Sass',
    description: 'Master modern CSS techniques, including Flexbox, Grid, and animations.',
    longDescription: 'Take your CSS skills to the next level. This course covers advanced topics like responsive design, CSS architecture with Sass, creating stunning animations and transitions, and mastering layout with Flexbox and Grid. Perfect for developers looking to create beautiful and professional websites.',
    category: 'Web Design',
    instructor: 'John Smith',
    duration: '12 hours',
    rating: 4.9,
    enrollmentCount: 9876,
    image: placeholderImages.find(p => p.id === 'css-course')!,
    lectures: [],
  },
  {
    id: 'crs_003',
    title: 'Machine Learning A-Z',
    description: 'Go from beginner to advanced in machine learning and data science.',
    longDescription: 'This comprehensive course covers all major machine learning algorithms, from linear regression to deep learning. With hands-on projects and real-world datasets, you will gain practical experience in building and deploying machine learning models.',
    category: 'Data Science',
    instructor: 'Emily White',
    duration: '25 hours',
    rating: 4.7,
    enrollmentCount: 21345,
    image: placeholderImages.find(p => p.id === 'ml-course')!,
    lectures: lectures.slice(3, 5),
  },
    {
    id: 'crs_004',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user-centric design to create intuitive products.',
    longDescription: 'A great product starts with great design. This course teaches you the fundamentals of UI/UX, including user research, wireframing, prototyping, and usability testing. You will learn to think like a designer and create products that users love.',
    category: 'Web Design',
    instructor: 'David Green',
    duration: '10 hours',
    rating: 4.8,
    enrollmentCount: 8502,
    image: placeholderImages.find(p => p.id === 'uiux-course')!,
    lectures: [],
  },
  {
    id: 'crs_005',
    title: 'Python for Everybody',
    description: 'A beginner-friendly introduction to programming with Python.',
    longDescription: 'This course is designed for absolute beginners with no prior programming experience. You will learn the basics of Python, including variables, loops, functions, and data structures. By the end, you will be able to write your own Python scripts and be ready to tackle more advanced topics.',
    category: 'Programming',
    instructor: 'Sarah Blue',
    duration: '15 hours',
    rating: 4.9,
    enrollmentCount: 54321,
    image: placeholderImages.find(p => p.id === 'python-course')!,
    lectures: [],
  },
  {
    id: 'crs_006',
    title: 'The Complete Node.js Developer Course',
    description: 'Build, test, and deploy real-world applications with Node.js.',
    longDescription: 'Learn backend development with Node.js, Express, and MongoDB. This course takes you from the fundamentals to deploying your own production-ready applications. You will build a complete REST API, work with databases, and learn about authentication and security.',
    category: 'Web Development',
    instructor: 'Mike Brown',
    duration: '30 hours',
    rating: 4.7,
    enrollmentCount: 15789,
    image: placeholderImages.find(p => p.id === 'node-course')!,
    lectures: [],
  },
];

export const users: User[] = [
  {
    id: 'usr_001',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    avatar: placeholderImages.find(p => p.id === 'user-avatar')!,
    bio: 'Full-stack developer with a passion for learning new technologies. Currently diving deep into AI and machine learning.',
    enrolledCourses: ['crs_001', 'crs_003', 'crs_006'],
  },
];

export const quizzes: Quiz[] = [
    {
        id: 'quiz_001',
        lectureId: 'lec_001',
        questions: [
            { id: 'q1', question: 'What is JSX?', options: ['A JavaScript syntax extension', 'A templating language', 'A CSS preprocessor', 'A database query language'], correctAnswer: 'A JavaScript syntax extension' },
            { id: 'q2', question: 'Which method is used to render React content to the DOM?', options: ['ReactDOM.render()', 'React.mount()', 'Component.display()', 'Render.toDOM()'], correctAnswer: 'ReactDOM.render()' },
        ]
    }
]
