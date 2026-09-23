type GalleryItem = {
  id: string | number;
  before_image_url: string | null;
  after_image_url: string | null;
  title: string;
  category: string;
  description?: string | null;
};

type GalleryGridProps = {
  items: GalleryItem[];
};

export default function GalleryGrid({
  items,
}: GalleryGridProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
        >
          <div className="grid grid-cols-2">
            <div className="relative">
              {item.before_image_url ? (
                <img
                  src={item.before_image_url}
                  alt={`${item.title} - Antes`}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-gray-100 text-sm text-gray-500">
                  Sin imagen
                </div>
              )}

              <span className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-white">
                Antes
              </span>
            </div>

            <div className="relative">
              {item.after_image_url ? (
                <img
                  src={item.after_image_url}
                  alt={`${item.title} - Después`}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-gray-100 text-sm text-gray-500">
                  Sin imagen
                </div>
              )}

              <span className="absolute bottom-2 right-2 rounded-full bg-primary px-2 py-1 text-xs font-bold text-white">
                Después
              </span>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold text-primary">
                {item.title}
              </h3>

              <span className="text-xs font-medium capitalize text-muted">
                {item.category}
              </span>
            </div>

            {item.description && (
              <p className="mt-2 text-sm text-muted">
                {item.description}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}