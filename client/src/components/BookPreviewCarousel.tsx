import bookCover from "@assets/Cover_WIP_1764948752780.jpg";
import epubPreview from "@assets/EPUB_IMG-20250203-WA0002.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PREVIEW_IMAGES = [
  {
    src: bookCover,
    alt: "Book Cover - Un Andrés Más",
    label: "Portada",
  },
  {
    src: epubPreview,
    alt: "Ebook Preview - Un Andrés Más",
    label: "Vista interior",
  },
];

export function BookPreviewCarousel() {
  return (
    <div className="relative flex w-full max-w-xs flex-col items-center sm:max-w-sm">
      <Carousel
        className="w-full"
        data-testid="carousel-book-previews"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {PREVIEW_IMAGES.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted shadow-2xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    data-testid={`img-preview-${index}`}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex items-center justify-center gap-4">
          <CarouselPrevious className="static h-10 w-10 translate-y-0 rounded-full border border-border bg-background/90 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground" />
          <CarouselNext className="static h-10 w-10 translate-y-0 rounded-full border border-border bg-background/90 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground" />
        </div>
      </Carousel>
    </div>
  );
}
