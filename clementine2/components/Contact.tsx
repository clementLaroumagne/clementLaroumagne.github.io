import data from '@/data/data.json';

export default function Contact() {
  const { email, phone, linkedin } = data.contact;

  return (
    <section
      id="contact"
      className="px-4 md:px-8 lg:px-16 bg-[var(--background)] flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Titre */}
        <h2 className="text-5xl md:text-6xl !mb-16 font-serif text-[var(--accent)] mb-16 text-center tracking-wide">
          Contact
        </h2>

        {/* Informations de contact */}
        <div className="flex flex-col gap-12 md:gap-16">
          {/* Email */}
          <div className="text-center">
            <p className="text-[var(--text-dark)] text-sm uppercase tracking-wider mb-4 font-light">
              Email
            </p>
            <a
              href={`mailto:${email}`}
              className="contact-link text-[var(--green)] text-lg md:text-xl font-light tracking-wide inline-block"
            >
              {email}
            </a>
          </div>

          {/* Téléphone */}
          <div className="text-center">
            <p className="text-[var(--text-dark)] text-sm uppercase tracking-wider mb-4 font-light">
              Téléphone
            </p>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="contact-link text-[var(--green)] text-lg md:text-xl font-light tracking-wide inline-block"
            >
              {phone}
            </a>
          </div>

          {/* LinkedIn */}
          <div className="text-center">
            <p className="text-[var(--text-dark)] text-sm uppercase tracking-wider mb-4 font-light">
              LinkedIn
            </p>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link text-[var(--green)] text-lg md:text-xl font-light tracking-wide inline-block"
            >
              Profil LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

