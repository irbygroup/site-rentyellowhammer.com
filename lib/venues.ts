import {
  courtyardGalleryImages,
  oakFountainGalleryImages,
  hallettIrbyGalleryImages,
} from "./gallery-data";

export interface Venue {
  name: string;
  slug: string;
  gallerySlug: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  virtualTourUrl: string;
  googleCalendarUrl: string;
  tagline: string;
  description: string[];
  shortDescription: string;
  logoSrc: string;
  heroImageSrc: string;
  collageImageSrc: string;
  testimonials: { name: string; quote: string }[];
  services: { title: string; description: string }[];
  tabs: { title: string; content: string }[];
  galleryImages: { src: string; alt: string; width: number; height: number }[];
  floorPlanSrc?: string;
  floorPlanImages?: string[];
}

export const PHONE_NUMBER = "251-333-7368";
export const PHONE_DISPLAY = "251-333-RENT";
export const EMAIL = "info@rentyellowhammer.com";
export const COMPANY_NAME = "Yellowhammer Hospitality";

export const venues: Venue[] = [
  {
    name: "The Courtyard on Dauphin",
    slug: "courtyard-on-dauphin",
    gallerySlug: "courtyard-on-dauphin-gallery",
    address: "751 Dauphin St.",
    city: "Mobile, AL 36602",
    phone: PHONE_NUMBER,
    email: EMAIL,
    virtualTourUrl:
      "https://re.deepsouthfocus.com/h/67324E537F2B43669E8DA00FFBE7D664",
    googleCalendarUrl: "",
    tagline: "An experience tailored for you.",
    shortDescription:
      "Located in downtown Mobile, AL, The Courtyard on Dauphin is an exquisite event venue near the vibrant entertainment district. It offers a charming and sophisticated setting for weddings, receptions, banquets, and special events, with dedicated off-street parking.",
    description: [
      "Picture a stress-free event planning experience where you don't have to worry about the nitty-gritty details like scheduling, parking, or service. By hiring an event venue like The Courtyard on Dauphin, you can leave the logistics to the professionals and focus on enjoying your event.",
      "A top-notch venue will collaborate with you to understand your vision for the event and ensure that everything runs smoothly. Additionally, we work with a number of local bakeries, caterers and florists that we highly recommend for various price points, allowing you to fully immerse yourself in the festivities without any added stress.",
    ],
    logoSrc: "/images/logos/Courtyard-on-Dauphin_logo-01.jpg",
    heroImageSrc: "/images/courtyard/cyd-gate-03A.png",
    collageImageSrc: "/images/misc/explore-options-collage-01-min.png",
    testimonials: [
      {
        name: "Recent Client",
        quote:
          "The Courtyard on Dauphin was the perfect venue for our wedding. The staff was incredible and made sure everything was perfect.",
      },
      {
        name: "Corporate Client",
        quote:
          "We hosted our annual company retreat at The Courtyard and it exceeded all of our expectations. The space is versatile and elegant.",
      },
    ],
    services: [
      {
        title: "Weddings",
        description:
          "You can use the same venue for both the ceremony and reception, which is convenient for those who prefer to have everything in one location. Our staff can even adjust the layout to prepare for the reception festivities after the ceremony.",
      },
      {
        title: "Corporate Events",
        description:
          "Corporate events hosted at a venue provide a professional and polished atmosphere for businesses to showcase their brand and impress clients. With a variety of space options and amenities available, we can accommodate everything from small meetings to client dinners.",
      },
      {
        title: "Office Space",
        description:
          "Gone are the days of renting a traditional office space for freelance work! Renting a space within the working offices of The Courtyard on Dauphin offers a range of amenities, including high-speed internet, meeting rooms, and kitchen areas.",
      },
    ],
    tabs: [
      {
        title: "Description",
        content:
          "Picture a stress-free event planning experience where you don't have to worry about the nitty-gritty details like scheduling, parking, or service. By hiring an event venue like The Courtyard on Dauphin, you can leave the logistics to the professionals and focus on enjoying your event. A top-notch venue will collaborate with you to understand your vision for the event and ensure that everything runs smoothly.",
      },
      {
        title: "Packages & Pricing",
        content:
          "The Courtyard on Dauphin is available to rent as a full or partial facility. A full day rental is 12 hours and includes on-site parking and a warming kitchen available for your convenience. Some of the events we have been known to host include weddings, receptions, banquets, corporate events, birthday parties, baby showers, and more. Call us for pricing details.",
      },
      {
        title: "Co-Working Space",
        content:
          "The Courtyard on Dauphin offers co-working space with high-speed internet, meeting rooms, and kitchen areas. Contact us for availability and pricing.",
      },
    ],
    galleryImages: courtyardGalleryImages,
    floorPlanSrc: "/images/courtyard/01-Floor-Plan-751-Dauphin-St.jpg",
  },
  {
    name: "Oak & Fountain",
    slug: "oak-and-fountain",
    gallerySlug: "oak-and-fountain-gallery",
    address: "12250 Hi Fields Road",
    city: "Grand Bay, AL 36541",
    phone: PHONE_NUMBER,
    email: EMAIL,
    virtualTourUrl:
      "https://re.deepsouthfocus.com/h/7BA8775574E7452EBAA973D073AD7EB6",
    googleCalendarUrl: "",
    tagline: "Let Us Help You Book an Unforgettable Experience!",
    shortDescription:
      "Oak and Fountain is a stunning property located in the peaceful countryside, away from the hustle and bustle of city life. This beautiful venue offers a serene and picturesque backdrop for weddings, corporate events, family reunions and other special occasions.",
    description: [
      "A peaceful and serene countryside location can offer a sense of tranquility and relaxation that is hard to find in more urban areas. This type of setting can be particularly appealing for those looking to escape the hustle and bustle of city life and enjoy some time in nature. That's just a small part of what makes Oak & Fountain your perfect destination space.",
      "In addition to the rustic and elegant surroundings, this countryside venue can also offer a range of amenities and activities that are perfect for large or small gatherings. From outdoor grilling and patio spaces to biking trails and scenic views, there are plenty of ways to keep your guests entertained and engaged throughout your stay. Our comfortable and modern rooms are fully equipped with all the amenities needed to help you relax and enjoy your event.",
    ],
    logoSrc: "/images/logos/Oak-Fountain_logo-01.jpg",
    heroImageSrc: "/images/oak-fountain/DSC05924-1-e1707524447102.png",
    collageImageSrc: "/images/misc/collage-of-01.jpg",
    testimonials: [
      {
        name: "Wedding Guest",
        quote:
          "Oak & Fountain provided the most beautiful backdrop for our friend's wedding. The property is stunning and the staff was so accommodating.",
      },
      {
        name: "Retreat Organizer",
        quote:
          "We hosted a corporate retreat at Oak & Fountain and it was exactly what we needed. The peaceful setting helped our team recharge and reconnect.",
      },
    ],
    services: [
      {
        title: "Weddings",
        description:
          "Renting an all-in-one space for your wedding ceremony and reception can be a convenient and cost-effective option. With everything in one location, you and your guests can enjoy a seamless and stress-free celebration. Oak & Fountain has the added benefit of 19 on-site rental suites to keep your guests comfortable.",
      },
      {
        title: "Corporate Events",
        description:
          "Renting a space for corporate retreats or events can be a great way to bring your team together and foster collaboration and creativity. With the right venue and amenities, you can create an environment that is conducive to learning, growth, and innovation.",
      },
      {
        title: "Reunions & Retreats",
        description:
          "Renting a space for family or class reunions can be a great way to gather your guests together for a special event and create lasting memories. Staying together in the same place can also provide a sense of togetherness and closeness that is hard to achieve in separate hotel rooms.",
      },
    ],
    tabs: [
      {
        title: "Description",
        content:
          "Oak and Fountain is a stunning property located in the peaceful countryside, away from the hustle and bustle of city life. This beautiful venue offers a serene and picturesque backdrop for weddings, corporate events, and other special occasions. With its sprawling oak trees, lush greenery, and charming fountain, Oak and Fountain creates an ambiance that is both rustic and elegant. There are multiple rental packages available for your budget and specific needs, as well as 19 on-site air conditioned rental suites.",
      },
      {
        title: "Packages & Pricing",
        content:
          "Oak & Fountain offers multiple rental packages to fit your budget and specific needs. Our property includes 19 on-site air conditioned rental suites, outdoor event space, and indoor gathering areas. Contact us for detailed pricing information.",
      },
      {
        title: "Rental Suites",
        content:
          "Oak & Fountain features 19 on-site rental suites that are perfect for keeping your wedding guests, retreat attendees, or reunion members comfortable and close by. Each suite is fully furnished with modern amenities.",
      },
    ],
    galleryImages: oakFountainGalleryImages,
    floorPlanSrc: "/images/oak-fountain/01-Floor-Plans-12250-Hi-Fields-Rd.jpg",
  },
  {
    name: "The Hallett-Irby House",
    slug: "hallet-irby-house",
    gallerySlug: "hallet-irby-house-gallery",
    address: "503 Government Street",
    city: "Mobile, AL 36602",
    phone: PHONE_NUMBER,
    email: EMAIL,
    virtualTourUrl:
      "https://re.deepsouthfocus.com/h/442F96DA3EA743ABBC5219332008CD34",
    googleCalendarUrl: "",
    tagline: "Let Us Help You Book an Unforgettable Experience!",
    shortDescription:
      "Built in 1859, The Hallett-Irby House is an historic property located on Government Street in Mobile, Alabama. It sits on the parade route across from Barton Academy and features a fenced courtyard, balcony, and one of the few remaining carriage houses in the area.",
    description: [
      "Hosting a wedding, reception or small group gathering at The Hallett-Irby House in Mobile, AL can be a great way to get together with friends and family without having to travel too far. With Mobile's vibrant cultural scene and excellent restaurants, there's plenty of fun to be had while catching up with loved ones.",
      "The Hallett-Irby House is a historic property located on Government Street in Mobile, Alabama. It sits on the parade route and features a fenced yard and courtyard, a balcony, and one of the few remaining carriage houses in the area. With plenty of room to accommodate an intimate gathering of friends or family in a venue that feels like home, The Hallett-Irby House has something to offer for everyone.",
    ],
    logoSrc: "/images/logos/Hallet-Irby_logo-01-min.png",
    heroImageSrc: "/images/hallett-irby/HI-Exterior-Front.png",
    collageImageSrc: "/images/courtyard/collage-courtyardHALLETT-01.jpg",
    testimonials: [
      {
        name: "Wedding Client",
        quote:
          "The Hallett-Irby House was the perfect setting for our intimate wedding. The historic charm and beautiful courtyard made for unforgettable photos.",
      },
      {
        name: "Event Host",
        quote:
          "We hosted a family reunion at the Hallett-Irby House and everyone loved it. The carriage house was a huge hit with our guests.",
      },
    ],
    services: [
      {
        title: "Weddings",
        description:
          "You can use the same venue for both the ceremony and reception, which is convenient for those who prefer to have everything in one location. This location also serves as an excellent space for several guests, along with the bride and groom to make themselves comfortable within the space.",
      },
      {
        title: "Social Events",
        description:
          "Location, location, location! Situated across from the historic Barton Academy, the Hallett-Irby House is a stately home that is steeped in history. If you're looking for a unique and elegant venue for your next event in Mobile, the Hallett House is definitely worth considering for just about any occasion.",
      },
      {
        title: "Small Group Gatherings",
        description:
          "Gone are the days of cramming out-of-town visitors into your home for extended visits. The Hallett-Irby House, located on Government Street, boasts several rooms, plus a carriage house with additional overnight accommodations nearly completely shaded with beautiful, centuries-old oak trees, making it a picturesque space to host your guests.",
      },
    ],
    tabs: [
      {
        title: "Description",
        content:
          "At the Hallett-Irby House there's so much to discover: the heart of Mobile right outside our door and delights to experience right here, just for the day or a longer getaway. Gather with friends and family and meet fellow travelers along the way when you rent the space as individual B&B lodging. Or rent the entire space (carriage house included!) when planning for a wedding or other special occasion. The choice is yours - discover how you can make the Hallett-Irby House part of your memorable Mobile experience!",
      },
      {
        title: "Packages & Pricing",
        content:
          "This venue is great for hosting guests or renting for yourself or a group of friends and family to have time to reconnect in one space! Call us for more information on packages and pricing.",
      },
      {
        title: "About The Space",
        content:
          "The Hallett-Irby House is a historic property built in 1859, located on Government Street in Mobile, Alabama. It features a fenced courtyard, balcony, carriage house, and is situated across from the historic Barton Academy on the parade route.",
      },
    ],
    galleryImages: hallettIrbyGalleryImages,
    floorPlanSrc: "/images/hallett-irby/41-Hallett-Irby-Main-House-Floor-Plans-All-Floors.jpg",
    floorPlanImages: [
      "/images/hallett-irby/41-Hallett-Irby-Main-House-Floor-Plans-All-Floors.jpg",
      "/images/hallett-irby/44-Hallett-Irby-Carriage-House-Floor-Plans-All-Floors.jpg",
    ],
  },
];

