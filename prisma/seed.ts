import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  {
    name: "Indian Institute of Technology, Delhi",
    location: "New Delhi, Delhi",
    fees: 850000,
    rating: 4.8,
    overview:
      "One of India's premier engineering institutions, known for rigorous academics, strong research output, and a highly competitive admission process. Offers a wide range of undergraduate and postgraduate programs across engineering and applied sciences.",
    courses: ["Computer Science Engineering", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"],
    avgPackage: 2100000,
    highestPackage: 12000000,
    placementRate: 95.5,
    topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Amazon"],
    reviews: [
      { content: "Incredible peer group and faculty. Workload is intense but worth it.", rating: 5 },
      { content: "Placement support is excellent, especially for CS.", rating: 5 },
    ],
  },
  {
    name: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    fees: 450000,
    rating: 4.2,
    overview:
      "A large private university known for its flexible credit system, diverse student body, and strong industry partnerships. Offers extensive elective choices across engineering disciplines.",
    courses: ["Computer Science Engineering", "Information Technology", "Electronics Engineering", "Biotechnology"],
    avgPackage: 750000,
    highestPackage: 4400000,
    placementRate: 85.0,
    topRecruiters: ["TCS", "Infosys", "Cognizant", "Amazon"],
    reviews: [
      { content: "Great campus life and lots of clubs, but core branches get less attention.", rating: 4 },
      { content: "Placement cell is proactive, decent package range for CS/IT.", rating: 4 },
    ],
  },
  {
    name: "Birla Institute of Technology and Science, Pilani",
    location: "Pilani, Rajasthan",
    fees: 520000,
    rating: 4.6,
    overview:
      "Known for its no-attendance-mandatory policy and strong emphasis on self-driven learning. Offers a unique dual-degree and practice-school internship system integrated into the curriculum.",
    courses: ["Computer Science", "Electrical & Electronics", "Chemical Engineering", "Economics"],
    avgPackage: 1650000,
    highestPackage: 6500000,
    placementRate: 92.0,
    topRecruiters: ["Microsoft", "Adobe", "Qualcomm", "ITC"],
    reviews: [
      { content: "Practice school internships are genuinely valuable for real-world exposure.", rating: 5 },
    ],
  },
  {
    name: "Delhi Technological University",
    location: "New Delhi, Delhi",
    fees: 180000,
    rating: 4.3,
    overview:
      "A well-regarded state technical university offering strong engineering programs at a fraction of private college fees. Growing reputation in software and core engineering placements.",
    courses: ["Computer Science Engineering", "Software Engineering", "Mechanical Engineering", "Production Engineering"],
    avgPackage: 1100000,
    highestPackage: 5800000,
    placementRate: 88.0,
    topRecruiters: ["Samsung", "American Express", "Deloitte", "Wipro"],
    reviews: [
      { content: "Best value for money engineering education in Delhi.", rating: 5 },
      { content: "Infrastructure could be better but academics are solid.", rating: 3 },
    ],
  },
  {
    name: "Manipal Institute of Technology",
    location: "Manipal, Karnataka",
    fees: 480000,
    rating: 4.0,
    overview:
      "Part of Manipal Academy of Higher Education, known for its residential campus experience, international student diversity, and strong alumni network across tech industries.",
    courses: ["Computer Science Engineering", "Information Technology", "Aeronautical Engineering", "Biomedical Engineering"],
    avgPackage: 700000,
    highestPackage: 3600000,
    placementRate: 80.0,
    topRecruiters: ["Accenture", "IBM", "Capgemini", "Bosch"],
    reviews: [{ content: "Campus life is fantastic, very international vibe.", rating: 4 }],
  },
  {
    name: "SRM Institute of Science and Technology",
    location: "Chennai, Tamil Nadu",
    fees: 400000,
    rating: 3.8,
    overview:
      "A large private deemed university with a broad range of engineering, management, and health science programs, and significant investment in modern campus infrastructure.",
    courses: ["Computer Science Engineering", "Information Technology", "Data Science", "Mechatronics"],
    avgPackage: 550000,
    highestPackage: 2800000,
    placementRate: 75.0,
    topRecruiters: ["TCS", "Zoho", "HCL", "L&T"],
    reviews: [
      { content: "Good for those who want a wide elective choice, placement varies a lot by branch.", rating: 3 },
    ],
  },
  {
    name: "National Institute of Technology, Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    fees: 250000,
    rating: 4.5,
    overview:
      "One of the top NITs in the country, with strong core engineering departments and a reputation for producing solid engineers with hands-on technical training.",
    courses: ["Computer Science Engineering", "Electronics & Communication", "Mechanical Engineering", "Chemical Engineering"],
    avgPackage: 1350000,
    highestPackage: 5000000,
    placementRate: 90.0,
    topRecruiters: ["Intel", "Texas Instruments", "Flipkart", "Cisco"],
    reviews: [{ content: "Faculty in core branches is genuinely excellent.", rating: 5 }],
  },
  {
    name: "Amity University",
    location: "Noida, Uttar Pradesh",
    fees: 380000,
    rating: 3.6,
    overview:
      "A private university with a wide array of programs beyond engineering, including business, law, and design. Known for a large, modern campus and extensive extracurricular offerings.",
    courses: ["Computer Science Engineering", "Business Administration", "Design", "Biotechnology"],
    avgPackage: 480000,
    highestPackage: 2200000,
    placementRate: 68.0,
    topRecruiters: ["Genpact", "HCL", "Wipro", "Byju's"],
    reviews: [
      { content: "Facilities are impressive but academic rigor is inconsistent across departments.", rating: 3 },
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  for (const college of colleges) {
    const { reviews, ...collegeData } = college;

    await prisma.college.create({
      data: {
        ...collegeData,
        reviews: {
          create: reviews,
        },
      },
    });
  }

  console.log(`Seeded ${colleges.length} colleges.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
