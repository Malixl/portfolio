const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

// Models
const User = require('./models/User');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const Blog = require('./models/Blog');
const Achievement = require('./models/Achievement');
const Education = require('./models/Education');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// ==================== SAMPLE DATA ====================

const sampleProject = {
    title: 'Portfolio Website',
    description: 'A personal portfolio website built with the MERN Stack to showcase my projects, skills, and experiences.',
    image: 'https://via.placeholder.com/600x400',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    demoLink: 'https://myportfolio.com',
    repoLink: 'https://github.com/malik/portfolio',
};

const sampleSkill = {
    name: 'React.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    category: 'Development',
    proficiency: 85,
};

const sampleExperience = {
    role: 'Frontend Developer',
    company: 'Tech Startup Inc.',
    period: 'Jan 2025 - Present',
    description: 'Developing responsive web applications using React and collaborating with the backend team to integrate RESTful APIs.',
};

const sampleBlog = {
    title: 'Getting Started with the MERN Stack',
    content: 'The MERN Stack is a powerful combination of MongoDB, Express.js, React.js, and Node.js that allows you to build full-stack web applications using JavaScript throughout the entire stack...',
    image: 'https://via.placeholder.com/600x400',
    tags: ['MERN', 'JavaScript', 'Web Development'],
};

const sampleAchievement = {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: new Date('2025-06-15'),
    proofLink: 'https://www.credly.com/badges/example',
};

const sampleEducation = {
    institution: 'Universitas Indonesia',
    degree: 'Bachelor of Computer Science',
    field: 'Computer Science',
    period: '2021 - 2025',
    description: 'Focused on software engineering, web development, and database systems.',
};

// ==================== IMPORT DATA ====================

const importData = async () => {
    try {
        // Wipe all existing data
        await User.deleteMany();
        await Project.deleteMany();
        await Skill.deleteMany();
        await Experience.deleteMany();
        await Blog.deleteMany();
        await Achievement.deleteMany();
        await Education.deleteMany();

        console.log('🧹 Old data cleared...');

        // Create admin user with hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('M@likS!21', salt);

        const adminUser = await User.create({
            username: 'malikganteng',
            password: hashedPassword,
        });

        console.log(`👤 Admin created (username: malikganteng, password: M@likS!21)`);

        // Create sample content
        await Project.create(sampleProject);
        await Skill.create(sampleSkill);
        await Experience.create(sampleExperience);
        await Blog.create(sampleBlog);
        await Achievement.create(sampleAchievement);
        await Education.create(sampleEducation);

        console.log('✅ Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

// ==================== DESTROY DATA ====================

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Project.deleteMany();
        await Skill.deleteMany();
        await Experience.deleteMany();
        await Blog.deleteMany();
        await Achievement.deleteMany();
        await Education.deleteMany();

        console.log('🧨 Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

// ==================== RUN ====================
// Usage: node seeder.js        -> import data
//        node seeder.js -d     -> destroy data

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
