import { TestimonialShowcase } from '@/components/ui/hovertestimonial';
import { TextAnimate } from '@/components/ui/text-animate';

// Generate testimonials for early beta testers
const generateTestimonials = () => {
  const betaTesters = [
    {
      name: 'Priya Singh',
      title: 'Developer',
      quote: 'This civic reporting system has revolutionized how our community addresses local issues. The real-time tracking is incredible!',
      initials: 'PS'
    },
    {
      name: 'Rohita Singh',
      title: 'Journalist',
      quote: 'As a journalist covering civic issues, this platform helps me connect with real community problems instantly.',
      initials: 'RS'
    },
    {
      name: 'Priya Sharma',
      title: 'Social Worker',
      quote: 'Finally, a platform that bridges the gap between citizens and local authorities. The impact has been tremendous.',
      initials: 'PS'
    },
    {
      name: 'Anita Patel',
      title: 'Municipal Officer',
      quote: 'The transparency and efficiency this system brings to civic governance is exactly what we needed.',
      initials: 'AP'
    },
    {
      name: 'Kavya Reddy',
      title: 'Urban Planner',
      quote: 'The data insights from citizen reports help us make better infrastructure decisions for our city.',
      initials: 'KR'
    },
    {
      name: 'Vidya Kumar',
      title: 'Community Leader',
      quote: 'This platform has empowered our community to actively participate in solving local problems together.',
      initials: 'VK'
    },
    {
      name: 'Sneha Gupta',
      title: 'NGO Coordinator',
      quote: 'We can now track and address social issues more systematically. The collaborative features are outstanding.',
      initials: 'SG'
    },
    {
      name: 'Raj Malhotra',
      title: 'Tech Entrepreneur',
      quote: 'The user experience is intuitive and the technology stack is robust. Perfect for scaling civic engagement.',
      initials: 'RM'
    },
    {
      name: 'Meera Joshi',
      title: 'Environmental Activist',
      quote: 'Environmental issues in our area are now getting the attention they deserve through this platform.',
      initials: 'MJ'
    },
    {
      name: 'Aditya Verma',
      title: 'Software Engineer',
      quote: 'The technical implementation is solid and the real-time features make civic reporting actually engaging.',
      initials: 'AV'
    },
    {
      name: 'Riya Agarwal',
      title: 'Public Policy Analyst',
      quote: 'This system provides valuable data for policy decisions and helps track implementation effectiveness.',
      initials: 'RA'
    },
    {
      name: 'Karan Thakur',
      title: 'Local Councillor',
      quote: 'Direct communication with constituents has never been easier. This platform is a game-changer for governance.',
      initials: 'KT'
    },
    {
      name: 'Ishita Das',
      title: 'UI/UX Designer',
      quote: 'The interface design makes civic participation accessible to everyone, regardless of their technical skills.',
      initials: 'ID'
    },
    {
      name: 'Hema Bansal',
      title: 'Data Analyst',
      quote: 'The analytics dashboard provides deep insights into civic issues and resolution patterns across communities.',
      initials: 'HB'
    },
    {
      name: 'Tanmayi Shah',
      title: 'Student Leader',
      quote: 'Young people are finally engaged in civic issues thanks to this modern, accessible platform.',
      initials: 'TS'
    },
    {
      name: 'Suresh Choudhary',
      title: 'Retired Teacher',
      quote: 'This platform makes it easy for senior citizens like me to report issues and see real action from local authorities.',
      initials: 'SC'
    }
  ];
  
  const testimonials = betaTesters.map((tester, index) => ({
    id: `${index}`,
    quote: tester.quote,
    author: {
      name: tester.name,
      title: tester.title,
      initials: tester.initials,
      avatar: `https://api.dicebear.com/8.x/lorelei/svg?seed=${tester.name}`
    },
  }));
  
  return testimonials;
};

const testimonials = generateTestimonials();

export default function TestimonialDemo() {
  return (
    <div className="bg-gradient-to-br from-background via-muted/10 to-background py-12 px-4 sm:px-6 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <TextAnimate
            animation="blurInUp"
            by="word"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
            as="h1"
            once
          >
            Community Testimonials
          </TextAnimate>
          <TextAnimate
            animation="fadeIn"
            by="word"
            delay={0.2}
            className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto"
            as="p"
            once
          >
            Hear from our early adopters who helped shape this platform.
          </TextAnimate>
        </div>

        <div className="w-full">
          <TestimonialShowcase 
            testimonials={testimonials}
            defaultTestimonialId="1"
            autoPlayInterval={3500}
          />
        </div>
      </div>
    </div>
  );
}
