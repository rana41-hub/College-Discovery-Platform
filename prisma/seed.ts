import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  {
    name: "Indian Institute of Technology, Delhi",
    location: "New Delhi, Delhi",
    rating: 4.8,
    overview: "One of India's premier engineering institutions, known for rigorous academics, strong research output, and a highly competitive admission process.",
    avgPackage: 2100000, highestPackage: 12000000, placementRate: 95.5,
    topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Amazon"],
    courses: [
      { name: "B.Tech Computer Science Engineering", fees: 850000, duration: "4 years" },
      { name: "B.Tech Electrical Engineering", fees: 820000, duration: "4 years" },
      { name: "B.Tech Mechanical Engineering", fees: 800000, duration: "4 years" },
      { name: "M.Tech Computer Science", fees: 250000, duration: "2 years" },
    ],
    reviews: [
      { content: "Incredible peer group and faculty. Workload is intense but worth it.", rating: 5 },
      { content: "Placement support is excellent, especially for CS.", rating: 5 },
    ],
  },
  {
    name: "Indian Institute of Technology, Bombay",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    overview: "Widely regarded as India's top engineering institute, with strong industry ties, a thriving startup culture, and world-class research facilities.",
    avgPackage: 2400000, highestPackage: 18000000, placementRate: 96.0,
    topRecruiters: ["Google", "Apple", "McKinsey", "Amazon"],
    courses: [
      { name: "B.Tech Computer Science Engineering", fees: 900000, duration: "4 years" },
      { name: "B.Tech Aerospace Engineering", fees: 870000, duration: "4 years" },
      { name: "MBA (SJMSOM)", fees: 1200000, duration: "2 years" },
    ],
    reviews: [{ content: "Best campus culture in the country, hard to get in but worth every bit.", rating: 5 }],
  },
  {
    name: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    rating: 4.2,
    overview: "A large private university known for its flexible credit system, diverse student body, and strong industry partnerships.",
    avgPackage: 750000, highestPackage: 4400000, placementRate: 85.0,
    topRecruiters: ["TCS", "Infosys", "Cognizant", "Amazon"],
    courses: [
      { name: "B.Tech Computer Science Engineering", fees: 450000, duration: "4 years" },
      { name: "B.Tech Information Technology", fees: 420000, duration: "4 years" },
      { name: "B.Tech Biotechnology", fees: 380000, duration: "4 years" },
    ],
    reviews: [
      { content: "Great campus life and lots of clubs, but core branches get less attention.", rating: 4 },
      { content: "Placement cell is proactive, decent package range for CS/IT.", rating: 4 },
    ],
  },
  {
    name: "Birla Institute of Technology and Science, Pilani",
    location: "Pilani, Rajasthan",
    rating: 4.6,
    overview: "Known for its no-attendance-mandatory policy and strong emphasis on self-driven learning, with a unique practice-school internship system.",
    avgPackage: 1650000, highestPackage: 6500000, placementRate: 92.0,
    topRecruiters: ["Microsoft", "Adobe", "Qualcomm", "ITC"],
    courses: [
      { name: "B.E. Computer Science", fees: 520000, duration: "4 years" },
      { name: "B.E. Electrical & Electronics", fees: 500000, duration: "4 years" },
      { name: "M.Sc. Economics", fees: 380000, duration: "4 years" },
    ],
    reviews: [{ content: "Practice school internships are genuinely valuable for real-world exposure.", rating: 5 }],
  },
  {
    name: "Delhi Technological University",
    location: "New Delhi, Delhi",
    rating: 4.3,
    overview: "A well-regarded state technical university offering strong engineering programs at a fraction of private college fees.",
    avgPackage: 1100000, highestPackage: 5800000, placementRate: 88.0,
    topRecruiters: ["Samsung", "American Express", "Deloitte", "Wipro"],
    courses: [
      { name: "B.Tech Computer Science Engineering", fees: 180000, duration: "4 years" },
      { name: "B.Tech Software Engineering", fees: 175000, duration: "4 years" },
      { name: "B.Tech Production Engineering", fees: 160000, duration: "4 years" },
    ],
    reviews: [
      { content: "Best value for money engineering education in Delhi.", rating: 5 },
      { content: "Infrastructure could be better but academics are solid.", rating: 3 },
    ],
  },
  {
    name: "Manipal Institute of Technology",
    location: "Manipal, Karnataka",
    rating: 4.0,
    overview: "Part of Manipal Academy of Higher Education, known for its residential campus experience and strong alumni network across tech industries.",
    avgPackage: 700000, highestPackage: 3600000, placementRate: 80.0,
    topRecruiters: ["Accenture", "IBM", "Capgemini", "Bosch"],
    courses: [
      { name: "B.Tech Computer Science Engineering", fees: 480000, duration: "4 years" },
      { name: "B.Tech Aeronautical Engineering", fees: 460000, duration: "4 years" },
      { name: "B.Tech Biomedical Engineering", fees: 440000, duration: "4 years" },
    ],
    reviews: [{ content: "Campus life is fantastic, very international vibe.", rating: 4 }],
  },
  {
    name: "SRM Institute of Science and Technology",
    location: "Chennai, Tamil Nadu",
    rating: 3.8,
    overview: "A large private deemed university with a broad range of engineering, management, and health science programs.",
    avgPackage: 550000, highestPackage: 2800000, placementRate: 75.0,
    topRecruiters: ["TCS", "Zoho", "HCL", "L&T"],
    courses: [
      { name: "B.Tech Computer Science Engineering", fees: 400000, duration: "4 years" },
      { name: "B.Tech Data Science", fees: 420000, duration: "4 years" },
      { name: "B.Tech Mechatronics", fees: 370000, duration: "4 years" },
    ],
    reviews: [{ content: "Good for those who want a wide elective choice, placement varies a lot by branch.", rating: 3 }],
  },
  {
    name: "National Institute of Technology, Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    rating: 4.5,
    overview: "One of the top NITs in the country, with strong core engineering departments and hands-on technical training.",
    avgPackage: 1350000, highestPackage: 5000000, placementRate: 90.0,
    topRecruiters: ["Intel", "Texas Instruments", "Flipkart", "Cisco"],
    courses: [
      { name: "B.Tech Computer Science Engineering", fees: 250000, duration: "4 years" },
      { name: "B.Tech Electronics & Communication", fees: 240000, duration: "4 years" },
      { name: "B.Tech Chemical Engineering", fees: 230000, duration: "4 years" },
    ],
    reviews: [{ content: "Faculty in core branches is genuinely excellent.", rating: 5 }],
  },
  {
    name: "Amity University",
    location: "Noida, Uttar Pradesh",
    rating: 3.6,
    overview: "A private university with a wide array of programs beyond engineering, including business, law, and design.",
    avgPackage: 480000, highestPackage: 2200000, placementRate: 68.0,
    topRecruiters: ["Genpact", "HCL", "Wipro", "Byju's"],
    courses: [
      { name: "B.Tech Computer Science Engineering", fees: 380000, duration: "4 years" },
      { name: "BBA", fees: 300000, duration: "3 years" },
      { name: "B.Des", fees: 350000, duration: "4 years" },
    ],
    reviews: [{ content: "Facilities are impressive but academic rigor is inconsistent across departments.", rating: 3 }],
  },
  {
    name: "IIIT Hyderabad",
    location: "Hyderabad, Telangana",
    rating: 4.7,
    overview: "A research-focused autonomous institute specializing in computer science and IT, known for a strong research culture and competitive admissions.",
    avgPackage: 2000000, highestPackage: 9500000, placementRate: 93.0,
    topRecruiters: ["Google", "Microsoft", "Sprinklr", "Adobe"],
    courses: [
      { name: "B.Tech Computer Science Engineering", fees: 400000, duration: "4 years" },
      { name: "B.Tech Electronics & Communication", fees: 380000, duration: "4 years" },
      { name: "Dual Degree CS (B.Tech + M.Tech)", fees: 420000, duration: "5 years" },
    ],
    reviews: [{ content: "Research opportunities from first year itself, very competitive environment.", rating: 5 }],
  },
  {
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    rating: 4.4,
    overview: "A public state university known for exceptionally low fees relative to teaching quality, with strong engineering and arts faculties.",
    avgPackage: 900000, highestPackage: 4200000, placementRate: 82.0,
    topRecruiters: ["TCS", "Cognizant", "ITC", "Tata Steel"],
    courses: [
      { name: "B.E. Computer Science Engineering", fees: 20000, duration: "4 years" },
      { name: "B.E. Electrical Engineering", fees: 18000, duration: "4 years" },
      { name: "B.Arch", fees: 25000, duration: "5 years" },
    ],
    reviews: [{ content: "Unbelievably low fees for the quality of education you get here.", rating: 5 }],
  },
  {
    name: "Anna University",
    location: "Chennai, Tamil Nadu",
    rating: 4.1,
    overview: "A major public technical university and affiliating body for engineering colleges across Tamil Nadu, with strong core-engineering placements.",
    avgPackage: 650000, highestPackage: 3200000, placementRate: 78.0,
    topRecruiters: ["Ashok Leyland", "TVS", "Infosys", "Wipro"],
    courses: [
      { name: "B.E. Computer Science Engineering", fees: 120000, duration: "4 years" },
      { name: "B.E. Mechanical Engineering", fees: 110000, duration: "4 years" },
      { name: "B.E. Civil Engineering", fees: 100000, duration: "4 years" },
    ],
    reviews: [{ content: "Solid core engineering fundamentals, less flashy but reliable.", rating: 4 }],
  },
  {
    name: "PSG College of Technology",
    location: "Coimbatore, Tamil Nadu",
    rating: 4.3,
    overview: "A well-established autonomous engineering college known for strong industry linkages and a long legacy in technical education.",
    avgPackage: 720000, highestPackage: 3000000, placementRate: 83.0,
    topRecruiters: ["TCS", "Bosch", "L&T", "Zoho"],
    courses: [
      { name: "B.E. Computer Science Engineering", fees: 250000, duration: "4 years" },
      { name: "B.E. Textile Technology", fees: 220000, duration: "4 years" },
      { name: "B.E. Production Engineering", fees: 230000, duration: "4 years" },
    ],
    reviews: [{ content: "Strong alumni network and good industry exposure through projects.", rating: 4 }],
  },
  {
    name: "Thapar Institute of Engineering and Technology",
    location: "Patiala, Punjab",
    rating: 4.2,
    overview: "A private deemed university with a strong reputation in North India, known for its engineering programs and campus infrastructure.",
    avgPackage: 850000, highestPackage: 3800000, placementRate: 84.0,
    topRecruiters: ["Adobe", "Samsung", "Infosys", "Nagarro"],
    courses: [
      { name: "B.E. Computer Science Engineering", fees: 420000, duration: "4 years" },
      { name: "B.E. Electronics & Communication", fees: 400000, duration: "4 years" },
      { name: "MBA", fees: 550000, duration: "2 years" },
    ],
    reviews: [{ content: "Good balance of academics and campus life, strong CS placements.", rating: 4 }],
  },
  {
    name: "KIIT University",
    location: "Bhubaneswar, Odisha",
    rating: 3.9,
    overview: "A large private deemed university with a sprawling campus and a broad mix of engineering, medical, and management programs.",
    avgPackage: 600000, highestPackage: 2600000, placementRate: 76.0,
    topRecruiters: ["TCS", "Infosys", "Deloitte", "Amazon"],
    courses: [
      { name: "B.Tech Computer Science Engineering", fees: 420000, duration: "4 years" },
      { name: "B.Tech Information Technology", fees: 400000, duration: "4 years" },
      { name: "BBA", fees: 280000, duration: "3 years" },
    ],
    reviews: [{ content: "Huge campus with a lot of student life, placements are decent for CS branch.", rating: 4 }],
  },
];

async function main() {
  console.log("Seeding database...");

  for (const college of colleges) {
    const { courses, reviews, ...collegeData } = college;
    const minFee = Math.min(...courses.map((c) => c.fees));

    await prisma.college.create({
      data: {
        ...collegeData,
        fees: minFee,
        courses: { create: courses },
        reviews: { create: reviews },
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
