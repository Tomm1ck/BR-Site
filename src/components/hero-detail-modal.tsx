"use client"


import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { memo } from "react"

interface HeroDetailModalProps {
  name: string
  years: string
  title: string
  description: string
  image: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const HeroDetailModal = memo(function HeroDetailModal({
  name,
  years,
  title,
  description,
  image,
  open,
  onOpenChange,
}: HeroDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0 overflow-hidden animate-zoom-in border-2 border-primary/20 shadow-2xl shadow-primary/20">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background hover:scale-110 transition-all duration-300 hover:rotate-90 shadow-lg"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-gradient-to-br from-muted via-muted/80 to-muted/60">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 animate-gradient-shift" />

          <div className="absolute top-4 left-4 bg-gradient-to-r from-primary via-primary/90 to-accent backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-2xl shadow-primary/50 animate-glow-pulse">
            {years}
          </div>
        </div>

        <ScrollArea className="max-h-[calc(90vh-24rem)] sm:max-h-[calc(90vh-20rem)]">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-3xl sm:text-4xl md:text-5xl text-balance text-foreground pr-8 drop-shadow-sm animate-slide-in-left">
              {name}
            </DialogTitle>
            <p
              className="text-lg sm:text-xl font-semibold text-accent mt-3 flex items-center gap-2 animate-slide-in-right"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-accent to-primary shadow-sm shadow-accent/50" />
              {title}
            </p>
          </DialogHeader>

          <div className="px-6 pb-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg text-justify text-muted-foreground leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-primary via-accent to-transparent animate-shimmer" />
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse shadow-lg shadow-primary/50" />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
})
