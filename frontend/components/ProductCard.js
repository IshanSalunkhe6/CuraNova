import Link from "next/link";
import Image from "next/image";

export default function ProductCard({
  title,
  subtitle,
  description,
  href,
  tag = "",
  image,
}) {
  const isExternal = /^https?:\/\//i.test(href);
  const fallback =
    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop";
  const src = image || fallback;
  const alt = title ? `${title}${subtitle ? ` – ${subtitle}` : ""}` : "Tool";

  const Card = (
    <article className="h-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex flex-col">
      <div className="relative aspect-[16/9] md:aspect-[28/9] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
          priority={false}
        />
        {tag && (
          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium shadow">
            {tag}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold leading-tight">
          {title} {subtitle && <span className="text-gray-400">· {subtitle}</span>}
        </h3>

        <p className="mt-2 text-sm text-gray-600 line-clamp-1">
          {description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-purple-700">Open</span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-700 transition-all duration-300 hover:bg-purple-600 hover:text-white">
            →
          </span>
        </div>
      </div>
    </article>
  );

  // External links → open in new tab, Internal links → same tab
  return isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      {Card}
    </a>
  ) : (
    <Link href={href} className="block h-full">
      {Card}
    </Link>
  );
}