export function getVenueBySlug(slug: string): Venue | undefined {
  return venues.find((v) => v.slug === slug);
}

export function getVenueByGallerySlug(gallerySlug: string): Venue | undefined {
  return venues.find((v) => v.gallerySlug === gallerySlug);
}

export interface TeamMember {
  name: string;
  title: string;
  description: string;
  imageSrc: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Megan Dearing",
    title: "Event Coordinator",
    description:
      "Megan brings creativity and meticulous attention to detail to every event she coordinates, ensuring each celebration is uniquely tailored to our clients' vision.",
    imageSrc: "/images/team/event-coordinator.jpg",
  },
  {
    name: "Kristen Irby",
    title: "Event Manager",
    description:
      "Kristen oversees the seamless execution of events across all our venues, bringing years of hospitality experience and a passion for creating memorable experiences.",
    imageSrc: "/images/team/team-member-2.jpg",
  },
  {
    name: "Jared Irby",
    title: "Owner, CEO",
    description:
      "Jared founded Yellowhammer Hospitality with a vision to create distinctive event spaces that showcase the best of Southern hospitality in Mobile, Alabama.",
    imageSrc: "/images/team/team-member-3-2.jpg",
  },
];

export const companyHistory =
  "Yellowhammer Hospitality encompasses a family of distinctive and unique event and overnight accommodations in one of the oldest cities in America. We have 2 properties located in Downtown Mobile that serve as both event venues and short term rental spaces and one in Grand Bay, Alabama, away from the hustle and bustle of city life. No matter the size of your event we have a space that will work with you. Our collection represents sophisticated and gracious hospitality, a philosophy that reflects elegance in design, innovation in hospitality, and a sincere, welcoming service across all properties.";

export const companyAbout =
  "At Yellowhammer Hospitality, we help manage your big ideas and your smallest concerns to ensure you are enjoying every moment. For more than a decade, we've been working with clients to create exceptional experiences for their professional or social gatherings. As a boutique company, we're driven by a genuine excitement for what we do and a love of collaboration with our clients. It's our goal to leave you and your guests with an event that exceeds expectations and lasts in your memories long after the last toast.";
