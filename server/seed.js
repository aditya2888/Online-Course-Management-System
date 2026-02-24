import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from './models/course.js';
import User from './models/user.js';
import bcrypt from 'bcrypt';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/courseManagement";

const courses = [
    // Learn Anywhere -> Mobile
    { title: "Physics for Engineers", description: "Master the fundamental principles of physics with a mobile-first learning experience.", category: "Mobile", price: 3499, capacity: 100, status: "Active" },
    { title: "Computer Networks", description: "Learn how the internet works from the ground up, optimized for anywhere access.", category: "Mobile", price: 4299, capacity: 80, status: "Active" },
    { title: "Responsive Web Design", description: "Build stunning websites that work on any screen size. Learn CSS Grid and Flexbox.", category: "Mobile", price: 2999, capacity: 150, status: "Active" },
    { title: "Cloud Computing Basics", description: "Introduction to AWS, Azure, and Google Cloud for students on the go.", category: "Mobile", price: 4999, capacity: 120, status: "Active" },
    { title: "Data Science Fundamentals", description: "Start your data journey with Python and mobile-friendly notebooks.", category: "Mobile", price: 3999, capacity: 200, status: "Active" },

    // Expert Guidance -> Advanced
    { title: "Advanced AI & ML", description: "Deep dive into Neural Networks and Deep Learning with industry experts.", category: "Advanced", price: 14999, capacity: 50, status: "Active" },
    { title: "Quantum Computing", description: "Explore the future of computation with guided advanced theoretical sessions.", category: "Advanced", price: 21999, capacity: 30, status: "Active" },
    { title: "Microservices Architecture", description: "Design scalable systems using Docker, Kubernetes, and Go.", category: "Advanced", price: 9999, capacity: 60, status: "Active" },
    { title: "Advanced Algorithms", description: "Master complex data structures and algorithmic efficiency for competitive programming.", category: "Advanced", price: 8499, capacity: 40, status: "Active" },
    { title: "Strategic Cybersecurity", description: "Professional level ethical hacking and network security defense strategies.", category: "Advanced", price: 12499, capacity: 45, status: "Active" },

    // Career Growth -> Professional
    { title: "Project Management PMP", description: "Prepare for professional certification and lead successful enterprise project teams.", category: "Professional", price: 6499, capacity: 100, status: "Active" },
    { title: "Leadership & Corporate Soft Skills", description: "Develop the interpersonal skills required for executive management roles.", category: "Professional", price: 3499, capacity: 200, status: "Active" },
    { title: "Entrepreneurship Masterclass", description: "From ideation to scaling your startup with real-world case studies.", category: "Professional", price: 5499, capacity: 80, status: "Active" },
    { title: "Financial Literacy & Investment", description: "Learn to manage wealth and understand market dynamics for sustainable growth.", category: "Professional", price: 4499, capacity: 150, status: "Active" },
    { title: "Executive Resume Building", description: "Professional strategies to land your dream role in top-tier tech companies.", category: "Professional", price: 2499, capacity: 500, status: "Active" }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // 1. Create a set of diverse instructors
        const instructorData = [
            { name: "Dr. Elena Smith", email: "elena@course.com" },
            { name: "Prof. Rajesh Kumar", email: "rajesh@course.com" },
            { name: "Sarah Jenkins", email: "sarah@course.com" },
            { name: "Michael Chen", email: "michael@course.com" },
            { name: "Ananya Sharma", email: "ananya@course.com" }
        ];

        const instructors = [];
        for (const data of instructorData) {
            let inst = await User.findOne({ email: data.email });
            if (!inst) {
                const hashedPassword = await bcrypt.hash('password123', 10);
                inst = await User.create({
                    ...data,
                    password: hashedPassword,
                    role: "instructor"
                });
                console.log("Created instructor:", inst.email);
            }
            instructors.push(inst);
        }

        // 2. Clear existing sample courses to avoid duplicates with old prices
        await Course.deleteMany({ category: { $in: ["Mobile", "Advanced", "Professional"] } });

        // 3. Insert courses with diverse instructors
        const coursesWithInstructor = courses.map((course, index) => {
            // Rotate instructors for variety
            const instructor = instructors[index % instructors.length];
            return {
                ...course,
                instructor: instructor._id
            };
        });

        await Course.insertMany(coursesWithInstructor);
        console.log(`Successfully seeded ${courses.length} courses with diverse instructors!`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedDatabase();
