import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import {
  Globe,
  ShieldCheck,
  Users,
  Leaf,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import md from "./assets/md.jpg";
import ContactSection from "./contact";
import clothes from "./assets/clothes.png";
import dates from "./assets/dates.png";
import granite from "./assets/granite.png";
import medicines from "./assets/medicines.png";
import rice from "./assets/rice.png";
import spices from "./assets/spices.png";
import turmeric from "./assets/turmeric.png";
import chilli from "./assets/chilli.png";

interface Product {
  name: string;
  description: string;
  additionalInfo: string;
  src: string;
}

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface GalleryImage {
  src: string;
  alt: string;
}

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const products: Product[] = [
    {
      name: "Medicine",
      description:
        "We offer a range of pharmaceutical products, adhering to the highest quality standards.",
      additionalInfo:
        "Our selection includes essential medicines that cater to various health needs.",
      src: medicines,
    },
    {
      name: "Granite",
      description:
        "Our premium granite products are sourced from the finest quarries.",
      additionalInfo:
        "Ideal for construction and home décor, our granite offers durability and aesthetic appeal.",
      src: granite,
    },
    {
      name: "Rice",
      description:
        "Yalama provides high-quality rice varieties, ensuring freshness and flavor.",
      additionalInfo:
        "Our rice is sourced from reputable suppliers, suitable for both local and international markets.",
      src: rice,
    },
    {
      name: "Turmeric",
      description:
        "Known for its health benefits, our turmeric is sourced from trusted farms.",
      additionalInfo:
        "Available in various forms, it is perfect for culinary and medicinal uses.",
      src: turmeric,
    },
    {
      name: "Clothes",
      description:
        "We trade in a wide variety of clothing, from traditional attire to modern fashion.",
      additionalInfo:
        "Our collection is curated to meet diverse tastes and preferences.",
      src: clothes,
    },
    {
      name: "Dates",
      description:
        "Our premium dates are harvested at the peak of ripeness, ensuring exceptional taste and quality.",
      additionalInfo:
        "Perfect for snacking or culinary use, they are a healthy choice.",
      src: dates,
    },
    {
      name: "Chillies",
      description:
        "We offer a range of chillies, both dried and fresh, known for their rich flavor and heat.",
      additionalInfo:
        "Our products are ideal for enhancing the taste of any dish.",
      src: chilli,
    },
    {
      name: "Spices",
      description:
        "Explore our extensive range of spices, sourced from around the world.",
      additionalInfo:
        "Our selection includes everything from common spices to exotic varieties, all ensuring the highest quality.",
      src: spices,
    },
  ];

  const featureItems: FeatureItem[] = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-[#2F5233] mb-4" />,
      title: "Quality Assurance",
      description: "We prioritize quality in every product we trade.",
    },
    {
      icon: <Users className="w-12 h-12 text-[#2F5233] mb-4" />,
      title: "Customer Focus",
      description: "Our clients are at the heart of what we do.",
    },
    {
      icon: <Globe className="w-12 h-12 text-[#2F5233] mb-4" />,
      title: "Global Reach",
      description: "We connect with suppliers and customers worldwide.",
    },
    {
      icon: <Leaf className="w-12 h-12 text-[#2F5233] mb-4" />,
      title: "Sustainability",
      description: "We are committed to ethical trading practices.",
    },
  ];

  const galleryImages: GalleryImage[] = [
    { src: img1, alt: "Gallery Image 1" },
    { src: img3, alt: "Gallery Image 2" },
    { src: img4, alt: "Gallery Image 3" },
    { src: img2, alt: "Gallery Image 4" },
    { src: img5, alt: "Gallery Image 5" },
  ];

  const GalleryCarousel: React.FC = () => {
    const [hovering, setHovering] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const { scrollX } = useScroll({ container: carouselRef });
    const scrollVelocity = useVelocity(scrollX);
    const smoothVelocity = useTransform(scrollVelocity, [0, 1000], [0, 5]);
    const skewVelocity = useTransform(smoothVelocity, [-5, 5], [-3, 3]);

    const [duplicatedImages, setDuplicatedImages] = useState<GalleryImage[]>(
      []
    );

    useEffect(() => {
      setDuplicatedImages([
        ...galleryImages,
        ...galleryImages,
        ...galleryImages,
      ]);
    }, []);

    useAnimationFrame((_, delta) => {
      if (!hovering && carouselRef.current) {
        let moveBy = delta * 0.15;
        let newX = x.get() - moveBy;

        if (newX <= -carouselRef.current.scrollWidth / 3) {
          newX += carouselRef.current.scrollWidth / 3;
        }

        x.set(newX);
      }
    });

    return (
      <motion.div
        ref={carouselRef}
        className="flex overflow-hidden cursor-grab active:cursor-grabbing"
        whileTap={{ cursor: "grabbing" }}
        onHoverStart={() => setHovering(true)}
        onHoverEnd={() => setHovering(false)}
      >
        <motion.div
          className="flex"
          style={{ x }}
          drag="x"
          dragConstraints={carouselRef}
        >
          {duplicatedImages.map((image, index) => (
            <motion.div
              key={index}
              className="min-w-[300px] h-[225px] p-2"
              style={{ skew: skewVelocity }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Montserrat',sans-serif]">
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#2F5233] tracking-tight">
            Yalama International
          </h1>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#home"
              className="text-gray-600 hover:text-[#2F5233] transition-colors text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-[#2F5233] transition-colors text-sm font-medium"
            >
              About Us
            </a>
            <a
              href="#products"
              className="text-gray-600 hover:text-[#2F5233] transition-colors text-sm font-medium"
            >
              Our Products
            </a>
            <a
              href="#gallery"
              className="text-gray-600 hover:text-[#2F5233] transition-colors text-sm font-medium"
            >
              Gallery
            </a>
            <a
              href="#why-us"
              className="text-gray-600 hover:text-[#2F5233] transition-colors text-sm font-medium"
            >
              Why Choose Us
            </a>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>

      {isMenuOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="md:hidden bg-white shadow-md fixed top-16 left-0 right-0 z-10"
        >
          <nav className="flex flex-col items-center py-4">
            <a
              href="#home"
              className="py-2 text-gray-600 hover:text-[#2F5233] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="py-2 text-gray-600 hover:text-[#2F5233] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="#products"
              className="py-2 text-gray-600 hover:text-[#2F5233] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Products
            </a>
            <a
              href="#gallery"
              className="py-2 text-gray-600 hover:text-[#2F5233] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </a>
            <a
              href="#why-us"
              className="py-2 text-gray-600 hover:text-[#2F5233] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Why Choose Us
            </a>
          </nav>
        </motion.div>
      )}

      <main className="pt-16">
        <section
          id="home"
          className="py-20 bg-gradient-to-r from-[#2F5233] to-[#1F3521] text-white"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Welcome to Yalama International General Trading
              </h2>
              <p className="text-xl mb-8 leading-relaxed">
                Your reliable partner in the global marketplace, specializing in
                medicines, granite, rice, turmeric, clothing, dates, chillies,
                and spices.
              </p>
              <Button asChild>
                <a
                  href="#products"
                  className="hover:bg-white hover:text-[#2F5233] bg-[#F5F8F5] transition-colors text-base font-semibold"
                >
                  Explore Our Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6 text-[#2F5233] leading-tight text-center">
                Who We Are
              </h2>
              <p className="text-sm font-semibold text-gray-500 mb-2 text-center">
                Since 2017
              </p>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-8">
                <div className="md:w-1/3">
                  <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-full border-4 border-[#2F5233]">
                    <img
                      src={md}
                      alt="Dr. Y. Achamamba"
                      className="w-full h-full object-cover"
                      style={{
                        transform: "scale(1.4)",
                        objectPosition: "50% -15%", // Adjusting to center the face
                      }}
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-[#2F5233] mb-2">
                    Dr. Y. Achamamba
                  </h3>
                  <p className="text-lg font-semibold mb-1">MBBS, MD NEURO</p>
                  <p className="text-md text-gray-900 mb-4">
                    Managing Director
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    With her extensive medical background and business acumen,
                    Dr. Achamamba leads Yalama International with a vision for
                    excellence and innovation in international trade.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Yalama International General Trading specializes in the
                    import and export of a diverse range of products. With years
                    of experience in the trading industry, we have built a
                    reputation for reliability and quality.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="products" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-[#2F5233] leading-tight">
              Our Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Card className="h-full flex flex-col overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.src}
                          alt={product.name}
                          className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow p-4">
                      <CardTitle className="mb-2 text-xl font-semibold">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {product.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-4">
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {product.additionalInfo}
                      </p>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pharmaceutical" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-[#2F5233] leading-tight">
              Pharmaceutical Products
            </h2>
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#2F5233]">
                    <TableHead className="text-white font-semibold text-sm">
                      HS Code
                    </TableHead>
                    <TableHead className="text-white font-semibold text-sm">
                      Product Category
                    </TableHead>
                    <TableHead className="text-white font-semibold text-sm">
                      Description
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-sm">
                      HS 300490
                    </TableCell>
                    <TableCell className="text-sm">
                      General Medicaments
                    </TableCell>
                    <TableCell className="text-sm">
                      Covers pharmaceutical products with mixed or unmixed
                      formulations intended for therapeutic or prophylactic use
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-sm">
                      HS 300215
                    </TableCell>
                    <TableCell className="text-sm">
                      Immunological Products
                    </TableCell>
                    <TableCell className="text-sm">
                      Includes vaccines, toxins, cell cultures and related
                      immunological preparations
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-sm">
                      HS 300420
                    </TableCell>
                    <TableCell className="text-sm">
                      Antibiotic Products
                    </TableCell>
                    <TableCell className="text-sm">
                      Medicaments containing antibiotics for treating bacterial
                      infections
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-sm">
                      HS 300439
                    </TableCell>
                    <TableCell className="text-sm">
                      Hormonal Preparations
                    </TableCell>
                    <TableCell className="text-sm">
                      Pharmaceutical products containing hormones or steroids
                      but not containing antibiotics
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-sm">
                      HS 300431
                    </TableCell>
                    <TableCell className="text-sm">Insulin Products</TableCell>
                    <TableCell className="text-sm">
                      Medicaments containing insulin for diabetes treatment
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>

        <section id="gallery" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-[#2F5233] leading-tight">
              Our Gallery
            </h2>
            <GalleryCarousel />
          </div>
        </section>

        <section id="why-us" className="py-20 bg-[#F5F8F5]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-[#2F5233] leading-tight">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <Card className="h-full flex flex-col items-center text-center">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col items-center">
                        {item.icon}
                        <CardTitle className="mt-4 text-xl font-semibold">
                          {item.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ContactSection />

      <footer className="bg-[#2F5233] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Yalama International
              </h3>
              <p className="text-gray-300 text-sm">
                Your trusted partner in global trade.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Our Products
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#why-us"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Why Choose Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300 text-sm">
                YALAMA INTERNATIONAL GENERAL TRADING D.W.C., L.L.C
              </p>
              <p className="text-gray-300 text-sm">
                Dubai World Central Block C, Emirates Road,
              </p>
              <p className="text-gray-300 text-sm">
                Jabel Ali, Dubai, United Arab Emirates
              </p>
              <p className="text-gray-300 text-sm">P.O.Box 28228</p>
              <p className="text-gray-300 text-sm">+971 545665189</p>
              <p className="text-gray-300 text-sm">+971 503895768</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-600 text-center">
            <p className="text-gray-300 text-sm">
              &copy; 2024 Yalama International General Trading. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
