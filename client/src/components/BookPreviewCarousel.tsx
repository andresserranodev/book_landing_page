import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import bookCover from "@assets/Cover_WIP_1764948752780.jpg";
import epubPreview from "@assets/EPUB_IMG-20250203-WA0002.jpg";

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
    <div className="relative w-full max-w-xs sm:max-w-sm flex flex-col items-center">
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
                <div className="relative overflow-hidden rounded-lg shadow-2xl bg-muted aspect-[2/3]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    data-testid={`img-preview-${index}`}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-4 mt-6">
          <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-full border border-border bg-background/90 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground" />
          <CarouselNext className="static translate-y-0 h-10 w-10 rounded-full border border-border bg-background/90 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground" />
        </div>
      </Carousel>
    </div>
  );
}
