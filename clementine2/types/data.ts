export interface AboutSection {
  image: string;
  text: string;
}

export interface About {
  sections: AboutSection[];
}

export interface Production {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
  link: string;
  isDemoReel: boolean;
}

export interface Contact {
  email: string;
  phone: string;
  linkedin: string;
}

export interface PortfolioData {
  about: About;
  productions: Production[];
  contact: Contact;
}

