"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getRelatedPosts } from "@/lib/blog-data";
import { ArrowRight, ChevronRight } from "lucide-react";

const relatedPosts = getRelatedPosts("what-is-exif-data");

export function ArticleContent() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24"
    >
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm font-[Inter] text-[#71717A] mb-8 pt-8">
          <Link href="/" className="hover:text-[#EDEDEF] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-[#EDEDEF] transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#EDEDEF]">What Is EXIF Data</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF]">
              Image
            </span>
            <span className="text-[#71717A]">/</span>
            <time
              dateTime="2026-03-27"
              className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]"
            >
              Mar 27, 2026
            </time>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[Syne] font-bold text-[#EDEDEF] leading-tight mb-4">
            What Is EXIF Data and Why You Should Remove It
          </h1>
          <p className="text-lg text-[#71717A] font-[Inter] leading-relaxed">
            EXIF data stores camera settings, GPS location, and more in your
            photos. Learn what it contains and how to strip it for privacy.
          </p>
        </header>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none font-[Inter] text-[#B4B4B4] leading-relaxed space-y-6">
          <p>
            Every time you take a photo with a smartphone or digital camera, the
            device silently embeds a block of metadata into the image file. This
            metadata is called EXIF (Exchangeable Image File Format) data, and
            it contains a surprising amount of information — from camera
            settings to your precise GPS coordinates. Understanding what EXIF
            data is, when it is useful, and when it is a privacy risk will help
            you make informed decisions about the photos you share online.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            What EXIF Data Contains
          </h2>
          <p>
            EXIF data is stored as tagged fields within the image file itself
            (not as a separate file). A typical photo from a modern smartphone
            contains dozens of EXIF fields. Here are the most common categories:
          </p>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            Camera and Lens Information
          </h3>
          <p>
            The camera manufacturer and model (e.g., &quot;Apple iPhone 15
            Pro&quot; or &quot;Canon EOS R5&quot;), the lens used, focal length,
            aperture (f-stop), shutter speed, and ISO sensitivity. For
            photographers, this is valuable for learning from others&apos;
            techniques. For everyone else, it is mostly unnecessary data.
          </p>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            GPS Location
          </h3>
          <p>
            This is the most privacy-sensitive field. If location services are
            enabled for your camera app (which they are by default on most
            phones), every photo records exact latitude and longitude
            coordinates, accurate to within a few meters. A photo taken at your
            home contains your home address. A photo taken at your office
            reveals your workplace.
          </p>
          <p>
            GPS data also often includes altitude and the compass direction the
            camera was facing. This level of detail means someone could
            potentially identify not just the building, but which side of the
            building you were on.
          </p>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            Date and Time
          </h3>
          <p>
            EXIF stores the exact date and time the photo was taken, the date it
            was last modified, and the date the file was created. Some cameras
            also record the time zone. Together with GPS data, this creates a
            detailed record of where you were and when.
          </p>

          <h3 className="text-xl font-[Syne] font-semibold text-[#EDEDEF] mt-8 mb-3">
            Software and Editing History
          </h3>
          <p>
            If you edit a photo, many editing applications write their name and
            version into the EXIF data. Photoshop, Lightroom, Snapseed, and
            other editors all leave traces. This can reveal your editing
            workflow and software choices.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            The Privacy Risks of EXIF Data
          </h2>
          <p>
            The most concerning risk is location exposure. If you post a photo
            to a blog, forum, or website that does not strip EXIF data, anyone
            who downloads that image can extract the GPS coordinates and find
            the exact location on a map. Real-world cases have demonstrated this
            risk:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Journalists have had their locations compromised through EXIF data
              in photos posted online.
            </li>
            <li>
              Sellers on marketplace platforms have inadvertently revealed their
              home addresses through product photos.
            </li>
            <li>
              Travel photos posted on blogs have allowed stalkers to track
              someone&apos;s movement in real time.
            </li>
          </ul>
          <p>
            Beyond location, EXIF data reveals the device you use (useful for
            targeted phishing), your daily patterns (timestamps), and
            potentially sensitive details about your activities.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            How Social Media Platforms Handle EXIF
          </h2>
          <p>
            The major social media platforms strip EXIF data from photos when
            they are uploaded:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-[#EDEDEF]">Facebook & Instagram:</strong>{" "}
              Strip all EXIF data from the public image, but the platform reads
              and may store location data on their servers before removing it.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Twitter/X:</strong> Strips all
              EXIF data from uploaded photos.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">WhatsApp:</strong> Strips EXIF
              when sending photos as messages. Preserves EXIF when sending as
              documents.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">LinkedIn:</strong> Does not
              consistently strip all EXIF data — treat with caution.
            </li>
          </ul>
          <p>
            The important nuance: even when platforms strip EXIF from the
            public-facing image, many of them read and store the metadata
            internally. If privacy is your primary concern, strip EXIF data
            before uploading, do not rely on the platform to protect you.
          </p>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            When to Keep EXIF Data
          </h2>
          <p>
            EXIF data is not always harmful. There are legitimate reasons to
            preserve it:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-[#EDEDEF]">Photography archives:</strong>{" "}
              Camera settings help you learn and improve. Keeping aperture,
              shutter speed, and ISO for your personal library is valuable.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Photo organization:</strong>{" "}
              Date and location data powers automatic album organization in apps
              like Google Photos and Apple Photos.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">Legal evidence:</strong> EXIF
              data can serve as evidence of when and where a photo was taken,
              though it can be manipulated.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Professional workflows:
              </strong>{" "}
              Color space, white balance, and orientation data help editing
              software display images correctly.
            </li>
          </ul>

          {/* CTA Box */}
          <div className="my-12 relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF]/20 to-[#7C3AED]/20 rounded-xl" />
            <div className="relative bg-[#16131E] m-[1px] rounded-xl p-6 sm:p-8">
              <h3 className="text-xl font-[Syne] font-bold text-[#EDEDEF] mb-2">
                View and Remove EXIF Data
              </h3>
              <p className="text-[#71717A] font-[Inter] text-sm mb-4">
                Drop any photo to see all its EXIF metadata, then strip it with
                one click. Everything happens in your browser — your photos are
                never uploaded.
              </p>
              <Link
                href="/tools/exif-viewer"
                className="inline-flex items-center gap-2 bg-[#2DD4BF] text-[#0C0A12] font-[Inter] font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-[#5EEAD4] transition-colors"
              >
                Open EXIF Viewer & Remover
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mt-12 mb-4">
            How to Protect Yourself
          </h2>
          <p>The most effective approach is a two-step strategy:</p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong className="text-[#EDEDEF]">
                Disable GPS tagging on your camera app.
              </strong>{" "}
              On iPhone, go to Settings &gt; Privacy &gt; Location Services &gt;
              Camera and set to &quot;Never.&quot; On Android, open your camera
              app settings and toggle off location tagging. This prevents GPS
              data from being embedded in the first place.
            </li>
            <li>
              <strong className="text-[#EDEDEF]">
                Strip EXIF before sharing.
              </strong>{" "}
              Before posting photos to any platform, remove EXIF data using our{" "}
              <Link
                href="/tools/exif-viewer"
                className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#5EEAD4] transition-colors"
              >
                EXIF Viewer & Remover
              </Link>
              . This ensures no metadata is exposed, regardless of how the
              platform handles it.
            </li>
          </ol>
          <p>
            If you also want to optimize your images for web use after stripping
            EXIF data, our{" "}
            <Link
              href="/tools/image-compressor"
              className="text-[#2DD4BF] underline underline-offset-2 hover:text-[#5EEAD4] transition-colors"
            >
              Image Compressor
            </Link>{" "}
            can reduce file sizes while maintaining visual quality.
          </p>

          {/* FAQ Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Do screenshots have EXIF data?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  Screenshots contain minimal metadata — typically just the
                  date, time, and device/software information. They do not
                  contain GPS coordinates, camera settings, or lens information
                  since no physical camera was involved. However, the device
                  model and operating system version may still be present.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Does WhatsApp remove EXIF data?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  Yes, when you send a photo as a regular message in WhatsApp,
                  all EXIF data is stripped. However, if you send a photo as a
                  document (using the paperclip icon &gt; Document), the
                  original file with all EXIF data is preserved and sent as-is.
                  Telegram works similarly with its &quot;send as file&quot;
                  option.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Can EXIF data reveal my location?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  Yes. If your phone&apos;s camera has location services enabled
                  (the default on most devices), every photo records precise GPS
                  coordinates accurate to within a few meters. This is enough to
                  identify your home address, workplace, school, or any other
                  location where you take photos. Always strip EXIF data before
                  sharing photos publicly.
                </p>
              </div>
              <div className="border border-[#2A2535] rounded-xl p-6">
                <h3 className="text-base font-[Syne] font-semibold text-[#EDEDEF] mb-2">
                  Which platforms strip EXIF data automatically?
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter] leading-relaxed">
                  Facebook, Instagram, Twitter/X, and WhatsApp all strip EXIF
                  data from the publicly visible image. However, these platforms
                  may still read and store the metadata internally before
                  removing it. LinkedIn and many forums do not consistently
                  strip EXIF data. For maximum safety, remove EXIF yourself
                  before uploading.
                </p>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-[#16131E] border border-[#2A2535] rounded-xl p-5 hover:border-[#2DD4BF]/20 transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#2DD4BF]">
                    {post.category}
                  </span>
                  <h3 className="text-sm font-[Syne] font-semibold text-[#EDEDEF] mt-2 group-hover:text-[#2DD4BF] transition-colors">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.article>
  );
}
