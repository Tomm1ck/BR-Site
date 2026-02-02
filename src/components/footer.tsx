import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8 sm:py-10 md:py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-10 w-32 h-32 border-2 border-primary rotate-45 animate-rotate-slow"></div>
        <div className="absolute bottom-0 right-10 w-24 h-24 border-2 border-accent -rotate-12 animate-float"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
          <div className="flex items-center gap-2 sm:gap-3 group cursor-default">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-110" />
            <span className="text-base sm:text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
              Крэпасць духу
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md text-pretty leading-relaxed px-4 transition-colors duration-300 hover:text-foreground">
            Помнік абаронцам Беларускай зямлі. Іх подвігі і ахвяры ніколі не будуць забытыя.
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Усе правы абаронены</p>
        </div>
      </div>
    </footer>
  )
}
